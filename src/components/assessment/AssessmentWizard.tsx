import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ASSESSMENT_QUESTIONS } from '../../data/mockData';
import { SkillRadarChart } from './SkillRadarChart';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Zap, 
  Award, 
  Compass, 
  Briefcase,
  HelpCircle,
  Clock,
  ShieldCheck,
  Target
} from 'lucide-react';

export const AssessmentWizard: React.FC = () => {
  const { studentProfile, submitAssessmentResults, setPage } = useApp();
  
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const questions = ASSESSMENT_QUESTIONS;
  const currentQ = questions[currentStep];

  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentStep]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const calculateAndSubmit = () => {
    const scoresByCategory: Record<string, number[]> = {};

    questions.forEach((q, idx) => {
      const selectedOptIdx = selectedAnswers[idx] ?? 1;
      const weight = q.options[selectedOptIdx]?.scoreWeight || 75;
      
      if (!scoresByCategory[q.category]) {
        scoresByCategory[q.category] = [];
      }
      scoresByCategory[q.category].push(weight);
    });

    const finalCategoryScores: Record<string, number> = {};
    Object.keys(scoresByCategory).forEach(cat => {
      const arr = scoresByCategory[cat];
      const avg = Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
      finalCategoryScores[cat] = avg;
    });

    if (!finalCategoryScores['Pharmacovigilance & Drug Safety']) finalCategoryScores['Pharmacovigilance & Drug Safety'] = 88;
    if (!finalCategoryScores['GMP & Quality Systems']) finalCategoryScores['GMP & Quality Systems'] = 74;
    if (!finalCategoryScores['Clinical Research & AYUSH-GCP']) finalCategoryScores['Clinical Research & AYUSH-GCP'] = 70;
    if (!finalCategoryScores['Lab & Analytical Techniques']) finalCategoryScores['Lab & Analytical Techniques'] = 60;
    if (!finalCategoryScores['Formulation & Manufacturing']) finalCategoryScores['Formulation & Manufacturing'] = 80;
    if (!finalCategoryScores['Professional Communication']) finalCategoryScores['Professional Communication'] = 90;

    submitAssessmentResults(finalCategoryScores);
    setIsSubmitted(true);
  };

  const handleQuickAutoFill = (preset: 'high' | 'gaps') => {
    const newAnswers: Record<number, number> = {};
    questions.forEach((q, idx) => {
      if (preset === 'high') {
        const bestIdx = q.options.findIndex(o => o.scoreWeight === 100);
        newAnswers[idx] = bestIdx >= 0 ? bestIdx : 0;
      } else {
        newAnswers[idx] = idx % 2 === 0 ? 0 : 1;
      }
    });
    setSelectedAnswers(newAnswers);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPct = Math.round((answeredCount / questions.length) * 100);

  if (isSubmitted) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in">
        {/* Success Banner */}
        <div className="bg-white p-8 text-center border border-slate-200 rounded-xl shadow-xs relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 mx-auto flex items-center justify-center mb-4 shadow-xs">
            <Award className="w-8 h-8" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Assessment Benchmarked & Authenticated
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950">
            Skill Competency Map & Gap Roadmap Generated
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto mt-2">
            Your results have been benchmarked against live criteria from partner AYUSH manufacturers (Dabur, Himalaya, Patanjali, Baidyanath).
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setPage('dashboard')}
              className="px-6 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm shadow-sm flex items-center gap-2 transition-all hover:scale-102"
            >
              <span>View Full Dashboard & Gaps</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage('jobs')}
              className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-sm flex items-center gap-2 transition-all shadow-2xs"
            >
              <Briefcase className="w-4 h-4 text-amber-600" />
              <span>Explore Ranked Internships</span>
            </button>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(0);
                setSelectedAnswers({});
              }}
              className="px-4 py-3 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Assessment</span>
            </button>
          </div>
        </div>

        {/* Live Radar Output Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <SkillRadarChart 
            data={studentProfile.radarScores} 
            title="Auto-Generated 6-Axis Competency Map"
            subtitle="Blue: Verified Level | Amber: Industry Baseline"
          />

          <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-blue-950 flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-800" />
                <span>Automated Next-Step Recommendations</span>
              </h3>
              <span className="text-xs bg-blue-50 text-blue-800 px-2.5 py-0.5 rounded-full border border-blue-200 font-semibold">
                AI Match Ready
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-bold flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-xs font-bold text-blue-950">Target Gap: Lab & Analytical Techniques (+15 pts needed)</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Enrolling in the HPLC & Modern Analytical Techniques workshop will bridge 80% of this gap within 3 weeks.
                  </p>
                  <button 
                    onClick={() => setPage('learning')}
                    className="mt-2 text-xs font-bold text-blue-800 hover:text-blue-900 flex items-center gap-1"
                  >
                    <span>View Recommended Bootcamp</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-bold text-blue-950">Top Match: Pharmacovigilance Associate at Dabur (92% Fit)</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Your strong Pharmacovigilance score (88/100) and formulation background qualify you directly for round 1.
                  </p>
                  <button 
                    onClick={() => setPage('jobs')}
                    className="mt-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    <span>Apply with 1-Click</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 relative z-10">
      {/* Top Header */}
      <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>National Skill Engine</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-blue-950">
              Standardized Skill Assessment & Industry Benchmarking
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Answer real-world technical scenarios. Responses are dynamically evaluated against live hiring baselines to output your radar competency profile.
            </p>
          </div>

          {/* Hackathon Demo Quick Fills */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 shrink-0">
            <span className="text-[11px] text-slate-500 font-semibold">Demo Shortcuts:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleQuickAutoFill('high')}
                className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-bold transition-colors flex items-center gap-1"
                title="Fill all optimal answers"
              >
                <Zap className="w-3 h-3 text-amber-600" />
                <span>Simulate High Score</span>
              </button>
              <button
                onClick={() => handleQuickAutoFill('gaps')}
                className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-bold transition-colors flex items-center gap-1"
                title="Fill answers showing gaps"
              >
                <Target className="w-3 h-3 text-rose-600" />
                <span>Simulate Gaps</span>
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-700 font-semibold">
              Question {currentStep + 1} of {questions.length} • <span className="text-blue-900">{currentQ.category}</span>
            </span>
            <span className="text-slate-500">
              {answeredCount}/{questions.length} answered ({progressPct}%)
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-700 to-indigo-700 transition-all duration-300"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white p-6 sm:p-8 border border-slate-200 rounded-xl shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-md bg-blue-50 text-blue-900 text-xs font-bold border border-blue-200">
            Category: {currentQ.category}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>Time: ~2 mins</span>
          </div>
        </div>

        {/* Question Text */}
        <h2 className="text-base sm:text-lg font-bold text-blue-950 leading-relaxed">
          {currentQ.question}
        </h2>

        {/* Code Snippet */}
        {currentQ.codeSnippet && (
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto shadow-inner">
            <pre>{currentQ.codeSnippet}</pre>
          </div>
        )}

        {/* Options List */}
        <div className="space-y-3 pt-2">
          {currentQ.options.map((option, oIdx) => {
            const isSelected = selectedAnswers[currentStep] === oIdx;
            return (
              <div
                key={oIdx}
                onClick={() => handleSelectOption(oIdx)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-start gap-3.5 ${
                  isSelected
                    ? 'bg-blue-50/80 border-blue-600 shadow-xs text-blue-950 ring-1 ring-blue-600 font-medium'
                    : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-400'
                }`}>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <div className="flex-1 text-xs sm:text-sm leading-relaxed">
                  {option.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              currentStep === 0
                ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
                : 'border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-2">
            {currentStep < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={calculateAndSubmit}
                className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Submit & Generate Gap Profile</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
