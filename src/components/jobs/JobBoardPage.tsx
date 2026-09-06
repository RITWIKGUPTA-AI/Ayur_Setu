import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { JobOpportunity } from '../../types';
import { 
  Search, 
  Filter, 
  Briefcase, 
  MapPin, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const JobBoardPage: React.FC = () => {
  const { jobs, applyToJob, setSelectedJobForModal, applications } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedWorkplace, setSelectedWorkplace] = useState<string>('All');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string>('All');

  const allSkills = Array.from(
    new Set(jobs.flatMap(j => j.requiredSkills.map(s => s.name)))
  );

  const filteredJobs = jobs.filter(j => {
    const matchesSearch = j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          j.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          j.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || j.type === selectedType;
    const matchesWorkplace = selectedWorkplace === 'All' || j.workplace === selectedWorkplace;
    const matchesSkill = selectedSkillFilter === 'All' || j.requiredSkills.some(s => s.name === selectedSkillFilter);

    return matchesSearch && matchesType && matchesWorkplace && matchesSkill;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in relative z-10">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 border border-slate-200 rounded-xl shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>National Internship & Employment Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950">
              National Internships, Apprenticeships & Live Projects
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Explore openings from verified corporate partners under the National Apprenticeship & Internship Scheme. Each role is benchmarked with competency weights.
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xs text-slate-500 font-medium block">Total Verified Opportunities</span>
            <span className="text-2xl font-extrabold text-blue-900">{jobs.length} Active</span>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by role or company..."
              className="glass-input pl-9 pr-4 py-2 text-xs w-full"
            />
          </div>

          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="glass-input w-full text-xs"
            >
              <option value="All">All Opportunity Types</option>
              <option value="Internship">Internship</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Apprenticeship">Apprenticeship</option>
              <option value="Live Project">Live Project</option>
            </select>
          </div>

          <div>
            <select
              value={selectedWorkplace}
              onChange={(e) => setSelectedWorkplace(e.target.value)}
              className="glass-input w-full text-xs"
            >
              <option value="All">All Workplace Modes</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-Site">On-Site</option>
            </select>
          </div>

          <div>
            <select
              value={selectedSkillFilter}
              onChange={(e) => setSelectedSkillFilter(e.target.value)}
              className="glass-input w-full text-xs"
            >
              <option value="All">Filter by Required Skill</option>
              {allSkills.map((sk, idx) => (
                <option key={idx} value={sk}>{sk}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Opportunity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredJobs.map((job) => {
          const isApplied = applications.some(a => a.jobId === job.id);
          const fitScore = job.id === 'job-1' ? 94 : job.id === 'job-2' ? 88 : job.id === 'job-3' ? 91 : 85;

          return (
            <div 
              key={job.id} 
              className="bg-white p-6 border border-slate-200 rounded-xl shadow-xs hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={job.companyLogo} 
                      alt={job.company} 
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200" 
                    />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {job.type}
                      </span>
                      <h3 
                        onClick={() => setSelectedJobForModal(job)}
                        className="font-bold text-base text-blue-950 hover:text-blue-800 transition-colors cursor-pointer mt-1"
                      >
                        {job.title}
                      </h3>
                      <div className="text-xs text-blue-800 font-semibold">{job.company}</div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {job.requiredSkills.map((sk, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 font-medium">
                      {sk.name}
                    </span>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span>Stipend:</span>
                    <strong className="text-emerald-700 font-bold">{job.stipendOrSalary}</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span>Skill Compatibility:</span>
                    <span className="text-blue-900 font-bold">{fitScore}% Match</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setSelectedJobForModal(job)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200 transition-colors"
                >
                  View Details
                </button>

                <button
                  onClick={() => applyToJob(job.id)}
                  disabled={isApplied}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5 ${
                    isApplied
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 cursor-default'
                      : 'bg-blue-900 hover:bg-blue-800 text-white hover:scale-102'
                  }`}
                >
                  {isApplied ? (
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
  );
};
