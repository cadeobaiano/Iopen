import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  User, 
  Bot, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  X, 
  Check, 
  AlertCircle, 
  Loader2, 
  HomeIcon,
  CreditCard, 
  FileText, 
  Lock, 
  Shield, 
  HelpCircle, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IopMascot from '../components/IopMascot';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { apiService } from '../services/api';

// Define message types
type MessageRole = 'user' | 'assistant' | 'system';

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

// Define form data types
interface AccountFormData {
  fullName: string;
  email: string;
  phone: string;
  birthDate: string;
  cpf: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

const ChatPage: React.FC = () => {
  // Check if Supabase is configured
  const supabaseConfigured = isSupabaseConfigured();
  
  // Chat state
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Authentication state
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  
  // Account creation state
  const [showAccountForm, setShowAccountForm] = useState(false);
  const [accountFormStep, setAccountFormStep] = useState(1);
  const [accountFormData, setAccountFormData] = useState<AccountFormData>({
    fullName: '',
    email: '',
    phone: '',
    birthDate: '',
    cpf: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  // Check authentication status on load
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setUser(data.session.user);
        
        // Load or create chat
        const existingChatId = localStorage.getItem('currentChatId');
        if (existingChatId) {
          setChatId(existingChatId);
          loadMessages(existingChatId);
        } else {
          createNewChat();
        }
      }
    };
    
    if (supabaseConfigured) {
      checkUser();
    }
    
    // Add welcome message if no user
    if (!user) {
      setMessages([
        {
          id: uuidv4(),
          role: 'assistant',
          content: 'Olá! Sou o assistente da Iopen. Como posso ajudar você hoje? Estou aqui para responder suas dúvidas sobre investimentos, planejamento financeiro e nossos serviços.',
          timestamp: new Date()
        }
      ]);
    }
  }, [supabaseConfigured]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Load messages for a chat
  const loadMessages = async (chatId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('timestamp', { ascending: true });
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        const formattedMessages = data.map(msg => ({
          id: msg.id,
          role: msg.role as MessageRole,
          content: msg.content,
          timestamp: new Date(msg.timestamp)
        }));
        
        setMessages(formattedMessages);
      } else {
        // Add welcome message for new chat
        const welcomeMessage = {
          id: uuidv4(),
          role: 'assistant' as MessageRole,
          content: 'Olá! Sou o assistente da Iopen. Como posso ajudar você hoje? Estou aqui para responder suas dúvidas sobre investimentos, planejamento financeiro e nossos serviços.',
          timestamp: new Date()
        };
        
        setMessages([welcomeMessage]);
        
        // Save welcome message
        if (user) {
          await supabase.from('messages').insert({
            id: welcomeMessage.id,
            chat_id: chatId,
            role: welcomeMessage.role,
            content: welcomeMessage.content,
            timestamp: welcomeMessage.timestamp,
            user_id: user.id
          });
        }
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };
  
