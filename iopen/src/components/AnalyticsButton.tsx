import React from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

interface AnalyticsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  trackId: string;
  component?: string;
  action?: string;
  trackMetadata?: Record<string, any>;
}

/**
 * Botão que automaticamente rastreia cliques para análise
 */
const AnalyticsButton: React.FC<AnalyticsButtonProps> = ({
  trackId,
  component,
  action = 'click',
  trackMetadata = {},
  onClick,
  children,
  ...buttonProps
}) => {
  const { createClickHandler } = useAnalytics();

  // Combina o handler de clique personalizado com o handler de analytics
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Chama o handler de clique original, se existir
    if (onClick) {
      onClick(event);
    }
    
    // O rastreamento já é feito pelo createClickHandler
  };

  // Cria um handler de clique que rastreia o evento
  const trackingHandler = createClickHandler(trackId, component, action, trackMetadata);

  // Combina os dois handlers
  const combinedClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleClick(event);
    trackingHandler(event);
  };

  return (
    <button
      onClick={combinedClickHandler}
      data-track-id={trackId}
      data-track-component={component}
      data-track-action={action}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default AnalyticsButton;
