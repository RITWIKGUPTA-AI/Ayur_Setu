import React from 'react';
import { Leaf } from 'lucide-react';

/**
 * Shown briefly while a lazy-loaded route chunk (dashboards, assessment wizard, etc.)
 * is being fetched. Kept on-brand with the rest of the shell (herbal pine palette,
 * tricolor accent) so the loading moment doesn't feel like a generic spinner dropped
 * into an otherwise considered UI.
 */
export const PageLoader: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6">
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Leaf className="w-5 h-5 text-blue-700" />
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-slate-700">Loading AyurSetu…</p>
        <p className="text-xs text-slate-400 mt-0.5">Just a moment</p>
      </div>
      <div className="w-24 gov-tricolor-strip rounded-full opacity-70" />
    </div>
  );
};

export default PageLoader;
