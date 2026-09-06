import React, { useEffect, useState } from 'react';
import { INSTITUTIONAL_METRICS, LEARNING_OUTCOMES } from '../../data/mockData';
import { api } from '../../services/api';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  Download,
  Radio
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SkillGapLeaderboardEntry {
  domain: string;
  signalCount: number;
  weightedScore: number;
  reportingCompanies: string[];
  latestDescription: string;
}

export const AnalyticsPage: React.FC = () => {
  const { addToast } = useApp();
  const metrics = INSTITUTIONAL_METRICS;
  const [skillGapLeaderboard, setSkillGapLeaderboard] = useState<SkillGapLeaderboardEntry[]>([]);

  // Aggregated, ranked view of every live "Skill Signal" reported by industry partners
  // (see Industry > Report an Emerging Skill Gap) — turns individual signals into a
  // national trend view of which AYUSH skill domains are most urgently needed right now.
  useEffect(() => {
    let isMounted = true;
    api.getAnalytics()
      .then(res => {
        if (isMounted && Array.isArray(res?.skillGapLeaderboard)) {
          setSkillGapLeaderboard(res.skillGapLeaderboard);
        }
      })
      .catch(() => {
        // Backend unavailable — leaderboard simply stays empty rather than blocking the page.
      });
    return () => { isMounted = false; };
  }, []);

  const handleExportData = () => {
    addToast({
      title: 'Full Analytics Dataset Exported',
      message: 'Generated comprehensive JSON/CSV analytics package for Ministry of AYUSH reporting.',
      type: 'success'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in relative z-10">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 border border-slate-200 rounded-xl shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>National Institutional & Industry Skill Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950">
              Macro Skill Trends & Placement Analytics
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Cross-stakeholder telemetry: tracking student skill acquisition velocity, emerging employer demand, and hiring outcomes across AYUSH disciplines.
            </p>
          </div>

          <button
            onClick={handleExportData}
            className="px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all self-start md:self-center"
          >
            <Download className="w-4 h-4" />
            <span>Export Analytics Dataset</span>
          </button>
        </div>

        {/* 4 Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Total Enrolled Cohort</span>
            <div className="text-2xl font-extrabold text-blue-950 mt-0.5">{metrics.totalStudents.toLocaleString()}</div>
            <span className="text-[10px] text-emerald-700 font-bold">+12% vs last year</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Readiness Rate</span>
            <div className="text-2xl font-extrabold text-emerald-700 mt-0.5">{metrics.placementReadinessRate}%</div>
            <span className="text-[10px] text-blue-800 font-medium">National average 75%</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Active Industry Partners</span>
            <div className="text-2xl font-extrabold text-amber-800 mt-0.5">{metrics.activeIndustryPartners} Companies</div>
            <span className="text-[10px] text-amber-800 font-medium">Dabur, Himalaya, Patanjali</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Skill Gap Reduction</span>
            <div className="text-2xl font-extrabold text-blue-900 mt-0.5">{metrics.avgSkillGapClosedPct}%</div>
            <span className="text-[10px] text-blue-800 font-medium">Post-Bridge Programs</span>
          </div>
        </div>
      </div>

      {/* Top Emerging Skill Gaps — aggregated from live Industry Skill Signals */}
      {skillGapLeaderboard.length > 0 && (
        <div className="bg-white p-6 border border-amber-200 rounded-xl shadow-xs">
          <div className="flex items-center gap-2 mb-1">
            <Radio className="w-4 h-4 text-amber-700" />
            <h3 className="font-bold text-base text-blue-950">Top Emerging Skill Gaps — Live Industry Signals</h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold">
              {skillGapLeaderboard.reduce((sum, e) => sum + e.signalCount, 0)} total signals
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Ranked by urgency-weighted frequency across every hiring partner reporting a gap directly from the field —
            not a static annual survey, but what employers are seeing in new hires right now.
          </p>
          <div className="space-y-3">
            {skillGapLeaderboard.slice(0, 6).map((entry, idx) => {
              const maxScore = skillGapLeaderboard[0].weightedScore || 1;
              const widthPct = Math.max(8, Math.round((entry.weightedScore / maxScore) * 100));
              return (
                <div key={entry.domain} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-950 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-blue-950 truncate">{entry.domain}</span>
                      <span className="text-[10px] text-slate-500 font-medium shrink-0">
                        {entry.signalCount} signal{entry.signalCount !== 1 ? 's' : ''} · {entry.reportingCompanies.length} compan{entry.reportingCompanies.length !== 1 ? 'ies' : 'y'}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-full bg-amber-600" style={{ width: `${widthPct}%` }} />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 truncate">
                      {entry.reportingCompanies.join(', ')} — "{entry.latestDescription}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Placement Growth Trend (Area Chart) */}
        <div className="lg:col-span-7 bg-white p-6 border border-slate-200 rounded-xl shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base text-blue-950">Monthly Placements vs Institutional Target</h3>
              <p className="text-xs text-slate-500">2025–2026 Academic Placement Trajectory</p>
            </div>
            <span className="text-xs text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-bold">
              +11.5% Ahead of Target
            </span>
          </div>

          <div className="w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics.monthlyPlacementTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPlacedGov" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorTargetGov" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ea580c" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ea580c" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fill: '#1e293b', fontSize: 11, fontWeight: 500 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '0.5rem', color: '#0f172a', fontSize: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                />
                <Area type="monotone" dataKey="placed" stroke="#1d4ed8" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPlacedGov)" name="Placed Candidates" />
                <Area type="monotone" dataKey="target" stroke="#ea580c" strokeWidth={1.5} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorTargetGov)" name="National Target" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hiring Domain Breakdown (Pie Chart) */}
        <div className="lg:col-span-5 bg-white p-6 border border-slate-200 rounded-xl shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-blue-950">Hiring Demand Breakdown by Domain</h3>
            <p className="text-xs text-slate-500">Distribution of {metrics.internshipsSecuredThisYear} verified internships and offers</p>
          </div>

          <div className="w-full h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={metrics.hiringDomainBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="percentage"
                  nameKey="domain"
                >
                  {metrics.hiringDomainBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '0.5rem', color: '#0f172a', fontSize: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(val: any) => [`${val}% of Total Hires`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px]">
            {metrics.hiringDomainBreakdown.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-700 truncate font-medium">{item.domain}: <strong>{item.percentage}%</strong></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Outcome Tracking — not just activity, but whether learning actually closed gaps */}
      <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-4 h-4 text-emerald-700" />
          <h3 className="font-bold text-base text-blue-950">Learning Module Effectiveness (Before → After)</h3>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Not just enrollment counts — real outcome deltas per program, so academicians know which bootcamps actually move the needle.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LEARNING_OUTCOMES.map(o => (
            <div key={o.programId} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              <h4 className="text-xs font-bold text-blue-950 leading-snug">{o.programTitle}</h4>
              <span className="text-[10px] text-slate-500">{o.cohortSize} students tracked</span>

              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Avg. Skill Score</span>
                <span className="font-bold text-slate-800">{o.avgSkillScoreBefore} → <span className="text-emerald-700">{o.avgSkillScoreAfter}</span></span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Placement Rate</span>
                <span className="font-bold text-slate-800">{o.placementRateBeforePct}% → <span className="text-emerald-700">{o.placementRateAfterPct}%</span></span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Time to Placement</span>
                <span className="font-bold text-slate-800">{o.avgTimeToPlacementDaysBefore}d → <span className="text-emerald-700">{o.avgTimeToPlacementDaysAfter}d</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
