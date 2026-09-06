import { JobOpportunity } from '../types.js';

export interface SkillBreakdownItem {
  skill: string;
  weight: number;
  candidateLevel: number | null; // null if candidate has no signal for this skill at all
  matched: boolean;
  contribution: number; // points (0-100 scale) this skill contributed to the final score
}

export interface MatchResult {
  fitScore: number; // 0-100
  breakdown: SkillBreakdownItem[];
  missingSkills: string[];
  preferredMatches: string[];
}

/**
 * Loosely compares two skill labels so that e.g. "Pharmacovigilance (ADR Reporting - PvPI)"
 * matches a job requirement of "Pharmacovigilance". This keeps the algorithm resilient to the
 * more descriptive skill names used on student profiles vs the shorter names used on job posts.
 */
function skillsOverlap(candidateSkill: string, requiredSkill: string): boolean {
  const a = candidateSkill.toLowerCase();
  const b = requiredSkill.toLowerCase();
  if (a === b) return true;
  // token overlap: if the required skill's main word(s) appear in the candidate skill or vice versa
  const bTokens = b.split(/[^a-z0-9]+/).filter(t => t.length > 2);
  const aTokens = a.split(/[^a-z0-9]+/).filter(t => t.length > 2);
  if (bTokens.length === 0) return a.includes(b) || b.includes(a);
  const overlapCount = bTokens.filter(t => a.includes(t)).length;
  return overlapCount >= Math.max(1, Math.ceil(bTokens.length * 0.6)) || a.includes(b) || b.includes(a);
}

/**
 * Computes a real, explainable skill-fit score between a candidate's assessed skills and a
 * job's required + preferred skills. This replaces static hardcoded "fit %" numbers with an
 * actual weighted overlap calculation, and returns the per-skill reasoning behind the score
 * so it can be shown to both the student and the recruiter (no black-box percentage).
 */
export function computeMatch(
  candidateSkills: { name: string; level: number }[],
  job: Pick<JobOpportunity, 'requiredSkills' | 'preferredSkills'>
): MatchResult {
  const totalWeight = job.requiredSkills.reduce((sum, s) => sum + s.weight, 0) || 1;
  const breakdown: SkillBreakdownItem[] = [];
  const missingSkills: string[] = [];
  let weightedScoreSum = 0;

  for (const req of job.requiredSkills) {
    const match = candidateSkills.find(cs => skillsOverlap(cs.name, req.name));
    if (match) {
      const levelFactor = Math.min(1, match.level / 100);
      const contribution = (req.weight / totalWeight) * 100 * levelFactor;
      weightedScoreSum += contribution;
      breakdown.push({
        skill: req.name,
        weight: req.weight,
        candidateLevel: match.level,
        matched: true,
        contribution: Math.round(contribution * 10) / 10
      });
    } else {
      breakdown.push({
        skill: req.name,
        weight: req.weight,
        candidateLevel: null,
        matched: false,
        contribution: 0
      });
      missingSkills.push(req.name);
    }
  }

  // Small bonus (up to +6 points total) for preferred/nice-to-have skill overlap
  const preferredMatches = job.preferredSkills.filter(ps =>
    candidateSkills.some(cs => skillsOverlap(cs.name, ps))
  );
  const preferredBonus = job.preferredSkills.length > 0
    ? (preferredMatches.length / job.preferredSkills.length) * 6
    : 0;

  const fitScore = Math.max(0, Math.min(100, Math.round(weightedScoreSum + preferredBonus)));

  return { fitScore, breakdown, missingSkills, preferredMatches };
}
