import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/auth';

interface RegistrationData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  cep: string;
}

export const useRegistration = (selectedPlan: string | null) => {
  const navigate = useNavigate();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cep, setCep] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationEnabled] = useState(true); 

  // Handle registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações básicas
    if (!fullName || !email || !phone || !password || !confirmPassword || !cep) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    // Validação de nome completo (deve ter pelo menos nome e sobrenome)
    const nameParts = fullName.trim().split(' ');
    if (nameParts.length < 2 || nameParts[1].length === 0) {
      setError('Por favor, informe seu nome completo (nome e sobrenome).');
      return;
    }
    
    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, informe um email válido.');
      return;
    }
    
    // Validação de telefone (pelo menos 10 dígitos numéricos)
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setError('Por favor, informe um número de telefone válido.');
      return;
    }
    
    // Validação de CEP (8 dígitos numéricos)
    const cepDigits = cep.replace(/\D/g, '');
    if (cepDigits.length !== 8) {
      setError('Por favor, informe um CEP válido.');
      return;
    }
    
    // Validação de senha
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    
    // Validação de confirmação de senha
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setError(null);
    setIsLoading(true);
    
    try {
      // Registra o usuário usando o serviço de autenticação
      const result = await registerUser({
        email,
        password,
        full_name: fullName,
        phone: phoneDigits, // Envia apenas os dígitos para o banco
        plan: selectedPlan || undefined,
        cep: cepDigits // Envia apenas os dígitos para o banco
      });

      if (!result.success) {
        throw new Error(result.error || 'Erro ao registrar usuário');
      }

      // Navegar para a página inicial após registro bem-sucedido
      navigate('/chat');
      
    } catch (err: any) {
      console.error('Erro no registro:', err);
      setError(err.message || 'Erro ao registrar. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
    cep,
    setCep,
    error,
    isLoading,
    registrationEnabled,
    selectedPlan,
    handleRegister
  };
};
