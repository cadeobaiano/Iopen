import { useEffect, useCallback } from 'react';
import { analyticsService } from '../services/analytics';
import { useAuth } from '../contexts/AuthContext';

/**
 * Hook para facilitar o uso do serviço de analytics em componentes React
 */
export const useAnalytics = () => {
  const { user } = useAuth();

  // Inicializa o serviço de analytics e atualiza o userId quando o usuário mudar
  useEffect(() => {
    analyticsService.initialize(user?.id || null);
    analyticsService.setUserId(user?.id || null);
  }, [user]);

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

  return {
    trackButtonClick,
    createClickHandler
  };
};
