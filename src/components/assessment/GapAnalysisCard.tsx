import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, AlertTriangle, ArrowUpRight, BookOpen, Sparkles, Target } from 'lucide-react';

export const GapAnalysisCard: React.FC = () => {
  const { studentProfile, setPage } = useApp();

  const getStatusBadge = (student: number, benchmark: number) => {
    const diff = student - benchmark;
    if (diff >= 0) {
      return {
        label: `Exceeds Benchmark (+${diff})`,
        badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        icon: <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
      };
    } else if (diff >= -10) {
      return {
        label: `Near Benchmark (${diff})`,
        badgeClass: 'bg-amber-50 text-amber-900 border-amber-200',
        icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
      };
    } else {
      return {
        label: `Priority Gap (${diff})`,
        badgeClass: 'bg-rose-50 text-rose-800 border-rose-200',
        icon: <Target className="w-3.5 h-3.5 text-rose-600" />
      };
    }
  };

  return (
    <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-blue-950 flex items-center gap-2">
              <span>Granular Skill-Gap Analysis</span>
              <Sparkles className="w-4 h-4 text-amber-600" />
            </h3>
            <p className="text-xs text-slate-500">
              Benchmarked against 5,000+ active technology internship requirements
            </p>
          </div>
          <button
            onClick={() => setPage('assessment')}
            className="text-xs text-blue-800 hover:text-blue-900 font-bold flex items-center gap-1"
          >
            <span>Retake Engine</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {studentProfile.radarScores.map((item) => {
            const status = getStatusBadge(item.student, item.benchmark);

            return (
              <div 
                key={item.category} 
                className="p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-xs text-slate-800">{item.category}</span>
                  <div className={`flex items-center gap-1 px-2 py-0.5 rounded border text-[11px] font-semibold ${status.badgeClass}`}>
                    {status.icon}
                    <span>{status.label}</span>
                  </div>
                </div>

                {/* Progress bar comparison */}
                <div className="relative w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  {/* Benchmark indicator marker */}
                  <div 
                    className="absolute top-0 bottom-0 w-1 bg-amber-600 z-10" 
                    style={{ left: `${item.benchmark}%` }}
                    title={`Industry Benchmark: ${item.benchmark}%`}
                  />
                  {/* Student score progress */}
                  <div 
                    className={`h-full rounded-full transition-all duration-700 ${
                      item.student >= item.benchmark ? 'bg-gradient-to-r from-blue-700 to-emerald-600' : 'bg-gradient-to-r from-blue-800 to-indigo-700'
                    }`}
                    style={{ width: `${item.student}%` }}
                  />
                </div>

                <div className="flex items-center justify-between mt-1 text-[10px] text-slate-500">
                  <span>Your Score: <strong className="text-slate-800 font-bold">{item.student}/100</strong></span>
                  <span>Target Benchmark: <strong className="text-amber-800 font-bold">{item.benchmark}/100</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 p-3.5 bg-blue-50/70 rounded-xl border border-blue-200 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-900">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-blue-950">4 Recommended AYUSH Industry Bridge Programs</div>
            <p className="text-[11px] text-slate-600">Close Cloud & System Architecture gaps</p>
          </div>
        </div>
        <button
          onClick={() => setPage('learning')}
          className="px-3 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow-xs transition-colors"
        >
          View Roadmap
        </button>
      </div>
    </div>
  );
};
