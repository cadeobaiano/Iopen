import React, { useRef, useEffect } from 'react';
import { Send, Bot, MessageSquareText } from 'lucide-react';
import MessageBubble from './MessageBubble';
import { Message } from '../hooks/useChatMessages';
import { analyticsService } from '../services/analytics';

interface ChatInterfaceProps {
  messages: Message[];
  inputMessage: string;
  setInputMessage: (message: string) => void;
  sendMessage: () => void;
  isTyping: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  inputMessage,
  setInputMessage,
  sendMessage,
  isTyping
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendClick = () => {
    // Rastrear clique no botão de envio
    console.log("Botão de envio clicado");
    analyticsService.trackButtonClick(
      'send-button',
      'ChatInterface',
      'click',
      { has_content: inputMessage.trim().length > 0 }
    );
    
    sendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      
      // Rastrear uso da tecla Enter
      console.log("Tecla Enter pressionada");
      analyticsService.trackButtonClick(
        'enter-key',
        'ChatInterface',
        'keypress',
        { has_content: inputMessage.trim().length > 0 }
      );
      
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-4 flex items-center">
        <div className="mr-3 rounded-full bg-white/20 p-2 shadow-sm">
          <MessageSquareText size={24} className="text-white" />
        </div>
        <div>
          <h2 className="font-bold text-xl">Chat Iopen</h2>
          <p className="text-sm opacity-80">Converse conosco antes de criar sua conta</p>
        </div>
      </div>
      
      <div className="flex-grow h-[500px] overflow-y-auto p-4 bg-gray-50 custom-scrollbar shadow-inner">
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <div className="flex items-start max-w-[80%]">
            <div className="flex-shrink-0 mr-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-md">
                <Bot size={20} />
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-3 rounded-tl-none shadow-sm">
              <div className="flex space-x-1">
                <div className="bg-gray-300 rounded-full h-2 w-2 animate-bounce"></div>
                <div className="bg-gray-300 rounded-full h-2 w-2 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="bg-gray-300 rounded-full h-2 w-2 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 bg-white border-t border-gray-200 shadow-sm">
        <div className="flex items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Digite sua mensagem aqui..."
            className="flex-grow p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isTyping}
          />
          <button
            onClick={handleSendClick}
            disabled={isTyping || !inputMessage.trim()}
            className={`p-3 rounded-r-lg transition ${
              isTyping || !inputMessage.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
