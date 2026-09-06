import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/Toast';
import { HeroSection } from './components/landing/HeroSection';
import { AssessmentWizard } from './components/assessment/AssessmentWizard';
import { StudentDashboard } from './components/student/StudentDashboard';
import { AcademicianDashboard } from './components/academician/AcademicianDashboard';
import { IndustryDashboard } from './components/industry/IndustryDashboard';
import { InstitutionDashboard } from './components/institution/InstitutionDashboard';
import { JobBoardPage } from './components/jobs/JobBoardPage';
import { LearningMarketplacePage } from './components/learning/LearningMarketplacePage';
import { PublicPortfolioPage } from './components/portfolio/PublicPortfolioPage';
import { AnalyticsPage } from './components/analytics/AnalyticsPage';
import { AuthPage } from './components/auth/AuthPage';
import { JobDetailModal } from './components/jobs/JobDetailModal';

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
        {renderCurrentPage()}
      </main>

      {/* Global Modals & Notifications */}
      <JobDetailModal />
      <ToastContainer />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainApp;