  // Create a new chat
  const createNewChat = async () => {
    if (!user) return;
    
    try {
      const newChatId = uuidv4();
      
      const { error } = await supabase
        .from('chats')
        .insert({
          id: newChatId,
          user_id: user.id,
          created_at: new Date()
        });
        
      if (error) throw error;
      
      setChatId(newChatId);
      localStorage.setItem('currentChatId', newChatId);
      setMessages([]);
      
      // Add welcome message
      const welcomeMessage = {
        id: uuidv4(),
        role: 'assistant' as MessageRole,
        content: 'Olá! Sou o assistente da Iopen. Como posso ajudar você hoje? Estou aqui para responder suas dúvidas sobre investimentos, planejamento financeiro e nossos serviços.',
        timestamp: new Date()
      };
      
      setMessages([welcomeMessage]);
      
      await supabase.from('messages').insert({
        id: welcomeMessage.id,
        chat_id: newChatId,
        role: welcomeMessage.role,
        content: welcomeMessage.content,
        timestamp: welcomeMessage.timestamp,
        user_id: user.id
      });
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };
  
  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Save message to database if logged in
    if (user && chatId) {
      try {
        await supabase.from('messages').insert({
          id: userMessage.id,
          chat_id: chatId,
          role: userMessage.role,
          content: userMessage.content,
          timestamp: userMessage.timestamp,
          user_id: user.id
        });
      } catch (error) {
        console.error('Error saving message:', error);
      }
    }
    
    try {
      // Use our API service to get a response
      const messageHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Add the user's message to the history
      messageHistory.push({
        role: 'user',
        content: userMessage.content
      });
      
      let assistantResponse;
      
      try {
        // Try to get a response from the API service
        assistantResponse = await apiService.getAiResponse(messageHistory);
      } catch (error) {
        console.error('Error from API service:', error);
        
        // Fallback to mock responses if API fails
        const mockResponses = [
          "A Iopen oferece diversas estratégias de investimento personalizadas de acordo com seu perfil e objetivos. Posso ajudar você a entender melhor nossas opções?",
          "Para começar a investir com a Iopen, você precisa criar uma conta e completar seu perfil de investidor. Posso guiá-lo nesse processo se desejar.",
          "Nossos portfólios são compostos principalmente por ETFs e títulos do tesouro, proporcionando diversificação e baixo custo.",
          "A Iopen se diferencia pela transparência total e baixas taxas. Revelamos exatamente quanto você paga e como seus investimentos estão performando.",
          "Você pode começar a investir com a Iopen a partir de R$ 100 por mês para objetivos específicos ou R$ 1.000 para portfólios regulares."
        ];
        
        const randomIndex = Math.floor(Math.random() * mockResponses.length);
        assistantResponse = mockResponses[randomIndex];
      }
      
      const botMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: assistantResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Save assistant message to database if logged in
      if (user && chatId) {
        try {
          await supabase.from('messages').insert({
            id: botMessage.id,
            chat_id: chatId,
            role: botMessage.role,
            content: botMessage.content,
            timestamp: botMessage.timestamp,
            user_id: user.id
          });
        } catch (error) {
          console.error('Error saving assistant message:', error);
        }
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: "Desculpe, tive um problema ao processar sua mensagem. Por favor, tente novamente mais tarde ou entre em contato com nosso suporte.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
  };
  
  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Authentication functions
  const handleLogin = async () => {
    if (!email || !password) {
      setAuthError('Por favor, preencha todos os campos.');
      return;
    }
    
    setIsAuthLoading(true);
    setAuthError('');
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      setUser(data.user);
      setShowAuthModal(false);
      createNewChat();
    } catch (error: any) {
      setAuthError(error.message || 'Erro ao fazer login. Tente novamente.');
    } finally {
      setIsAuthLoading(false);
    }
  };
  
  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      setAuthError('Por favor, preencha todos os campos.');
      return;
    }
    
    if (password !== confirmPassword) {
      setAuthError('As senhas não coincidem.');
      return;
    }
    
    setIsAuthLoading(true);
    setAuthError('');
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
      
      if (error) throw error;
      
