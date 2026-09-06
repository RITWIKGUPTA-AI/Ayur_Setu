import React, { useState } from 'react';
import { GraduationCap, Building2, Briefcase, Sparkles, ArrowRight, CheckCircle, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StakeholderTriad: React.FC = () => {
  const { setRole, setPage } = useApp();
  const [activeNode, setActiveNode] = useState<'student' | 'industry' | 'academician'>('student');

  const nodeDetails = {
    student: {
      title: 'Students & Job Aspirants',
      roleKey: 'student' as const,
      color: 'border-blue-300 text-blue-800 bg-blue-50',
      badge: 'Talent & Skill Acquisition',
      benefits: [
        'Standardized skill benchmark & live gap radar profile',
        'Personalized roadmap with certified AYUSH industry bridge courses',
        'Ranked internships matched directly to verified competencies',
        'Shareable public digital portfolio with employer-verifiable credentials'
      ]
    },
    industry: {
      title: 'Industry & Enterprise Recruiters',
      roleKey: 'industry' as const,
      color: 'border-amber-300 text-amber-800 bg-amber-50',
      badge: 'Talent Acquisition & Upskilling',
      benefits: [
        'Post job & internship requirements with granular skill tag weights',
        'AI Candidate Fit Ranking: zero-friction shortlisting by true competency',
        'Publish Industry Learning Programs & Bootcamps to groom candidates',
        'Directly collaborate with universities on joint R&D and FDPs'
      ]
    },
    academician: {
      title: 'Academicians & Faculty',
      roleKey: 'academician' as const,
      color: 'border-emerald-300 text-emerald-800 bg-emerald-50',
      badge: 'Curriculum Modernization & Research',
      benefits: [
        'Access paid faculty sabbaticals, industrial training & FDPs',
        'Real-time intelligence on emerging industry skill demands vs syllabus',
        'Joint research grants, guest lecture invitations & live capstone challenges',
        'Monitor institutional student cohort readiness & placement trends'
      ]
    }
  };

  return (
    <div className="bg-white p-6 sm:p-10 border border-slate-200 rounded-xl shadow-xs relative overflow-hidden">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>The Tripartite National Framework</span>
        </div>
        <h3 className="text-xl sm:text-3xl font-extrabold text-blue-950">
          One Unified Network. Three Pillars.
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          Click any stakeholder node below to discover how the platform bridges information silos and establishes seamless collaboration.
        </p>
      </div>

      {/* 3 Node Interactive Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Graphic Node Triangle */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-slate-50/80 rounded-2xl border border-slate-200 relative min-h-[360px]">
          {/* Central Connected Core */}
          <div className="w-24 h-24 rounded-full bg-blue-900 p-1 shadow-md flex items-center justify-center z-10">
            <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center text-center p-2 border border-blue-200">
              <Zap className="w-5 h-5 text-amber-600 mb-0.5" />
              <span className="text-[10px] font-extrabold text-blue-950 uppercase tracking-wider">SIH 2026</span>
              <span className="text-[8px] font-bold text-blue-800">Core Engine</span>
            </div>
          </div>

          {/* Node 1: Students (Top) */}
          <button
            onClick={() => setActiveNode('student')}
            className={`absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 p-3 sm:p-4 rounded-xl border flex items-center gap-2.5 transition-all duration-200 z-20 ${
              activeNode === 'student'
                ? 'bg-blue-50 border-blue-500 text-blue-950 shadow-sm scale-102 ring-2 ring-blue-500/20'
                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:text-slate-900'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-blue-950">1. Students</div>
              <div className="text-[10px] text-slate-500">Skill Gaps & Placements</div>
            </div>
          </button>

          {/* Node 2: Industry (Bottom Right) */}
          <button
            onClick={() => setActiveNode('industry')}
            className={`absolute bottom-4 sm:bottom-6 right-4 sm:right-8 p-3 sm:p-4 rounded-xl border flex items-center gap-2.5 transition-all duration-200 z-20 ${
              activeNode === 'industry'
                ? 'bg-amber-50 border-amber-500 text-amber-950 shadow-sm scale-102 ring-2 ring-amber-500/20'
                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:text-slate-900'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-blue-950">2. Industry</div>
              <div className="text-[10px] text-slate-500">Hiring & Training</div>
            </div>
          </button>

          {/* Node 3: Academicians (Bottom Left) */}
          <button
            onClick={() => setActiveNode('academician')}
            className={`absolute bottom-4 sm:bottom-6 left-4 sm:left-8 p-3 sm:p-4 rounded-xl border flex items-center gap-2.5 transition-all duration-200 z-20 ${
              activeNode === 'academician'
                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-sm scale-102 ring-2 ring-emerald-500/20'
                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:text-slate-900'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-blue-950">3. Academicians</div>
              <div className="text-[10px] text-slate-500">Curriculum & FDPs</div>
            </div>
          </button>
        </div>

        {/* Right: Active Stakeholder Insights & Value Proposition */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${nodeDetails[activeNode].color}`}>
              {nodeDetails[activeNode].badge}
            </span>
            <span className="text-xs text-slate-500">Pillar Overview</span>
          </div>

          <h4 className="text-xl font-bold text-blue-950">
            {nodeDetails[activeNode].title}
          </h4>

          <div className="space-y-2.5">
            {nodeDetails[activeNode].benefits.map((b, bIdx) => (
              <div key={bIdx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-medium leading-relaxed">{b}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => {
                setRole(nodeDetails[activeNode].roleKey);
                setPage('dashboard');
              }}
              className="px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow-sm flex items-center gap-2 transition-all"
            >
              <span>Explore {nodeDetails[activeNode].title.split(' ')[0]} Hub</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
