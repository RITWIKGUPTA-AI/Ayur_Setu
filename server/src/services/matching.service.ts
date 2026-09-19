import { supabaseAdmin } from "../config/supabase";

/**
 * Computes a 0-100 match score between a student's verified skill proficiencies
 * and an internship's required skills. Kept deterministic (not AI) so scores
 * are stable, explainable, and cheap to compute for every listing.
 */
export async function computeMatchScore(studentId: string, internshipId: string): Promise<number> {
  const { data: required, error: reqErr } = await supabaseAdmin
    .from("industry_required_skills")
    .select("skill_id, min_proficiency")
    .eq("internship_id", internshipId);

  if (reqErr) throw reqErr;
  if (!required || required.length === 0) return 100; // no specific requirements => open match

  const { data: studentSkills, error: skillErr } = await supabaseAdmin
    .from("student_skills")
    .select("skill_id, proficiency")
    .eq("student_id", studentId);

  if (skillErr) throw skillErr;

  const proficiencyMap = new Map<string, number>();
  for (const s of studentSkills || []) proficiencyMap.set(s.skill_id, s.proficiency);

  let totalWeight = 0;
  let earned = 0;

  for (const req of required) {
    totalWeight += req.min_proficiency;
    const have = proficiencyMap.get(req.skill_id) || 0;
    earned += Math.min(have, req.min_proficiency);
  }

  if (totalWeight === 0) return 100;
  return Math.round((earned / totalWeight) * 100);
}

/** Ranks all open internships for a student by computed match score, best first. */
export async function rankInternshipsForStudent(studentId: string) {
  const { data: internships, error } = await supabaseAdmin
    .from("internships")
    .select("id, title, industry_partner_id, location, mode, stipend, duration_weeks")
    .eq("status", "open");

  if (error) throw error;

  const scored = await Promise.all(
    (internships || []).map(async (i) => ({
      ...i,
      match_score: await computeMatchScore(studentId, i.id),
    }))
  );

  return scored.sort((a, b) => b.match_score - a.match_score);
}

/** Updates a student's skill proficiency after a quiz is graded, using a simple moving blend
 * so one bad or lucky quiz doesn't wildly swing a previously-established proficiency. */
export async function updateSkillFromQuizResult(studentId: string, skillId: string, quizScorePct: number) {
  const { data: existing } = await supabaseAdmin
    .from("student_skills")
    .select("proficiency")
    .eq("student_id", studentId)
    .eq("skill_id", skillId)
    .maybeSingle();

  const previous = existing?.proficiency ?? null;
  const newProficiency = previous === null ? Math.round(quizScorePct) : Math.round(previous * 0.6 + quizScorePct * 0.4);

  await supabaseAdmin
    .from("student_skills")
    .upsert(
      {
        student_id: studentId,
        skill_id: skillId,
        proficiency: newProficiency,
        verified_by_quiz: true,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "student_id,skill_id" }
    );

  return newProficiency;
}
