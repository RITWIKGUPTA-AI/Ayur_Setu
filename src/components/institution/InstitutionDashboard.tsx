import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DepartmentGapAnalysis } from './DepartmentGapAnalysis';
import { DocumentVault } from './DocumentVault';
import { INSTITUTIONAL_METRICS } from '../../data/mockData';
import { 
  ShieldCheck, 
  Building2, 
  TrendingUp, 
  FileText, 
  Download, 
  CheckCircle2, 
  Users, 
  GraduationCap, 
  Sparkles, 
  Clock,
  Layers
} from 'lucide-react';

export const InstitutionDashboard: React.FC = () => {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'analytics' | 'vault' | 'partners' | 'reports'>('analytics');
  const [approvedMoUs, setApprovedMoUs] = useState<string[]>(['mou-1']);

  const pendingPartners = [
    {
      id: 'mou-1',
      company: 'Patanjali Research Institute',
      purpose: 'Establish Joint AI & GPU Computing CoE + 50 Annual Internships',
      date: '02 March 2026',
      status: 'Approved'
    },
    {
      id: 'mou-2',
      company: 'Baidyanath Ayurved Bhawan',
      purpose: 'Autonomous Vehicle Hardware-in-the-Loop Capstone Sponsorship',
      date: '28 Feb 2026',
      status: 'Pending Academic Senate Approval'
    },
    {
      id: 'mou-3',
      company: 'Himalaya Wellness Company',
      purpose: 'Fintech Apprenticeship & Campus Fast-Track Hiring Drive',
      date: '25 Feb 2026',
      status: 'Pending Academic Senate Approval'
    }
  ];

  const handleApprovePartner = (id: string, name: string) => {
    setApprovedMoUs(prev => [...prev, id]);
    addToast({
      title: 'Industry Partnership Approved!',
      message: `MoU with ${name} officially endorsed by the Academic Council.`,
      type: 'success'
    });
  };

  const handleExportAccreditation = () => {
    addToast({
      title: 'Accreditation Package Generated',
      message: 'Exported comprehensive NAAC / NBA / NIRF Skill & Placement Compliance Report (PDF).',
      type: 'success'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in relative z-10">
      {/* University Admin Header Card */}
      <div className="bg-white p-6 sm:p-8 border border-slate-200 rounded-xl shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-purple-50 border-2 border-purple-600 p-2 flex items-center justify-center text-purple-800 font-bold text-xl shadow-xs">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold text-blue-950">National Institute of Technology</h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-900 border border-purple-200 font-bold">
                  Institution Admin & T&P Cell
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                Centralized Academic, Skill Assessment & Corporate Placement Governance Portal
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <GraduationCap className="w-3.5 h-3.5 text-purple-700" />
                <span>Autonomous Public Technical University • NIRF Top 20 Ranked</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportAccreditation}
              className="px-5 py-3 rounded-xl bg-purple-900 hover:bg-purple-800 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export NAAC / NBA Skill Report</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium">Enrolled Students</div>
            <div className="text-lg font-bold text-blue-950 mt-0.5">3,420 Enrolled</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium">Placement Readiness Rate</div>
            <div className="text-lg font-bold text-emerald-700 mt-0.5">84.6% Qualified</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium">Corporate Industry MoUs</div>
            <div className="text-lg font-bold text-purple-900 mt-0.5">78 Active Partners</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium">Internships Secured</div>
            <div className="text-lg font-bold text-amber-800 mt-0.5">892 Secured</div>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-slate-200 space-x-1 overflow-x-auto pb-0.5">
        {[
          { id: 'analytics', label: 'Department Skill Gap & Cohort Heatmaps', icon: <TrendingUp className="w-4 h-4" /> },
          { id: 'vault', label: 'Credential & Document Vault', icon: <FileText className="w-4 h-4" /> },
          { id: 'partners', label: 'Partner Approvals & Corporate MoUs', icon: <Building2 className="w-4 h-4" /> },
          { id: 'reports', label: 'Data-Driven Policy & Accreditation', icon: <Download className="w-4 h-4" /> },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold rounded-t-xl transition-all whitespace-nowrap border-b-2 ${
                isActive
                  ? 'border-purple-800 text-purple-950 bg-white shadow-2xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Department Analytics */}
      {activeTab === 'analytics' && <DepartmentGapAnalysis />}

      {/* Tab 2: Document Vault */}
      {activeTab === 'vault' && <DocumentVault />}

      {/* Tab 3: Partner Approvals */}
      {activeTab === 'partners' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-blue-950">Industry Partner MoUs & Collaboration Requests</h3>
              <p className="text-xs text-slate-500">
                Review and approve corporate agreements, sponsored lab facilities, and campus hiring drives
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {pendingPartners.map((p) => {
              const isApproved = approvedMoUs.includes(p.id) || p.status === 'Approved';

              return (
                <div key={p.id} className="bg-white p-5 border border-slate-200 rounded-xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center font-bold text-purple-800 shrink-0 border border-purple-200">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-blue-950">{p.company}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">{p.purpose}</p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                        <span>Submitted: {p.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                    {isApproved ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>MoU Endorsed & Active</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleApprovePartner(p.id, p.company)}
                        className="px-4 py-2 rounded-xl bg-purple-900 hover:bg-purple-800 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Sign & Approve MoU</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Reports */}
      {activeTab === 'reports' && (
        <div className="bg-white p-6 sm:p-8 border border-slate-200 rounded-xl shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-bold text-blue-950 flex items-center gap-2">
              <Download className="w-5 h-5 text-purple-700" />
              <span>Data-Driven Policy Decisions & Compliance Export Hub</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Download institutional analytics compiled for Ministry of AYUSH, NAAC Criterion 5, and NIRF rankings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-sm text-blue-950">1. NEP 2020 Experiential Learning & Skill Audit</h4>
              <p className="text-xs text-slate-600">
                Detailed audit of industry-prescribed vs curriculum-covered topics across 6 engineering departments.
              </p>
              <button 
                onClick={handleExportAccreditation}
                className="mt-2 text-xs font-bold text-purple-800 hover:text-purple-900 flex items-center gap-1"
              >
                <span>Download Executive Summary (CSV/PDF)</span>
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-sm text-blue-950">2. Annual Internship & Placement Outcomes (2025–26)</h4>
              <p className="text-xs text-slate-600">
                Complete list of 892 internships with company verification hashes, stipend averages, and PPO conversions.
              </p>
              <button 
                onClick={handleExportAccreditation}
                className="mt-2 text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1"
              >
                <span>Download Placement Dataset (Excel/PDF)</span>
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
