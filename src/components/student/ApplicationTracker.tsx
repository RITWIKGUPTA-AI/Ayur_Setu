import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { JobApplication } from '../../types';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  Calendar, 
  ArrowRight, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const ApplicationTracker: React.FC = () => {
  const { applications, setPage, setSelectedJobForModal, jobs } = useApp();
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const stages: JobApplication['status'][] = [
    'Applied',
    'Shortlisted',
    'Technical Round',
    'Interview',
    'Offered'
  ];

  const getStatusColor = (status: JobApplication['status']) => {
    switch (status) {
      case 'Applied': return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Shortlisted': return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'Technical Round': return 'bg-amber-50 text-amber-900 border-amber-200';
      case 'Interview': return 'bg-cyan-50 text-cyan-900 border-cyan-200';
      case 'Offered': return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Rejected': return 'bg-rose-50 text-rose-800 border-rose-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const filteredApps = activeFilter === 'All' 
    ? applications 
    : applications.filter(a => a.status === activeFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-blue-950 flex items-center gap-2">
            <span>Internship & Job Application Pipeline</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200 font-semibold">
              {applications.length} Active
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time status tracking and interview schedule updates from verified partner recruiters
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {['All', 'Applied', 'Shortlisted', 'Technical Round', 'Interview', 'Offered'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeFilter === f
                  ? 'bg-blue-900 text-white shadow-2xs'
                  : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Stage Flow Stepper for Top Application */}
      {applications.length > 0 && (
        <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-xs">
          <div className="text-xs font-semibold text-slate-700 mb-3 flex items-center justify-between">
            <span>Latest Application: <strong className="text-blue-950 font-bold">{applications[0].jobTitle}</strong> at <strong className="text-blue-800 font-bold">{applications[0].company}</strong></span>
            <span className="text-emerald-700 text-[11px] font-bold">Fit Score: {applications[0].fitScore}% Match</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
            {stages.map((stg, sIdx) => {
              const currentStageIndex = stages.indexOf(applications[0].status);
              const isPast = sIdx < currentStageIndex;
              const isCurrent = sIdx === currentStageIndex;

              return (
                <div 
                  key={stg} 
                  className={`p-3 rounded-xl border text-center transition-all ${
                    isCurrent 
                      ? 'bg-blue-50 border-blue-600 text-blue-950 ring-1 ring-blue-600 shadow-2xs'
                      : isPast 
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider mb-0.5">Stage {sIdx + 1}</div>
                  <div className="text-xs font-bold">{stg}</div>
                  {isCurrent && <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-700 mt-1" />}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Application Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredApps.map((app) => {
          return (
            <div 
              key={app.id} 
              className="bg-white p-5 border border-slate-200 rounded-xl shadow-xs hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 p-1 border border-slate-200 overflow-hidden shrink-0">
                    <img src={app.companyLogo} alt={app.company} className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <span className={`px-2.5 py-1 rounded-full border text-[11px] font-bold ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-blue-950 leading-snug">{app.jobTitle}</h4>
                <div className="text-xs text-blue-800 font-semibold mt-0.5">{app.company}</div>

                <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span>Applied Date:</span>
                    <span className="text-slate-800 font-medium">{app.appliedDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span>Skill Compatibility:</span>
                    <span className="text-emerald-700 font-bold">{app.fitScore}% Match</span>
                  </div>
                </div>

                {app.nextStep && (
                  <div className="mt-3 p-2.5 rounded-lg bg-blue-50/60 border border-blue-100 text-[11px] text-slate-700">
                    <span className="text-blue-900 font-bold block text-[10px] uppercase">Next Step:</span>
                    {app.nextStep}
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    const matchedJob = jobs.find(j => j.id === app.jobId);
                    if (matchedJob) setSelectedJobForModal(matchedJob);
                  }}
                  className="w-full py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>View Original Job Posting</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
