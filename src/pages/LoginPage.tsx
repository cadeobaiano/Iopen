import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Check, AlertCircle, X, Phone, Shield } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, registerUser, signInWithProvider, resetPassword, UserRegistrationData, checkIfUserExists } from '../services/auth';

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  // Estado para o modal de recuperação de senha
  const [isRecoveryModalOpen, setIsRecoveryModalOpen] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [isRecoveryLoading, setIsRecoveryLoading] = useState(false);

  // Novos estados para validação em tempo real
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isEmailChecking, setIsEmailChecking] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState(true);
  
  // Função helper para verificar se activeTab é igual a um valor específico
  const isTabActive = (tab: 'login' | 'register'): boolean => activeTab === tab;

  // Função para validar email com feedback em tempo real
  const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  // Função para validar complexidade de senha
  const validatePasswordStrength = (password: string): { isValid: boolean; message: string; strength: number } => {
    if (password.length < 8) {
      return { isValid: false, message: 'A senha deve ter pelo menos 8 caracteres', strength: 0 };
    }
    
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    
    const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChars]
      .filter(Boolean).length;
    
    if (strength === 4) {
      return { isValid: true, message: 'Senha forte', strength: 4 };
    } else if (strength === 3) {
      return { isValid: true, message: 'Senha boa', strength: 3 };
    } else if (strength === 2) {
      return { isValid: true, message: 'Senha média', strength: 2 };
    } else {
      return { 
        isValid: false, 
        message: 'Senha fraca. Adicione maiúsculas, minúsculas, números e caracteres especiais', 
        strength: 1 
      };
    }
  };

  // Verificar email em tempo real
  useEffect(() => {
    const checkEmail = async () => {
      if (isTabActive('register') && email && validateEmail(email)) {
        setIsEmailChecking(true);
        try {
          const exists = await checkIfUserExists(email);
          setIsEmailAvailable(!exists);
          setEmailError(exists ? 'Este e-mail já está em uso' : null);
        } catch (err) {
          console.error('Erro ao verificar e-mail:', err);
        } finally {
          setIsEmailChecking(false);
        }
      }
    };

    const delayDebounceFn = setTimeout(() => {
      checkEmail();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [email, activeTab]);

  // Validar email em tempo real
  useEffect(() => {
    if (email) {
      setEmailError(validateEmail(email) ? null : 'E-mail inválido');
    } else {
      setEmailError(null);
    }
  }, [email]);

  // Validar senha em tempo real
  useEffect(() => {
    if (password) {
      const validation = validatePasswordStrength(password);
      setPasswordError(validation.isValid ? null : validation.message);
    } else {
      setPasswordError(null);
    }
  }, [password]);

  // Validar confirmação de senha em tempo real
  useEffect(() => {
    if (confirmPassword) {
      setConfirmPasswordError(
        password === confirmPassword ? null : 'As senhas não coincidem'
      );
    } else {
      setConfirmPasswordError(null);
    }
  }, [confirmPassword, password]);

  // Validar nome completo em tempo real
  useEffect(() => {
    if (fullName) {
      setFullNameError(
        fullName.trim().split(' ').length >= 2 
          ? null 
          : 'Insira seu nome completo'
      );
    } else {
      setFullNameError(null);
    }
  }, [fullName]);

  // Resetar estados ao trocar de tab
  useEffect(() => {
    setError(null);
    setSuccess(null);
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);
    setFullNameError(null);
    setPhoneError(null);
    setIsEmailAvailable(true);
  }, [activeTab]);

  // Formatação de telefone existente
  const formatPhoneNumber = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    
    if (digits.length <= 2) {
      return `(${digits}`;
    } else if (digits.length <= 7) {
      return `(${digits.substring(0, 2)}) ${digits.substring(2)}`;
    } else {
      return `(${digits.substring(0, 2)}) ${digits.substring(2, 7)}-${digits.substring(7, 11)}`;
    }
  };

  // Validar telefone em tempo real
  useEffect(() => {
    if (phone) {
      const phoneDigits = phone.replace(/\D/g, '');
      setPhoneError(
        phoneDigits.length >= 10 ? null : 'Telefone inválido'
      );
    } else {
      setPhoneError(null);
    }
  }, [phone]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validações
    if (!email) {
      setEmailError('Por favor, informe seu e-mail');
      return;
    }

    if (!password) {
      setPasswordError('Por favor, informe sua senha');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Por favor, insira um e-mail válido');
      return;
    }

    setIsLoading(true);
    setSuccess('Verificando suas credenciais...');

    try {
      // Chamar a API de login
      const result = await loginUser(email, password);
      
      if (!result.success) {
        throw new Error(result.error || 'Erro ao fazer login');
      }

      setSuccess('Login realizado com sucesso! Redirecionando...');
      setTimeout(() => navigate('/chat'), 1500);
    } catch (err) {
      setIsLoading(false);
      setSuccess(null);
      setError((err as Error).message || 'Falha ao fazer login. Verifique suas credenciais.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validações
    const validations = [
      { condition: !fullName, setter: setFullNameError, message: 'Por favor, informe seu nome completo' },
      { condition: fullName && fullName.trim().split(' ').length < 2, setter: setFullNameError, message: 'Insira seu nome e sobrenome' },
      { condition: !email, setter: setEmailError, message: 'Por favor, informe seu e-mail' },
      { condition: !validateEmail(email), setter: setEmailError, message: 'Por favor, insira um e-mail válido' },
      { condition: !isEmailAvailable, setter: setEmailError, message: 'Este e-mail já está em uso' },
      { condition: !phone, setter: setPhoneError, message: 'Por favor, informe seu telefone' },
      { condition: phone.replace(/\D/g, '').length < 10, setter: setPhoneError, message: 'Telefone inválido (mínimo 10 dígitos)' },
      { condition: !password, setter: setPasswordError, message: 'Por favor, crie uma senha' },
      { condition: password.length < 8, setter: setPasswordError, message: 'A senha deve ter pelo menos 8 caracteres' },
      { condition: !validatePasswordStrength(password).isValid, setter: setPasswordError, message: validatePasswordStrength(password).message },
      { condition: !confirmPassword, setter: setConfirmPasswordError, message: 'Por favor, confirme sua senha' },
      { condition: password !== confirmPassword, setter: setConfirmPasswordError, message: 'As senhas não coincidem' }
    ];

    // Aplicar validações
    let hasError = false;
    validations.forEach(validation => {
      if (validation.condition) {
        validation.setter(validation.message);
        hasError = true;
      }
    });

    if (hasError) return;

    setIsLoading(true);
    setSuccess('Criando sua conta...');

    try {
      // Preparar dados do usuário
      const userData: UserRegistrationData = {
        email,
        password,
        full_name: fullName,
        phone
      };

      // Chamar API de registro
      const result = await registerUser(userData);
      
      if (!result.success) {
        throw new Error(result.error || 'Erro ao criar conta');
      }

      setIsLoading(false);
      setSuccess('Conta criada com sucesso! Verifique seu e-mail para confirmar o cadastro.');
      setTimeout(() => setActiveTab('login'), 2000);
    } catch (err) {
      setIsLoading(false);
      setSuccess(null);
      setError((err as Error).message || 'Falha ao criar conta. Tente novamente mais tarde.');
    }
  };

  // Função para login com provedor social
  const handleSocialLogin = async (provider: 'google') => {
    setError(null);
    setSuccess(null);
    
    try {
      // Mostrar mensagem de redirecionamento
      setSuccess('Redirecionando para o login com Google...');
      
      // Pequeno atraso para melhorar a experiência do usuário
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Chamada para o serviço de autenticação
      await signInWithProvider(provider);
      
      // O redirecionamento é controlado pelo Supabase
    } catch (err) {
      setSuccess(null);
      setError(`Erro ao entrar com Google: ${(err as Error).message}`);
      console.error('Erro no login com Google:', err);
    }
  };

  // Função para solicitar recuperação de senha
  const handlePasswordRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!recoveryEmail || !validateEmail(recoveryEmail)) {
      setError('Por favor, insira um email válido.');
      return;
    }
    
    setIsRecoveryLoading(true);
    
    try {
      const result = await resetPassword(recoveryEmail);
      
      if (!result.success) {
        throw new Error(result.error || 'Erro ao solicitar recuperação de senha');
      }
      
      setIsRecoveryLoading(false);
      setSuccess('Enviamos um link de recuperação para seu e-mail!');
      setIsRecoveryModalOpen(false);
    } catch (err) {
      setIsRecoveryLoading(false);
      setError((err as Error).message || 'Falha ao solicitar recuperação de senha.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-stretch">
          
          {/* Coluna esquerda - Banner e informações */}
          <div className="w-full md:w-1/2 bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none p-8 md:p-12 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-6">Bem-vindo à Iopen</h1>
              <p className="text-lg opacity-90 mb-8">A plataforma que transforma sua jornada financeira com simplicidade e transparência.</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="mt-1 bg-white/20 rounded-full p-1 mr-3">
                    <Check size={16} className="text-white" />
                  </div>
                  <p className="opacity-90">Investimentos personalizados de acordo com seu perfil</p>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 bg-white/20 rounded-full p-1 mr-3">
                    <Check size={16} className="text-white" />
                  </div>
                  <p className="opacity-90">Monitoramento em tempo real do seu portfólio</p>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 bg-white/20 rounded-full p-1 mr-3">
                    <Check size={16} className="text-white" />
                  </div>
                  <p className="opacity-90">Suporte especializado para todas suas necessidades</p>
                </div>
              </div>
            </div>
            
            <div className="hidden md:block">
              <p className="text-sm opacity-75">
                "A Iopen revolucionou minha forma de investir. Agora tenho controle total com muito mais facilidade."
              </p>
              <p className="mt-2 font-semibold">Maria Silva, investidora desde 2022</p>
            </div>
          </div>
          
          {/* Coluna direita - Formulário */}
          <div className="w-full md:w-1/2 bg-white shadow-xl rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none p-8 md:p-12">
            {/* Abas de Login e Cadastro */}
            <div className="flex border-b border-gray-200 mb-8">
              <button
                className={`pb-3 px-4 font-medium text-sm transition-colors relative ${
                  activeTab === 'login' 
                    ? 'text-cyan-600 border-b-2 border-cyan-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('login')}
              >
                Entrar
              </button>
              <button
                className={`pb-3 px-4 font-medium text-sm transition-colors relative ${
                  activeTab === 'register' 
                    ? 'text-cyan-600 border-b-2 border-cyan-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('register')}
              >
                Criar Conta
              </button>
            </div>
            
            {/* Alerta de erro */}
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start">
                <AlertCircle size={20} className="text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                <div className="flex-grow">
                  <p className="text-red-800 text-sm font-medium mb-1">Ocorreu um erro</p>
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
                <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
                  <X size={16} />
                </button>
              </div>
            )}
            
            {/* Alerta de sucesso */}
            {success && (
              <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-md flex items-start">
                <Check size={20} className="text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <div className="flex-grow">
                  <p className="text-green-800 text-sm font-medium mb-1">Sucesso</p>
                  <p className="text-green-800 text-sm">{success}</p>
                </div>
                <button onClick={() => setSuccess(null)} className="text-green-500 hover:text-green-700">
                  <X size={16} />
                </button>
              </div>
            )}
            
            {/* Formulário de Login */}
            {activeTab === 'login' ? (
              <form 
                onSubmit={handleLoginSubmit}
                className="space-y-6"
              >
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      E-mail
                    </label>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`pl-10 block w-full rounded-md shadow-sm sm:text-sm h-11 ${
                        emailError 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : email && validateEmail(email)
                            ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                            : 'border-gray-300 focus:ring-cyan-500 focus:border-cyan-500'
                      }`}
                      placeholder="seu@email.com"
                    />
                    {isEmailChecking && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <svg className="animate-spin h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                    )}
                    {email && !isEmailChecking && emailError && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <AlertCircle size={16} className="text-red-500" />
                      </div>
                    )}
                    {email && !isEmailChecking && !emailError && validateEmail(email) && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <Check size={16} className="text-green-500" />
                      </div>
                    )}
                  </div>
                  {emailError && (
                    <p className="mt-1 text-xs text-red-600">{emailError}</p>
                  )}
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Senha
                    </label>
                    <a 
                      href="#" 
                      className="text-xs text-cyan-600 hover:text-cyan-800"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsRecoveryModalOpen(true);
                      }}
                    >
                      Esqueceu a senha?
                    </a>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`pl-10 pr-10 block w-full rounded-md shadow-sm sm:text-sm h-11 ${
                        passwordError 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : password && password.length >= 8
                            ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                            : 'border-gray-300 focus:ring-cyan-500 focus:border-cyan-500'
                      }`}
                      placeholder="Sua senha"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff size={18} className="text-gray-400" />
                      ) : (
                        <Eye size={18} className="text-gray-400" />
                      )}
                    </button>
                  </div>
                  {passwordError && (
                    <p className="mt-1 text-xs text-red-600">{passwordError}</p>
                  )}
                </div>
                
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
                    Lembrar-me neste dispositivo
                  </label>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition h-11 ${
                      isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Entrando...
                      </>
                    ) : (
                      <>
                        Entrar
                        <ArrowRight size={18} className="ml-2" />
                      </>
                    )}
                  </button>
                </div>
                
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Ou entre com</span>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <button
                    type="button"
                    className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 hover:bg-gray-50"
                    onClick={() => handleSocialLogin('google')}
                    aria-label="Entrar com Google"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  </button>
                </div>
                
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Não tem uma conta?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('register')}
                      className="text-cyan-600 hover:underline font-medium"
                    >
                      Criar agora
                    </button>
                  </p>
                </div>
              </form>
            ) : (
              <form 
                onSubmit={handleRegisterSubmit}
                className="space-y-5"
              >
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`pl-10 block w-full rounded-md shadow-sm sm:text-sm h-11 ${
                        fullNameError 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : fullName && fullName.trim().split(' ').length >= 2
                            ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                            : 'border-gray-300 focus:ring-cyan-500 focus:border-cyan-500'
                      }`}
                      placeholder="Seu nome completo"
                    />
                    {fullName && fullNameError && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <AlertCircle size={16} className="text-red-500" />
                      </div>
                    )}
                    {fullName && !fullNameError && fullName.trim().split(' ').length >= 2 && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <Check size={16} className="text-green-500" />
                      </div>
                    )}
                  </div>
                  {fullNameError && (
                    <p className="mt-1 text-xs text-red-600">{fullNameError}</p>
                  )}
                  {fullName && !fullNameError && fullName.trim().split(' ').length < 2 && (
                    <p className="mt-1 text-xs text-amber-600">Digite seu nome e sobrenome</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="register-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`pl-10 block w-full rounded-md shadow-sm sm:text-sm h-11 ${
                        emailError 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:ring-cyan-500 focus:border-cyan-500'
                      }`}
                      placeholder="seu@email.com"
                    />
                    {isEmailChecking && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <svg className="animate-spin h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                    )}
                    {email && !isEmailChecking && (emailError || !isEmailAvailable) && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <AlertCircle size={16} className="text-red-500" />
                      </div>
                    )}
                    {email && !isEmailChecking && !emailError && isEmailAvailable && isTabActive('register') && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <Check size={16} className="text-green-500" />
                      </div>
                    )}
                  </div>
                  {emailError && (
                    <p className="mt-1 text-xs text-red-600">{emailError}</p>
                  )}
                  {email && !isEmailChecking && !emailError && !isEmailAvailable && (
                    <p className="mt-1 text-xs text-red-600">Este e-mail já está em uso</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      className={`pl-10 block w-full rounded-md shadow-sm sm:text-sm h-11 ${
                        phoneError 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:ring-cyan-500 focus:border-cyan-500'
                      }`}
                      placeholder="(00) 00000-0000"
                    />
                    {phone && phoneError && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <AlertCircle size={16} className="text-red-500" />
                      </div>
                    )}
                    {phone && !phoneError && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <Check size={16} className="text-green-500" />
                      </div>
                    )}
                  </div>
                  {phoneError && (
                    <p className="mt-1 text-xs text-red-600">{phoneError}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Senha
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`pl-10 pr-10 block w-full rounded-md shadow-sm sm:text-sm h-11 ${
                        passwordError 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : password && validatePasswordStrength(password).isValid
                            ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                            : 'border-gray-300 focus:ring-cyan-500 focus:border-cyan-500'
                      }`}
                      placeholder="Sua senha"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff size={18} className="text-gray-400" />
                      ) : (
                        <Eye size={18} className="text-gray-400" />
                      )}
                    </button>
                  </div>
                  {password && (
                    <div className="mt-2">
                      {passwordError ? (
                        <p className="text-xs text-red-600 mb-1">{passwordError}</p>
                      ) : null}
                      
                      {/* Indicador visual de força da senha */}
                      {password && (
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${
                                  validatePasswordStrength(password).strength === 4
                                    ? 'bg-green-500'
                                    : validatePasswordStrength(password).strength === 3
                                      ? 'bg-blue-500'
                                      : validatePasswordStrength(password).strength === 2
                                        ? 'bg-amber-500'
                                        : 'bg-red-500'
                                }`}
                                style={{ width: `${validatePasswordStrength(password).strength * 25}%` }}
                              ></div>
                            </div>
                            <span className="ml-2">
                              <Shield size={16} className={`${
                                validatePasswordStrength(password).strength === 4
                                  ? 'text-green-500'
                                  : validatePasswordStrength(password).strength === 3
                                    ? 'text-blue-500'
                                    : validatePasswordStrength(password).strength === 2
                                      ? 'text-amber-500'
                                      : 'text-red-500'
                              }`} />
                            </span>
                          </div>
                          <p className={`text-xs ${
                            validatePasswordStrength(password).strength === 4
                              ? 'text-green-600'
                              : validatePasswordStrength(password).strength === 3
                                ? 'text-blue-600'
                                : validatePasswordStrength(password).strength === 2
                                  ? 'text-amber-600'
                                  : 'text-red-600'
                          }`}>
                            {validatePasswordStrength(password).message}
                          </p>
                          
                          {/* Requisitos de senha */}
                          <div className="grid grid-cols-2 gap-1 text-xs mt-1">
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-1.5 ${password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              <span className={password.length >= 8 ? 'text-green-600' : 'text-gray-500'}>8+ caracteres</span>
                            </div>
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-1.5 ${/[A-Z]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              <span className={/[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-500'}>Maiúsculas</span>
                            </div>
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-1.5 ${/[a-z]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              <span className={/[a-z]/.test(password) ? 'text-green-600' : 'text-gray-500'}>Minúsculas</span>
                            </div>
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-1.5 ${/\d/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              <span className={/\d/.test(password) ? 'text-green-600' : 'text-gray-500'}>Números</span>
                            </div>
                            <div className="flex items-center col-span-2">
                              <div className={`w-3 h-3 rounded-full mr-1.5 ${/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              <span className={/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password) ? 'text-green-600' : 'text-gray-500'}>Caracteres especiais (!@#$%)</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirme a Senha
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`pl-10 pr-10 block w-full rounded-md shadow-sm sm:text-sm h-11 ${
                        confirmPasswordError 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : confirmPassword && password === confirmPassword
                            ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                            : 'border-gray-300 focus:ring-cyan-500 focus:border-cyan-500'
                      }`}
                      placeholder="Confirme sua senha"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} className="text-gray-400" />
                      ) : (
                        <Eye size={18} className="text-gray-400" />
                      )}
                    </button>
                  </div>
                  {confirmPassword && (
                    <p className={`mt-1 text-xs ${confirmPasswordError ? 'text-red-600' : 'text-green-600'}`}>
                      {confirmPasswordError || (
                        <span className="flex items-center">
                          <Check size={14} className="mr-1" />
                          As senhas coincidem
                        </span>
                      )}
                    </p>
                  )}
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="text-gray-700">
                      Concordo com os <Link to="#" className="text-cyan-600 hover:text-cyan-800 font-semibold">Termos de Serviço</Link> e <Link to="#" className="text-cyan-600 hover:text-cyan-800 font-semibold">Política de Privacidade</Link>
                    </label>
                  </div>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition h-11 ${
                      isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
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
                      "Criar minha conta"
                    )}
                  </button>
                </div>
                
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Já tem uma conta?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('login')}
                      className="text-cyan-600 hover:underline font-medium"
                    >
                      Entrar
                    </button>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
      
      <Footer />

      {/* Modal de recuperação de senha */}
      {isRecoveryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setIsRecoveryModalOpen(false)}
            >
              <X size={20} />
            </button>
            
            <h3 className="text-xl font-semibold mb-4">Recuperação de Senha</h3>
            
            <p className="text-gray-600 mb-6">
              Digite seu email abaixo e enviaremos um link para você redefinir sua senha.
            </p>
            
            <form onSubmit={handlePasswordRecovery}>
              <div className="mb-4">
                <label htmlFor="recovery-email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="recovery-email"
                    type="email"
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm h-11"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isRecoveryLoading}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition h-11 ${
                    isRecoveryLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isRecoveryLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    "Enviar link de recuperação"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage; 