import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import TrackableLink from './TrackableLink';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden'; // Impede rolagem quando menu está aberto
    } else {
      document.body.style.overflow = 'auto'; // Restaura rolagem quando menu está fechado
    }
  };

  // Detecta rolagem para mudar a aparência do cabeçalho
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Restaura overflow do body quando componente é desmontado
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 bg-white z-40 transition-all duration-300 ${scrolled ? 'shadow-md py-2' : 'shadow-sm py-3'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center touch-highlight-none">
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Iopen
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-6">
            <div className="relative group">
              <TrackableLink 
                to="/investir" 
                trackId="nav-investir"
                className={`text-gray-700 hover:text-orange-500 font-medium text-sm lg:text-base px-2 py-2 rounded-md transition-colors ${
                  location.pathname === '/investir' ? 'text-orange-500' : ''
                }`}
              >
                Investir
              </TrackableLink>
            </div>
            <div className="relative group">
              <TrackableLink 
                to="/negocio" 
                trackId="nav-negocio"
                className={`text-gray-700 hover:text-orange-500 font-medium text-sm lg:text-base px-2 py-2 rounded-md transition-colors ${
                  location.pathname === '/negocio' ? 'text-orange-500' : ''
                }`}
              >
                Negócio
              </TrackableLink>
            </div>
            <div className="relative group">
              <TrackableLink 
                to="/aprendizagem" 
                trackId="nav-aprendizagem"
                className={`text-gray-700 hover:text-orange-500 font-medium text-sm lg:text-base px-2 py-2 rounded-md transition-colors ${
                  location.pathname === '/aprendizagem' ? 'text-orange-500' : ''
                }`}
              >
                Aprender
              </TrackableLink>
            </div>
            <div className="relative group">
              <TrackableLink 
                to="/quem-somos" 
                trackId="nav-quem-somos"
                className={`text-gray-700 hover:text-orange-500 font-medium text-sm lg:text-base px-2 py-2 rounded-md transition-colors ${
                  location.pathname === '/quem-somos' ? 'text-orange-500' : ''
                }`}
              >
                Sobre
              </TrackableLink>
            </div>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
            <TrackableLink 
              to="/login-triagem" 
              trackId="nav-login"
              className="text-gray-700 hover:text-orange-500 font-medium text-sm lg:text-base px-2 py-1.5 rounded-md transition-colors"
            >
              Login
            </TrackableLink>
            <TrackableLink
              to="/login-triagem"
              trackId="nav-cta-investir"
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-3 lg:px-4 rounded-lg transition duration-300 text-xs lg:text-sm"
            >
              Investir
            </TrackableLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-orange-500 focus:outline-none w-12 h-12 flex items-center justify-center touch-highlight-none min-touch-target"
              data-track-id="mobile-menu-toggle"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Slide-in from side */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
            onClick={toggleMenu}
            aria-hidden="true"
          ></div>
          
          {/* Menu Content */}
          <div className="absolute top-0 right-0 h-full w-[85%] max-w-xs bg-white shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto">
            <div className="sticky top-0 flex justify-end p-4 border-b bg-white z-10">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-orange-500 focus:outline-none w-12 h-12 flex items-center justify-center touch-highlight-none min-touch-target"
                aria-label="Fechar menu"
              >
                <X size={22} />
              </button>
            </div>
            
            <div className="flex flex-col py-2">
              <TrackableLink 
                to="/investir" 
                trackId="mobile-nav-investir"
                className={`px-4 py-4 text-gray-700 hover:text-orange-500 hover:bg-gray-50 font-medium text-base flex justify-between items-center active:bg-gray-100 touch-highlight-none min-touch-target ${
                  location.pathname === '/investir' ? 'text-orange-500 bg-orange-50' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Investir
                <ChevronRight size={18} />
              </TrackableLink>
              <TrackableLink 
                to="/negocio" 
                trackId="mobile-nav-negocio"
                className={`px-4 py-4 text-gray-700 hover:text-orange-500 hover:bg-gray-50 font-medium text-base flex justify-between items-center active:bg-gray-100 touch-highlight-none min-touch-target ${
                  location.pathname === '/negocio' ? 'text-orange-500 bg-orange-50' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Negócio
                <ChevronRight size={18} />
              </TrackableLink>
              <TrackableLink 
                to="/aprendizagem" 
                trackId="mobile-nav-aprendizagem"
                className={`px-4 py-4 text-gray-700 hover:text-orange-500 hover:bg-gray-50 font-medium text-base flex justify-between items-center active:bg-gray-100 touch-highlight-none min-touch-target ${
                  location.pathname === '/aprendizagem' ? 'text-orange-500 bg-orange-50' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Aprender
                <ChevronRight size={18} />
              </TrackableLink>
              <TrackableLink 
                to="/quem-somos" 
                trackId="mobile-nav-quem-somos"
                className={`px-4 py-4 text-gray-700 hover:text-orange-500 hover:bg-gray-50 font-medium text-base flex justify-between items-center active:bg-gray-100 touch-highlight-none min-touch-target ${
                  location.pathname === '/quem-somos' ? 'text-orange-500 bg-orange-50' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
                <ChevronRight size={18} />
              </TrackableLink>
              <TrackableLink 
                to="/login-triagem" 
                trackId="mobile-nav-login"
                className="px-4 py-4 text-gray-700 hover:text-orange-500 hover:bg-gray-50 font-medium text-base flex justify-between items-center active:bg-gray-100 touch-highlight-none min-touch-target"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
                <ChevronRight size={18} />
              </TrackableLink>
            </div>
            
            <div className="px-4 py-6 mt-2 border-t">
              <TrackableLink
                to="/login-triagem"
                trackId="mobile-nav-cta-investir"
                className="block bg-orange-500 hover:bg-orange-600 text-white font-medium py-4 px-4 rounded-lg text-center transition duration-300 text-base active:bg-orange-700 touch-highlight-none min-touch-target"
                onClick={() => setIsMenuOpen(false)}
              >
                Comece a investir
              </TrackableLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;