import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InvestmentPage from './pages/InvestmentPage';
// import ChatPage from './pages/ChatPage'; // Comentando importação que não existe
import BusinessPage from './pages/BusinessPage';
import LearningPage from './pages/LearningPage';
import AboutPage from './pages/AboutPage';
import InsightsReport from './pages/InsightsReport';
// import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import { analyticsService } from './services/analytics';
import AnalyticsExample from './components/AnalyticsExample';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import IopChatPage from './pages/IopChatPage';
import MaintenancePage from './pages/MaintenancePage';
import { useAuth } from './contexts/AuthContext';
import AnalyticsDashboard from './pages/AnalyticsDashboard';

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  
  // Inicializar o sistema de analytics e rastrear mudanças de página
  useEffect(() => {
    // Inicializar o serviço de analytics com o ID do usuário
    analyticsService.initialize(user?.id || null);
    
    // A visualização de página é tratada automaticamente pelo useEffect no useAnalytics
    console.log('AppRoutes: Página atual', location.pathname);
  }, [user?.id]);
  
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/investir" element={<InvestmentPage />} />
      {/* Removendo rota do chat que não existe */}
      {/* <Route path="/chat" element={<ChatPage />} /> */}
      <Route path="/negocio" element={<BusinessPage />} />
      <Route path="/aprendizagem" element={<LearningPage />} />
      <Route path="/quem-somos" element={<AboutPage />} />
      <Route path="/insights" element={<InsightsReport />} />
      <Route path="/analytics-exemplo" element={<AnalyticsExample />} />
      
      {/* Painel de Analytics */}
      <Route path="/analytics-dashboard" element={
        <ProtectedRoute>
          <AnalyticsDashboard />
        </ProtectedRoute>
      } />
      
      {/* Páginas de autenticação */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      
      {/* Página de manutenção */}
      <Route path="/manutencao" element={<MaintenancePage />} />
      
      {/* Páginas de chat */}
      <Route path="/chat" element={
        <ProtectedRoute>
          <IopChatPage />
        </ProtectedRoute>
      } />
      <Route path="/chat-iop" element={
        <ProtectedRoute>
          <IopChatPage />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default AppRoutes;