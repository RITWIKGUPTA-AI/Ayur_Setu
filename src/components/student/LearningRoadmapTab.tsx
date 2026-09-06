import React from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, CheckCircle, Clock, Award, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';

export const LearningRoadmapTab: React.FC = () => {
  const { roadmapItems, setPage, enrollInProgram, learningPrograms } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Ministry of AYUSH Recommended Pathways</span>
          </div>
          <h3 className="text-lg font-bold text-blue-950">
            Personalized Skill-Gap Bridge Roadmap
          </h3>
          <p className="text-xs text-slate-500">
            Certified courses, laboratory capstone projects, and industry masterclasses mapped directly to close your benchmark gaps
          </p>
        </div>

        <button
          onClick={() => setPage('learning')}
          className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>Browse All Marketplace Courses</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Roadmap Items List */}
      <div className="space-y-4">
        {roadmapItems.map((item, idx) => {
          const isProgress = item.status === 'in_progress';
          const isCompleted = item.status === 'completed';

          return (
            <div
              key={item.id}
              className="bg-white p-5 border border-slate-200 rounded-xl shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm shrink-0 ${
                  isCompleted 
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                    : isProgress 
                    ? 'bg-blue-50 text-blue-900 border border-blue-200' 
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}>
                  {idx + 1}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200">
                      {item.type}
                    </span>
                    <span className="text-xs text-slate-600">Provider: <strong className="text-slate-900">{item.provider}</strong></span>
                    <span className="text-[11px] text-amber-800 font-bold">Closes: +{item.gapClosedPoints} pts in {item.targetSkill}</span>
                  </div>

                  <h4 className="text-sm font-bold text-blue-950">{item.title}</h4>

                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {item.duration}
                    </span>
                    <span>Level: <strong className="text-slate-700">{item.difficulty}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                {isCompleted ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Completed & Verified</span>
                  </span>
                ) : isProgress ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-900 border border-blue-200 text-xs font-bold">
                    <Clock className="w-4 h-4 text-blue-700 animate-spin" style={{ animationDuration: '4s' }} />
                    <span>In Progress (60%)</span>
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      const matchProg = learningPrograms[0];
                      if (matchProg) enrollInProgram(matchProg.id);
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1"
                  >
                    <span>Start Learning</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
