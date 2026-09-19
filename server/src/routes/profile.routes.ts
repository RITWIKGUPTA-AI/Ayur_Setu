import { Router } from "express";
import { z } from "zod";
import { AuthedRequest, requireAuth, requireValidToken } from "../middleware/auth";
import { asyncHandler } from "../middleware/errorHandler";
import { supabaseAdmin } from "../config/supabase";

export const profileRouter = Router();

// Registered BEFORE the blanket requireAuth below, since this route runs
// right after signup when no `profiles` row exists yet.
const createProfileSchema = z.object({
  fullName: z.string().min(1),
  role: z.enum(["student", "college_admin", "industry_partner", "aiia_admin"]).default("student"),
  collegeId: z.string().uuid().optional(),
  industryPartnerId: z.string().uuid().optional(),
});

profileRouter.post(
  "/bootstrap",
  requireValidToken,
  asyncHandler(async (req: AuthedRequest, res) => {
    const body = createProfileSchema.parse(req.body);
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .upsert({
        id: req.user!.id,
        full_name: body.fullName,
        role: body.role,
        college_id: body.collegeId,
        industry_partner_id: body.industryPartnerId,
      })
      .select()
      .single();
    if (error) throw error;
    res.status(201).json({ profile: data });
  })
);

profileRouter.use(requireAuth);

profileRouter.get(
  "/me",
  asyncHandler(async (req: AuthedRequest, res) => {
    const { data, error } = await supabaseAdmin.from("profiles").select("*").eq("id", req.user!.id).single();
    if (error) throw error;
    res.json({ profile: data });
  })
);

const updateSchema = z.object({
  fullName: z.string().min(1).optional(),
  bio: z.string().optional(),
  phone: z.string().optional(),
  avatarUrl: z.string().url().optional(),
});

profileRouter.patch(
  "/me",
  asyncHandler(async (req: AuthedRequest, res) => {
    const body = updateSchema.parse(req.body);
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .update({
        full_name: body.fullName,
        bio: body.bio,
        phone: body.phone,
        avatar_url: body.avatarUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", req.user!.id)
      .select()
      .single();
    if (error) throw error;
    res.json({ profile: data });
  })
);

// Note: signup/login/password reset are handled client-side via the Supabase
// JS SDK (supabase.auth.signUp / signInWithPassword) directly against Supabase —
// there's no need for this backend to proxy auth. This backend only validates
// the resulting JWT (see middleware/auth.ts) and manages the `profiles` row.
