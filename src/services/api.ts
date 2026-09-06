import {
  StudentProfile,
  JobOpportunity,
  JobApplication,
  SkillRoadmapItem,
  LearningProgram,
  FacultyOpportunity,
  AssessmentQuestion,
  IndustrySkillNeed
} from '../types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers
    },
    ...options
  });

  if (!res.ok) {
    let errorMessage = `API Error ${res.status}: ${res.statusText}`;
    try {
      const errData = await res.json();
      if (errData.error) errorMessage = errData.error;
    } catch {
      // ignore
    }
    throw new Error(errorMessage);
  }

  return res.json() as Promise<T>;
}

export const api = {
  // Health
  checkHealth: async (): Promise<boolean> => {
    try {
      const res = await request<{ status: string }>('/health');
      return res.status === 'ok';
    } catch {
      return false;
    }
  },

  // Profile
  getProfile: () => request<StudentProfile>('/profile'),
  updateProfile: (data: Partial<StudentProfile>) =>
    request<StudentProfile>('/profile', {
      method: 'PUT',
      body: JSON.stringify(data)
    }),

  // Jobs
  getJobs: () => request<JobOpportunity[]>('/jobs'),
  getJobById: (id: string) => request<JobOpportunity>(`/jobs/${id}`),
  createJob: (jobData: Omit<JobOpportunity, 'id' | 'postedDate' | 'applicantsCount'>) =>
    request<JobOpportunity>('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData)
    }),

  // Applications
  getApplications: (studentId?: string) =>
    request<JobApplication[]>(studentId ? `/applications?studentId=${encodeURIComponent(studentId)}` : '/applications'),
  createApplication: (jobId: string, studentId?: string) =>
    request<JobApplication>('/applications', {
      method: 'POST',
      body: JSON.stringify({ jobId, studentId })
    }),
  updateApplicationStatus: (appId: string, status: JobApplication['status']) =>
    request<JobApplication>(`/applications/${appId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    }),

  // Learning Programs
  getLearningPrograms: () => request<LearningProgram[]>('/learning-programs'),
  enrollInProgram: (programId: string) =>
    request<{ success: boolean; program: LearningProgram; roadmapItem: SkillRoadmapItem }>(
      `/learning-programs/${programId}/enroll`,
      { method: 'POST' }
    ),

  // Faculty Opportunities
  getFacultyOpportunities: () => request<FacultyOpportunity[]>('/faculty-opportunities'),

  // Roadmap Items
  getRoadmapItems: () => request<SkillRoadmapItem[]>('/roadmap'),
  addRoadmapItem: (item: Omit<SkillRoadmapItem, 'id'>) =>
    request<SkillRoadmapItem>('/roadmap', {
      method: 'POST',
      body: JSON.stringify(item)
    }),

  // Assessment
  getAssessmentQuestions: () => request<AssessmentQuestion[]>('/assessment/questions'),
  submitAssessment: (categoryScores: Record<string, number>) =>
    request<{ profile: StudentProfile; average: number }>('/assessment/submit', {
      method: 'POST',
      body: JSON.stringify({ categoryScores })
    }),

  // Analytics
  getAnalytics: () => request<any>('/analytics'),

  // Industry Skill Signals (industry -> academia feedback loop)
  getIndustrySkillNeeds: () => request<IndustrySkillNeed[]>('/industry-skill-needs'),
  submitIndustrySkillNeed: (need: Omit<IndustrySkillNeed, 'id' | 'submittedAt'>) =>
    request<IndustrySkillNeed>('/industry-skill-needs', {
      method: 'POST',
      body: JSON.stringify(need)
    })
};
