import React from 'react';
import { User, Bot } from 'lucide-react';
import { Message } from '../hooks/useChatMessages';
import ReactMarkdown from 'react-markdown';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <div 
      className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex items-start max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
        {message.role === 'assistant' ? (
          <div className="flex-shrink-0 mr-2">
            <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-full shadow-md">
              <Bot size={20} />
            </div>
          </div>
        ) : (
          <div className="flex-shrink-0 ml-2">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full shadow-sm text-blue-600">
              <User size={20} />
            </div>
          </div>
        )}
        
        <div 
          className={`
            p-3 shadow-sm
            ${message.role === 'user' 
              ? 'message-bubble-user text-white' 
              : 'message-bubble-assistant text-gray-800'
            }
          `}
        >
          <div className="leading-relaxed whitespace-pre-wrap markdown-content">
            <ReactMarkdown>
              {message.content}
            </ReactMarkdown>
          </div>
          <div 
            className={`text-xs mt-1 ${
              message.role === 'user' ? 'text-blue-200' : 'text-gray-500'
            }`}
          >
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
