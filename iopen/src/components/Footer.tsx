import React, { useState } from 'react';
import { Facebook, Instagram, Linkedin, Twitter, ChevronDown, ChevronUp } from 'lucide-react';
import TrackableLink from './TrackableLink';

const Footer: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-gray-900 text-white pt-8 sm:pt-12 pb-6 sm:pb-8 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Footer (Accordion Style) */}
        <div className="md:hidden">
          <div className="mb-6">
            <div className="mb-5">
              <h3 className="text-xl font-bold mb-3">Iopen</h3>
              <p className="text-gray-400 mb-4 text-sm">
                Plataforma de investimentos automatizados com tecnologia avançada.
              </p>
              <div className="flex space-x-5 mb-4">
                <TrackableLink 
                  to="#" 
                  trackId="footer-facebook" 
                  className="text-gray-400 hover:text-white transition duration-300 w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-800 touch-highlight-none min-touch-target"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </TrackableLink>
                <TrackableLink 
                  to="#" 
                  trackId="footer-twitter" 
                  className="text-gray-400 hover:text-white transition duration-300 w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-800 touch-highlight-none min-touch-target"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </TrackableLink>
                <TrackableLink 
                  to="#" 
                  trackId="footer-instagram" 
                  className="text-gray-400 hover:text-white transition duration-300 w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-800 touch-highlight-none min-touch-target"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </TrackableLink>
                <TrackableLink 
                  to="#" 
                  trackId="footer-linkedin" 
                  className="text-gray-400 hover:text-white transition duration-300 w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-800 touch-highlight-none min-touch-target"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </TrackableLink>
              </div>
            </div>
            
            {/* Accordion Sections */}
            <div className="border-t border-gray-800 py-2">
              <button 
                className="flex justify-between items-center w-full py-4 text-left focus:outline-none touch-highlight-none min-touch-target"
                onClick={() => toggleSection('produtos')}
                aria-expanded={openSection === 'produtos'}
                aria-controls="produtos-panel"
              >
                <span className="text-base font-semibold">Produtos</span>
                {openSection === 'produtos' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              <div 
                id="produtos-panel" 
                className={`transition-all duration-300 overflow-hidden ${openSection === 'produtos' ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <ul className="pl-2 py-2 text-base space-y-3 text-gray-400">
                  <li><TrackableLink to="/login-triagem" trackId="footer-investimento-regular" className="hover:text-white transition duration-300 block py-2 touch-highlight-none min-touch-target">Investimento Regular</TrackableLink></li>
                  <li><TrackableLink to="/login-triagem" trackId="footer-aposentadoria" className="hover:text-white transition duration-300 block py-2 touch-highlight-none min-touch-target">Aposentadoria</TrackableLink></li>
                  <li><TrackableLink to="/login-triagem" trackId="footer-imoveis" className="hover:text-white transition duration-300 block py-2 touch-highlight-none min-touch-target">Imóveis</TrackableLink></li>
                  <li><TrackableLink to="/login-triagem" trackId="footer-educacao" className="hover:text-white transition duration-300 block py-2 touch-highlight-none min-touch-target">Educação</TrackableLink></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 py-2">
              <button 
                className="flex justify-between items-center w-full py-4 text-left focus:outline-none touch-highlight-none min-touch-target"
                onClick={() => toggleSection('empresa')}
                aria-expanded={openSection === 'empresa'}
                aria-controls="empresa-panel"
              >
                <span className="text-base font-semibold">Empresa</span>
                {openSection === 'empresa' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              <div 
                id="empresa-panel" 
                className={`transition-all duration-300 overflow-hidden ${openSection === 'empresa' ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <ul className="pl-2 py-2 text-base space-y-3 text-gray-400">
                  <li><TrackableLink to="#" trackId="footer-sobre" className="hover:text-white transition duration-300 block py-2 touch-highlight-none min-touch-target">Sobre nós</TrackableLink></li>
                  <li><TrackableLink to="#" trackId="footer-carreiras" className="hover:text-white transition duration-300 block py-2 touch-highlight-none min-touch-target">Carreiras</TrackableLink></li>
                  <li><TrackableLink to="#" trackId="footer-blog" className="hover:text-white transition duration-300 block py-2 touch-highlight-none min-touch-target">Blog</TrackableLink></li>
                  <li><TrackableLink to="#" trackId="footer-imprensa" className="hover:text-white transition duration-300 block py-2 touch-highlight-none min-touch-target">Imprensa</TrackableLink></li>
                  <li><TrackableLink to="#" trackId="footer-contato" className="hover:text-white transition duration-300 block py-2 touch-highlight-none min-touch-target">Contato</TrackableLink></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 py-2">
              <button 
                className="flex justify-between items-center w-full py-4 text-left focus:outline-none touch-highlight-none min-touch-target"
                onClick={() => toggleSection('legal')}
                aria-expanded={openSection === 'legal'}
                aria-controls="legal-panel"
              >
                <span className="text-base font-semibold">Legal</span>
                {openSection === 'legal' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              <div 
                id="legal-panel" 
                className={`transition-all duration-300 overflow-hidden ${openSection === 'legal' ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <ul className="pl-2 py-2 text-base space-y-3 text-gray-400">
                  <li><TrackableLink to="#" trackId="footer-termos" className="hover:text-white transition duration-300 block py-2 touch-highlight-none min-touch-target">Termos de Uso</TrackableLink></li>
                  <li><TrackableLink to="#" trackId="footer-privacidade" className="hover:text-white transition duration-300 block py-2 touch-highlight-none min-touch-target">Política de Privacidade</TrackableLink></li>
                  <li><TrackableLink to="#" trackId="footer-cookies" className="hover:text-white transition duration-300 block py-2 touch-highlight-none min-touch-target">Cookies</TrackableLink></li>
                  <li><TrackableLink to="#" trackId="footer-seguranca" className="hover:text-white transition duration-300 block py-2 touch-highlight-none min-touch-target">Segurança</TrackableLink></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Desktop Footer */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Iopen</h3>
            <p className="text-gray-400 mb-5 text-sm">
              Plataforma de investimentos automatizados que revoluciona a experiência financeira através da tecnologia avançada.
            </p>
            <div className="flex space-x-4">
              <TrackableLink 
                to="#" 
                trackId="footer-facebook" 
                className="text-gray-400 hover:text-white transition duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </TrackableLink>
              <TrackableLink 
                to="#" 
                trackId="footer-twitter" 
                className="text-gray-400 hover:text-white transition duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </TrackableLink>
              <TrackableLink 
                to="#" 
                trackId="footer-instagram" 
                className="text-gray-400 hover:text-white transition duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </TrackableLink>
              <TrackableLink 
                to="#" 
                trackId="footer-linkedin" 
                className="text-gray-400 hover:text-white transition duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </TrackableLink>
            </div>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">Produtos</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><TrackableLink to="/login-triagem" trackId="footer-investimento-regular" className="hover:text-white transition duration-300">Investimento Regular</TrackableLink></li>
              <li><TrackableLink to="/login-triagem" trackId="footer-aposentadoria" className="hover:text-white transition duration-300">Aposentadoria</TrackableLink></li>
              <li><TrackableLink to="/login-triagem" trackId="footer-imoveis" className="hover:text-white transition duration-300">Imóveis</TrackableLink></li>
              <li><TrackableLink to="/login-triagem" trackId="footer-educacao" className="hover:text-white transition duration-300">Educação</TrackableLink></li>
              <li><TrackableLink to="/login-triagem" trackId="footer-protecao" className="hover:text-white transition duration-300">Proteção Patrimonial</TrackableLink></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><TrackableLink to="#" trackId="footer-sobre" className="hover:text-white transition duration-300">Sobre nós</TrackableLink></li>
              <li><TrackableLink to="#" trackId="footer-carreiras" className="hover:text-white transition duration-300">Carreiras</TrackableLink></li>
              <li><TrackableLink to="#" trackId="footer-blog" className="hover:text-white transition duration-300">Blog</TrackableLink></li>
              <li><TrackableLink to="#" trackId="footer-imprensa" className="hover:text-white transition duration-300">Imprensa</TrackableLink></li>
              <li><TrackableLink to="#" trackId="footer-contato" className="hover:text-white transition duration-300">Contato</TrackableLink></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><TrackableLink to="#" trackId="footer-termos" className="hover:text-white transition duration-300">Termos de Uso</TrackableLink></li>
              <li><TrackableLink to="#" trackId="footer-privacidade" className="hover:text-white transition duration-300">Política de Privacidade</TrackableLink></li>
              <li><TrackableLink to="#" trackId="footer-cookies" className="hover:text-white transition duration-300">Cookies</TrackableLink></li>
              <li><TrackableLink to="#" trackId="footer-seguranca" className="hover:text-white transition duration-300">Segurança</TrackableLink></li>
              <li><TrackableLink to="#" trackId="footer-paia" className="hover:text-white transition duration-300">PAIA</TrackableLink></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-5 mt-2">
          <div className="text-center text-gray-500 text-sm">
            <p> {new Date().getFullYear()} Iopen. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;