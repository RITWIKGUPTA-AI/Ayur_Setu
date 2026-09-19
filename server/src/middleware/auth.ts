import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { supabaseAdmin } from "../config/supabase";

export interface AuthedRequest extends Request {
  user?: {
    id: string;
    email?: string;
    role: string; // application role from profiles table: student | college_admin | industry_partner | aiia_admin
  };
}

/**
 * Verifies the Supabase-issued JWT sent as `Authorization: Bearer <token>`
 * (the frontend gets this token from supabase.auth.getSession()).
 * Then loads the application-level role from the `profiles` table.
 */
export async function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing or malformed Authorization header" });
    }
    const token = header.slice("Bearer ".length);

    const decoded = jwt.verify(token, env.supabaseJwtSecret) as { sub: string; email?: string };

    const { data: profile, error } = await supabaseAdmin
      .from("profiles")
      .select("id, role")
      .eq("id", decoded.sub)
      .single();

    if (error || !profile) {
      return res.status(401).json({ error: "No profile found for this user" });
    }

    req.user = { id: decoded.sub, email: decoded.email, role: profile.role };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

/**
 * Verifies the Supabase JWT WITHOUT requiring a `profiles` row to already exist.
 * Use only for the one route that creates that row (POST /api/profile/bootstrap),
 * right after client-side signup. Every other route should use requireAuth.
 */
export async function requireValidToken(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing or malformed Authorization header" });
    }
    const token = header.slice("Bearer ".length);
    const decoded = jwt.verify(token, env.supabaseJwtSecret) as { sub: string; email?: string };
    req.user = { id: decoded.sub, email: decoded.email, role: "student" }; // role unknown/irrelevant pre-bootstrap
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

/** Restricts a route to one or more application roles. Use after requireAuth. */
export function requireRole(...roles: string[]) {
  return (req: AuthedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Insufficient permissions for this action" });
    }
    next();
  };
}
