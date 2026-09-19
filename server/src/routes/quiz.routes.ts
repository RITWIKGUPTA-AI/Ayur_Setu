import { Router } from "express";
import { z } from "zod";
import { AuthedRequest, requireAuth, requireRole } from "../middleware/auth";
import { asyncHandler, ApiError } from "../middleware/errorHandler";
import { supabaseAdmin } from "../config/supabase";
import { generateQuiz, gradeShortAnswer } from "../services/ai.service";
import { updateSkillFromQuizResult } from "../services/matching.service";
import { notifyUser } from "../services/notifications.service";
import { issueCertificate } from "../services/certificate.service";

export const quizRouter = Router();
quizRouter.use(requireAuth);

// ---- Generate a new AI quiz for a topic --------------------------------
const generateSchema = z.object({
  topicId: z.string().uuid(),
  questionCount: z.number().min(3).max(20).default(5),
});

quizRouter.post(
  "/generate",
  requireRole("college_admin", "aiia_admin", "student"),
  asyncHandler(async (req: AuthedRequest, res) => {
    const { topicId, questionCount } = generateSchema.parse(req.body);

    const { data: topic, error } = await supabaseAdmin
      .from("topics")
      .select("id, title, subject, difficulty")
      .eq("id", topicId)
      .single();
    if (error || !topic) throw new ApiError(404, "Topic not found");

    const questions = await generateQuiz({
      topicTitle: topic.title,
      subject: topic.subject,
      difficulty: topic.difficulty,
      questionCount,
    });

    const { data: quiz, error: quizErr } = await supabaseAdmin
      .from("quizzes")
      .insert({
        topic_id: topic.id,
        title: `${topic.title} — AI Quiz`,
        generated_by: "ai",
        difficulty: topic.difficulty,
        question_count: questions.length,
        created_by: req.user!.id,
      })
      .select()
      .single();
    if (quizErr) throw quizErr;

    const rows = questions.map((q, idx) => ({
      quiz_id: quiz.id,
      question_type: q.question_type,
      prompt: q.prompt,
      options: q.options || null,
      correct_option_id: q.correct_option_id || null,
      model_answer: q.model_answer || null,
      explanation: q.explanation,
      order_index: idx,
    }));
    const { error: qErr } = await supabaseAdmin.from("quiz_questions").insert(rows);
    if (qErr) throw qErr;

    res.status(201).json({ quiz });
  })
);

// ---- Start an attempt ----------------------------------------------------
quizRouter.post(
  "/:quizId/start",
  asyncHandler(async (req: AuthedRequest, res) => {
    const { data: attempt, error } = await supabaseAdmin
      .from("quiz_attempts")
      .insert({ quiz_id: req.params.quizId, student_id: req.user!.id })
      .select()
      .single();
    if (error) throw error;

    const { data: questions, error: qErr } = await supabaseAdmin
      .from("quiz_questions")
      .select("id, question_type, prompt, options, order_index")
      .eq("quiz_id", req.params.quizId)
      .order("order_index");
    if (qErr) throw qErr;

    // correct_option_id / model_answer intentionally withheld from the client here.
    res.status(201).json({ attempt, questions });
  })
);

// ---- Submit an attempt (auto-grades MCQ instantly, AI-grades short answers) ----
const submitSchema = z.object({
  answers: z.array(
    z.object({
      questionId: z.string().uuid(),
      selectedOptionId: z.string().optional(),
      answerText: z.string().optional(),
    })
  ),
});

