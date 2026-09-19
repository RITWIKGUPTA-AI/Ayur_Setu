import { Router } from "express";
import { z } from "zod";
import { AuthedRequest, requireAuth, requireRole } from "../middleware/auth";
import { asyncHandler, ApiError } from "../middleware/errorHandler";
import { supabaseAdmin } from "../config/supabase";
import { computeMatchScore, rankInternshipsForStudent } from "../services/matching.service";
import { analyzeSkillGap } from "../services/ai.service";
import { notifyUser } from "../services/notifications.service";

export const internshipsRouter = Router();
internshipsRouter.use(requireAuth);

// ---- Industry partner: create a listing -----------------------------------
const createSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  location: z.string().optional(),
  mode: z.enum(["remote", "onsite", "hybrid"]).default("onsite"),
  stipend: z.string().optional(),
  durationWeeks: z.number().optional(),
  seats: z.number().default(1),
  requiredSkills: z.array(z.object({ skillId: z.string().uuid(), minProficiency: z.number().min(0).max(100) })).default([]),
});

internshipsRouter.post(
  "/",
  requireRole("industry_partner"),
  asyncHandler(async (req: AuthedRequest, res) => {
    const body = createSchema.parse(req.body);

    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("industry_partner_id")
      .eq("id", req.user!.id)
      .single();
    if (!profile?.industry_partner_id) throw new ApiError(400, "No industry partner linked to this account");

    const { data: internship, error } = await supabaseAdmin
      .from("internships")
      .insert({
        industry_partner_id: profile.industry_partner_id,
        title: body.title,
        description: body.description,
        location: body.location,
        mode: body.mode,
        stipend: body.stipend,
        duration_weeks: body.durationWeeks,
        seats: body.seats,
      })
      .select()
      .single();
    if (error) throw error;

    if (body.requiredSkills.length > 0) {
      const rows = body.requiredSkills.map((s) => ({
        internship_id: internship.id,
        skill_id: s.skillId,
        min_proficiency: s.minProficiency,
      }));
      await supabaseAdmin.from("industry_required_skills").insert(rows);
    }

    res.status(201).json({ internship });
  })
);

// ---- Student: browse open listings, ranked by AI/skill match --------------
internshipsRouter.get(
  "/matched",
  requireRole("student"),
  asyncHandler(async (req: AuthedRequest, res) => {
    const ranked = await rankInternshipsForStudent(req.user!.id);
    res.json({ internships: ranked });
  })
);

internshipsRouter.get(
  "/",
  asyncHandler(async (req: AuthedRequest, res) => {
    const { data, error } = await supabaseAdmin
      .from("internships")
      .select("id, title, location, mode, stipend, duration_weeks, seats, status, industry_partner_id, created_at")
      .eq("status", "open")
      .order("created_at", { ascending: false });
    if (error) throw error;
    res.json({ internships: data });
  })
);

// ---- Student: get a personalized skill-gap report for a listing -----------
internshipsRouter.get(
  "/:id/skill-gap",
  requireRole("student"),
  asyncHandler(async (req: AuthedRequest, res) => {
    const { data: required, error } = await supabaseAdmin
      .from("industry_required_skills")
      .select("min_proficiency, skills(name)")
      .eq("internship_id", req.params.id);
    if (error) throw error;

    const { data: studentSkills, error: sErr } = await supabaseAdmin
      .from("student_skills")
      .select("proficiency, skills(name)")
      .eq("student_id", req.user!.id);
    if (sErr) throw sErr;

    const { data: internship } = await supabaseAdmin.from("internships").select("title").eq("id", req.params.id).single();

    const report = await analyzeSkillGap({
      studentSkills: (studentSkills || []).map((s: any) => ({ name: s.skills?.name, proficiency: s.proficiency })),
      targetRoleOrInternship: internship?.title || "this internship",
      requiredSkills: (required || []).map((r: any) => ({ name: r.skills?.name, minProficiency: r.min_proficiency })),
    });

    res.json({ report });
  })
);

// ---- Student: apply ---------------------------------------------------------
internshipsRouter.post(
  "/:id/apply",
  requireRole("student"),
  asyncHandler(async (req: AuthedRequest, res) => {
    const matchScore = await computeMatchScore(req.user!.id, req.params.id);

    const { data: application, error } = await supabaseAdmin
      .from("applications")
      .insert({ internship_id: req.params.id, student_id: req.user!.id, match_score: matchScore })
      .select()
      .single();
    if (error) throw error;

    const { data: internship } = await supabaseAdmin
      .from("internships")
      .select("title, industry_partner_id")
      .eq("id", req.params.id)
      .single();

    // Notify the industry partner's team members.
    if (internship) {
      const { data: partnerUsers } = await supabaseAdmin
        .from("profiles")
        .select("id")
        .eq("industry_partner_id", internship.industry_partner_id);
      await Promise.all(
        (partnerUsers || []).map((u) =>
          notifyUser(u.id, "application", "New application received", `A student applied to "${internship.title}" (match ${matchScore}%).`)
        )
      );
    }

    res.status(201).json({ application });
  })
);

// ---- Industry partner: review applications ---------------------------------
internshipsRouter.get(
  "/:id/applications",
  requireRole("industry_partner", "aiia_admin"),
  asyncHandler(async (req: AuthedRequest, res) => {
    const { data, error } = await supabaseAdmin
      .from("applications")
      .select("id, student_id, match_score, status, applied_at, profiles(full_name)")
      .eq("internship_id", req.params.id)
      .order("match_score", { ascending: false });
    if (error) throw error;
    res.json({ applications: data });
  })
);

const statusSchema = z.object({ status: z.enum(["shortlisted", "rejected", "selected", "withdrawn"]) });

internshipsRouter.patch(
  "/applications/:applicationId",
  requireRole("industry_partner"),
  asyncHandler(async (req: AuthedRequest, res) => {
    const { status } = statusSchema.parse(req.body);
    const { data: application, error } = await supabaseAdmin
      .from("applications")
      .update({ status })
      .eq("id", req.params.applicationId)
      .select("student_id, internship_id")
      .single();
    if (error) throw error;

    const { data: internship } = await supabaseAdmin
      .from("internships")
      .select("title")
      .eq("id", application.internship_id)
      .single();

    await notifyUser(
      application.student_id,
      "application",
      "Application status updated",
      `Your application for "${internship?.title}" is now: ${status}.`
    );

    res.json({ ok: true });
  })
);
