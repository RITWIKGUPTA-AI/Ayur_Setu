import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Sparkles, 
  Award, 
  Clock, 
  Users, 
  Star, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';

export const LearningMarketplacePage: React.FC = () => {
  const { learningPrograms, enrollInProgram, roadmapItems } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');

  const filtered = learningPrograms.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.skillsTaught.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          p.offeredBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'All' || p.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in relative z-10">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 border border-slate-200 rounded-xl shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>National Skill-Gap Bridge Marketplace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950">
              Industry Certifications & Upskilling Bootcamps
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Curated masterclasses co-created with Dabur, Himalaya, Patanjali, and premier AYUSH institutes under Ministry of AYUSH oversight. Built to close the specific gap deltas identified in your skill assessment.
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xs text-slate-500 font-medium block">Total Verified Programs</span>
            <span className="text-2xl font-extrabold text-blue-900">{learningPrograms.length} Masterclasses</span>
          </div>
        </div>

        {/* Search Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-100">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search course title or target skill..."
              className="glass-input pl-9 pr-4 py-2 text-xs w-full"
            />
          </div>

          <div>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="glass-input w-full text-xs"
            >
              <option value="All">All Proficiency Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((prog) => {
          const isEnrolled = roadmapItems.some(r => r.title === prog.title);

          return (
            <div 
              key={prog.id}
              className="bg-white border border-slate-200 rounded-xl shadow-xs hover:shadow-md hover:border-blue-400 transition-all overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail image */}
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={prog.thumbnail}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-xs text-[10px] font-bold text-blue-950 border border-slate-200 shadow-2xs">
                      {prog.type}
                    </span>
                    {prog.isIndustryEndorsed && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-700 text-white text-[10px] font-bold shadow-2xs">
                        AYUSH Industry Endorsed
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="text-amber-800 font-bold">{prog.offeredBy}</span>
                    <div className="flex items-center gap-1 text-slate-700 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{prog.rating} ({prog.reviewsCount})</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-blue-950 leading-snug">
                    {prog.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {prog.description}
                  </p>

                  <div className="space-y-1 pt-1">
                    <div className="text-[11px] font-bold text-slate-700">Core Skills Mastered:</div>
                    <div className="flex flex-wrap gap-1">
                      {prog.skillsTaught.map((s, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {prog.duration}
                    </span>
                    <span className="font-medium">{prog.enrolledCount.toLocaleString()} Enrolled</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => enrollInProgram(prog.id)}
                  disabled={isEnrolled}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 ${
                    isEnrolled
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 cursor-default'
                      : 'bg-blue-900 hover:bg-blue-800 text-white hover:scale-102'
                  }`}
                >
                  {isEnrolled ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Enrolled in Roadmap</span>
                    </>
                  ) : (
                    <>
                      <span>Enroll & Add to Gap Roadmap</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
