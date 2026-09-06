import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RecruitmentPipelineATS } from './RecruitmentPipelineATS';
import { CandidateRankingView } from './CandidateRankingView';
import { PostJobModal } from './PostJobModal';
import { SkillSignalPanel } from './SkillSignalPanel';
import { 
  Building2, 
  PlusCircle, 
  Users, 
  Briefcase, 
  BookOpen, 
  TrendingUp, 
  ExternalLink,
  ShieldCheck,
  Radio
} from 'lucide-react';

export const IndustryDashboard: React.FC = () => {
  const { jobs, applications, learningPrograms, setPage } = useApp();
  const [activeTab, setActiveTab] = useState<'ats' | 'candidates' | 'postings' | 'programs' | 'signals'>('ats');
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in relative z-10">
      {/* Recruiter Header Card */}
      <div className="bg-white p-6 sm:p-8 border border-slate-200 rounded-xl shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-50 border-2 border-amber-600 p-2 flex items-center justify-center text-amber-800 font-bold text-xl shadow-xs">
              <Building2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold text-blue-950">Dabur India Ltd. Talent Hub</h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 font-bold">
                  Corporate Partner Persona
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                Pharmacovigilance, Quality & Regulatory Early-Career Recruitment Cell
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>Verified Industry Partner • Ministry of AYUSH MoU Signatory #AYU-8842</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Internship / Job</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium">Active Published Openings</div>
            <div className="text-lg font-bold text-blue-950 mt-0.5">{jobs.length} Roles Live</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium">Pre-Filtered Applicants</div>
            <div className="text-lg font-bold text-amber-800 mt-0.5">340+ Candidates</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium">AI Skill Match Accuracy</div>
            <div className="text-lg font-bold text-emerald-700 mt-0.5">94.8% Match Rate</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium">Published Bootcamps</div>
            <div className="text-lg font-bold text-blue-800 mt-0.5">{learningPrograms.length} Courses Active</div>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-slate-200 space-x-1 overflow-x-auto pb-0.5">
        {[
          { id: 'ats', label: `Recruitment Pipeline ATS (${applications.length})`, icon: <TrendingUp className="w-4 h-4" /> },
          { id: 'candidates', label: 'AI Candidate Fit Ranker', icon: <Users className="w-4 h-4" /> },
          { id: 'postings', label: `Published Jobs (${jobs.length})`, icon: <Briefcase className="w-4 h-4" /> },
          { id: 'programs', label: 'Industry Learning Programs', icon: <BookOpen className="w-4 h-4" /> },
          { id: 'signals', label: 'Report Skill Need', icon: <Radio className="w-4 h-4" /> },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold rounded-t-xl transition-all whitespace-nowrap border-b-2 ${
                isActive
                  ? 'border-amber-600 text-amber-950 bg-white shadow-2xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: ATS Pipeline */}
      {activeTab === 'ats' && <RecruitmentPipelineATS />}

      {/* Tab 2: Candidates */}
      {activeTab === 'candidates' && <CandidateRankingView />}

      {/* Tab 3: Postings */}
      {activeTab === 'postings' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-blue-950">Your Active Job & Internship Postings</h3>
              <p className="text-xs text-slate-500">Manage live listings, review verified applicants, and update skill weights</p>
            </div>
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Create New Posting</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white p-6 border border-slate-200 rounded-xl shadow-xs space-y-4 hover:border-slate-300 transition-all">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {job.type}
                    </span>
                    <h4 className="text-base font-bold text-blue-950 mt-1.5">{job.title}</h4>
                    <span className="text-xs text-slate-600 font-medium">{job.location} • {job.workplace}</span>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-bold">
                    {job.applicantsCount} Applicants
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {job.requiredSkills.map((sk, idx) => (
                    <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-slate-50 text-blue-900 border border-slate-200 font-medium">
                      {sk.name} ({sk.weight}%)
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-600">Stipend: <strong className="text-slate-900 font-bold">{job.stipendOrSalary}</strong></span>
                  <button
                    onClick={() => setActiveTab('ats')}
                    className="text-amber-800 hover:text-amber-900 font-bold flex items-center gap-1"
                  >
                    <span>View in ATS Pipeline</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Learning Programs */}
      {activeTab === 'programs' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-blue-950">Your Published Industry Upskilling Bootcamps</h3>
              <p className="text-xs text-slate-500">
                Train pre-final and final year candidates on your proprietary tech stack before interview rounds
              </p>
            </div>
            <button
              onClick={() => setPage('learning')}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-300 flex items-center gap-1 shadow-2xs"
            >
              <span>View Public Marketplace</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {learningPrograms.map((prog) => (
              <div key={prog.id} className="bg-white p-6 border border-slate-200 rounded-xl shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-bold text-base text-blue-950">{prog.title}</h4>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                    {prog.enrolledCount} Enrolled
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{prog.description}</p>
                <div className="flex flex-wrap gap-1">
                  {prog.skillsTaught.map((s, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-50 text-blue-900 border border-slate-200 font-mono">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Live Skill Signal Reporting */}
      {activeTab === 'signals' && <SkillSignalPanel />}

      {/* Modal to Post Opening */}
      <PostJobModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
      />
    </div>
  );
};
