import { Router } from "express";
import { z } from "zod";
import { AuthedRequest, requireAuth } from "../middleware/auth";
import { asyncHandler, ApiError } from "../middleware/errorHandler";
import { supabaseAdmin } from "../config/supabase";
import { answerStudentDoubt } from "../services/ai.service";

export const chatRouter = Router();
chatRouter.use(requireAuth);

chatRouter.post(
  "/sessions",
  asyncHandler(async (req: AuthedRequest, res) => {
    const { data, error } = await supabaseAdmin
      .from("chat_sessions")
      .insert({ student_id: req.user!.id })
      .select()
      .single();
    if (error) throw error;
    res.status(201).json({ session: data });
  })
);

chatRouter.get(
  "/sessions",
  asyncHandler(async (req: AuthedRequest, res) => {
    const { data, error } = await supabaseAdmin
      .from("chat_sessions")
      .select("id, title, created_at")
      .eq("student_id", req.user!.id)
      .order("created_at", { ascending: false });
    if (error) throw error;
    res.json({ sessions: data });
  })
);

const messageSchema = z.object({ message: z.string().min(1).max(4000) });

chatRouter.post(
  "/sessions/:sessionId/messages",
  asyncHandler(async (req: AuthedRequest, res) => {
    const { message } = messageSchema.parse(req.body);

    const { data: session, error: sErr } = await supabaseAdmin
      .from("chat_sessions")
      .select("id, student_id")
      .eq("id", req.params.sessionId)
      .single();
    if (sErr || !session) throw new ApiError(404, "Session not found");
    if (session.student_id !== req.user!.id) throw new ApiError(403, "Not your session");

    const { data: history, error: hErr } = await supabaseAdmin
      .from("chat_messages")
      .select("role, content")
      .eq("session_id", session.id)
      .order("created_at", { ascending: true })
      .limit(20); // keep recent context only, bound token usage
    if (hErr) throw hErr;

    await supabaseAdmin.from("chat_messages").insert({ session_id: session.id, role: "user", content: message });

    const reply = await answerStudentDoubt({
      history: (history || []).map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
      question: message,
    });

    await supabaseAdmin.from("chat_messages").insert({ session_id: session.id, role: "assistant", content: reply });

    res.json({ reply });
  })
);

chatRouter.get(
  "/sessions/:sessionId/messages",
  asyncHandler(async (req: AuthedRequest, res) => {
    const { data, error } = await supabaseAdmin
      .from("chat_messages")
      .select("role, content, created_at")
      .eq("session_id", req.params.sessionId)
      .order("created_at", { ascending: true });
    if (error) throw error;
    res.json({ messages: data });
  })
);
