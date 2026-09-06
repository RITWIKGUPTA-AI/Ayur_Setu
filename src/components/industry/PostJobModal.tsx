import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Plus, Trash2, Sparkles, Building2 } from 'lucide-react';
import { JobOpportunity } from '../../types';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PostJobModal: React.FC<PostJobModalProps> = ({ isOpen, onClose }) => {
  const { postNewJob } = useApp();

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('Dabur India Ltd.');
  const [location, setLocation] = useState('Ghaziabad / Remote');
  const [type, setType] = useState<JobOpportunity['type']>('Internship');
  const [workplace, setWorkplace] = useState<JobOpportunity['workplace']>('Hybrid');
  const [stipendOrSalary, setStipendOrSalary] = useState('₹22,000 / month');
  const [duration, setDuration] = useState('6 Months');
  const [deadline, setDeadline] = useState('30 April 2026');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState<{ name: string; weight: number }[]>([
    { name: 'GMP & Quality', weight: 35 },
    { name: 'Pharmacovigilance', weight: 30 },
    { name: 'Lab & Analytics', weight: 20 },
    { name: 'Communication', weight: 15 }
  ]);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillWeight, setNewSkillWeight] = useState(20);

  if (!isOpen) return null;

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    setSkills(prev => [...prev, { name: newSkillName.trim(), weight: Number(newSkillWeight) }]);
    setNewSkillName('');
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    postNewJob({
      title: title.trim(),
      company: company.trim(),
      companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
      location,
      type,
      workplace,
      stipendOrSalary,
      duration,
      deadline,
      description: description.trim(),
      responsibilities: [
        'Support GMP documentation and batch quality records',
        'Assist with adverse-event and safety data logging',
        'Maintain lab test records and standard operating procedures'
      ],
      requiredSkills: skills.length > 0 ? skills : [{ name: 'GMP & Quality', weight: 50 }, { name: 'Communication', weight: 50 }],
      preferredSkills: ['MS Excel', 'Regulatory Documentation', 'Lab Safety'],
      eligibility: 'B.Tech/M.Tech graduating batch 2026/2027',
      featured: true
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white max-w-2xl w-full p-6 sm:p-8 border border-slate-300 rounded-xl shadow-xl max-h-[90vh] overflow-y-auto space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-blue-950">Post New Internship / Job Opening</h3>
              <p className="text-[11px] text-slate-500">Tag precise required skills for automated candidate compatibility scoring</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Opportunity Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Cloud & Systems Engineering Intern"
                className="glass-input w-full text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Hiring Enterprise *</label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="glass-input w-full text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Opportunity Type</label>
              <select 
                value={type} 
                onChange={(e) => setType(e.target.value as any)}
                className="glass-input w-full text-xs"
              >
                <option value="Internship">Internship</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Apprenticeship">Apprenticeship</option>
                <option value="Live Project">Live Project</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Workplace Mode</label>
              <select 
                value={workplace} 
                onChange={(e) => setWorkplace(e.target.value as any)}
                className="glass-input w-full text-xs"
              >
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
                <option value="On-Site">On-Site</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Stipend / CTC</label>
              <input
                type="text"
                value={stipendOrSalary}
                onChange={(e) => setStipendOrSalary(e.target.value)}
                className="glass-input w-full text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Role Overview & Responsibilities *</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the day-to-day role, tech stack, and learning outcomes..."
              className="glass-input w-full text-xs resize-none"
            />
          </div>

          {/* Skill Tagging with Weightages */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Required Skills & Weightages (AI Matching Criteria)</span>
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((s, idx) => (
                <div key={idx} className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-xs text-slate-800 shadow-2xs">
                  <span>{s.name}</span>
                  <span className="text-amber-800 font-bold">({s.weight}%)</span>
                  <button type="button" onClick={() => handleRemoveSkill(idx)} className="text-slate-400 hover:text-rose-600">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="Add skill tag (e.g. HPLC, GMP, PvPI)"
                className="glass-input flex-1 text-xs py-1.5"
              />
              <input
                type="number"
                min={5}
                max={100}
                value={newSkillWeight}
                onChange={(e) => setNewSkillWeight(Number(e.target.value))}
                placeholder="Weight %"
                className="glass-input w-20 text-xs py-1.5"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-all"
            >
              Publish Opportunity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
