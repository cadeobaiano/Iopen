import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const MaintenancePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#FEFEFE]">
      {/* Header */}
      <header className="iopen-header shadow-md py-5 px-6">
        <div className="flex items-center justify-center">
          <div className="flex items-center">
            <span className="text-[#FEFEFE] font-bold text-2xl mr-2">IOP</span>
            <span className="text-[#FEFEFE] mx-2">|</span>
            <span className="text-[#FEFEFE] font-medium">Especialista em investimentos</span>
            <span className="text-[#FEFEFE] font-semibold ml-1">Iopen</span>
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center bg-white rounded-xl shadow-lg p-8 border border-[#2AA0E5]/20">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#2AA0E5] to-[#418AF4] flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 16v-4M12 8h.01"></path>
              <path d="M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2s10 4.5 10 10z"></path>
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-[#283D40] mb-4">Em Manutenção</h1>
          
          <p className="text-xl text-gray-600 mb-6">
            Estamos em manutenção de software aprimorando nossa tecnologia, mas temos uma promessa: 
            <span className="block mt-2 font-semibold text-[#367BF2]">
              Iremos revolucionar o mercado financeiro e você participará disso!
            </span>
          </p>
          
          <div className="w-20 h-1 bg-gradient-to-r from-[#2AA0E5] to-[#418AF4] mx-auto mb-6"></div>
          
          <p className="text-gray-500 mb-8">
            Nossos desenvolvedores estão trabalhando para entregar a melhor experiência possível.
            Voltaremos em breve com novidades incríveis!
          </p>
          
          <button 
            onClick={() => navigate('/chat')}
            className="inline-flex items-center px-5 py-3 bg-[#2AA0E5] text-white rounded-full hover:bg-[#418AF4] transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Voltar para o chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage; 