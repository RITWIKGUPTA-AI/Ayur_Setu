import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer, 
  Legend, 
  Tooltip 
} from 'recharts';

interface SkillRadarChartProps {
  data: {
    category: string;
    student: number;
    benchmark: number;
    fullMark: number;
  }[];
  title?: string;
  subtitle?: string;
  showLegend?: boolean;
}

export const SkillRadarChart: React.FC<SkillRadarChartProps> = ({
  data,
  title = "Skill Gap vs Industry Baseline",
  subtitle = "6-Axis competency benchmark evaluated against active national industry criteria",
  showLegend = true
}) => {
  return (
    <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-xs w-full flex flex-col items-center">
      {title && (
        <div className="w-full text-left mb-2">
          <h3 className="text-base font-bold text-blue-950 flex items-center justify-between">
            <span>{title}</span>
            <span className="text-xs font-semibold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              National Benchmark
            </span>
          </h3>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      )}

      <div className="w-full h-[320px] sm:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis 
              dataKey="category" 
              tick={{ fill: '#1e293b', fontSize: 11, fontWeight: 600 }} 
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={{ fill: '#64748b', fontSize: 10 }} 
              stroke="#cbd5e1" 
            />
            
            {/* Industry Benchmark area */}
            <Radar
              name="Industry Benchmark (Required)"
              dataKey="benchmark"
              stroke="#ea580c"
              fill="#ea580c"
              fillOpacity={0.15}
              strokeWidth={2}
              strokeDasharray="4 4"
            />

            {/* Student Verified Score area */}
            <Radar
              name="Student Skill Profile"
              dataKey="student"
              stroke="#1d4ed8"
              fill="#1d4ed8"
              fillOpacity={0.35}
              strokeWidth={2.5}
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
              formatter={(value: any, name: any) => [`${value}/100 pts`, name]}
            />
            {showLegend && (
              <Legend 
                wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} 
                iconType="circle"
              />
            )}
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full mt-2 pt-3 border-t border-slate-100 flex items-center justify-around text-center text-xs">
        <div>
          <span className="text-slate-500 block text-[11px]">Primary Strength</span>
          <span className="text-emerald-700 font-bold">Pharmacovigilance & Communication</span>
        </div>
        <div className="h-6 w-px bg-slate-200" />
        <div>
          <span className="text-slate-500 block text-[11px]">Primary Target Gap</span>
          <span className="text-amber-800 font-bold">Cloud & Systems (-22 pts)</span>
        </div>
        <div className="h-6 w-px bg-slate-200" />
        <div>
          <span className="text-slate-500 block text-[11px]">Employability Index</span>
          <span className="text-blue-900 font-bold">76% Ready</span>
        </div>
      </div>
    </div>
  );
};
