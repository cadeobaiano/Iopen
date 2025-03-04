import React, { useState, useEffect } from 'react';
import { useUserData } from '../hooks/useUserData';
import TrackableButton from './TrackableButton';

interface UserDataFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const UserDataForm: React.FC<UserDataFormProps> = ({ onSuccess, onCancel }) => {
  const { userData, loading, error, saveUserData } = useUserData();
  
  const [formData, setFormData] = useState({
    nome: '',
    email: ''
  });
  
  const [formError, setFormError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Load existing data into form when available
  useEffect(() => {
    if (userData) {
      setFormData({
        nome: userData.nome || '',
        email: userData.email || ''
      });
    }
  }, [userData]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.nome.trim()) {
      setFormError('Nome é obrigatório');
      return;
    }
    
    if (!formData.email.trim()) {
      setFormError('Email é obrigatório');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Email inválido');
      return;
    }
    
    setFormError(null);
    setIsSaving(true);
    
    try {
      const success = await saveUserData(formData);
      
      if (success) {
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (err) {
      console.error('Error saving user data:', err);
      setFormError('Erro ao salvar dados. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Seus Dados</h2>
      
      {formError && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm sm:text-base">
          {formError}
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm sm:text-base">
          Erro ao carregar dados: {error.message || 'Erro desconhecido'}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
            Nome
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            disabled={loading || isSaving}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base"
            placeholder="Seu nome completo"
          />
        </div>
        
        <div className="mb-5 sm:mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading || isSaving}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base"
            placeholder="seu@email.com"
          />
        </div>
        
        <div className="flex justify-end space-x-3 sm:space-x-4">
          {onCancel && (
            <TrackableButton
              trackId="user-data-cancel"
              type="button"
              onClick={onCancel}
              disabled={loading || isSaving}
              className="px-3 sm:px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              Cancelar
            </TrackableButton>
          )}
          
          <TrackableButton
            trackId="user-data-save"
            type="submit"
            disabled={loading || isSaving}
            className="px-3 sm:px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors text-sm sm:text-base"
          >
            {isSaving ? 'Salvando...' : 'Salvar'}
          </TrackableButton>
        </div>
      </form>
    </div>
  );
};

export default UserDataForm;