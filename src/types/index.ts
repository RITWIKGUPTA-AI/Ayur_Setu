export type UserRole = 'student' | 'academician' | 'industry' | 'institution';

export interface SkillScore {
  category: string;
  studentScore: number;
  industryBenchmark: number;
  gap: number; // industryBenchmark - studentScore (positive means gap)
  status: 'proficient' | 'needs_improvement' | 'critical_gap';
}

export interface AssessmentQuestion {
  id: string;
  category: 'Pharmacovigilance & Drug Safety' | 'GMP & Quality Systems' | 'Clinical Research & AYUSH-GCP' | 'Lab & Analytical Techniques' | 'Formulation & Manufacturing' | 'Professional Communication';
  question: string;
  codeSnippet?: string;
  options: {
    text: string;
    scoreWeight: number; // 0 to 100
  }[];
  explanation: string;
}

export interface SkillRoadmapItem {
  id: string;
  title: string;
  type: 'course' | 'project' | 'certification' | 'internship';
  provider: string;
  duration: string;
  targetSkill: string;
  gapClosedPoints: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  linkUrl?: string;
  status: 'recommended' | 'in_progress' | 'completed';
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  college: string;
  degree: string;
  department: string;
  year: string;
  cgpa: number;
  headline: string;
  bio: string;
  location: string;
  linkedin: string;
  github: string;
  portfolioUrl: string;
  verifiedBadges: string[];
  skills: { name: string; level: number; verified: boolean }[];
  radarScores: {
    category: string;
    student: number;
    benchmark: number;
    fullMark: number;
  }[];
  overallReadiness: number; // percentage (e.g. 78%)
  completedAssessmentsCount: number;
  certifications: {
    id: string;
    title: string;
    issuer: string;
    issueDate: string;
    credentialId: string;
    verified: boolean;
  }[];
  projects: {
    id: string;
    title: string;
    description: string;
    tags: string[];
    githubUrl: string;
    liveUrl?: string;
    stars?: number;
  }[];
  internshipHistory: {
    id: string;
    role: string;
    company: string;
    duration: string;
    description: string;
    verifiedByCompany: boolean;
  }[];
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: 'Internship' | 'Full-Time' | 'Apprenticeship' | 'Live Project';
  workplace: 'Remote' | 'Hybrid' | 'On-Site';
  stipendOrSalary: string;
  duration?: string;
  postedDate: string;
  deadline: string;
  applicantsCount: number;
  description: string;
  responsibilities: string[];
  requiredSkills: { name: string; weight: number }[];
  preferredSkills: string[];
  eligibility: string;
  featured?: boolean;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  companyLogo: string;
  studentId: string;
  studentName: string;
  appliedDate: string;
  status: 'Applied' | 'Shortlisted' | 'Technical Round' | 'Interview' | 'Offered' | 'Rejected';
  fitScore: number;
  feedback?: string;
  nextStep?: string;
}

export interface LearningProgram {
  id: string;
  title: string;
  offeredBy: string; // Industry partner or University
  partnerLogo: string;
  instructor: string;
  skillsTaught: string[];
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  reviewsCount: number;
  enrolledCount: number;
  thumbnail: string;
  type: 'Industry Certification' | 'Masterclass' | 'Bootcamp' | 'Hands-on Lab';
  isIndustryEndorsed: boolean;
  scholarshipAvailable: boolean;
  description: string;
  syllabus: { week: number; title: string; topics: string[] }[];
}

export interface FacultyOpportunity {
  id: string;
  title: string;
  hostCompany: string;
  type: 'Faculty Internship' | 'FDP' | 'Research Grant' | 'Consultancy' | 'Joint Lab';
  domain: string;
  duration: string;
  stipendOrGrant: string;
  location: string;
  description: string;
  requirements: string[];
  deadline: string;
  applicantsCount: number;
  openings: number;
}

export interface CurriculumSkillInsight {
  domain: string;
  industryDemandGrowth: number; // percentage e.g. +42%
  academicCoverageScore: number; // out of 100
  gapSeverity: 'High' | 'Moderate' | 'Low';
  inDemandTechnologies: string[];
  suggestedCurriculumModules: string[];
}

export interface InstitutionalMetrics {
  totalStudents: number;
  placementReadinessRate: number;
  activeIndustryPartners: number;
  internshipsSecuredThisYear: number;
  avgSkillGapClosedPct: number;
  departmentReadiness: {
    dept: string;
    studentCount: number;
    readinessScore: number;
    topGapSkill: string;
    topStrength: string;
  }[];
  monthlyPlacementTrend: { month: string; placed: number; target: number }[];
  hiringDomainBreakdown: { domain: string; percentage: number; color: string }[];
}

export interface IndustrySkillNeed {
  id: string;
  submittedBy: string; // company name
  skillDomain: string;
  description: string;
  urgency: 'High' | 'Medium' | 'Low';
  submittedAt: string;
}
