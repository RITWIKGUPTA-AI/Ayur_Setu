import React, { useState, useRef, useEffect } from 'react';
import { useApp, PageId } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  Home, 
  LayoutDashboard, 
  Sparkles, 
  Briefcase, 
  BookOpen, 
  Award, 
  BarChart3, 
  Bell, 
  Menu, 
  X, 
  ChevronDown, 
  CheckCircle2, 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  ArrowRight,
  Zap
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { role, setRole, page, setPage, studentProfile, applications } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setShowMoreMenu(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(event.target as Node)) {
        setShowNotificationMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 4 Core, clean navigation links
  const primaryNavItems: { id: PageId; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'landing', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'assessment', label: 'Skill Assessment', icon: <Sparkles className="w-4 h-4 text-amber-600" />, badge: 'AI' },
    { id: 'jobs', label: 'Internships', icon: <Briefcase className="w-4 h-4" /> }
  ];

  // Secondary links housed neatly under "More"
  const secondaryNavItems: { id: PageId; label: string; desc: string; icon: React.ReactNode }[] = [
    { id: 'learning', label: 'Bridge Programs', desc: 'Curriculum-aligned industry courses', icon: <BookOpen className="w-4 h-4 text-blue-700" /> },
    { id: 'portfolio', label: 'Digital Portfolio', desc: 'Verifiable credentials & badge showcase', icon: <Award className="w-4 h-4 text-emerald-700" /> },
    { id: 'analytics', label: 'Skill Intelligence', desc: 'Regional supply-demand radar heatmaps', icon: <BarChart3 className="w-4 h-4 text-amber-700" /> }
  ];

  const roleConfigs: Record<UserRole, { label: string; shortLabel: string; name: string; avatar: string; color: string; activeClass: string }> = {
    student: {
      label: 'Sakshi (Student)',
      shortLabel: 'Student',
      name: studentProfile.name,
      avatar: studentProfile.avatar,
      color: 'text-blue-800 bg-blue-50 border-blue-200',
      activeClass: 'bg-blue-700 text-white border-blue-800 shadow-xs'
    },
    academician: {
      label: 'Dr. Shalini (Faculty)',
      shortLabel: 'Faculty',
      name: 'Dr. Shalini Mukherjee',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      activeClass: 'bg-emerald-700 text-white border-emerald-800 shadow-xs'
    },
    industry: {
      label: 'Cisco (Recruiter)',
      shortLabel: 'Industry',
      name: 'Cisco Talent Network',
      avatar: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&auto=format&fit=crop&q=80',
      color: 'text-amber-900 bg-amber-50 border-amber-200',
      activeClass: 'bg-amber-600 text-white border-amber-700 shadow-xs'
    },
    institution: {
      label: 'NIT Trichy (Admin)',
      shortLabel: 'Admin',
      name: 'NIT Trichy Admin Cell',
      avatar: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=150&auto=format&fit=crop&q=80',
      color: 'text-purple-800 bg-purple-50 border-purple-200',
      activeClass: 'bg-indigo-800 text-white border-indigo-900 shadow-xs'
    }
  };

  const currentRoleConfig = roleConfigs[role];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-xs">
      {/* 1. Official Government Top Strip with Integrated Persona Switcher */}
      <div className="bg-slate-900 text-white text-[11px] py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Official Emblem & Ministry Info */}
          <div className="flex items-center gap-2.5">
            <span className="font-bold tracking-wide text-slate-100 flex items-center gap-1.5">
              <span>🇮🇳</span>
              <span>भारत सरकार | Government of India</span>
            </span>
            <span className="hidden lg:inline text-slate-500">|</span>
            <span className="hidden lg:inline text-slate-300">
              Ministry of AYUSH & AIIA Initiative
            </span>
          </div>

          {/* Clean Integrated Persona Switcher (Single click for Hackathon Judges & Users) */}
          <div className="flex items-center gap-1.5">
            <span className="hidden sm:inline text-slate-400 text-[11px] mr-1 font-medium">Switch Persona:</span>
            <div className="inline-flex rounded-lg bg-slate-800/80 p-0.5 border border-slate-700">
              {(['student', 'academician', 'industry', 'institution'] as UserRole[]).map((r) => {
                const isActive = role === r;
                const cfg = roleConfigs[r];
                return (
                  <button
                    key={r}
                    onClick={() => {
                      setRole(r);
                      if (page === 'landing' || page === 'login') {
                        setPage('dashboard');
                      }
                    }}
                    className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold transition-all ${
                      isActive
                        ? `${cfg.activeClass} font-bold`
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                    }`}
                  >
                    {cfg.shortLabel}
                  </button>
                );
              })}
            </div>
            <span className="hidden md:inline text-[10px] px-1.5 py-0.5 bg-blue-900/80 text-blue-200 border border-blue-700 rounded font-mono font-bold ml-1">
              SIH-2026
            </span>
          </div>
        </div>
      </div>

      {/* 2. Tricolor Accent Ribbon */}
      <div className="gov-tricolor-strip" />

      {/* 3. Main Navigation Bar (Clean, Uncluttered, Easy to use) */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Left: National Portal Brand Logo */}
            <div 
              onClick={() => setPage('landing')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              {/* Ashoka Insignia Emblem Badge */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-900 text-white p-2 shadow-xs flex items-center justify-center shrink-0 border border-blue-950 group-hover:scale-102 transition-transform">
                <svg className="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
                  <line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" strokeWidth="1.2" />
                  <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.2" />
                  <line x1="5.6" y1="5.6" x2="18.4" y2="18.4" stroke="currentColor" strokeWidth="1.2" />
                  <line x1="5.6" y1="18.4" x2="18.4" y2="5.6" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base sm:text-lg tracking-tight text-blue-950 leading-tight">
                    Ayur<span className="text-amber-700">Setu</span>
                  </span>
                  <span className="text-[9px] uppercase font-bold tracking-wider whitespace-nowrap px-1.5 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200">
                    GOVT OF INDIA
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                  Academia–Industry Collaboration Framework
                </p>
              </div>
            </div>

            {/* Center: 4 Core Navigation Items (Clutter-Free) */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {primaryNavItems.map((item) => {
                const active = page === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setPage(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      active
                        ? 'bg-blue-50 text-blue-900 border border-blue-200 shadow-2xs font-bold'
                        : 'text-slate-700 hover:text-blue-900 hover:bg-slate-100'
                    }`}
                  >
                    {item.icon}
                    <span className="whitespace-nowrap">{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* "More" dropdown for secondary options */}
              <div className="relative" ref={moreMenuRef}>
                <button
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                  className={`flex items-center gap-1 px-2.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    ['learning', 'portfolio', 'analytics'].includes(page)
                      ? 'bg-blue-50 text-blue-900 border border-blue-200 font-bold'
                      : 'text-slate-700 hover:text-blue-900 hover:bg-slate-100'
                  }`}
                >
                  <span>More</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${showMoreMenu ? 'rotate-180' : ''}`} />
                </button>

                {showMoreMenu && (
                  <div className="absolute left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-lg p-2 z-50 animate-in fade-in zoom-in-95">
                    {secondaryNavItems.map((sec) => (
                      <button
                        key={sec.id}
                        onClick={() => {
                          setPage(sec.id);
                          setShowMoreMenu(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-lg flex items-start gap-3 transition-colors ${
                          page === sec.id ? 'bg-blue-50 text-blue-900' : 'hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <div className="p-1.5 rounded-md bg-slate-100 mt-0.5">{sec.icon}</div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{sec.label}</div>
                          <div className="text-[11px] text-slate-500 leading-tight">{sec.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Right: Quick Action, Notifications, User Persona */}
            <div className="flex items-center gap-3">
              {/* Notification Bell */}
              <div className="relative" ref={notifMenuRef}>
                <button
                  onClick={() => setShowNotificationMenu(!showNotificationMenu)}
                  className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:text-blue-900 hover:bg-slate-100 transition-colors relative shadow-2xs"
                  title="Official Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
                </button>

                {showNotificationMenu && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 text-slate-800">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="font-bold text-xs text-blue-950">Official Updates & Alerts</span>
                      <span className="text-[10px] text-blue-700 font-semibold">{applications.length} Updates</span>
                    </div>
                    <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
                      <div className="p-2.5 bg-blue-50/60 rounded-lg border border-blue-100 text-xs">
                        <div className="flex items-center justify-between text-blue-900 font-bold text-[11px]">
                          <span>Dabur India Ltd.</span>
                          <span className="text-slate-400 font-normal">2h ago</span>
                        </div>
                        <p className="text-slate-700 mt-0.5">Application shortlisted for Round 1 Technical Screen.</p>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                        <div className="flex items-center justify-between text-amber-800 font-bold text-[11px]">
                          <span>Ministry of AYUSH & Pharmexcil</span>
                          <span className="text-slate-400 font-normal">Yesterday</span>
                        </div>
                        <p className="text-slate-700 mt-0.5">New Distributed Systems Bridge course credited to your profile.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Active Profile Pill (Sakshi Sharma / Dr. Shalini / etc.) */}
              <div 
                onClick={() => {
                  if (role === 'student') setPage('portfolio');
                  else setPage('dashboard');
                }}
                className="flex items-center gap-2.5 pl-2 pr-3 py-1 rounded-full border border-slate-200 hover:border-blue-400 bg-slate-50/80 hover:bg-slate-100/80 cursor-pointer transition-all shadow-2xs select-none"
                title="View Profile / Credentials"
              >
                <div className="relative">
                  <img
                    src={currentRoleConfig.avatar}
                    alt={currentRoleConfig.name}
                    className="w-7 h-7 rounded-full object-cover border border-slate-300 shadow-2xs"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-600 border border-white flex items-center justify-center text-white" title="Verified">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                  </div>
                </div>
                <div className="hidden sm:block text-left leading-none">
                  <div className="text-xs font-bold text-slate-900 leading-tight flex items-center gap-1">
                    <span>{currentRoleConfig.name}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                    {currentRoleConfig.shortLabel}
                  </div>
                </div>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-slate-100 text-slate-700 hover:text-slate-900"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-md">
            {primaryNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setPage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold ${
                  page === item.id
                    ? 'bg-blue-50 text-blue-900 border border-blue-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}

            <div className="pt-2 border-t border-slate-100 mt-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 pb-1">
                More Modules
              </div>
              {secondaryNavItems.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    setPage(sec.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold ${
                    page === sec.id ? 'bg-blue-50 text-blue-900' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {sec.icon}
                  <span>{sec.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
