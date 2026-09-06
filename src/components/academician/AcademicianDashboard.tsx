import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CurriculumIntelligence } from './CurriculumIntelligence';
import { FDPBrowser } from './FDPBrowser';
import { 
  Briefcase, 
  GraduationCap, 
  BookOpen, 
  TrendingUp, 
  Users, 
  Award, 
  Sparkles, 
  PlusCircle, 
  ArrowRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import { SAMPLE_CANDIDATES_FOR_INDUSTRY } from '../../data/mockData';

export const AcademicianDashboard: React.FC = () => {
  const { setPage, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'curriculum' | 'fdps' | 'cohort' | 'collaborate'>('curriculum');
  const [proposalText, setProposalText] = useState('');

  const handleSendProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposalText.trim()) return;
    addToast({
      title: 'Industry Invitation Dispatched!',
      message: 'Your guest lecture and live capstone proposal has been broadcast to partner tech leaders.',
      type: 'success'
    });
    setProposalText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in relative z-10">
      {/* Faculty Welcome Card */}
      <div className="bg-white p-6 sm:p-8 border border-slate-200 rounded-xl shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-50 border-2 border-emerald-600 p-1 flex items-center justify-center text-emerald-800 font-bold text-xl shadow-xs">
              <Briefcase className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold text-blue-950">Dr. Shalini Verma</h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold">
                  Professor & Head, Computer Science
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                Department of Computer Science & Engineering • National Institute of Technology
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>AYUSH Recognized Faculty Mentor • SIH Academic Lead</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('fdps')}
              className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Explore Funded FDPs</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium">Monitored Cohort Size</div>
            <div className="text-lg font-bold text-blue-950 mt-0.5">720 Final Year Students</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium">Department Readiness</div>
            <div className="text-lg font-bold text-emerald-700 mt-0.5">88% Benchmark Met</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium">Sponsored Research Grants</div>
            <div className="text-lg font-bold text-amber-800 mt-0.5">₹45 Lakhs Active</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium">Curriculum Modernization</div>
            <div className="text-lg font-bold text-blue-800 mt-0.5">4 Modules Suggested</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 space-x-1 overflow-x-auto pb-0.5">
        {[
          { id: 'curriculum', label: 'Curriculum & Skill Gap Intelligence', icon: <TrendingUp className="w-4 h-4" /> },
          { id: 'fdps', label: 'Faculty Sabbaticals & Grants', icon: <Award className="w-4 h-4" /> },
          { id: 'cohort', label: 'Student Cohort Progress Tracker', icon: <Users className="w-4 h-4" /> },
          { id: 'collaborate', label: 'Propose Industry Hackathon / Lecture', icon: <BookOpen className="w-4 h-4" /> },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold rounded-t-xl transition-all whitespace-nowrap border-b-2 ${
                isActive
                  ? 'border-emerald-700 text-emerald-950 bg-white shadow-2xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Curriculum Intelligence */}
      {activeTab === 'curriculum' && <CurriculumIntelligence />}

      {/* Tab 2: FDP Browser */}
      {activeTab === 'fdps' && <FDPBrowser />}

      {/* Tab 3: Student Cohort Tracker */}
      {activeTab === 'cohort' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-blue-950">Department Student Cohort Performance</h3>
              <p className="text-xs text-slate-500">
                Track individual student skill benchmarks, verified assessments, and internship placement status
              </p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200 font-semibold">
              Top Shortlisted Candidates
            </span>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider border-b border-slate-200 font-bold text-[11px]">
                  <tr>
                    <th className="p-4">Student</th>
                    <th className="p-4">College & Dept</th>
                    <th className="p-4">Aptitude Score</th>
                    <th className="p-4">Verified Skills</th>
                    <th className="p-4">Current Placement Status</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {SAMPLE_CANDIDATES_FOR_INDUSTRY.map((cand) => (
                    <tr key={cand.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-bold text-blue-950 flex items-center gap-3">
                        <img src={cand.avatar} alt={cand.name} className="w-8 h-8 rounded-full object-cover border border-slate-300" />
                        <div>
                          <div>{cand.name}</div>
                          <span className="text-[10px] text-blue-800 font-semibold">CGPA: {cand.cgpa}</span>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600 font-medium">{cand.college}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                          {cand.assessmentScore}/100
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {cand.skills.map((s, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-100 rounded border border-slate-200 text-slate-800 font-medium">
                              {s.name}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-amber-800 font-bold">{cand.status}</span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => {
                            setPage('portfolio');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-300 shadow-2xs"
                        >
                          View Portfolio
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Propose Collaboration */}
      {activeTab === 'collaborate' && (
        <div className="bg-white p-6 sm:p-8 border border-slate-200 rounded-xl shadow-xs max-w-3xl mx-auto space-y-6">
          <div>
            <h3 className="text-lg font-bold text-blue-950 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-700" />
              <span>Propose Joint Industry Mentorship or Guest Lecture</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Invite senior engineers and enterprise leaders from partner companies to conduct hands-on workshops for your students.
            </p>
          </div>

          <form onSubmit={handleSendProposal} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Engineering Domain</label>
              <select className="glass-input w-full text-xs">
                <option value="cloud">Cloud Native & Distributed Systems</option>
                <option value="ai">Generative AI & Agentic Architectures</option>
                <option value="fintech">Fintech High-Throughput Transaction Systems</option>
                <option value="embedded">EV Telemetry & Autonomous Robotics</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Event Type</label>
              <div className="grid grid-cols-3 gap-2">
                {['2-Day Live Hackathon', 'Expert Guest Lecture', 'Curriculum Advisory Board'].map((t, idx) => (
                  <label key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-2 text-xs text-slate-800 cursor-pointer hover:border-emerald-500">
                    <input type="radio" name="collab_type" defaultChecked={idx === 0} className="accent-emerald-700" />
                    <span className="font-medium">{t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Scope & Learning Outcomes for Students</label>
              <textarea
                rows={4}
                value={proposalText}
                onChange={(e) => setProposalText(e.target.value)}
                placeholder="Describe the problem statements, required mentor background, and student prerequisites..."
                className="glass-input w-full text-xs resize-none"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Broadcast Proposal to Partner Network</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
