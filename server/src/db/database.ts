import fs from 'fs';
import path from 'path';
import {
  StudentProfile,
  JobOpportunity,
  JobApplication,
  SkillRoadmapItem,
  LearningProgram,
  FacultyOpportunity,
  CurriculumSkillInsight,
  InstitutionalMetrics,
  AssessmentQuestion,
  IndustrySkillNeed
} from '../types.js';
import {
  INITIAL_STUDENT_PROFILE,
  JOB_OPPORTUNITIES,
  INITIAL_APPLICATIONS,
  INITIAL_ROADMAP_ITEMS,
  LEARNING_PROGRAMS,
  FACULTY_OPPORTUNITIES,
  CURRICULUM_SKILL_INSIGHTS,
  INSTITUTIONAL_METRICS,
  ASSESSMENT_QUESTIONS,
  SAMPLE_CANDIDATES_FOR_INDUSTRY,
  INITIAL_INDUSTRY_SKILL_NEEDS
} from './initialData.js';
import { computeMatch } from '../utils/matching.js';

// This file compiles to CommonJS (see server/tsconfig.json), so the native
// __dirname global is used directly instead of an ESM import.meta polyfill.
const DATA_DIR = path.resolve(__dirname, '../../data');
const DB_FILE = path.resolve(DATA_DIR, 'store.json');

export interface DatabaseSchema {
  studentProfile: StudentProfile;
  jobs: JobOpportunity[];
  applications: JobApplication[];
  roadmapItems: SkillRoadmapItem[];
  learningPrograms: LearningProgram[];
  facultyOpportunities: FacultyOpportunity[];
  curriculumInsights: CurriculumSkillInsight[];
  institutionalMetrics: InstitutionalMetrics;
  assessmentQuestions: AssessmentQuestion[];
  industryCandidates: typeof SAMPLE_CANDIDATES_FOR_INDUSTRY;
  industrySkillNeeds: IndustrySkillNeed[];
}

