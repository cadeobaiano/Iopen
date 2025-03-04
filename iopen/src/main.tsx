import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import './index.css';
import './styles/custom.css';
import { analyticsService } from './services/analytics';
import { AuthProvider } from './contexts/AuthContext';
import MobileOptimizer from './components/MobileOptimizer';

// Verificar se o analytics está funcionando
console.log('Analytics Service disponível:', !!analyticsService);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MobileOptimizer />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);