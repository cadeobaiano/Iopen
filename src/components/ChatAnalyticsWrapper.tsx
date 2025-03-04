import React, { useEffect } from 'react';
import { useAnalyticsContext } from '../contexts/AnalyticsContext';

interface ChatAnalyticsWrapperProps {
  children: React.ReactNode;
  chatStage?: string;
  userId?: string;
}

/**
 * Componente wrapper que adiciona rastreamento de eventos para o chat
 */
const ChatAnalyticsWrapper: React.FC<ChatAnalyticsWrapperProps> = ({ 
  children, 
  chatStage, 
  userId 
}) => {
  const { trackEvent } = useAnalyticsContext();

  // Rastrear quando o componente de chat é montado
  useEffect(() => {
    trackEvent('chat_opened', 'chat', {
      chatStage,
      userId,
      timestamp: new Date().toISOString()
    });

    // Rastrear quando o componente de chat é desmontado
    return () => {
      trackEvent('chat_closed', 'chat', {
        chatStage,
        userId,
        timestamp: new Date().toISOString()
      });
    };
  }, [trackEvent, chatStage, userId]);

  // Rastrear mudanças no estágio do chat
  useEffect(() => {
    if (chatStage) {
      trackEvent('chat_stage_changed', 'chat', {
        chatStage,
        userId,
        timestamp: new Date().toISOString()
      });
    }
  }, [trackEvent, chatStage, userId]);

  return (
    <div className="chat-analytics-wrapper">
      {children}
    </div>
  );
};

export default ChatAnalyticsWrapper; 