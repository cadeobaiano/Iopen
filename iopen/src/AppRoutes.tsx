import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InvestmentPage from './pages/InvestmentPage';
import ChatPage from './pages/ChatPage';
import BusinessPage from './pages/BusinessPage';
import LearningPage from './pages/LearningPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import LoginChat from './pages/LoginChat';
import InsightsReport from './pages/InsightsReport';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import { analyticsService } from './services/analytics';
import AnalyticsExample from './components/AnalyticsExample';

const AppRoutes: React.FC = () => {
  const location = useLocation();
  
  // Track page changes when route changes
  useEffect(() => {
    // Record the previous page visit if there was one
    // and start tracking the new page
    analyticsService.trackPageEntry();
  }, [location.pathname]);
  
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/investir" element={<InvestmentPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/negocio" element={<BusinessPage />} />
      <Route path="/aprendizagem" element={<LearningPage />} />
      <Route path="/quem-somos" element={<AboutPage />} />
      <Route path="/perfil" element={<ProfilePage />} />
      <Route path="/login-triagem" element={<LoginChat />} />
      <Route path="/insights" element={<InsightsReport />} />
      <Route path="/analytics-exemplo" element={<AnalyticsExample />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default AppRoutes;