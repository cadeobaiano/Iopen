import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Mail, Lock, User2, Phone } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IopMascot from '../components/IopMascot';
import { apiService } from '../services/api';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

// Define message types
type MessageRole = 'user' | 'assistant' | 'system';

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

const LoginChat: React.FC = () => {
  const navigate = useNavigate();
  
  // Chat state
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [registrationEnabled, setRegistrationEnabled] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Registration form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add welcome message on component mount
  useEffect(() => {
    setMessages([
      {
        id: uuidv4(),
        role: 'assistant',
        content: 'Olá! Sou Iop, o assistente da Iopen. Antes de criar sua conta, gostaria de conversar um pouco sobre seus objetivos de investimento. Que tipo de plano você está procurando?',
        timestamp: new Date()
      }
    ]);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Check if user mentioned a plan
    const detectedPlan = detectPlan(userMessage.content);
    if (detectedPlan && !selectedPlan) {
      setSelectedPlan(detectedPlan);
    }
    
    try {
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
      if (messages.length >= 4 || selectedPlan) {
        setRegistrationEnabled(true);
      }
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
    } finally {
      setIsTyping(false);
    }
  };

  // Handle registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Simple validations
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Sign up with Supabase
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone,
            selected_plan: selectedPlan || 'básico' // Default to basic if not specified
          }
        }
      });
      
      if (signUpError) throw signUpError;
      
      if (data?.user) {
        // Create user profile entry
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert([
            {
              user_id: data.user.id,
              full_name: fullName,
              email: email,
              phone: phone,
              created_at: new Date().toISOString()
            }
          ]);
        
        if (profileError) throw profileError;
        
        // Store chat history if needed
        // Can be implemented here
        
        // Redirect to profile completion or dashboard
        navigate('/profile');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      setError(error.message || 'Erro ao criar conta. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8 px-4 md:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Chat Section */}
            <div className="w-full md:w-2/3 border-r border-gray-200">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 flex items-center">
                <IopMascot size={36} className="mr-3" />
                <div>
                  <h2 className="font-bold text-xl">Iop - Assistente Iopen</h2>
                  <p className="text-sm opacity-80">Converse comigo antes de criar sua conta</p>
                </div>
              </div>
              
              <div className="h-96 md:h-[500px] overflow-y-auto p-4 bg-gray-50">
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      {message.role === 'assistant' ? (
                        <div className="flex-shrink-0 mr-2">
                          <IopMascot size={36} />
                        </div>
                      ) : (
                        <div className="flex-shrink-0 ml-2">
                          <div className="bg-blue-100 rounded-full p-2 text-blue-600">
                            <User size={20} />
                          </div>
                        </div>
                      )}
                      
                      <div 
                        className={`rounded-2xl p-3 ${
                          message.role === 'user'
                            ? 'bg-blue-600 text-white rounded-tr-none'
                            : 'bg-white border border-gray-200 shadow-sm rounded-tl-none'
                        }`}
                      >
                        <p>{message.content}</p>
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
                ))}
                
                {isTyping && (
                  <div className="flex items-center">
                    <IopMascot size={36} className="mr-2" />
                    <div className="bg-white border border-gray-200 rounded-2xl p-3 rounded-tl-none">
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
              
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Digite sua mensagem..."
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-r-lg transition"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Registration Form */}
            <div className="w-full md:w-1/3 p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Criar Conta</h2>
              
              {!registrationEnabled ? (
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <p className="text-gray-600 mb-2">
                    Por favor, converse com nosso assistente primeiro para liberar o cadastro.
                  </p>
                  <div className="flex justify-center">
                    <Bot size={40} className="text-gray-400" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-green-600 font-medium mb-4">
                    {selectedPlan ? (
                      <>Ótimo! Você escolheu o plano <span className="font-bold">{selectedPlan}</span>. Agora você pode criar sua conta.</>
                    ) : (
                      <>Ótimo! Agora você pode criar sua conta.</>
                    )}
                  </p>
                  
                  {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}
                  
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="fullName">
                        Nome Completo
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User2 size={18} className="text-gray-500" />
                        </div>
                        <input
                          id="fullName"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                          placeholder="Seu nome completo"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="email">
                        E-mail
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail size={18} className="text-gray-500" />
                        </div>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                          placeholder="seu@email.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="phone">
                        Telefone
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone size={18} className="text-gray-500" />
                        </div>
                        <input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                          placeholder="(99) 99999-9999"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="password">
                        Senha
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock size={18} className="text-gray-500" />
                        </div>
                        <input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                          placeholder="Senha (mín. 6 caracteres)"
                          minLength={6}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="confirmPassword">
                        Confirmar Senha
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock size={18} className="text-gray-500" />
                        </div>
                        <input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                          placeholder="Confirme sua senha"
                          minLength={6}
                          required
                        />
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 px-4 rounded-lg transition flex justify-center items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Criando conta...
                        </>
                      ) : (
                        'Criar minha conta'
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginChat;
