import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { apiService } from '../services/api';
import { analyticsService } from '../services/analytics';

// Define message types
export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [registrationEnabled, setRegistrationEnabled] = useState(false);

  // Reset conversation and add welcome message on init
  useEffect(() => {
    // Reset any previous conversation state
    apiService.resetConversation();
    
    setMessages([
      {
        id: uuidv4(),
        role: 'assistant',
        content: 'Olá, eu sou o **IOP**, o especialista de investimentos do futuro. Antes de descobrirmos a nota da sua carteira, preciso conhecer um pouco mais sobre você. Mas não se preocupe: **é rápido e terminaremos antes mesmo de você conseguir pronunciar meu nome!** A **Iopen** revela como os bancos exploram seus clientes e propõe duas estratégias de investimento: **crescimento patrimonial** (com ETFs e títulos) e **objetivos específicos** (como aposentadoria). A missão é oferecer uma **gestão transparente e eficiente**, com suporte humano disponível. Vamos começar?',
        timestamp: new Date()
      }
    ]);
    
    // Rastrear visualização da página
    analyticsService.trackPageEntry();
  }, []);

  // Detect investment plan from conversation
  const detectPlan = (content: string) => {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('básico') || lowerContent.includes('basico') || lowerContent.includes('iniciante')) {
      return 'básico';
    } else if (lowerContent.includes('intermediário') || lowerContent.includes('intermediario') || lowerContent.includes('médio') || lowerContent.includes('medio')) {
      return 'intermediário';
    } else if (lowerContent.includes('avançado') || lowerContent.includes('avancado') || lowerContent.includes('premium')) {
      return 'avançado';
    }
    
    return null;
  };

  // Send message
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = {
      id: uuidv4(),
      role: 'user' as MessageRole,
      content: inputMessage,
      timestamp: new Date()
    };
    
    // Guardar mensagem para usar depois
    const currentInputMessage = inputMessage;
    
    // Atualizar a UI imediatamente
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Rastrear evento de envio de mensagem
    analyticsService.trackButtonClick(
      'send-message',
      'ChatInterface',
      'message_sent',
      { message_content_length: currentInputMessage.length }
    );
    
    // Check if user mentioned a plan
    const detectedPlan = detectPlan(userMessage.content);
    if (detectedPlan && !selectedPlan) {
      setSelectedPlan(detectedPlan);
    }
    
    try {
      console.log('Sending message to API:', userMessage.content);
      
      // Format messages for API
      const messageHistory = messages
        .concat(userMessage)
        .filter(msg => msg.role !== 'system')
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));
      
      // Get AI response
      const response = await apiService.getAiResponse(messageHistory);
      console.log('Received response from API:', response);
      
      // Add response to messages
      const assistantMessage = {
        id: uuidv4(),
        role: 'assistant' as MessageRole,
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Check if this message should enable registration
      // In a real app, you might have more sophisticated logic
      if (messages.length >= 2) {
        setRegistrationEnabled(true);
      }
      
      // Rastrear evento de resposta recebida
      analyticsService.trackButtonClick(
        'assistant-response',
        'ChatInterface',
        'response_received',
        { message_content_length: response.length }
      );
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Add fallback message
      setMessages(prev => [
        ...prev,
        {
          id: uuidv4(),
          role: 'assistant',
          content: 'Desculpe, estou tendo dificuldades para processar sua solicitação. Poderia tentar novamente?',
          timestamp: new Date()
        }
      ]);
      
      // Rastrear evento de erro
      analyticsService.trackButtonClick(
        'assistant-error',
        'ChatInterface',
        'error',
        { error_type: 'api_failure' }
      );
    } finally {
      setIsTyping(false);
    }
  };

  return {
    messages,
    inputMessage,
    isTyping,
    selectedPlan,
    registrationEnabled,
    setInputMessage,
    sendMessage
  };
};
