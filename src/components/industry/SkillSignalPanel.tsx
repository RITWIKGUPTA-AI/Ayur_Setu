import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Radio, Send, Clock } from 'lucide-react';

const DOMAIN_OPTIONS = [
  'Pharmacovigilance',
  'GMP & Quality',
  'Clinical Research',
  'Lab & Analytics',
  'Formulation Sci.',
  'Regulatory Affairs'
];

export const SkillSignalPanel: React.FC = () => {
  const { industrySkillNeeds, submitIndustrySkillNeed } = useApp();
  const [skillDomain, setSkillDomain] = useState(DOMAIN_OPTIONS[0]);
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<'High' | 'Medium' | 'Low'>('Medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    submitIndustrySkillNeed({
      submittedBy: 'Dabur India Ltd.',
      skillDomain,
      description: description.trim(),
      urgency
    });
    setDescription('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-2 bg-white p-6 border border-slate-200 rounded-xl shadow-xs space-y-4 h-fit">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-amber-700" />
          <h3 className="text-sm font-bold text-blue-950">Report an Emerging Skill Gap</h3>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          This signal appears live on the Curriculum Intelligence dashboard academicians see —
          closing the loop between what you're seeing in new hires and what colleges are teaching.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-1">Skill Domain</label>
            <select
              value={skillDomain}
              onChange={(e) => setSkillDomain(e.target.value)}
              className="glass-input w-full text-xs py-2"
            >
              {DOMAIN_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-1">What are you seeing?</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="e.g. New graduates rarely arrive knowing GC-MS residue testing..."
              className="glass-input w-full text-xs py-2 resize-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-1">Urgency</label>
            <div className="flex gap-2">
              {(['Low', 'Medium', 'High'] as const).map(u => (
                <button
                  type="button"
                  key={u}
                  onClick={() => setUrgency(u)}
                  className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold border transition-all ${
                    urgency === u
                      ? 'bg-blue-900 text-white border-blue-900'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Live Signal to Academicians</span>
          </button>
        </form>
      </div>

      <div className="lg:col-span-3 space-y-3">
        <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wide">Signals Sent So Far</h4>
        {industrySkillNeeds.map(need => (
          <div key={need.id} className="bg-white p-4 border border-slate-200 rounded-xl shadow-xs flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-950">{need.skillDomain}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                  need.urgency === 'High' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                  need.urgency === 'Medium' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                  'bg-slate-50 text-slate-600 border-slate-200'
                }`}>
                  {need.urgency} urgency
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{need.description}</p>
              <span className="text-[10px] text-slate-400 font-medium">— {need.submittedBy}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-slate-400 shrink-0">
              <Clock className="w-3 h-3" />
              <span>{need.submittedAt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
