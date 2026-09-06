import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SkillRadarChart } from '../assessment/SkillRadarChart';
import { GapAnalysisCard } from '../assessment/GapAnalysisCard';
import { ApplicationTracker } from './ApplicationTracker';
import { LearningRoadmapTab } from './LearningRoadmapTab';
import { 
  GraduationCap, 
  Award, 
  Briefcase, 
  BookOpen, 
  ExternalLink, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp,
  Share2,
  ArrowRight,
  Target
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { studentProfile, setPage, jobs, applyToJob, setSelectedJobForModal, applications } = useApp();
  const [activeTab, setActiveTab] = useState<'skills' | 'jobs' | 'applications' | 'roadmap'>('skills');

  const rankedJobs = [...jobs].map(j => {
    const fit = j.id === 'job-1' ? 94 : j.id === 'job-2' ? 88 : j.id === 'job-3' ? 91 : 82;
    return { ...j, fitScore: fit };
  }).sort((a, b) => b.fitScore - a.fitScore);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in relative z-10">
      {/* Student Welcome Header Card */}
      <div className="bg-white p-6 sm:p-8 border border-slate-200 rounded-xl shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative">
              <img
                src={studentProfile.avatar}
                alt={studentProfile.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-blue-600 shadow-sm"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center text-white" title="Verified Student">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold text-blue-950">{studentProfile.name}</h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 font-semibold">
                  {studentProfile.department}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                  CGPA: {studentProfile.cgpa}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">{studentProfile.headline}</p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <GraduationCap className="w-3.5 h-3.5 text-blue-700" />
                <span>{studentProfile.college} • Batch of 2026</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setPage('assessment')}
              className="px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Retake Assessment</span>
            </button>

            <button
              onClick={() => setPage('portfolio')}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-xs flex items-center gap-2 transition-colors shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5 text-blue-700" />
              <span>Share Digital Portfolio</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium">Overall Readiness Index</div>
            <div className="text-lg font-bold text-blue-900 flex items-center gap-1.5 mt-0.5">
              <span>{studentProfile.overallReadiness}%</span>
              <span className="text-[10px] text-emerald-700 font-semibold">Top 10% Cohort</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium">Active Applications</div>
            <div className="text-lg font-bold text-amber-800 mt-0.5">
              {applications.length} In Review
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium">Verified Credentials</div>
            <div className="text-lg font-bold text-emerald-700 mt-0.5">
              {studentProfile.certifications.length} Verified Badges
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium">Primary Skill Gap</div>
            <div className="text-lg font-bold text-rose-700 mt-0.5 text-xs truncate">
              Lab & Analytical Techniques (-22)
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-slate-200 space-x-1 overflow-x-auto pb-0.5">
        {[
          { id: 'skills', label: 'Skill Profile & Radar Gaps', icon: <Target className="w-4 h-4" /> },
          { id: 'jobs', label: `Matched Internships (${rankedJobs.length})`, icon: <Briefcase className="w-4 h-4" /> },
          { id: 'applications', label: `Application Tracker (${applications.length})`, icon: <TrendingUp className="w-4 h-4" /> },
          { id: 'roadmap', label: 'Personalized Roadmap', icon: <BookOpen className="w-4 h-4" /> },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold rounded-t-xl transition-all whitespace-nowrap border-b-2 ${
                isActive
                  ? 'border-blue-900 text-blue-950 bg-white shadow-2xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Skills & Radar View */}
      {activeTab === 'skills' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6">
              <SkillRadarChart 
                data={studentProfile.radarScores}
                title="Your 6-Axis Competency Profile"
                subtitle="Benchmarked against live national enterprise hiring criteria"
              />
            </div>
            <div className="lg:col-span-6">
              <GapAnalysisCard />
            </div>
          </div>

          {/* Verified Badges & Tech Stack */}
          <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-xs">
            <h3 className="text-sm font-bold text-blue-950 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Verified Skill Endorsements & Assessment Badges</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {studentProfile.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs ${
                    skill.verified 
                      ? 'bg-blue-50 border-blue-200 text-blue-900 font-medium' 
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <span className="font-bold text-slate-800">{skill.name}</span>
                  <span className="text-[10px] text-slate-500">({skill.level}%)</span>
                  {skill.verified && <span title="Verified by Assessment"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /></span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Matched Jobs & Internships */}
      {activeTab === 'jobs' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-blue-950">Recommended National Opportunities</h3>
              <p className="text-xs text-slate-600">Ranked by compatibility with your verified skills and aptitude benchmark</p>
            </div>
            <button
              onClick={() => setPage('jobs')}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-xs font-bold text-slate-800 border border-slate-300 flex items-center gap-1.5 shadow-2xs"
            >
              <span>Search All Postings</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {rankedJobs.map((job) => {
              const alreadyApplied = applications.some(a => a.jobId === job.id);

              return (
                <div 
                  key={job.id} 
                  className="bg-white p-6 border border-slate-200 rounded-xl shadow-xs hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src={job.companyLogo} 
                          alt={job.company} 
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200" 
                        />
                        <div>
                          <h4 className="font-bold text-base text-blue-950 hover:text-blue-800 transition-colors cursor-pointer" onClick={() => setSelectedJobForModal(job)}>
                            {job.title}
                          </h4>
                          <span className="text-xs text-blue-800 font-semibold">{job.company} • {job.location}</span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {job.fitScore}% Fit Match
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 mt-3 leading-relaxed">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {job.requiredSkills.map((sk, i) => (
                        <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 font-medium">
                          {sk.name}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                      <span>Stipend: <strong className="text-emerald-700 font-bold">{job.stipendOrSalary}</strong></span>
                      <span>Type: <strong className="text-amber-800 font-bold">{job.type}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => setSelectedJobForModal(job)}
                      className="flex-1 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => applyToJob(job.id)}
                      disabled={alreadyApplied}
                      className={`flex-1 py-2 rounded-xl font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 ${
                        alreadyApplied
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 cursor-default'
                          : 'bg-blue-900 hover:bg-blue-800 text-white hover:scale-102'
                      }`}
                    >
                      {alreadyApplied ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Applied</span>
                        </>
                      ) : (
                        <>
                          <span>1-Click Apply</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Application Tracker */}
      {activeTab === 'applications' && <ApplicationTracker />}

      {/* Tab 4: Personalized Roadmap */}
      {activeTab === 'roadmap' && <LearningRoadmapTab />}
    </div>
  );
};
