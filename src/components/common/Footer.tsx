import React from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, Building2, Briefcase, ShieldCheck, Heart, Github, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setPage, setRole } = useApp();

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs mt-20 relative z-10 shadow-sm">
      {/* Tricolor accent bar */}
      <div className="gov-tricolor-strip" />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Col 1: Brand & Ministry */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5 text-blue-950 font-bold text-base">
            <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center shadow-xs">
              <GraduationCap className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="block leading-tight text-base font-bold">Ayur<span className="text-amber-600">Setu</span> Portal</span>
              <span className="text-[10px] text-slate-500 font-normal">Academia–Industry Platform • Ministry of AYUSH Initiative • SIH 2026</span>
            </div>
          </div>
          <p className="text-slate-600 leading-relaxed text-xs max-w-sm">
            AyurSetu bridges the critical skills gap between university curriculum and real-world industry requirements. 
            A centralized digital public infrastructure connecting students, faculty, and enterprise recruiters across India.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-50 border border-slate-200 text-[11px] text-slate-700 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>Smart India Hackathon (SIH 2026) Official Solution</span>
          </div>
        </div>

        {/* Col 2: For Students */}
        <div className="space-y-2.5">
          <h4 className="font-bold text-blue-950 text-sm flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-blue-700" /> For Students
          </h4>
          <ul className="space-y-1.5 text-xs">
            <li>
              <button onClick={() => { setRole('student'); setPage('assessment'); }} className="hover:text-blue-900 transition-colors">
                Skill Assessment Engine
              </button>
            </li>
            <li>
              <button onClick={() => { setRole('student'); setPage('jobs'); }} className="hover:text-blue-900 transition-colors">
                National Internship Board
              </button>
            </li>
            <li>
              <button onClick={() => { setRole('student'); setPage('learning'); }} className="hover:text-blue-900 transition-colors">
                Gap-Closing Certifications
              </button>
            </li>
            <li>
              <button onClick={() => { setRole('student'); setPage('portfolio'); }} className="hover:text-blue-900 transition-colors">
                Verified Digital Portfolio
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: For Industry & Academicians */}
        <div className="space-y-2.5">
          <h4 className="font-bold text-blue-950 text-sm flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-amber-700" /> Industry & Faculty
          </h4>
          <ul className="space-y-1.5 text-xs">
            <li>
              <button onClick={() => { setRole('industry'); setPage('dashboard'); }} className="hover:text-blue-900 transition-colors">
                Post Openings & Skill Tags
              </button>
            </li>
            <li>
              <button onClick={() => { setRole('industry'); setPage('dashboard'); }} className="hover:text-blue-900 transition-colors">
                AI Candidate Fit Ranking
              </button>
            </li>
            <li>
              <button onClick={() => { setRole('academician'); setPage('dashboard'); }} className="hover:text-blue-900 transition-colors">
                Faculty Sabbaticals & FDPs
              </button>
            </li>
            <li>
              <button onClick={() => { setRole('academician'); setPage('dashboard'); }} className="hover:text-blue-900 transition-colors">
                Curriculum Skill Heatmaps
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Institution & Admin */}
        <div className="space-y-2.5">
          <h4 className="font-bold text-blue-950 text-sm flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-purple-700" /> Institute Admin
          </h4>
          <ul className="space-y-1.5 text-xs">
            <li>
              <button onClick={() => { setRole('institution'); setPage('dashboard'); }} className="hover:text-blue-900 transition-colors">
                Cohort Readiness Analytics
              </button>
            </li>
            <li>
              <button onClick={() => { setRole('institution'); setPage('dashboard'); }} className="hover:text-blue-900 transition-colors">
                Verified Credential Vault
              </button>
            </li>
            <li>
              <button onClick={() => { setRole('institution'); setPage('analytics'); }} className="hover:text-blue-900 transition-colors">
                Placement & NAAC Reports
              </button>
            </li>
            <li>
              <button onClick={() => { setRole('institution'); setPage('dashboard'); }} className="hover:text-blue-900 transition-colors">
                MoU & Partner Approvals
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px] bg-slate-50">
        <div>
          © 2026 Government of India • Ministry of AYUSH & AIIA • Smart India Hackathon.
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-700 font-medium">One Platform. Three Stakeholders. Zero Skill Gaps.</span>
        </div>
      </div>
    </footer>
  );
};
