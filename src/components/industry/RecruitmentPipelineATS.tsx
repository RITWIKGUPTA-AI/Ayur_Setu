import React from 'react';
import { useApp } from '../../context/AppContext';
import { JobApplication } from '../../types';
import { 
  Users, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Award, 
  ArrowRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const RecruitmentPipelineATS: React.FC = () => {
  const { applications, updateApplicationStatus, setPage } = useApp();

  const columns: { status: JobApplication['status']; label: string; color: string }[] = [
    { status: 'Applied', label: 'Screening / Applied', color: 'border-blue-200 text-blue-900 bg-blue-50/50' },
    { status: 'Shortlisted', label: 'Shortlisted (AI Match)', color: 'border-purple-200 text-purple-900 bg-purple-50/50' },
    { status: 'Technical Round', label: 'Technical Assessment', color: 'border-amber-200 text-amber-900 bg-amber-50/50' },
    { status: 'Interview', label: 'Managerial Interview', color: 'border-cyan-200 text-cyan-900 bg-cyan-50/50' },
    { status: 'Offered', label: 'Offer Extended', color: 'border-emerald-200 text-emerald-900 bg-emerald-50/50' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-blue-950 flex items-center gap-2">
            <span>National Recruiter ATS Pipeline (Applicant Tracking System)</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 font-bold">
              {applications.length} Candidates in Pipeline
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Advance verified candidates through stages with real-time institutional status sync
          </p>
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {columns.map((col) => {
          const colApps = applications.filter(a => a.status === col.status);

          return (
            <div 
              key={col.status} 
              className={`rounded-xl border p-3 flex flex-col justify-between min-w-[240px] ${col.color}`}
            >
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200/80">
                  <span className="font-bold text-xs text-blue-950">{col.label}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-white font-bold text-slate-700 border border-slate-200 shadow-2xs">
                    {colApps.length}
                  </span>
                </div>

                <div className="space-y-3 min-h-[180px]">
                  {colApps.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-400 italic">
                      No candidates in this stage
                    </div>
                  ) : (
                    colApps.map((app) => (
                      <div 
                        key={app.id}
                        className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-sm transition-all space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="font-bold text-xs text-blue-950 leading-tight">{app.studentName}</h5>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                            {app.fitScore}% Fit
                          </span>
                        </div>

                        <div className="text-[11px] text-blue-800 font-semibold truncate">
                          {app.jobTitle}
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                          <span>Applied: {app.appliedDate}</span>
                          <button
                            onClick={() => setPage('portfolio')}
                            className="text-blue-700 hover:text-blue-900 font-bold flex items-center gap-0.5"
                          >
                            <span>Portfolio</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </button>
                        </div>

                        {/* Action buttons to advance status */}
                        <div className="pt-2 flex items-center gap-1">
                          {col.status !== 'Offered' && (
                            <button
                              onClick={() => {
                                const nextIndex = columns.findIndex(c => c.status === col.status) + 1;
                                if (nextIndex < columns.length) {
                                  updateApplicationStatus(app.id, columns[nextIndex].status);
                                }
                              }}
                              className="w-full py-1 rounded-md bg-slate-50 hover:bg-slate-100 text-[10px] font-bold text-slate-800 border border-slate-300 flex items-center justify-center gap-1 transition-colors shadow-2xs"
                            >
                              <span>Advance Stage</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          )}
                          {col.status === 'Offered' && (
                            <span className="w-full py-1 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold text-center border border-emerald-200">
                              Offer Extended
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
