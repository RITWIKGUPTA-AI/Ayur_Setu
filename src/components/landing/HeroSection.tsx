import React from 'react';
import { useApp } from '../../context/AppContext';
import { StakeholderTriad } from './StakeholderTriad';
import { QuickGapDemo } from './QuickGapDemo';
import {
  GraduationCap,
  Building2,
  Briefcase,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Zap,
  Target,
  Shield,
  LineChart
} from 'lucide-react';
import { UserRole } from '../../types';

export const HeroSection: React.FC = () => {
  const { setRole, setPage } = useApp();

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setPage('dashboard');
  };

  return (
    <div className="space-y-16 py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Hero Header */}
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center pt-4 sm:pt-8">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-900">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>National skill intelligence network · SIH 2026</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-blue-950 leading-[1.08]">
            Turn learning into <span className="text-amber-700">proof.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-700 max-w-2xl leading-relaxed">
            AyurSetu connects student capability, industry demand, and academic action in one trusted workflow. Find the gap, close it, and show employers what you can do.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => {
              setRole('student');
              setPage('assessment');
            }}
            className="px-6 py-3.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm shadow-md flex items-center gap-2.5 transition-all hover:-translate-y-0.5"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Launch Skill Assessment Engine</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setPage('jobs')}
            className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-sm flex items-center gap-2 transition-all shadow-xs"
          >
            <Briefcase className="w-4 h-4 text-amber-600" />
            <span>Browse National Internship Board</span>
          </button>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 text-xs font-semibold text-slate-500">
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-700" /> Verified credentials</span>
            <span className="inline-flex items-center gap-1.5"><Target className="w-4 h-4 text-amber-700" /> Industry benchmarks</span>
            <span className="inline-flex items-center gap-1.5"><LineChart className="w-4 h-4 text-blue-700" /> Live readiness score</span>
          </div>
        </div>

        <div className="relative rounded-[2rem] bg-blue-950 p-5 sm:p-7 shadow-xl overflow-hidden">
          <div className="absolute -right-20 -top-20 w-56 h-56 rounded-full border-[24px] border-amber-400/20" />
          <div className="absolute -left-16 -bottom-20 w-48 h-48 rounded-full border-[18px] border-emerald-400/15" />
          <div className="relative space-y-5">
            <div className="flex items-center justify-between text-xs text-blue-100">
              <span className="font-semibold tracking-wide">STUDENT READINESS SNAPSHOT</span>
              <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-emerald-200">Updated today</span>
            </div>
            <div className="flex items-end gap-4">
              <div className="text-6xl font-extrabold text-white leading-none">72</div>
              <div className="pb-1 text-sm text-blue-200">/ 100<br /><span className="text-emerald-300 font-semibold">+14 this month</span></div>
            </div>
            <div className="h-2 rounded-full bg-blue-900 overflow-hidden"><div className="h-full w-[72%] rounded-full bg-gradient-to-r from-amber-400 to-emerald-400" /></div>
            <div className="grid grid-cols-2 gap-3">
              {['Cloud systems', 'Data fluency', 'Problem solving', 'Communication'].map((skill, index) => (
                <div key={skill} className="rounded-xl bg-white/10 border border-white/10 p-3">
                  <div className="flex items-center justify-between text-[11px] text-blue-100"><span>{skill}</span><span className="font-bold text-white">{[78, 64, 81, 66][index]}%</span></div>
                  <div className="h-1 mt-2 rounded-full bg-blue-900"><div className="h-full rounded-full bg-amber-400" style={{ width: `${[78, 64, 81, 66][index]}%` }} /></div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 border-t border-white/10 pt-4 text-xs text-blue-100"><Shield className="w-4 h-4 text-emerald-300" /> Matched to 128 verified internship opportunities</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 text-left">
        {[['84.6%', 'Placement readiness'], ['5,000+', 'Assessed profiles'], ['350+', 'Partner enterprises'], ['-68.4%', 'Gap reduction index']].map(([value, label]) => (
          <div key={label} className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs"><div className="text-2xl font-extrabold text-blue-950">{value}</div><div className="text-xs text-slate-600 font-medium mt-0.5">{label}</div></div>
        ))}
      </div>

      {/* 4 Role-Based Entry Points */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-950">
            Dedicated Stakeholder Dashboards
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Official government modules tailored for each key stakeholder
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Student */}
          <div 
            onClick={() => handleRoleSelect('student')}
            className="bg-white p-6 cursor-pointer group flex flex-col justify-between border border-slate-200 rounded-xl shadow-xs hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Pillar 1
              </span>
              <h3 className="text-lg font-bold text-blue-950 mt-2 group-hover:text-blue-700 transition-colors">
                Students
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Complete assessments, benchmark skills against industry baselines, follow learning roadmaps, and apply to top internships.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-800">
              <span>Access Student Hub</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Faculty */}
          <div 
            onClick={() => handleRoleSelect('academician')}
            className="bg-white p-6 cursor-pointer group flex flex-col justify-between border border-slate-200 rounded-xl shadow-xs hover:border-emerald-500 hover:shadow-md transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Briefcase className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Pillar 2
              </span>
              <h3 className="text-lg font-bold text-blue-950 mt-2 group-hover:text-emerald-700 transition-colors">
                Faculty / Academicians
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Discover industry sabbaticals, AYUSH-funded FDPs, research grants, and align university syllabus to AYUSH industry trends.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>Access Faculty Hub</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Industry */}
          <div 
            onClick={() => handleRoleSelect('industry')}
            className="bg-white p-6 cursor-pointer group flex flex-col justify-between border border-slate-200 rounded-xl shadow-xs hover:border-amber-500 hover:shadow-md transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Pillar 3
              </span>
              <h3 className="text-lg font-bold text-blue-950 mt-2 group-hover:text-amber-700 transition-colors">
                Industry & Recruiters
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Post internships with skill weightages, shortlist candidates with AI compatibility scoring, and sponsor joint R&D.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-800">
              <span>Access Industry Hub</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Institution Admin */}
          <div 
            onClick={() => handleRoleSelect('institution')}
            className="bg-white p-6 cursor-pointer group flex flex-col justify-between border border-slate-200 rounded-xl shadow-xs hover:border-purple-500 hover:shadow-md transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 text-purple-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                Pillar 4
              </span>
              <h3 className="text-lg font-bold text-blue-950 mt-2 group-hover:text-purple-700 transition-colors">
                Institution Admins
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Monitor university-wide department skill gap heatmaps, issue verified NOC credentials, and export NAAC/NBA compliance reports.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-800">
              <span>Access Admin Hub</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive 3-Stakeholder Visual Motif */}
      <StakeholderTriad />

      {/* Hero Centerpiece: Quick Interactive Gap Simulator */}
      <QuickGapDemo />

      {/* Problem vs Solution Comparison Matrix */}
      <div className="bg-white p-6 sm:p-8 border border-slate-200 rounded-xl shadow-xs">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">National Impact Framework</span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-blue-950 mt-1">
            Bridging the Academic–Industry Divide
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Legacy Challenges */}
          <div className="p-6 rounded-xl bg-rose-50/70 border border-rose-200 space-y-3">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
              <XCircle className="w-5 h-5 text-rose-600" />
              <span>Traditional Siloed System (The Problem)</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>Students guess what skills to learn without standardized industry benchmarks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>Recruiters spend months filtering thousands of resumes with unverified claims.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>Colleges teach static syllabi without visibility into fast-changing enterprise frameworks.</span>
              </li>
            </ul>
          </div>

          {/* Unified Solution */}
          <div className="p-6 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>AyurSetu Unified Platform (The Solution)</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">•</span>
                <span>AI benchmarked assessments auto-generate 6-axis radar gap profiles & bridge pathways.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">•</span>
                <span>Recruiters access pre-ranked candidate pools scored on real verified technical aptitude.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">•</span>
                <span>Faculty leverage real-time industry demand heatmaps to modernize curriculum with NEP 2020.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
