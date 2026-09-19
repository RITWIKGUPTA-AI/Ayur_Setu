import { Router } from "express";
import { AuthedRequest, requireAuth } from "../middleware/auth";
import { asyncHandler, ApiError } from "../middleware/errorHandler";
import { supabaseAdmin } from "../config/supabase";

export const certificatesRouter = Router();

// Public verification endpoint — no auth required, so anyone (a recruiter,
// a college) can verify a certificate's authenticity from its code.
certificatesRouter.get(
  "/verify/:code",
  asyncHandler(async (req, res) => {
    const { data, error } = await supabaseAdmin
      .from("certificates")
      .select("title, issued_for, issued_at, certificate_url, profiles(full_name)")
      .eq("verification_code", req.params.code)
      .single();
    if (error || !data) throw new ApiError(404, "No certificate found for this code");
    res.json({ certificate: data });
  })
);

certificatesRouter.get(
  "/mine",
  requireAuth,
  asyncHandler(async (req: AuthedRequest, res) => {
    const { data, error } = await supabaseAdmin
      .from("certificates")
      .select("id, title, issued_for, certificate_url, verification_code, issued_at")
      .eq("student_id", req.user!.id)
      .order("issued_at", { ascending: false });
    if (error) throw error;
    res.json({ certificates: data });
  })
);
