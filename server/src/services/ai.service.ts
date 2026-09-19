import Anthropic from "@anthropic-ai/sdk";
import { env } from "../config/env";

const anthropic = new Anthropic({ apiKey: env.anthropicApiKey });

/** Strips ```json fences etc. and parses the model's JSON response safely. */
function parseJson<T>(text: string): T {
  const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
  return JSON.parse(cleaned) as T;
}

async function ask(systemPrompt: string, userPrompt: string, maxTokens = 2000): Promise<string> {
  const response = await anthropic.messages.create({
    model: env.claudeModel,
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });
  const textBlock = response.content.find((b) => b.type === "text");
  return textBlock && "text" in textBlock ? textBlock.text : "";
}

// ---------------------------------------------------------------------------
// 1. QUIZ GENERATION
// ---------------------------------------------------------------------------
export interface GeneratedQuestion {
  question_type: "mcq" | "short_answer";
  prompt: string;
  options?: { id: string; text: string }[];
  correct_option_id?: string;
  model_answer?: string;
  explanation: string;
}

export async function generateQuiz(params: {
  topicTitle: string;
  subject: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  questionCount: number;
}): Promise<GeneratedQuestion[]> {
  const system = `You are an expert Ayurveda/Ayush curriculum examiner writing quiz questions for
Ayush students on the AyurSetu platform. Questions must be factually accurate to classical and
modern Ayurvedic pharmacology, clinical practice, and allied Ayush disciplines. Respond ONLY with
raw JSON — no markdown fences, no preamble, no commentary.`;

  const user = `Generate ${params.questionCount} quiz questions on the topic "${params.topicTitle}"
(subject: ${params.subject}) at ${params.difficulty} difficulty.
Mix multiple-choice ("mcq") and short-answer ("short_answer") question types, roughly 70% mcq / 30% short_answer.

Return a JSON array where each item has exactly this shape:
{
  "question_type": "mcq" | "short_answer",
  "prompt": "the question text",
  "options": [{"id": "a", "text": "..."}, {"id": "b", "text": "..."}, {"id": "c", "text": "..."}, {"id": "d", "text": "..."}],  // only for mcq
  "correct_option_id": "a",  // only for mcq, must match one options[].id
  "model_answer": "ideal answer text",  // only for short_answer
  "explanation": "brief explanation of the correct answer, shown to the student after grading"
}
Return ONLY the JSON array.`;

  const raw = await ask(system, user, 2500);
  return parseJson<GeneratedQuestion[]>(raw);
}

// ---------------------------------------------------------------------------
// 2. AI GRADING (short-answer)
// ---------------------------------------------------------------------------
export interface GradingResult {
  is_correct: boolean;
  points_awarded: number; // 0-1, fraction of full credit for this question
  feedback: string;
}

export async function gradeShortAnswer(params: {
  question: string;
  modelAnswer: string;
  studentAnswer: string;
}): Promise<GradingResult> {
  const system = `You are grading an Ayush student's short-answer quiz response. Be fair but
rigorous about factual accuracy. Respond ONLY with raw JSON, no markdown fences.`;

  const user = `Question: ${params.question}
Reference/model answer: ${params.modelAnswer}
Student's answer: ${params.studentAnswer}

Grade the student's answer against the reference answer. Partial credit is allowed for partially
correct answers. Return JSON exactly as:
{"is_correct": boolean, "points_awarded": number between 0 and 1, "feedback": "1-2 sentence feedback for the student"}`;

  const raw = await ask(system, user, 400);
  return parseJson<GradingResult>(raw);
}

// ---------------------------------------------------------------------------
// 3. DOUBT-SOLVING CHATBOT
// ---------------------------------------------------------------------------
export async function answerStudentDoubt(params: {
  history: { role: "user" | "assistant"; content: string }[];
  question: string;
}): Promise<string> {
  const system = `You are the AyurSetu study assistant, helping Ayush (Ayurveda, Yoga, Unani,
Siddha, Homeopathy) students with academic doubts — pharmacology, clinical concepts, exam prep,
and how to use the AyurSetu platform (quizzes, internships, certificates). Be accurate, concise,
and cite classical terms correctly. If a question is outside academic/platform scope, politely
redirect. Do not give medical advice for real patients — only educational/academic content.`;

  const response = await anthropic.messages.create({
    model: env.claudeModel,
    max_tokens: 800,
    system,
    messages: [...params.history, { role: "user", content: params.question }],
  });
  const textBlock = response.content.find((b) => b.type === "text");
  return textBlock && "text" in textBlock ? textBlock.text : "";
}

// ---------------------------------------------------------------------------
// 4. SKILL-GAP ANALYSIS & INTERNSHIP MATCH EXPLANATION
// ---------------------------------------------------------------------------
export interface SkillGapReport {
  strengths: string[];
  gaps: { skill: string; suggestion: string }[];
  recommended_focus: string;
}

export async function analyzeSkillGap(params: {
  studentSkills: { name: string; proficiency: number }[];
  targetRoleOrInternship: string;
  requiredSkills: { name: string; minProficiency: number }[];
}): Promise<SkillGapReport> {
  const system = `You are a career/skills advisor for Ayush students. Respond ONLY with raw JSON.`;
  const user = `Student's current skills (0-100 proficiency, verified by quiz performance):
${JSON.stringify(params.studentSkills)}

Target: "${params.targetRoleOrInternship}"
Required skills for this target:
${JSON.stringify(params.requiredSkills)}

Return JSON exactly as:
{
  "strengths": ["skill names the student already meets or exceeds"],
  "gaps": [{"skill": "skill name", "suggestion": "concrete, specific study/practice suggestion"}],
  "recommended_focus": "one sentence on the single highest-leverage thing to work on next"
}`;
  const raw = await ask(system, user, 800);
  return parseJson<SkillGapReport>(raw);
}
