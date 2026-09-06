import React from 'react';
import { INSTITUTIONAL_METRICS } from '../../data/mockData';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { TrendingUp, Users, AlertTriangle, CheckCircle2, Sparkles, Download } from 'lucide-react';

export const DepartmentGapAnalysis: React.FC = () => {
  const data = INSTITUTIONAL_METRICS.departmentReadiness;

  const getBarColor = (score: number) => {
    if (score >= 85) return '#047857'; // emerald-700
    if (score >= 75) return '#1d4ed8'; // blue-700
    if (score >= 70) return '#d97706'; // amber-600
    return '#dc2626'; // red-600
  };

  return (
    <div className="space-y-6">
      {/* Chart Card */}
      <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-blue-950 flex items-center gap-2">
              <span>Department Placement Readiness & Competency Benchmarks</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-900 border border-purple-200 font-bold">
                Institutional Overview
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparative readiness scores across engineering branches based on completed student assessments
            </p>
          </div>
        </div>

        <div className="w-full h-[280px] sm:h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="dept" 
                tick={{ fill: '#1e293b', fontSize: 10, fontWeight: 500 }} 
                interval={0}
                angle={-15}
                textAnchor="end"
              />
              <YAxis 
                domain={[0, 100]} 
                tick={{ fill: '#64748b', fontSize: 10 }} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  borderColor: '#cbd5e1', 
                  borderRadius: '0.5rem',
                  color: '#0f172a',
                  fontSize: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                formatter={(val: any) => [`${val}% Readiness`, 'Readiness Score']}
              />
              <Bar dataKey="readinessScore" radius={[6, 6, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.readinessScore)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Granular Department Breakdown Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h4 className="font-bold text-sm text-blue-950">Department-Wise Skill Gaps & Strengths</h4>
          <span className="text-xs text-slate-500 font-medium">Total Enrolled: 3,420 Students</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider border-b border-slate-200 font-bold text-[11px]">
              <tr>
                <th className="p-4">Department</th>
                <th className="p-4">Cohort Size</th>
                <th className="p-4">Readiness Benchmark</th>
                <th className="p-4">Top Strength</th>
                <th className="p-4">Critical Skill Gap to Address</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {data.map((d, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-bold text-blue-950">{d.dept}</td>
                  <td className="p-4 text-slate-600 font-medium">{d.studentCount} students</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${
                        d.readinessScore >= 80 ? 'text-emerald-700' : d.readinessScore >= 75 ? 'text-blue-700' : 'text-amber-800'
                      }`}>
                        {d.readinessScore}%
                      </span>
                      <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden hidden sm:block">
                        <div 
                          className="h-full bg-blue-700 rounded-full" 
                          style={{ width: `${d.readinessScore}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-emerald-700 font-bold">{d.topStrength}</td>
                  <td className="p-4 text-rose-700 font-bold">{d.topGapSkill}</td>
                  <td className="p-4 text-right">
                    <button className="px-3 py-1 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-800 text-[11px] font-bold border border-slate-300 shadow-2xs">
                      View Action Plan
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
