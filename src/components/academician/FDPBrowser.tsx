import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FacultyOpportunity } from '../../types';
import { 
  Briefcase, 
  Award, 
  Calendar, 
  Building2, 
  MapPin, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const FDPBrowser: React.FC = () => {
  const { facultyOpportunities, addToast } = useApp();
  const [selectedType, setSelectedType] = useState<string>('All');
  const [appliedIds, setAppliedIds] = useState<string[]>([]);

  const handleApply = (item: FacultyOpportunity) => {
    if (appliedIds.includes(item.id)) return;

    setAppliedIds(prev => [...prev, item.id]);
    addToast({
      title: 'Nomination Submitted Successfully!',
      message: `Your application for "${item.title}" has been forwarded to ${item.hostCompany}.`,
      type: 'success'
    });
  };

  const filtered = selectedType === 'All' 
    ? facultyOpportunities 
    : facultyOpportunities.filter(o => o.type === selectedType);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-blue-950 flex items-center gap-2">
            <span>Faculty Sabbaticals, FDPs & Sponsored Grants</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
              {facultyOpportunities.length} Active Grants
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Industry immersion programs and R&D funding for engineering & science faculty
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {['All', 'Faculty Internship', 'FDP', 'Research Grant'].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedType === t
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((op) => {
          const isApplied = appliedIds.includes(op.id);

          return (
            <div 
              key={op.id}
              className="bg-white p-6 border border-slate-200 rounded-xl shadow-xs hover:shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                    {op.type}
                  </span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                    <Users className="w-3.5 h-3.5" />
                    <span>{op.applicantsCount} applied</span>
                  </span>
                </div>

                <h4 className="font-bold text-base text-blue-950 leading-snug">{op.title}</h4>
                <div className="text-xs text-blue-800 font-semibold mt-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{op.hostCompany}</span>
                </div>

                <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                  {op.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Stipend / Research Budget:</span>
                    <strong className="text-emerald-700 font-bold">{op.stipendOrGrant}</strong>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Duration:</span>
                    <span className="text-slate-800 font-medium">{op.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Location:</span>
                    <span className="text-slate-800 font-medium">{op.location}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleApply(op)}
                  disabled={isApplied}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold shadow-2xs transition-all flex items-center justify-center gap-2 ${
                    isApplied
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 cursor-default'
                      : 'bg-emerald-800 hover:bg-emerald-700 text-white hover:scale-102'
                  }`}
                >
                  {isApplied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Nomination Submitted</span>
                    </>
                  ) : (
                    <>
                      <span>Apply for Program / Grant</span>
                      <ArrowRight className="w-4 h-4" />
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
