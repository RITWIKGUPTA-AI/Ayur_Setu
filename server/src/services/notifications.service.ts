import { supabaseAdmin } from "../config/supabase";

export type NotificationType = "quiz" | "internship" | "application" | "system" | "skill_gap";

export async function notifyUser(userId: string, type: NotificationType, title: string, body?: string) {
  const { error } = await supabaseAdmin.from("notifications").insert({
    user_id: userId,
    type,
    title,
    body,
  });
  if (error) console.error("[notifications] failed to insert:", error.message);
}

export async function notifyMany(userIds: string[], type: NotificationType, title: string, body?: string) {
  if (userIds.length === 0) return;
  const rows = userIds.map((user_id) => ({ user_id, type, title, body }));
  const { error } = await supabaseAdmin.from("notifications").insert(rows);
  if (error) console.error("[notifications] bulk insert failed:", error.message);
}
