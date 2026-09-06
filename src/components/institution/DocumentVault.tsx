import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  Search, 
  Filter, 
  Lock, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface VerifiedDocument {
  id: string;
  title: string;
  studentName: string;
  studentRoll: string;
  type: 'Internship NOC' | 'Skill Certificate' | 'Placement Verification' | 'Academic Transcript';
  issuer: string;
  issueDate: string;
  verificationHash: string;
  status: 'Verified on Blockchain / Vault' | 'Pending Dean Signoff';
}

export const DocumentVault: React.FC = () => {
  const { addToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const documents: VerifiedDocument[] = [
    {
      id: 'doc-001',
      title: '6-Month Industry Internship NOC (Dabur India Ltd.)',
      studentName: 'Sakshi Sharma',
      studentRoll: '22CS894',
      type: 'Internship NOC',
      issuer: 'Dean of Academic Affairs',
      issueDate: '28 Feb 2026',
      verificationHash: '0x8f9a2b71c4e9d3a1',
      status: 'Verified on Blockchain / Vault'
    },
    {
      id: 'doc-002',
      title: 'Advanced Distributed Systems Mastery Certificate',
      studentName: 'Sakshi Sharma',
      studentRoll: '22CS894',
      type: 'Skill Certificate',
      issuer: 'CSIR-National Botanical Research Institute',
      issueDate: '15 Jan 2026',
      verificationHash: '0x3c5e8812af7809cb',
      status: 'Verified on Blockchain / Vault'
    },
    {
      id: 'doc-003',
      title: 'Generative AI & Agentic Systems Capstone Report',
      studentName: 'Pooja Venkatesh',
      studentRoll: '22AI104',
      type: 'Skill Certificate',
      issuer: 'Indian Pharmacopoeia Commission (IPC)',
      issueDate: '10 Feb 2026',
      verificationHash: '0x7e29ab01889cdef4',
      status: 'Verified on Blockchain / Vault'
    },
    {
      id: 'doc-004',
      title: 'Summer Internship Completion Letter (Himalaya Wellness)',
      studentName: 'Rohan Deshmukh',
      studentRoll: '22IT332',
      type: 'Placement Verification',
      issuer: 'Himalaya Wellness HR Operations',
      issueDate: '01 Aug 2025',
      verificationHash: '0x11ab4499ff3366cc',
      status: 'Verified on Blockchain / Vault'
    }
  ];

  const handleDownload = (doc: VerifiedDocument) => {
    addToast({
      title: 'Cryptographic Document Exported',
      message: `Exported "${doc.title}" with National QR verification stamp.`,
      type: 'success'
    });
  };

  const filtered = documents.filter(d => 
    d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-blue-950 flex items-center gap-2">
            <Lock className="w-5 h-5 text-purple-700" />
            <span>Institutional Verified Credential & Document Vault</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Tamper-evident academic records, automated NOC generation, and verified company completion certificates
          </p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search documents or student name..."
            className="glass-input pl-9 pr-4 py-2 text-xs w-60 sm:w-72"
          />
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((doc) => (
          <div key={doc.id} className="bg-white p-5 border border-slate-200 rounded-xl shadow-xs space-y-4 hover:border-slate-300 transition-all">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 text-purple-800 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-blue-950 leading-snug">{doc.title}</h4>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Student: <strong className="text-slate-800">{doc.studentName}</strong> ({doc.studentRoll})
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-[11px] text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-500">Issuer / Authority:</span>
                <span className="text-slate-900 font-bold">{doc.issuer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Issue Date:</span>
                <span className="text-slate-800 font-medium">{doc.issueDate}</span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-slate-200">
                <span className="text-slate-500">Verification Hash:</span>
                <span className="font-mono text-blue-900 font-bold text-[10px]">{doc.verificationHash}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{doc.status}</span>
              </span>

              <button
                onClick={() => handleDownload(doc)}
                className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-300 flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
