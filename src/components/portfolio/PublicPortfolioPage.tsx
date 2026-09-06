import React from 'react';
import { useApp } from '../../context/AppContext';
import { SkillRadarChart } from '../assessment/SkillRadarChart';
import { 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  Github, 
  Linkedin, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Share2, 
  Download, 
  ShieldCheck, 
  Sparkles, 
  QrCode,
  FolderGit2
} from 'lucide-react';

export const PublicPortfolioPage: React.FC = () => {
  const { studentProfile, addToast } = useApp();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast({
      title: 'Shareable Portfolio URL Copied!',
      message: 'Share this link directly with recruiters, faculty mentors, or on LinkedIn.',
      type: 'success'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in relative z-10">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-xs text-slate-700">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
          <span className="font-bold text-blue-950">National Student Employability Portfolio (Verified)</span>
          <span className="text-slate-400 hidden sm:inline">• Employer Read-Only View</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5 text-blue-700" />
            <span>Copy Public URL</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Verified Resume (PDF)</span>
          </button>
        </div>
      </div>

      {/* Main Student Profile Card */}
      <div className="bg-white p-6 sm:p-10 border border-slate-200 rounded-xl shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={studentProfile.avatar}
                alt={studentProfile.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-blue-600 shadow-sm"
              />
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center text-white" title="Verified Credential Profile">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950">{studentProfile.name}</h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200 font-bold">
                  {studentProfile.degree}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                {studentProfile.headline}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-4 h-4 text-blue-700" />
                  <span>{studentProfile.college} (CGPA: <strong className="text-slate-900">{studentProfile.cgpa}</strong>)</span>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-rose-600" />
                  <span>{studentProfile.location}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Social Links & Trust QR */}
          <div className="flex md:flex-col items-center md:items-end gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <a
                href={studentProfile.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors shadow-2xs"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={studentProfile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-blue-800 hover:text-blue-900 border border-slate-200 transition-colors shadow-2xs"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            <div className="hidden md:flex items-center gap-1 text-[11px] text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>National ID: SIH-2026-99A</span>
            </div>
          </div>
        </div>

        {/* Verified Badges */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-100">
          {studentProfile.verifiedBadges.map((badge, bIdx) => (
            <span key={bIdx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>{badge}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Grid: Skill Radar & Biography */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Radar Chart */}
        <div className="lg:col-span-6">
          <SkillRadarChart 
            data={studentProfile.radarScores} 
            title="Verified 6-Axis Skill Benchmark"
            subtitle="Platform authenticated evaluation against national industry criteria"
          />
        </div>

        {/* Bio & Key Strengths */}
        <div className="lg:col-span-6 bg-white p-6 border border-slate-200 rounded-xl shadow-xs space-y-5">
          <div>
            <h3 className="text-base font-bold text-blue-950 mb-2">Executive Summary</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {studentProfile.bio}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Verified Technical Competencies
            </h4>
            <div className="flex flex-wrap gap-2">
              {studentProfile.skills.map((s, idx) => (
                <div key={idx} className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800">
                  <span className="font-bold text-slate-900">{s.name}</span>
                  <span className="text-[10px] text-blue-800 font-semibold">({s.level}%)</span>
                  {s.verified && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
            <div>
              <div className="text-slate-500 text-[11px] font-medium">Employability Readiness Index:</div>
              <div className="text-lg font-bold text-blue-900">{studentProfile.overallReadiness}% (High Aptitude)</div>
            </div>
            <div className="text-right">
              <div className="text-slate-500 text-[11px] font-medium">Assessments Passed:</div>
              <div className="text-lg font-bold text-emerald-700">{studentProfile.completedAssessmentsCount} Modules</div>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Certifications */}
      <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-xs space-y-4">
        <h3 className="text-base font-bold text-blue-950 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-600" />
          <span>Verified Industry Certifications</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {studentProfile.certifications.map((cert) => (
            <div key={cert.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-start justify-between">
                <h4 className="font-bold text-xs text-blue-950 leading-snug">{cert.title}</h4>
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              </div>
              <div className="text-[11px] text-amber-800 font-semibold">{cert.issuer}</div>
              <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-200">
                ID: {cert.credentialId} • {cert.issueDate}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Projects */}
      <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-xs space-y-4">
        <h3 className="text-base font-bold text-blue-950 flex items-center gap-2">
          <FolderGit2 className="w-5 h-5 text-blue-800" />
          <span>Technical Projects & Code Contributions</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {studentProfile.projects.map((proj) => (
            <div key={proj.id} className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-start justify-between">
                <h4 className="font-bold text-sm text-blue-950">{proj.title}</h4>
                {proj.stars && (
                  <span className="text-xs text-amber-700 font-mono font-bold">★ {proj.stars}</span>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {proj.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {proj.tags.map((t, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-white text-blue-900 border border-slate-200 font-mono font-medium">
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-3 text-xs">
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-900 hover:text-blue-800 flex items-center gap-1 font-bold"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
