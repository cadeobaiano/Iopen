import React, { useState, useEffect } from 'react';
import { User, Shield, Settings, LogOut, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserDataForm from '../components/UserDataForm';
import { supabase } from '../lib/supabase';
import { useUserData } from '../hooks/useUserData';
import TrackableButton from '../components/TrackableButton';
import useDeviceDetect from '../hooks/useDeviceDetect';

const ProfilePage: React.FC = () => {
  const { userData, loading } = useUserData();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const { isMobile } = useDeviceDetect();
  const [stickyNav, setStickyNav] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setStickyNav(true);
      } else {
        setStickyNav(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };
  
  return (
    <div className="font-sans text-gray-800 min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 sm:gap-8">
            {/* Sidebar - em mobile vira um menu horizontal com rolagem */}
            <div className={`w-full md:w-64 bg-white rounded-xl shadow-md p-4 sm:p-6 
              ${isMobile && stickyNav ? 'sticky top-16 z-20' : ''}`}>
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="bg-cyan-100 w-12 h-12 rounded-full flex items-center justify-center mr-4 min-touch-target touch-highlight-none">
                  <User className="text-cyan-600" size={22} />
                </div>
                <div>
                  <h2 className="font-bold text-lg">{userData?.nome || 'Usuário'}</h2>
                  <p className="text-sm text-gray-500">{userData?.email || 'Sem email'}</p>
                </div>
              </div>
              
              {/* Menu de navegação em mobile vira um scrollbar horizontal */}
              <div className="overflow-x-auto scrollbar-hide md:overflow-visible -mx-4 px-4 md:mx-0 md:px-0">
                <nav className="flex md:flex-col space-x-3 md:space-x-0 md:space-y-2 min-w-max md:min-w-0">
                  <TrackableButton
                    trackId="profile-tab-profile"
                    onClick={() => setActiveTab('profile')}
                    className={`text-left px-4 py-3 rounded-lg flex items-center whitespace-nowrap min-touch-target touch-highlight-none ${
                      activeTab === 'profile' 
                        ? 'bg-cyan-50 text-cyan-700 font-medium' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <User size={18} className="mr-3" />
                    <span className="text-base">Perfil</span>
                    {isMobile && <ChevronRight size={16} className="ml-2 text-gray-400" />}
                  </TrackableButton>
                  
                  <TrackableButton
                    trackId="profile-tab-security"
                    onClick={() => setActiveTab('security')}
                    className={`text-left px-4 py-3 rounded-lg flex items-center whitespace-nowrap min-touch-target touch-highlight-none ${
                      activeTab === 'security' 
                        ? 'bg-cyan-50 text-cyan-700 font-medium' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <Shield size={18} className="mr-3" />
                    <span className="text-base">Segurança</span>
                    {isMobile && <ChevronRight size={16} className="ml-2 text-gray-400" />}
                  </TrackableButton>
                  
                  <TrackableButton
                    trackId="profile-tab-settings"
                    onClick={() => setActiveTab('settings')}
                    className={`text-left px-4 py-3 rounded-lg flex items-center whitespace-nowrap min-touch-target touch-highlight-none ${
                      activeTab === 'settings' 
                        ? 'bg-cyan-50 text-cyan-700 font-medium' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <Settings size={18} className="mr-3" />
                    <span className="text-base">Configurações</span>
                    {isMobile && <ChevronRight size={16} className="ml-2 text-gray-400" />}
                  </TrackableButton>
                  
                  <TrackableButton
                    trackId="profile-logout"
                    onClick={handleLogout}
                    className="text-left px-4 py-3 rounded-lg flex items-center text-red-600 hover:bg-red-50 whitespace-nowrap min-touch-target touch-highlight-none"
                  >
                    <LogOut size={18} className="mr-3" />
                    <span className="text-base">Sair</span>
                  </TrackableButton>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-grow mt-4 md:mt-0">
              {activeTab === 'profile' && (
                <div className="bg-white rounded-xl shadow-md p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-0">Perfil</h2>
                    {!isEditing && (
                      <TrackableButton
                        trackId="profile-edit"
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2.5 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors text-base min-touch-target touch-highlight-none w-full sm:w-auto"
                      >
                        Editar Perfil
                      </TrackableButton>
                    )}
                  </div>
                  
                  {isEditing ? (
                    <UserDataForm 
                      onSuccess={() => setIsEditing(false)}
                      onCancel={() => setIsEditing(false)}
                    />
                  ) : (
                    <div>
                      {loading ? (
                        <div className="animate-pulse">
                          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                          <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                          <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
                        </div>
                      ) : (
                        <div className="space-y-5 sm:space-y-6">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Nome</h3>
                            <p className="text-lg">{userData?.nome || 'Não informado'}</p>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                            <p className="text-lg">{userData?.email || 'Não informado'}</p>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Membro desde</h3>
                            <p className="text-lg">
                              {userData?.created_at 
                                ? new Date(userData.created_at).toLocaleDateString('pt-BR', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric'
                                  })
                                : 'Não disponível'
                              }
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'security' && (
                <div className="bg-white rounded-xl shadow-md p-5 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">Segurança</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium mb-2">Alterar senha</h3>
                      <p className="text-gray-600 mb-4">
                        Atualize sua senha para manter sua conta segura.
                      </p>
                      <TrackableButton
                        trackId="profile-change-password"
                        className="px-4 py-2.5 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors min-touch-target touch-highlight-none w-full sm:w-auto"
                      >
                        Alterar senha
                      </TrackableButton>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium mb-2">Autenticação de dois fatores</h3>
                      <p className="text-gray-600 mb-4">
                        Adicione uma camada extra de segurança à sua conta.
                      </p>
                      <TrackableButton
                        trackId="profile-enable-2fa"
                        className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors min-touch-target touch-highlight-none w-full sm:w-auto"
                      >
                        Configurar 2FA
                      </TrackableButton>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium mb-2 text-red-600">Zona de perigo</h3>
                      <p className="text-gray-600 mb-4">
                        Ações permanentes que afetam sua conta.
                      </p>
                      <TrackableButton
                        trackId="profile-delete-account"
                        className="px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors min-touch-target touch-highlight-none w-full sm:w-auto"
                      >
                        Excluir conta
                      </TrackableButton>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div className="bg-white rounded-xl shadow-md p-5 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">Configurações</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium mb-2">Notificações</h3>
                      <p className="text-gray-600 mb-4">
                        Gerencie como e quando você recebe notificações.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-medium">Notificações por email</p>
                            <p className="text-sm text-gray-500">Receba atualizações sobre sua conta</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer min-touch-target touch-highlight-none">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-cyan-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-medium">Notificações de marketing</p>
                            <p className="text-sm text-gray-500">Receba ofertas e novidades</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer min-touch-target touch-highlight-none">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-cyan-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium mb-2">Idioma e região</h3>
                      <p className="text-gray-600 mb-4">
                        Personalize sua experiência com base em sua localização.
                      </p>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                            Idioma
                          </label>
                          <select
                            id="language"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent min-touch-target"
                          >
                            <option value="pt-BR">Português (Brasil)</option>
                            <option value="en-US">English (US)</option>
                            <option value="es">Español</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                            Fuso horário
                          </label>
                          <select
                            id="timezone"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent min-touch-target"
                          >
                            <option value="America/Sao_Paulo">Brasília (GMT-3)</option>
                            <option value="America/New_York">New York (GMT-5)</option>
                            <option value="Europe/London">London (GMT+0)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium mb-2">Tema</h3>
                      <p className="text-gray-600 mb-4">
                        Escolha como a interface do aplicativo deve ser exibida.
                      </p>
                      
                      <div className="grid grid-cols-3 gap-2 sm:flex sm:space-x-4">
                        <TrackableButton
                          trackId="profile-theme-light"
                          className="px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors min-touch-target touch-highlight-none w-full flex justify-center items-center"
                        >
                          Claro
                        </TrackableButton>
                        
                        <TrackableButton
                          trackId="profile-theme-dark"
                          className="px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors min-touch-target touch-highlight-none w-full flex justify-center items-center"
                        >
                          Escuro
                        </TrackableButton>
                        
                        <TrackableButton
                          trackId="profile-theme-system"
                          className="px-4 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors min-touch-target touch-highlight-none w-full flex justify-center items-center"
                        >
                          Sistema
                        </TrackableButton>
                      </div>
                    </div>
                  </div>
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

export default ProfilePage;