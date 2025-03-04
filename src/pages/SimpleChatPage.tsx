import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/apiService';
import { supabase } from '../services/supabase';

// Interface para mensagens
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SimpleChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Verifica se o usuário está autenticado
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Adiciona uma mensagem de boas-vindas quando a página carrega
  useEffect(() => {
    if (isAuthenticated && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        role: 'assistant',
        content: 'Olá! Como posso ajudar você hoje?',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isAuthenticated, messages.length]);

  // Rolagem automática para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Função para enviar uma mensagem
  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    // Cria a mensagem do usuário
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    // Atualiza o estado e prepara para enviar à API
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Usar o sessionId como identificador de conversa
      const sessionId = localStorage.getItem('chat_session_id') || Date.now().toString();
      if (!localStorage.getItem('chat_session_id')) {
        localStorage.setItem('chat_session_id', sessionId);
      }

      // Chama a API para obter a resposta usando o novo método
      // Passa o ID do usuário se estiver autenticado
      const response = await apiService.sendMessage(input, sessionId, user?.id);

      // Registra a interação se o usuário estiver autenticado
      if (user && user.id) {
        try {
          const { error } = await supabase
            .from('chat_interactions')
            .upsert({
              user_id: user.id,
              session_id: sessionId,
              created_at: new Date()
            }, { onConflict: 'session_id' });
            
          if (error) console.error('Erro ao registrar interação:', error);
        } catch (err) {
          console.error('Erro ao salvar interação:', err);
        }
      }

      // Cria a mensagem do assistente
      const assistantMessage: Message = {
        id: `response-${Date.now()}`,
        role: 'assistant',
        content: response.message,
        timestamp: new Date()
      };

      // Atualiza as mensagens com a resposta do assistente
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      // Adiciona uma mensagem de erro
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente mais tarde.',
        timestamp: new Date()
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Manipulador para envio de mensagem com a tecla Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Cabeçalho */}
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">IOpen Chat</h1>
          {user && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {user.email}
              </span>
              <button 
                onClick={() => navigate('/')}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Home
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Área de mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-3/4 px-4 py-2 rounded-lg ${
                message.role === 'user'
                  ? 'message-bubble-user text-white'
                  : 'message-bubble-assistant text-gray-800'
              }`}
            >
              <div className="markdown-content">{message.content}</div>
              <div 
                className={`text-xs mt-1 ${
                  message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Área de input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            className="flex-1 resize-none border border-gray-300 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-r-md px-4 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleChatPage; 