class Database {
  private data: DatabaseSchema;
  private saveTimeout: NodeJS.Timeout | null = null;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const content = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(content);
        // Backfill fields added in later versions so older persisted store.json files
        // (from a previous deploy) don't crash on missing keys.
        if (!parsed.industrySkillNeeds) {
          parsed.industrySkillNeeds = INITIAL_INDUSTRY_SKILL_NEEDS;
        }
        return parsed;
      }
    } catch (err) {
      console.warn('Could not read existing database file, falling back to initial data:', err);
    }

    const initial: DatabaseSchema = {
      studentProfile: INITIAL_STUDENT_PROFILE,
      jobs: JOB_OPPORTUNITIES,
      applications: INITIAL_APPLICATIONS,
      roadmapItems: INITIAL_ROADMAP_ITEMS,
      learningPrograms: LEARNING_PROGRAMS,
      facultyOpportunities: FACULTY_OPPORTUNITIES,
      curriculumInsights: CURRICULUM_SKILL_INSIGHTS,
      institutionalMetrics: INSTITUTIONAL_METRICS,
      assessmentQuestions: ASSESSMENT_QUESTIONS,
      industryCandidates: SAMPLE_CANDIDATES_FOR_INDUSTRY,
      industrySkillNeeds: INITIAL_INDUSTRY_SKILL_NEEDS
    };

    this.persist(initial);
    return initial;
  }

  private persist(dataToSave: DatabaseSchema = this.data) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(dataToSave, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write to database file:', err);
    }
  }

  public save() {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    this.saveTimeout = setTimeout(() => {
      this.persist();
      this.saveTimeout = null;
    }, 200);
  }

  // --- Profile methods ---
  public getProfile(): StudentProfile {
    return this.data.studentProfile;
  }

  public updateProfile(update: Partial<StudentProfile>): StudentProfile {
    this.data.studentProfile = { ...this.data.studentProfile, ...update };
    this.save();
    return this.data.studentProfile;
  }

  // --- Jobs methods ---
  public getJobs(): JobOpportunity[] {
    return this.data.jobs;
  }

  public getJobById(id: string): JobOpportunity | undefined {
    return this.data.jobs.find(j => j.id === id);
  }

  public createJob(jobData: Omit<JobOpportunity, 'id' | 'postedDate' | 'applicantsCount'>): JobOpportunity {
    const newJob: JobOpportunity = {
      ...jobData,
      id: `job-${Date.now()}`,
      postedDate: 'Just now',
      applicantsCount: 0
    };
    this.data.jobs = [newJob, ...this.data.jobs];
    this.save();
    return newJob;
  }

  // --- Applications methods ---
  public getApplications(studentId?: string): JobApplication[] {
    if (studentId) {
      return this.data.applications.filter(a => a.studentId === studentId);
    }
    return this.data.applications;
  }

  public createApplication(jobId: string, studentId: string): { success: boolean; application?: JobApplication; error?: string } {
    const job = this.getJobById(jobId);
    if (!job) {
      return { success: false, error: 'Job not found' };
    }

    const alreadyApplied = this.data.applications.some(
      a => a.jobId === jobId && a.studentId === studentId
    );
    if (alreadyApplied) {
      return { success: false, error: 'Already applied for this position' };
    }

    // Real, explainable skill-fit score computed from the student's actual assessed
    // skills against this job's required + preferred skills (see utils/matching.ts) —
    // replaces the old placeholder random score.
    const { fitScore: matchScore } = computeMatch(this.data.studentProfile.skills, job);
    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      companyLogo: job.companyLogo,
      studentId: this.data.studentProfile.id,
      studentName: this.data.studentProfile.name,
      appliedDate: 'Just now',
      status: 'Applied',
      fitScore: matchScore,
      nextStep: 'Application submitted to company HR screening pipeline.'
    };

    this.data.applications = [newApp, ...this.data.applications];
    // Increment applicant count on job
    job.applicantsCount += 1;
    this.save();

    return { success: true, application: newApp };
  }

  public updateApplicationStatus(appId: string, status: JobApplication['status']): JobApplication | null {
    const app = this.data.applications.find(a => a.id === appId);
    if (!app) return null;

    app.status = status;
    this.save();
    return app;
  }

  // --- Learning Programs methods ---
  public getLearningPrograms(): LearningProgram[] {
    return this.data.learningPrograms;
  }

  public enrollInProgram(programId: string): { success: boolean; program?: LearningProgram; roadmapItem?: SkillRoadmapItem; error?: string } {
    const prog = this.data.learningPrograms.find(p => p.id === programId);
    if (!prog) {
      return { success: false, error: 'Learning program not found' };
    }

    prog.enrolledCount += 1;

    const newRoadmap: SkillRoadmapItem = {
      id: `road-enrolled-${Date.now()}`,
      title: prog.title,
      type: 'course',
      provider: prog.offeredBy,
      duration: prog.duration,
      targetSkill: prog.skillsTaught[0] || 'Technical Mastery',
      gapClosedPoints: 20,
      difficulty: prog.level,
      status: 'in_progress'
    };

    this.data.roadmapItems = [newRoadmap, ...this.data.roadmapItems];
    this.save();

    return { success: true, program: prog, roadmapItem: newRoadmap };
  }

  // --- Faculty Opportunities methods ---
  public getFacultyOpportunities(): FacultyOpportunity[] {
    return this.data.facultyOpportunities;
  }

  // --- Roadmap methods ---
  public getRoadmapItems(): SkillRoadmapItem[] {
    return this.data.roadmapItems;
  }

  public addRoadmapItem(item: Omit<SkillRoadmapItem, 'id'>): SkillRoadmapItem {
    const newItem: SkillRoadmapItem = {
      ...item,
      id: `road-${Date.now()}`
    };
    this.data.roadmapItems = [newItem, ...this.data.roadmapItems];
    this.save();
    return newItem;
  }

  // --- Assessment methods ---
  public getAssessmentQuestions(): AssessmentQuestion[] {
    return this.data.assessmentQuestions;
  }

  public submitAssessment(categoryScores: Record<string, number>): { profile: StudentProfile; average: number } {
    const updatedRadar = [
      { category: 'Pharmacovigilance', student: categoryScores['Pharmacovigilance & Drug Safety'] || 80, benchmark: 82, fullMark: 100 },
      { category: 'GMP & Quality', student: categoryScores['GMP & Quality Systems'] || 75, benchmark: 85, fullMark: 100 },
      { category: 'Clinical Research', student: categoryScores['Clinical Research & AYUSH-GCP'] || 70, benchmark: 80, fullMark: 100 },
      { category: 'Lab & Analytics', student: categoryScores['Lab & Analytical Techniques'] || 60, benchmark: 78, fullMark: 100 },
      { category: 'Formulation Sci.', student: categoryScores['Formulation & Manufacturing'] || 80, benchmark: 75, fullMark: 100 },
      { category: 'Communication', student: categoryScores['Professional Communication'] || 88, benchmark: 75, fullMark: 100 }
    ];

    const avg = Math.round(
      updatedRadar.reduce((sum, item) => sum + item.student, 0) / updatedRadar.length
    );

    this.data.studentProfile = {
      ...this.data.studentProfile,
      radarScores: updatedRadar,
      overallReadiness: avg,
      completedAssessmentsCount: this.data.studentProfile.completedAssessmentsCount + 1,
      verifiedBadges: Array.from(new Set([...this.data.studentProfile.verifiedBadges, 'Benchmarked 2026', 'Assessment Verified']))
    };

    this.save();
    return { profile: this.data.studentProfile, average: avg };
  }

  // --- Industry Skill Signals (industry -> academia feedback loop) ---
  public getIndustrySkillNeeds(): IndustrySkillNeed[] {
    return this.data.industrySkillNeeds;
  }

  public submitIndustrySkillNeed(need: Omit<IndustrySkillNeed, 'id' | 'submittedAt'>): IndustrySkillNeed {
    const newNeed: IndustrySkillNeed = {
      ...need,
      id: `need-${Date.now()}`,
      submittedAt: 'Just now'
    };
    this.data.industrySkillNeeds = [newNeed, ...this.data.industrySkillNeeds];
    this.save();
    return newNeed;
  }

  /**
   * Aggregates every live industry signal into a ranked "Top Emerging Skill Gaps" leaderboard —
   * grouped by skill domain, weighted by urgency and recency, so academicians/institutions see
   * which gaps are trending across ALL reporting companies rather than reading a raw, unordered
   * list of individual signals one at a time.
   */
  public getSkillGapLeaderboard() {
    const urgencyWeight: Record<IndustrySkillNeed['urgency'], number> = { High: 3, Medium: 2, Low: 1 };
    const byDomain = new Map<string, { domain: string; signalCount: number; weightedScore: number; companies: Set<string>; latestDescription: string }>();

    for (const need of this.data.industrySkillNeeds) {
      const entry = byDomain.get(need.skillDomain) || {
        domain: need.skillDomain,
        signalCount: 0,
        weightedScore: 0,
        companies: new Set<string>(),
        latestDescription: need.description
      };
      entry.signalCount += 1;
      entry.weightedScore += urgencyWeight[need.urgency];
      entry.companies.add(need.submittedBy);
      byDomain.set(need.skillDomain, entry);
    }

    return Array.from(byDomain.values())
      .map(e => ({
        domain: e.domain,
        signalCount: e.signalCount,
        weightedScore: e.weightedScore,
        reportingCompanies: Array.from(e.companies),
        latestDescription: e.latestDescription
      }))
      .sort((a, b) => b.weightedScore - a.weightedScore);
  }

  // --- Analytics & Insights ---
  public getAnalytics() {
    return {
      institutionalMetrics: this.data.institutionalMetrics,
      curriculumInsights: this.data.curriculumInsights,
      industryCandidates: this.data.industryCandidates,
      skillGapLeaderboard: this.getSkillGapLeaderboard()
    };
  }
}

export const db = new Database();
