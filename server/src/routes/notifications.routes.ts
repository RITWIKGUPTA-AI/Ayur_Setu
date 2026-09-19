import { Router } from "express";
import { AuthedRequest, requireAuth } from "../middleware/auth";
import { asyncHandler } from "../middleware/errorHandler";
import { supabaseAdmin } from "../config/supabase";

export const notificationsRouter = Router();
notificationsRouter.use(requireAuth);

notificationsRouter.get(
  "/",
  asyncHandler(async (req: AuthedRequest, res) => {
    const { data, error } = await supabaseAdmin
      .from("notifications")
      .select("id, type, title, body, read, created_at")
      .eq("user_id", req.user!.id)
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw error;
    res.json({ notifications: data });
  })
);

notificationsRouter.patch(
  "/:id/read",
  asyncHandler(async (req: AuthedRequest, res) => {
    const { error } = await supabaseAdmin
      .from("notifications")
      .update({ read: true })
      .eq("id", req.params.id)
      .eq("user_id", req.user!.id);
    if (error) throw error;
    res.json({ ok: true });
  })
);

notificationsRouter.patch(
  "/read-all",
  asyncHandler(async (req: AuthedRequest, res) => {
    const { error } = await supabaseAdmin.from("notifications").update({ read: true }).eq("user_id", req.user!.id).eq("read", false);
    if (error) throw error;
    res.json({ ok: true });
  })
);
