import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Building2, MapPin, Calendar, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { JobOpportunity } from '../../types';

export const JobDetailModal: React.FC = () => {
  const { selectedJobForModal, setSelectedJobForModal, applyToJob, applications } = useApp();

  if (!selectedJobForModal) return null;

  const job = selectedJobForModal;
  const isApplied = applications.some(a => a.jobId === job.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white max-w-3xl w-full p-6 sm:p-8 border border-slate-300 rounded-xl shadow-xl max-h-[90vh] overflow-y-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200">
          <div className="flex items-start gap-4">
            <img src={job.companyLogo} alt={job.company} className="w-14 h-14 rounded-2xl object-cover border border-slate-200" />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-extrabold text-blue-950">{job.title}</h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200 font-bold">
                  {job.type}
                </span>
              </div>
              <div className="text-sm text-blue-800 font-semibold mt-0.5">{job.company}</div>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                <span>Location: <strong className="text-slate-800">{job.location}</strong></span>
                <span>•</span>
                <span>Workplace: <strong className="text-slate-800">{job.workplace}</strong></span>
              </div>
            </div>
          </div>

          <button onClick={() => setSelectedJobForModal(null)} className="text-slate-400 hover:text-slate-700 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <div>
            <span className="text-slate-500 block text-[11px] font-medium">Stipend / CTC</span>
            <strong className="text-emerald-700 text-sm font-bold">{job.stipendOrSalary}</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px] font-medium">Duration</span>
            <strong className="text-slate-900 text-sm font-bold">{job.duration || 'Full-time'}</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px] font-medium">Application Deadline</span>
            <strong className="text-amber-800 text-sm font-bold">{job.deadline}</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px] font-medium">Verified Applicants</span>
            <strong className="text-blue-900 text-sm font-bold">{job.applicantsCount} Candidates</strong>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-sm font-bold text-blue-950 mb-2">Role Overview & Outcomes</h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Key Responsibilities */}
        {job.responsibilities && (
          <div>
            <h4 className="text-sm font-bold text-blue-950 mb-2">Key Responsibilities</h4>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {job.responsibilities.map((r, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-800 font-bold">•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Required Skills & Weightages */}
        <div>
          <h4 className="text-sm font-bold text-blue-950 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Required Skill Competencies (National Standard Benchmarks)</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {job.requiredSkills.map((sk, idx) => (
              <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-blue-950 font-medium">
                {sk.name} <strong className="text-amber-800">({sk.weight}% fit weight)</strong>
              </span>
            ))}
          </div>
        </div>

        {/* Eligibility */}
        <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-slate-700">
          <span className="text-blue-950 font-bold block text-[11px]">Eligibility Criteria:</span>
          {job.eligibility}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <button
            onClick={() => setSelectedJobForModal(null)}
            className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800"
          >
            Close
          </button>

          <button
            onClick={() => {
              applyToJob(job.id);
            }}
            disabled={isApplied}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-2 ${
              isApplied
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 cursor-default'
                : 'bg-blue-900 hover:bg-blue-800 text-white hover:scale-102'
            }`}
          >
            {isApplied ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Application Submitted</span>
              </>
            ) : (
              <>
                <span>Submit 1-Click Application</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
