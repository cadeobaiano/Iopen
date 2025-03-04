import React from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

/**
 * Opções para o HOC withAnalytics
 */
interface WithAnalyticsOptions {
  trackId: string;
  component?: string;
  action?: string;
  trackMetadata?: Record<string, any>;
  eventPropName?: string;
}

/**
 * HOC que adiciona rastreamento de analytics a qualquer componente
 * @param WrappedComponent Componente a ser envolvido
 * @param options Opções de rastreamento
 */
export function withAnalytics<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithAnalyticsOptions
) {
  const {
    trackId,
    component,
    action = 'click',
    trackMetadata = {},
    eventPropName = 'onClick'
  } = options;

  // Nome para exibição no React DevTools
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  // Componente envolvido com analytics
  const WithAnalyticsComponent = (props: P & { [key: string]: any }) => {
    const { createClickHandler } = useAnalytics();

    // Obtém o handler de evento original
    const originalHandler = props[eventPropName];

    // Cria um handler de clique que rastreia o evento
    const trackingHandler = createClickHandler(trackId, component, action, trackMetadata);

    // Combina os dois handlers
    const combinedHandler = (event: React.SyntheticEvent) => {
      if (originalHandler) {
        originalHandler(event);
      }
      trackingHandler(event as React.MouseEvent);
    };

    // Cria props modificadas com o handler combinado
    const modifiedProps = {
      ...props,
      [eventPropName]: combinedHandler,
      'data-track-id': trackId,
      'data-track-component': component,
      'data-track-action': action
    };

    return <WrappedComponent {...(modifiedProps as P)} />;
  };

  WithAnalyticsComponent.displayName = `withAnalytics(${displayName})`;

  return WithAnalyticsComponent;
}

export default withAnalytics;
