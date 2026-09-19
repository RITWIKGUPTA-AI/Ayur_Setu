import React, { Suspense, lazy } from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/Toast';
import { HeroSection } from './components/landing/HeroSection';
import { PageLoader } from './components/common/PageLoader';

// Everything below is loaded on demand (React.lazy) rather than bundled into the
// initial page load. The landing page (HeroSection, imported eagerly above) is what
// most visitors — and hackathon judges — see first, so keeping it in the main bundle
// avoids a loading flash there, while every dashboard/tool route below is split into
// its own small chunk and fetched only when that role/page is actually opened.
const AssessmentWizard = lazy(() => import('./components/assessment/AssessmentWizard').then(m => ({ default: m.AssessmentWizard })));
const StudentDashboard = lazy(() => import('./components/student/StudentDashboard').then(m => ({ default: m.StudentDashboard })));
const AcademicianDashboard = lazy(() => import('./components/academician/AcademicianDashboard').then(m => ({ default: m.AcademicianDashboard })));
const IndustryDashboard = lazy(() => import('./components/industry/IndustryDashboard').then(m => ({ default: m.IndustryDashboard })));
const InstitutionDashboard = lazy(() => import('./components/institution/InstitutionDashboard').then(m => ({ default: m.InstitutionDashboard })));
const JobBoardPage = lazy(() => import('./components/jobs/JobBoardPage').then(m => ({ default: m.JobBoardPage })));
const LearningMarketplacePage = lazy(() => import('./components/learning/LearningMarketplacePage').then(m => ({ default: m.LearningMarketplacePage })));
const PublicPortfolioPage = lazy(() => import('./components/portfolio/PublicPortfolioPage').then(m => ({ default: m.PublicPortfolioPage })));
const AnalyticsPage = lazy(() => import('./components/analytics/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })));
const AuthPage = lazy(() => import('./components/auth/AuthPage').then(m => ({ default: m.AuthPage })));
const JobDetailModal = lazy(() => import('./components/jobs/JobDetailModal').then(m => ({ default: m.JobDetailModal })));

export const MainApp: React.FC = () => {
  const { page, role } = useApp();

  const renderCurrentPage = () => {
    switch (page) {
      case 'landing':
        return <HeroSection />;
      case 'assessment':
        return <AssessmentWizard />;
      case 'jobs':
        return <JobBoardPage />;
      case 'learning':
        return <LearningMarketplacePage />;
      case 'portfolio':
        return <PublicPortfolioPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'login':
        return <AuthPage />;
      case 'dashboard':
      default:
        switch (role) {
          case 'student':
            return <StudentDashboard />;
          case 'academician':
            return <AcademicianDashboard />;
          case 'industry':
            return <IndustryDashboard />;
          case 'institution':
            return <InstitutionDashboard />;
          default:
            return <StudentDashboard />;
        }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 selection:bg-blue-700 selection:text-white relative">
      {/* Subtle Government Seal Watermark Texture in Background */}
      <div className="gov-watermark-overlay" />

      {/* Unified Government Navbar with Integrated Stakeholder Switcher */}
      <Navbar />

      {/* Main Content View */}
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          {renderCurrentPage()}
        </Suspense>
      </main>

      {/* Global Modals & Notifications */}
      <Suspense fallback={null}>
        <JobDetailModal />
      </Suspense>
      <ToastContainer />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainApp;

