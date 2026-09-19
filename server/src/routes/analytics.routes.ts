import { Router } from "express";
import { AuthedRequest, requireAuth, requireRole } from "../middleware/auth";
import { asyncHandler } from "../middleware/errorHandler";
import { supabaseAdmin } from "../config/supabase";

export const analyticsRouter = Router();
analyticsRouter.use(requireAuth);

/**
 * High-level platform stats for AIIA / college admins:
 * student count, quiz participation, average scores, skill-gap heatmap,
 * internship placement funnel. Kept as a handful of aggregate queries
 * rather than one giant view so each piece can be cached/paginated later.
 */
analyticsRouter.get(
  "/overview",
  requireRole("aiia_admin", "college_admin"),
  asyncHandler(async (req: AuthedRequest, res) => {
    const [{ count: studentCount }, { count: quizAttempts }, { data: scores }, { count: applications }, { count: selected }] =
      await Promise.all([
        supabaseAdmin.from("profiles").select("*", { count: "exact", head: true }).eq("role", "student"),
        supabaseAdmin.from("quiz_attempts").select("*", { count: "exact", head: true }).eq("status", "graded"),
        supabaseAdmin.from("quiz_attempts").select("score").eq("status", "graded"),
        supabaseAdmin.from("applications").select("*", { count: "exact", head: true }),
        supabaseAdmin.from("applications").select("*", { count: "exact", head: true }).eq("status", "selected"),
      ]);

    const avgScore = scores && scores.length > 0 ? Math.round(scores.reduce((sum, s) => sum + (s.score || 0), 0) / scores.length) : 0;

    res.json({
      studentCount: studentCount || 0,
      quizAttempts: quizAttempts || 0,
      averageQuizScore: avgScore,
      totalApplications: applications || 0,
      studentsPlaced: selected || 0,
    });
  })
);

/** Average proficiency per skill across all students — surfaces the biggest curriculum gaps. */
analyticsRouter.get(
  "/skill-gap-heatmap",
  requireRole("aiia_admin", "college_admin"),
  asyncHandler(async (req: AuthedRequest, res) => {
    const { data, error } = await supabaseAdmin.from("student_skills").select("proficiency, skills(name, category)");
    if (error) throw error;

    const bucket = new Map<string, { total: number; count: number; category: string }>();
    for (const row of data || []) {
      const skill: any = (row as any).skills;
      if (!skill) continue;
      const key = skill.name;
      const entry = bucket.get(key) || { total: 0, count: 0, category: skill.category };
      entry.total += row.proficiency;
      entry.count += 1;
      bucket.set(key, entry);
    }

    const heatmap = Array.from(bucket.entries()).map(([skill, v]) => ({
      skill,
      category: v.category,
      averageProficiency: Math.round(v.total / v.count),
      sampleSize: v.count,
    }));

    res.json({ heatmap: heatmap.sort((a, b) => a.averageProficiency - b.averageProficiency) });
  })
);

/** A student's own progress dashboard. */
analyticsRouter.get(
  "/my-progress",
  asyncHandler(async (req: AuthedRequest, res) => {
    const [{ data: attempts }, { data: skills }, { data: certificates }] = await Promise.all([
      supabaseAdmin.from("quiz_attempts").select("score, submitted_at").eq("student_id", req.user!.id).eq("status", "graded"),
      supabaseAdmin.from("student_skills").select("proficiency, skills(name)").eq("student_id", req.user!.id),
      supabaseAdmin.from("certificates").select("title, issued_at").eq("student_id", req.user!.id),
    ]);

    const avgScore = attempts && attempts.length > 0 ? Math.round(attempts.reduce((s, a) => s + (a.score || 0), 0) / attempts.length) : 0;

    res.json({
      quizzesTaken: attempts?.length || 0,
      averageScore: avgScore,
      skills,
      certificates,
    });
  })
);
