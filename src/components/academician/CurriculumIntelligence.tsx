import React from 'react';
import { CURRICULUM_SKILL_INSIGHTS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { TrendingUp, AlertTriangle, CheckCircle2, Sparkles, BookOpen, ArrowUpRight, Radio, Clock } from 'lucide-react';

export const CurriculumIntelligence: React.FC = () => {
  const { industrySkillNeeds } = useApp();
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Curriculum Modernization Engine</span>
            </div>
            <h3 className="text-xl font-bold text-blue-950">
              Industry Demand vs AYUSH Syllabus Alignment
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              Intelligence built from AYUSH industry job postings and live employer signals to identify outdated syllabus coverage and recommend NEP 2020-aligned experiential modules, mapped to the AYUSH Skill Ontology.
            </p>
          </div>
          <div className="shrink-0 text-right">
            <span className="text-[11px] text-slate-500 block font-medium">Active Curriculum Gap</span>
            <span className="text-2xl font-extrabold text-amber-800">42.7%</span>
          </div>
        </div>
      </div>

      {/* Live Industry Signals — the closed-loop feedback feature */}
      {industrySkillNeeds.length > 0 && (
        <div className="bg-white p-6 border border-amber-200 rounded-xl shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Radio className="w-4 h-4 text-amber-700" />
            <h4 className="text-sm font-bold text-blue-950">Live Industry Signals</h4>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold">
              {industrySkillNeeds.length} new
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-3">Reported directly by hiring partners from what they see in real applicants — not a static report.</p>
          <div className="space-y-2">
            {industrySkillNeeds.map(need => (
              <div key={need.id} className="flex items-start justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-xs font-bold text-blue-950">{need.skillDomain}</span>
                  <p className="text-[11px] text-slate-600 mt-0.5">{need.description}</p>
                  <span className="text-[10px] text-slate-400 font-medium">— {need.submittedBy}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 shrink-0">
                  <Clock className="w-3 h-3" />
                  <span>{need.submittedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid of Domain Intelligence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {CURRICULUM_SKILL_INSIGHTS.map((item, idx) => {
          const isHighGap = item.gapSeverity === 'High';

          return (
            <div 
              key={idx} 
              className="bg-white p-6 border border-slate-200 rounded-xl shadow-xs space-y-4 hover:border-slate-300 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs font-semibold text-slate-500">AYUSH Skill Domain:</span>
                  <h4 className="text-base font-bold text-blue-950">{item.domain}</h4>
                </div>
                <span className={`px-2.5 py-1 rounded-full border text-xs font-bold ${
                  isHighGap 
                    ? 'bg-rose-50 text-rose-800 border-rose-200' 
                    : 'bg-amber-50 text-amber-900 border-amber-200'
                }`}>
                  {item.gapSeverity} Gap Severity
                </span>
              </div>

              {/* Progress comparison */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Industry Demand Surge:</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> +{item.industryDemandGrowth}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Current Academic Syllabus Coverage:</span>
                  <span className="text-slate-900 font-bold">{item.academicCoverageScore}/100</span>
                </div>

                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-600 to-blue-700"
                    style={{ width: `${item.academicCoverageScore}%` }}
                  />
                </div>
              </div>

              {/* Technologies to Introduce */}
              <div>
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                  In-Demand Technologies Missing from Traditional Labs:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {item.inDemandTechnologies.map((tech, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-2.5 py-1 rounded-lg bg-slate-50 text-blue-900 border border-slate-200 text-xs font-mono font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actionable Recommendations for Faculty */}
              <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 text-xs space-y-1.5">
                <div className="text-blue-950 font-bold flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-800" />
                  <span>Actionable Syllabus Revision Recommendation:</span>
                </div>
                <ul className="space-y-1 text-slate-700 text-[11px]">
                  {item.suggestedCurriculumModules.map((mod, mIdx) => (
                    <li key={mIdx} className="flex items-start gap-2">
                      <span className="text-blue-800 font-bold">•</span>
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
