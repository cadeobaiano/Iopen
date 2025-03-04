import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { useAnalytics } from '../hooks/useAnalytics';

interface AnalyticsLinkProps extends LinkProps {
  trackId: string;
  component?: string;
  action?: string;
  trackMetadata?: Record<string, any>;
  external?: boolean;
}

/**
 * Link que automaticamente rastreia cliques para análise
 */
const AnalyticsLink: React.FC<AnalyticsLinkProps> = ({
  trackId,
  component,
  action = 'click',
  trackMetadata = {},
  onClick,
  children,
  external,
  to,
  ...linkProps
}) => {
  const { createClickHandler } = useAnalytics();

  // Combina o handler de clique personalizado com o handler de analytics
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Chama o handler de clique original, se existir
    if (onClick) {
      onClick(event);
    }
    
    // O rastreamento já é feito pelo createClickHandler
  };

  // Cria um handler de clique que rastreia o evento
  const trackingHandler = createClickHandler(trackId, component, action, {
    ...trackMetadata,
    destination: to.toString(),
    external: !!external
  });

  // Combina os dois handlers
  const combinedClickHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    handleClick(event);
    trackingHandler(event);
  };

  // Se for um link externo, usar um elemento <a> normal
  if (external && typeof to === 'string') {
    return (
      <a
        href={to}
        onClick={combinedClickHandler as any}
        data-track-id={trackId}
        data-track-component={component}
        data-track-action={action}
        target="_blank"
        rel="noopener noreferrer"
        {...(linkProps as any)}
      >
        {children}
      </a>
    );
  }

  // Para links internos, usar o componente Link do react-router-dom
  return (
    <Link
      to={to}
      onClick={combinedClickHandler}
      data-track-id={trackId}
      data-track-component={component}
      data-track-action={action}
      {...linkProps}
    >
      {children}
    </Link>
  );
};

export default AnalyticsLink;
