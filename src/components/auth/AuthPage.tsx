import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  GraduationCap, 
  Building2, 
  Briefcase, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Lock,
  Zap
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { setRole, setPage, addToast } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState('sakshi.sharma@tech.edu.in');
  const [password, setPassword] = useState('••••••••••••');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedRole);
    setPage('dashboard');
    addToast({
      title: `Authenticated as ${selectedRole.toUpperCase()}`,
      message: `Welcome back to the AyurSetu Portal.`,
      type: 'success'
    });
  };

  const handleQuickDemoLogin = (roleKey: UserRole) => {
    setRole(roleKey);
    setPage('dashboard');
    addToast({
      title: `1-Click Demo Login: ${roleKey.toUpperCase()}`,
      message: `Loaded realistic pre-populated stakeholder state for SIH presentation.`,
      type: 'info'
    });
  };

  const roleOptions: { id: UserRole; title: string; desc: string; icon: React.ReactNode; color: string }[] = [
    {
      id: 'student',
      title: 'Student / Aspirant',
      desc: 'Take skill assessments, track gap roadmaps, and apply to internships',
      icon: <GraduationCap className="w-5 h-5 text-blue-800" />,
      color: 'border-blue-300 text-blue-950 bg-blue-50/70'
    },
    {
      id: 'academician',
      title: 'Faculty / Academician',
      desc: 'Access FDPs, research grants, and monitor cohort skill metrics',
      icon: <Briefcase className="w-5 h-5 text-emerald-800" />,
      color: 'border-emerald-300 text-emerald-950 bg-emerald-50/70'
    },
    {
      id: 'industry',
      title: 'Industry / Recruiter',
      desc: 'Post opportunities, rank applicants by skill-fit, and publish bootcamps',
      icon: <Building2 className="w-5 h-5 text-amber-800" />,
      color: 'border-amber-300 text-amber-950 bg-amber-50/70'
    },
    {
      id: 'institution',
      title: 'Institution Admin',
      desc: 'University-wide readiness heatmaps, document vault & partner approvals',
      icon: <ShieldCheck className="w-5 h-5 text-purple-800" />,
      color: 'border-purple-300 text-purple-950 bg-purple-50/70'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 animate-in fade-in relative z-10">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>National Single Sign-On (SSO) Portal</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950">
          {isSignUp ? 'Register Institutional Persona' : 'Sign In to AyurSetu Portal'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          Select your institutional persona to access verified stakeholder services
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white p-6 sm:p-8 border border-slate-200 rounded-xl shadow-xs space-y-6 max-w-2xl mx-auto">
        {/* Step 1: Role Selector Grid */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2.5">
            Select Your Role Persona:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {roleOptions.map((r) => {
              const isSelected = selectedRole === r.id;
              return (
                <div
                  key={r.id}
                  onClick={() => setSelectedRole(r.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 flex items-start gap-3 ${
                    isSelected
                      ? `${r.color} ring-2 ring-blue-700/20 shadow-xs`
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-white border border-slate-200 shrink-0 shadow-2xs">
                    {r.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-blue-950">{r.title}</div>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{r.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleAuth} className="space-y-4 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Institutional / Corporate Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-input w-full text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input w-full text-xs"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all hover:scale-101"
          >
            <span>{isSignUp ? 'Register Persona Account' : 'Enter Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-Click Instant Demo Login (Hackathon Judges) */}
        <div className="pt-4 border-t border-slate-100 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>SIH 2026 Judge 1-Click Persona Access:</span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => handleQuickDemoLogin('student')}
              className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-[11px] font-bold text-center transition-colors shadow-2xs"
            >
              Sakshi (Student)
            </button>
            <button
              onClick={() => handleQuickDemoLogin('academician')}
              className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-[11px] font-bold text-center transition-colors shadow-2xs"
            >
              Dr. Shalini (Faculty)
            </button>
            <button
              onClick={() => handleQuickDemoLogin('industry')}
              className="p-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-[11px] font-bold text-center transition-colors shadow-2xs"
            >
              Cisco (Recruiter)
            </button>
            <button
              onClick={() => handleQuickDemoLogin('institution')}
              className="p-2 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-[11px] font-bold text-center transition-colors shadow-2xs"
            >
              NIT (Admin)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
