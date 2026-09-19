import { createClient } from "@supabase/supabase-js";
import { env } from "./env";

// Server-side client using the SERVICE ROLE key — bypasses Row Level Security.
// Never send this key to the frontend. All access control for client requests
// happens in our own route/middleware layer (see middleware/auth.ts).
export const supabaseAdmin = createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});
