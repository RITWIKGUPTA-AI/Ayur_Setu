import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  FacultyOpportunity, 
  IndustrySkillNeed,
  JobApplication, 
  JobOpportunity, 
  LearningProgram, 
  SkillRoadmapItem, 
  StudentProfile, 
  UserRole 
} from '../types';
import { 
  FACULTY_OPPORTUNITIES, 
  INITIAL_APPLICATIONS, 
  INITIAL_ROADMAP_ITEMS, 
  INITIAL_STUDENT_PROFILE, 
  JOB_OPPORTUNITIES, 
  LEARNING_PROGRAMS 
} from '../data/mockData';
import { api } from '../services/api';
import { computeMatch } from '../utils/matching';

export type PageId = 
  | 'landing' 
  | 'dashboard' 
  | 'assessment' 
  | 'jobs' 
  | 'learning' 
  | 'portfolio' 
  | 'analytics' 
  | 'login';

export interface ToastItem {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  page: PageId;
  setPage: (page: PageId) => void;
  studentProfile: StudentProfile;
  setStudentProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
  jobs: JobOpportunity[];
  applications: JobApplication[];
  roadmapItems: SkillRoadmapItem[];
  learningPrograms: LearningProgram[];
  facultyOpportunities: FacultyOpportunity[];
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id'>) => void;
  removeToast: (id: string) => void;
  applyToJob: (jobId: string) => boolean;
  enrollInProgram: (programId: string) => void;
  postNewJob: (job: Omit<JobOpportunity, 'id' | 'postedDate' | 'applicantsCount'>) => void;
  updateApplicationStatus: (appId: string, newStatus: JobApplication['status']) => void;
  submitAssessmentResults: (categoryScores: Record<string, number>) => void;
  selectedJobForModal: JobOpportunity | null;
  setSelectedJobForModal: (job: JobOpportunity | null) => void;
  activePortfolioStudentId: string;
  setActivePortfolioStudentId: (id: string) => void;
  industrySkillNeeds: IndustrySkillNeed[];
  submitIndustrySkillNeed: (need: Omit<IndustrySkillNeed, 'id' | 'submittedAt'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem('sih_portal_role');
    return (saved as UserRole) || 'student';
  });

  const [page, setPageState] = useState<PageId>('landing');
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(INITIAL_STUDENT_PROFILE);
  const [jobs, setJobs] = useState<JobOpportunity[]>(JOB_OPPORTUNITIES);
  const [applications, setApplications] = useState<JobApplication[]>(INITIAL_APPLICATIONS);
  const [roadmapItems, setRoadmapItems] = useState<SkillRoadmapItem[]>(INITIAL_ROADMAP_ITEMS);
  const [learningPrograms, setLearningPrograms] = useState<LearningProgram[]>(LEARNING_PROGRAMS);
  const [facultyOpportunities, setFacultyOpportunities] = useState<FacultyOpportunity[]>(FACULTY_OPPORTUNITIES);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobOpportunity | null>(null);
  const [activePortfolioStudentId, setActivePortfolioStudentId] = useState<string>('stu-001');
  const [industrySkillNeeds, setIndustrySkillNeeds] = useState<IndustrySkillNeed[]>([
    {
      id: 'need-seed-1',
      submittedBy: 'Himalaya Wellness Company',
      skillDomain: 'Lab & Analytics',
      description: 'Graduates rarely arrive with hands-on GC-MS experience for pesticide-residue screening — most only know classical TLC methods.',
      urgency: 'High',
      submittedAt: '3 days ago'
    },
    {
      id: 'need-seed-2',
      submittedBy: 'Dabur India Ltd.',
      skillDomain: 'Pharmacovigilance',
      description: 'Need more familiarity with structured PvPI case-narrative writing, not just theoretical ADR definitions.',
      urgency: 'Medium',
      submittedAt: '6 days ago'
    }
  ]);

  // Sync state with backend API on initial load
  useEffect(() => {
    let isMounted = true;
    const syncBackend = async () => {
      try {
        const isHealthy = await api.checkHealth();
        if (!isHealthy || !isMounted) return;

        const [profRes, jobsRes, appsRes, roadRes, progRes, facRes, needsRes] = await Promise.allSettled([
          api.getProfile(),
          api.getJobs(),
          api.getApplications(),
          api.getRoadmapItems(),
          api.getLearningPrograms(),
          api.getFacultyOpportunities(),
          api.getIndustrySkillNeeds()
        ]);

        if (isMounted) {
          if (profRes.status === 'fulfilled') setStudentProfile(profRes.value);
          if (jobsRes.status === 'fulfilled') setJobs(jobsRes.value);
          if (appsRes.status === 'fulfilled') setApplications(appsRes.value);
          if (roadRes.status === 'fulfilled') setRoadmapItems(roadRes.value);
          if (progRes.status === 'fulfilled') setLearningPrograms(progRes.value);
          if (facRes.status === 'fulfilled') setFacultyOpportunities(facRes.value);
          // Falls back to the local seed signals (set above) if the backend is unreachable,
          // so the panel still demos something meaningful offline.
          if (needsRes.status === 'fulfilled') setIndustrySkillNeeds(needsRes.value);
        }
      } catch (err) {
        console.warn('Backend sync unavailable, using client dataset:', err);
      }
    };

    syncBackend();
    return () => {
      isMounted = false;
    };
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem('sih_portal_role', newRole);
    addToast({
      title: `Switched Role`,
      message: `Now viewing portal as ${newRole.toUpperCase()}`,
      type: 'info'
    });
  };

  const setPage = (newPage: PageId) => {
    setPageState(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToast = (toast: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const applyToJob = (jobId: string): boolean => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return false;

    // Check if already applied
    const alreadyApplied = applications.some(a => a.jobId === jobId && a.studentId === studentProfile.id);
    if (alreadyApplied) {
      addToast({
        title: 'Already Applied',
        message: `You have an active application for ${job.title} at ${job.company}`,
        type: 'warning'
      });
      return false;
    }

    // Calculate a real, explainable match score from the student's actual assessed skills
    // against this job's required + preferred skills (see src/utils/matching.ts)
    const { fitScore: matchScore } = computeMatch(studentProfile.skills, job);

    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      companyLogo: job.companyLogo,
      studentId: studentProfile.id,
      studentName: studentProfile.name,
      appliedDate: 'Just now',
      status: 'Applied',
      fitScore: matchScore,
      nextStep: 'Application submitted to company HR screening pipeline.'
    };

    setApplications(prev => [newApp, ...prev]);
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, applicantsCount: j.applicantsCount + 1 } : j));

    // Persist to backend
    api.createApplication(job.id, studentProfile.id).catch(err => {
      console.warn('Could not persist application to backend:', err);
    });

    // Fire joyful confetti effect
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    addToast({
      title: 'Application Submitted!',
      message: `Successfully applied to ${job.title} at ${job.company} (Fit Match: ${matchScore}%)`,
      type: 'success'
    });

    return true;
  };

  const enrollInProgram = (programId: string) => {
    const prog = learningPrograms.find(p => p.id === programId);
    if (!prog) return;

    setLearningPrograms(prev => prev.map(p => p.id === programId ? { ...p, enrolledCount: p.enrolledCount + 1 } : p));
    
    // Add to student roadmap as in_progress if not already there
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

    setRoadmapItems(prev => [newRoadmap, ...prev]);

    // Persist to backend
    api.enrollInProgram(programId).catch(err => {
      console.warn('Could not persist enrollment to backend:', err);
    });

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // ignore
    }

    addToast({
      title: 'Enrolled Successfully!',
      message: `You are now enrolled in "${prog.title}". Added to your learning roadmap.`,
      type: 'success'
    });
  };

  const postNewJob = (jobData: Omit<JobOpportunity, 'id' | 'postedDate' | 'applicantsCount'>) => {
    const tempId = `job-${Date.now()}`;
    const newJob: JobOpportunity = {
      ...jobData,
      id: tempId,
      postedDate: 'Just now',
      applicantsCount: 0
    };

    setJobs(prev => [newJob, ...prev]);

    // Persist to backend
    api.createJob(jobData).then(serverJob => {
      setJobs(prev => prev.map(j => j.id === tempId ? serverJob : j));
    }).catch(err => {
      console.warn('Could not persist new job to backend:', err);
    });

    addToast({
      title: 'Opportunity Published',
      message: `"${newJob.title}" is now live for students to discover & apply!`,
      type: 'success'
    });
  };

  const updateApplicationStatus = (appId: string, newStatus: JobApplication['status']) => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: newStatus } : a));
    
    // Persist to backend
    api.updateApplicationStatus(appId, newStatus).catch(err => {
      console.warn('Could not persist status to backend:', err);
    });

    addToast({
      title: 'Status Updated',
      message: `Application moved to "${newStatus}"`,
      type: 'info'
    });
  };

  const submitAssessmentResults = (categoryScores: Record<string, number>) => {
    // Map scores to Radar
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

    setStudentProfile(prev => ({
      ...prev,
      radarScores: updatedRadar,
      overallReadiness: avg,
      completedAssessmentsCount: prev.completedAssessmentsCount + 1,
      verifiedBadges: Array.from(new Set([...prev.verifiedBadges, 'Benchmarked 2026', 'Assessment Verified']))
    }));

    // Persist to backend
    api.submitAssessment(categoryScores).then(res => {
      if (res?.profile) {
        setStudentProfile(res.profile);
      }
    }).catch(err => {
      console.warn('Could not persist assessment to backend:', err);
    });

    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 }
      });
    } catch {
      // ignore
    }

    addToast({
      title: 'Skill Assessment Benchmark Complete!',
      message: `Your skill profile, radar chart, and gap-closing roadmap have been updated.`,
      type: 'success'
    });
  };

  const submitIndustrySkillNeed = (need: Omit<IndustrySkillNeed, 'id' | 'submittedAt'>) => {
    // Optimistic local update so the UI feels instant...
    const optimisticNeed: IndustrySkillNeed = {
      ...need,
      id: `need-${Date.now()}`,
      submittedAt: 'Just now'
    };
    setIndustrySkillNeeds(prev => [optimisticNeed, ...prev]);
    addToast({
      title: 'Skill Need Reported',
      message: `Your signal on "${need.skillDomain}" is now live in the Curriculum Intelligence dashboard for academicians.`,
      type: 'success'
    });

    // ...then persist to the backend so the signal survives a refresh and is visible
    // to every academician/institution viewing the dashboard, not just this browser tab.
    api.submitIndustrySkillNeed(need)
      .then(savedNeed => {
        setIndustrySkillNeeds(prev => prev.map(n => (n.id === optimisticNeed.id ? savedNeed : n)));
      })
      .catch(err => {
        console.warn('Could not persist industry skill signal to backend:', err);
      });
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        page,
        setPage,
        studentProfile,
        setStudentProfile,
        jobs,
        applications,
        roadmapItems,
        learningPrograms,
        facultyOpportunities,
        toasts,
        addToast,
        removeToast,
        applyToJob,
        enrollInProgram,
        postNewJob,
        updateApplicationStatus,
        submitAssessmentResults,
        selectedJobForModal,
        setSelectedJobForModal,
        activePortfolioStudentId,
        setActivePortfolioStudentId,
        industrySkillNeeds,
        submitIndustrySkillNeed
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
