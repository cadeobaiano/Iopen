import React, { useState } from 'react';
import { Mail, Lock, User2, Phone, MessageSquare, Check, Eye, EyeOff, MapPin } from 'lucide-react';

interface RegistrationFormProps {
  registrationEnabled: boolean;
  selectedPlan: string | null;
  error: string | null;
  isLoading: boolean;
  fullName: string;
  setFullName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  handleRegister: (e: React.FormEvent) => void;
  cep: string;
  setCep: (value: string) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  registrationEnabled,
  selectedPlan,
  error,
  isLoading,
  fullName,
  setFullName,
  email,
  setEmail,
  phone,
  setPhone,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handleRegister,
  cep,
  setCep
}) => {
  // Estados para controlar a visibilidade das senhas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Estado para validação de campos
  const [formErrors, setFormErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    cep: ''
  });

  // Função para aplicar máscara ao número de telefone
  const formatPhoneNumber = (value: string) => {
    // Remove tudo que não for número
    const numericValue = value.replace(/\D/g, '');
    
    // Aplica a máscara conforme a quantidade de dígitos
    if (numericValue.length <= 2) {
      return numericValue;
    } else if (numericValue.length <= 6) {
      return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2)}`;
    } else if (numericValue.length <= 10) {
      return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 6)}-${numericValue.slice(6)}`;
    } else {
      return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 7)}-${numericValue.slice(7, 11)}`;
    }
  };

  // Função para aplicar máscara ao CEP
  const formatCep = (value: string) => {
    // Remove tudo que não for número
    const numericValue = value.replace(/\D/g, '');
    
    // Aplica a máscara conforme a quantidade de dígitos
    if (numericValue.length <= 5) {
      return numericValue;
    } else {
      return `${numericValue.slice(0, 5)}-${numericValue.slice(5, 8)}`;
    }
  };

  // Handler para o campo de CEP
  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCep(e.target.value);
    setCep(formattedValue);
    
    // Validação do CEP
    if (formattedValue.replace(/\D/g, '').length < 8) {
      setFormErrors(prev => ({ ...prev, cep: 'CEP incompleto' }));
    } else {
      setFormErrors(prev => ({ ...prev, cep: '' }));
    }
  };

  // Handler para o campo de telefone
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    setPhone(formattedValue);
    
    // Validação do telefone
    if (formattedValue.replace(/\D/g, '').length < 10) {
      setFormErrors(prev => ({ ...prev, phone: 'Telefone incompleto' }));
    } else {
      setFormErrors(prev => ({ ...prev, phone: '' }));
    }
  };
  
  // Handler para o campo de nome completo
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFullName(value);
    
    // Validação do nome
    if (value.trim().split(' ').length < 2) {
      setFormErrors(prev => ({ ...prev, fullName: 'Informe nome e sobrenome' }));
    } else {
      setFormErrors(prev => ({ ...prev, fullName: '' }));
    }
  };
  
  // Handler para o campo de email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Validação do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setFormErrors(prev => ({ ...prev, email: 'Email inválido' }));
    } else {
      setFormErrors(prev => ({ ...prev, email: '' }));
    }
  };
  
  // Handler para o campo de senha
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    
    // Validação da senha
    if (value.length < 6) {
      setFormErrors(prev => ({ ...prev, password: 'Mínimo de 6 caracteres' }));
    } else {
      setFormErrors(prev => ({ ...prev, password: '' }));
    }
    
    // Validação da confirmação de senha
    if (confirmPassword && value !== confirmPassword) {
      setFormErrors(prev => ({ ...prev, confirmPassword: 'As senhas não coincidem' }));
    } else if (confirmPassword) {
      setFormErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
  };
  
  // Handler para o campo de confirmação de senha
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    
    // Validação da confirmação de senha
    if (value !== password) {
      setFormErrors(prev => ({ ...prev, confirmPassword: 'As senhas não coincidem' }));
    } else {
      setFormErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
  };
  
  // Função para validar o formulário antes de enviar
  const validateForm = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verifica se há erros no formulário
    const hasErrors = Object.values(formErrors).some(error => error !== '');
    
    // Verifica se todos os campos obrigatórios estão preenchidos
    const isComplete = fullName && email && phone && password && confirmPassword;
    
    if (!hasErrors && isComplete) {
      handleRegister(e);
    }
  };

  return (
    <div className="p-6 bg-white h-full">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-lg mb-6 shadow-md">
        <h2 className="text-2xl font-bold mb-1">Criar Conta</h2>
        <p className="text-sm opacity-90">Acesse recursos exclusivos para investidores</p>
      </div>
      
      {!registrationEnabled ? (
        <div className="bg-blue-50 p-5 rounded-lg text-center border border-blue-100 shadow-sm">
          <p className="text-blue-700 mb-3 font-medium">
            Converse com nosso assistente para liberar o cadastro.
          </p>
          <div className="flex justify-center">
            <div className="bg-blue-100 rounded-full p-3 mb-2">
              <MessageSquare size={32} className="text-blue-500" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Responda algumas perguntas para identificarmos o melhor plano para você.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="bg-green-50 p-4 rounded-lg border border-green-100 shadow-sm flex items-start">
            <div className="bg-green-500 text-white rounded-full p-1 mr-3 flex-shrink-0 mt-1">
              <Check size={16} />
            </div>
            <p className="text-green-700 font-medium">
              {selectedPlan ? (
                <>Você escolheu o plano <span className="font-bold">{selectedPlan}</span>. Agora você pode criar sua conta.</>
              ) : (
                <>Agora você pode criar sua conta na Iopen.</>
              )}
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={validateForm} className="space-y-4">
            {/* Campo Nome Completo */}
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
                  onChange={handleFullNameChange}
                  className={`pl-10 w-full px-4 py-3 h-12 border ${formErrors.fullName ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-lg focus:outline-none focus:ring-2 shadow-sm`}
                  placeholder="Seu nome completo"
                  required
                  autoComplete="name"
                />
              </div>
              {formErrors.fullName && (
                <p className="text-xs text-red-500 mt-1">{formErrors.fullName}</p>
              )}
            </div>
            
            {/* Campo Email */}
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
                  onChange={handleEmailChange}
                  className={`pl-10 w-full px-4 py-3 h-12 border ${formErrors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-lg focus:outline-none focus:ring-2 shadow-sm`}
                  placeholder="seu@email.com"
                  required
                  autoComplete="email"
                />
              </div>
              {formErrors.email && (
                <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>
              )}
            </div>
            
            {/* Campo Telefone */}
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
                  onChange={handlePhoneChange}
                  className={`pl-10 w-full px-4 py-3 h-12 border ${formErrors.phone ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-lg focus:outline-none focus:ring-2 shadow-sm`}
                  placeholder="(99) 99999-9999"
                  required
                  maxLength={16}
                  inputMode="numeric"
                  autoComplete="tel"
                />
              </div>
              {formErrors.phone ? (
                <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">
                  Formato: (99) 99999-9999
                </p>
              )}
            </div>

            {/* Campo CEP */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="cep">
                CEP
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin size={18} className="text-gray-500" />
                </div>
                <input
                  id="cep"
                  type="text"
                  value={cep}
                  onChange={handleCepChange}
                  className={`pl-10 w-full px-4 py-3 h-12 border ${formErrors.cep ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-lg focus:outline-none focus:ring-2 shadow-sm`}
                  placeholder="00000-000"
                  required
                  maxLength={9}
                  inputMode="numeric"
                  autoComplete="postal-code"
                />
              </div>
              {formErrors.cep ? (
                <p className="text-xs text-red-500 mt-1">{formErrors.cep}</p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">
                  Formato: 00000-000
                </p>
              )}
            </div>
            
            {/* Campo Senha */}
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
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  className={`pl-10 pr-10 w-full px-4 py-3 h-12 border ${formErrors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-lg focus:outline-none focus:ring-2 shadow-sm`}
                  placeholder="Senha (mín. 6 caracteres)"
                  required
                  minLength={6}
                  autoComplete="new-password"
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-gray-500" />
                  ) : (
                    <Eye size={18} className="text-gray-500" />
                  )}
                </button>
              </div>
              {formErrors.password && (
                <p className="text-xs text-red-500 mt-1">{formErrors.password}</p>
              )}
            </div>
            
            {/* Campo Confirmar Senha */}
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
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className={`pl-10 pr-10 w-full px-4 py-3 h-12 border ${formErrors.confirmPassword ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-lg focus:outline-none focus:ring-2 shadow-sm`}
                  placeholder="Confirme sua senha"
                  required
                  minLength={6}
                  autoComplete="new-password"
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} className="text-gray-500" />
                  ) : (
                    <Eye size={18} className="text-gray-500" />
                  )}
                </button>
              </div>
              {formErrors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">{formErrors.confirmPassword}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-3 px-4 h-12 rounded-lg transition flex justify-center items-center shadow-md touch-target min-h-[44px] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
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
  );
};

export default RegistrationForm;
