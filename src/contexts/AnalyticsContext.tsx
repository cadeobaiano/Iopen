import React, { createContext, useContext, ReactNode } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

// Definir a interface do contexto de analytics
interface AnalyticsContextType {
  trackButtonClick: (buttonId: string, component?: string, action?: string, metadata?: Record<string, any>) => void;
  trackEvent: (eventName: string, category: string, metadata?: Record<string, any>) => void;
  trackPageView: (metadata?: Record<string, any>) => void;
  createClickHandler: (buttonId: string, component?: string, action?: string, metadata?: Record<string, any>) => (event: React.MouseEvent) => void;
  createEventHandler: (eventName: string, category: string, metadata?: Record<string, any>) => (event: React.SyntheticEvent) => void;
}

// Criar o contexto
const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

// Props para o componente provider
interface AnalyticsProviderProps {
  children: ReactNode;
}

/**
 * Provider para o contexto de analytics
 */
export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  // Usar o hook useAnalytics para obter os métodos de rastreamento
  const analytics = useAnalytics();

  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  );
};

/**
 * Hook para usar o contexto de analytics
 */
export const useAnalyticsContext = (): AnalyticsContextType => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalyticsContext deve ser usado dentro de um AnalyticsProvider');
  }
  return context;
}; 