quizRouter.post(
  "/attempts/:attemptId/submit",
  asyncHandler(async (req: AuthedRequest, res) => {
    const { answers } = submitSchema.parse(req.body);

    const { data: attempt, error: attErr } = await supabaseAdmin
      .from("quiz_attempts")
      .select("id, quiz_id, student_id")
      .eq("id", req.params.attemptId)
      .single();
    if (attErr || !attempt) throw new ApiError(404, "Attempt not found");
    if (attempt.student_id !== req.user!.id) throw new ApiError(403, "Not your attempt");

    const { data: questions, error: qErr } = await supabaseAdmin
      .from("quiz_questions")
      .select("*")
      .eq("quiz_id", attempt.quiz_id);
    if (qErr) throw qErr;

    let totalPoints = 0;
    const answerRows = [];

    for (const q of questions || []) {
      const submitted = answers.find((a) => a.questionId === q.id);
      let isCorrect = false;
      let pointsAwarded = 0;
      let aiFeedback: string | undefined;

      if (q.question_type === "mcq") {
        isCorrect = submitted?.selectedOptionId === q.correct_option_id;
        pointsAwarded = isCorrect ? 1 : 0;
      } else if (submitted?.answerText) {
        const grading = await gradeShortAnswer({
          question: q.prompt,
          modelAnswer: q.model_answer || "",
          studentAnswer: submitted.answerText,
        });
        isCorrect = grading.is_correct;
        pointsAwarded = grading.points_awarded;
        aiFeedback = grading.feedback;
      }

      totalPoints += pointsAwarded;
      answerRows.push({
        attempt_id: attempt.id,
        question_id: q.id,
        answer_text: submitted?.answerText || null,
        selected_option_id: submitted?.selectedOptionId || null,
        is_correct: isCorrect,
        ai_feedback: aiFeedback || null,
        points_awarded: pointsAwarded,
      });
    }

    const { error: insErr } = await supabaseAdmin.from("quiz_answers").insert(answerRows);
    if (insErr) throw insErr;

    const scorePct = questions?.length ? Math.round((totalPoints / questions.length) * 100) : 0;

    const { error: updErr } = await supabaseAdmin
      .from("quiz_attempts")
      .update({ submitted_at: new Date().toISOString(), score: scorePct, status: "graded" })
      .eq("id", attempt.id);
    if (updErr) throw updErr;

    // Update the student's skill proficiency for this topic's linked skill.
    const { data: quiz } = await supabaseAdmin.from("quizzes").select("topic_id, title").eq("id", attempt.quiz_id).single();
    if (quiz?.topic_id) {
      const { data: topic } = await supabaseAdmin.from("topics").select("skill_id").eq("id", quiz.topic_id).single();
      if (topic?.skill_id) {
        await updateSkillFromQuizResult(req.user!.id, topic.skill_id, scorePct);
      }
    }

    await notifyUser(req.user!.id, "quiz", "Quiz graded", `You scored ${scorePct}% on "${quiz?.title || "your quiz"}".`);

    // Auto-issue a certificate for high performance (>=85%).
    if (scorePct >= 85 && quiz?.title) {
      const { data: profile } = await supabaseAdmin.from("profiles").select("full_name").eq("id", req.user!.id).single();
      await issueCertificate({
        studentId: req.user!.id,
        studentName: profile?.full_name || "AyurSetu Student",
        title: quiz.title,
        issuedFor: `Scored ${scorePct}% on an AI-generated assessment`,
      });
    }

    res.json({ scorePct, answers: answerRows });
  })
);

// ---- List quizzes / a student's history ----------------------------------
quizRouter.get(
  "/",
  asyncHandler(async (req: AuthedRequest, res) => {
    const { data, error } = await supabaseAdmin
      .from("quizzes")
      .select("id, title, difficulty, question_count, topic_id, created_at")
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw error;
    res.json({ quizzes: data });
  })
);

quizRouter.get(
  "/attempts/mine",
  asyncHandler(async (req: AuthedRequest, res) => {
    const { data, error } = await supabaseAdmin
      .from("quiz_attempts")
      .select("id, quiz_id, score, status, submitted_at")
      .eq("student_id", req.user!.id)
      .order("started_at", { ascending: false });
    if (error) throw error;
    res.json({ attempts: data });
  })
);
