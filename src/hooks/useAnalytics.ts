import { useEffect, useCallback } from 'react';
import { analyticsService } from '../services/analytics';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from 'react-router-dom';

/**
 * Hook para facilitar o uso do serviço de analytics em componentes React
 */
export const useAnalytics = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Inicializa o serviço de analytics e atualiza o userId quando o usuário mudar
  useEffect(() => {
    analyticsService.initialize(user?.id || null);
    analyticsService.setUserId(user?.id || null);
  }, [user]);

  // Rastrear mudanças de página
  useEffect(() => {
    // Quando a localização (URL) mudar, registre uma nova visualização de página
    analyticsService.trackPageView({
      path: location.pathname,
      search: location.search,
      hash: location.hash
    });
  }, [location.pathname, location.search, location.hash]);

  /**
   * Rastreia um clique em botão
   * @param buttonId Identificador único do botão
   * @param component Nome do componente (opcional)
   * @param action Ação realizada (padrão: 'click')
   * @param metadata Metadados adicionais (opcional)
   */
  const trackButtonClick = useCallback(
    (
      buttonId: string,
      component: string = '',
      action: string = 'click',
      metadata: Record<string, any> = {}
    ) => {
      analyticsService.trackButtonClick(buttonId, component, action, metadata);
    },
    []
  );

  /**
   * Rastreia um evento personalizado
   * @param eventName Nome do evento
   * @param category Categoria do evento
   * @param metadata Metadados adicionais (opcional)
   */
  const trackEvent = useCallback(
    (
      eventName: string,
      category: string,
      metadata: Record<string, any> = {}
    ) => {
      analyticsService.trackEvent(eventName, category, metadata);
    },
    []
  );

  /**
   * Rastreia uma visualização de página manualmente
   * @param metadata Metadados adicionais (opcional)
   */
  const trackPageView = useCallback(
    (metadata: Record<string, any> = {}) => {
      analyticsService.trackPageView(metadata);
    },
    []
  );

  /**
   * Cria um handler de clique para um botão específico
   * @param buttonId Identificador único do botão
   * @param component Nome do componente (opcional)
   * @param action Ação realizada (padrão: 'click')
   * @param metadata Metadados adicionais (opcional)
   * @returns Uma função de handler que pode ser passada para onClick
   */
  const createClickHandler = useCallback(
    (
      buttonId: string,
      component: string = '',
      action: string = 'click',
      metadata: Record<string, any> = {}
    ) => {
      return (event: React.MouseEvent) => {
        // Captura metadados adicionais do evento
        const target = event.currentTarget as HTMLElement;
        const dynamicMetadata = {
          ...metadata,
          tagName: target.tagName.toLowerCase(),
          className: target.className,
          id: target.id || undefined,
          text: (target.textContent || '').trim().substring(0, 50) || undefined
        };

        // Rastreia o clique
        analyticsService.trackButtonClick(buttonId, component, action, dynamicMetadata);
      };
    },
    []
  );

  /**
   * Cria um handler para rastrear eventos personalizados
   * @param eventName Nome do evento
   * @param category Categoria do evento
   * @param metadata Metadados adicionais (opcional)
   * @returns Uma função de handler que pode ser passada para qualquer evento
   */
  const createEventHandler = useCallback(
    (
      eventName: string,
      category: string,
      metadata: Record<string, any> = {}
    ) => {
      return (event: React.SyntheticEvent) => {
        // Captura metadados adicionais do evento
        const target = event.currentTarget as HTMLElement;
        const dynamicMetadata = {
          ...metadata,
          tagName: target.tagName.toLowerCase(),
          className: target.className,
          id: target.id || undefined,
          eventType: event.type
        };

        // Rastreia o evento
        analyticsService.trackEvent(eventName, category, dynamicMetadata);
      };
    },
    []
  );

  return {
    trackButtonClick,
    trackEvent,
    trackPageView,
    createClickHandler,
    createEventHandler
  };
};