      if (data.user) {
        setUser(data.user);
        setShowAuthModal(false);
        setShowAccountForm(true);
      }
    } catch (error: any) {
      setAuthError(error.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setIsAuthLoading(false);
    }
  };
  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setChatId(null);
      localStorage.removeItem('currentChatId');
      setMessages([
        {
          id: uuidv4(),
          role: 'assistant',
          content: 'Olá! Sou o assistente da Iopen. Como posso ajudar você hoje? Estou aqui para responder suas dúvidas sobre investimentos, planejamento financeiro e nossos serviços.',
          timestamp: new Date()
        }
      ]);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  // Account form functions
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNextStep = () => {
    setAccountFormStep(prev => prev + 1);
  };
  
  const handlePrevStep = () => {
    setAccountFormStep(prev => prev - 1);
  };
  
  const handleSubmitAccountForm = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('user_profiles')
        .insert({
          user_id: user.id,
          full_name: accountFormData.fullName,
          email: accountFormData.email,
          phone: accountFormData.phone,
          birth_date: accountFormData.birthDate,
          cpf: accountFormData.cpf,
          address: accountFormData.address,
          city: accountFormData.city,
          state: accountFormData.state,
          zip_code: accountFormData.zipCode
        });
        
      if (error) throw error;
      
      setShowAccountForm(false);
      createNewChat();
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  };

  return (
    <div className="font-sans text-gray-800 min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow flex flex-col max-w-5xl mx-auto w-full shadow-md rounded-lg overflow-hidden border border-gray-200 my-3 sm:my-6">
        {/* Chat Header */}
        <div className="bg-white p-3 sm:p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-cyan-100 p-2 rounded-full mr-3">
              <MessageSquare size={20} className="text-cyan-600" />
            </div>
            <div>
              <h2 className="font-semibold text-base sm:text-lg">Assistente Iopen</h2>
              <p className="text-gray-500 text-xs sm:text-sm">Tire suas dúvidas sobre investimentos</p>
            </div>
          </div>
          
          {user && (
            <div className="flex items-center gap-2 sm:gap-3">
              <button 
                onClick={() => setMessages([])}
                className="text-gray-500 hover:text-gray-700 p-1.5 hidden sm:block"
                title="Nova conversa"
              >
                <Plus size={18} />
              </button>
              <Link 
                to="/"
                className="text-gray-500 hover:text-gray-700 p-1.5 hidden sm:block"
                title="Voltar para Home"
              >
                <HomeIcon size={18} />
              </Link>
              <button 
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700 p-1.5"
                title="Sair"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
        
        {/* Messages Area */}
        <div className="flex-grow overflow-y-auto p-3 sm:p-4 bg-gray-50" style={{ maxHeight: 'calc(100vh - 230px)' }}>
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] sm:max-w-[75%] p-3 sm:p-4 rounded-xl ${
                  message.role === 'user'
                    ? 'bg-cyan-500 text-white rounded-tr-none'
                    : 'bg-white border border-gray-200 shadow-sm rounded-tl-none'
                }`}
              >
                <div className="flex items-start mb-1 sm:mb-2">
                  {message.role === 'user' ? (
                    <User size={16} className="mr-2 mt-0.5" />
                  ) : (
                    <Bot size={16} className="mr-2 mt-0.5 text-cyan-600" />
                  )}
                  <div className={`font-medium text-sm ${message.role === 'user' ? 'text-cyan-50' : 'text-gray-600'}`}>
                    {message.role === 'user' ? 'Você' : 'Assistente Iopen'}
                  </div>
                </div>
                <p className="text-sm sm:text-base whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="mb-4 flex justify-start">
              <div className="max-w-[85%] sm:max-w-[75%] p-3 sm:p-4 rounded-xl bg-white border border-gray-200 shadow-sm rounded-tl-none">
                <div className="flex items-center">
                  <Bot size={16} className="mr-2 text-cyan-600" />
                  <div className="text-sm font-medium text-gray-600">Assistente Iopen</div>
                </div>
                <div className="mt-2 flex">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="mx-1 w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Area */}
        <div className="p-3 sm:p-4 border-t border-gray-200 bg-white">
          {user ? (
            <div className="flex items-end">
              <textarea
                value={inputMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="flex-grow p-2 sm:p-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                rows={2}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className={`ml-2 p-2 sm:p-3 rounded-lg ${
                  !inputMessage.trim() || isTyping
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-cyan-500 text-white hover:bg-cyan-600'
                } transition-colors`}
              >
                <Send size={18} />
              </button>
            </div>
          ) : (
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
              <p className="text-center text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
                Faça login ou crie uma conta para conversar com o assistente Iopen
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setShowAuthModal(true);
                  }}
                  className="bg-cyan-500 text-white px-3 sm:px-4 py-2 rounded-lg text-sm hover:bg-cyan-600 transition-colors mr-3 sm:mr-4"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setAuthMode('signup');
                    setShowAuthModal(true);
                  }}
                  className="bg-white border border-cyan-500 text-cyan-500 px-3 sm:px-4 py-2 rounded-lg text-sm hover:bg-cyan-50 transition-colors"
                >
                  Criar conta
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-4 sm:p-6 relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            
            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {authMode === 'login' ? 'Entre na sua conta' : 'Crie sua conta'}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-1">
                {authMode === 'login'
                  ? 'Bem-vindo de volta! Entre para continuar.'
                  : 'Preencha os dados abaixo para criar sua conta.'}
              </p>
            </div>
            
            {authError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
                <AlertCircle size={18} className="text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-red-600 text-sm">{authError}</p>
              </div>
            )}
            
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="seu@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base"
                  placeholder={authMode === 'login' ? '••••••••' : 'Mínimo 6 caracteres'}
                />
              </div>
              
              {authMode === 'signup' && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmar senha
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="••••••••"
                  />
                </div>
              )}
              
              <button
                onClick={authMode === 'login' ? handleLogin : handleSignup}
                disabled={isAuthLoading}
                className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 transition-colors flex items-center justify-center"
              >
                {isAuthLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Processando...
                  </>
                ) : (
                  authMode === 'login' ? 'Entrar' : 'Criar conta'
                )}
              </button>
              
              <div className="text-center">
                {authMode === 'login' ? (
                  <p className="text-sm text-gray-600">
                    Não tem uma conta?{' '}
                    <button
                      onClick={() => setAuthMode('signup')}
                      className="text-cyan-600 hover:underline"
                    >
                      Criar conta
                    </button>
                  </p>
                ) : (
                  <p className="text-sm text-gray-600">
                    Já tem uma conta?{' '}
                    <button
                      onClick={() => setAuthMode('login')}
                      className="text-cyan-600 hover:underline"
                    >
                      Fazer login
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Account Creation Form Modal */}
      {showAccountForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-4 sm:p-6 relative">
            <button
              onClick={() => setShowAccountForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                  Complete seu cadastro
                </h2>
                <div className="bg-gray-100 px-3 py-1 rounded-full">
                  <span className="text-gray-600 text-xs sm:text-sm">Etapa {accountFormStep} de 3</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-cyan-500 h-full transition-all duration-300 ease-out"
                  style={{ width: `${(accountFormStep / 3) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Step 1: Basic Information */}
            {accountFormStep === 1 && (
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={accountFormData.fullName}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={accountFormData.email}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={accountFormData.phone}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
            )}
            
            {/* Step 2: Documentação */}
            {accountFormStep === 2 && (
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Data de Nascimento
                  </label>
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={accountFormData.birthDate}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">
                    CPF
                  </label>
                  <input
                    type="text"
                    id="cpf"
                    name="cpf"
                    value={accountFormData.cpf}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="000.000.000-00"
                  />
                </div>
              </div>
            )}
            
            {/* Step 3: Endereço */}
            {accountFormStep === 3 && (
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Endereço
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={accountFormData.address}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Rua, número, complemento"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      Cidade
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={accountFormData.city}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      Estado
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={accountFormData.state}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                    CEP
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={accountFormData.zipCode}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="00000-000"
                  />
                </div>
              </div>
            )}
            
            <div className="pt-4 flex justify-between">
              {accountFormStep > 1 && (
                <button
                  onClick={handlePrevStep}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Voltar
                </button>
              )}
              <button
                onClick={accountFormStep < 3 ? handleNextStep : handleSubmitAccountForm}
                className="bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-600 transition-colors"
              >
                {accountFormStep < 3 ? 'Próximo' : 'Finalizar cadastro'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

// Import missing components
const Plus = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

const MessageSquare = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const LogOut = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export default ChatPage;