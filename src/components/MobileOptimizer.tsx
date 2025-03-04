import React, { useEffect } from 'react';
import { useDeviceDetect } from '../utils/useDeviceDetect';

/**
 * Componente para otimizar a experiência em dispositivos móveis
 * Aplica ajustes específicos com base no tipo de dispositivo
 */
const MobileOptimizer: React.FC = () => {
  const { isMobile, isTablet, isIOS, isAndroid } = useDeviceDetect();
  const isTouchDevice = isMobile || isTablet || isIOS || isAndroid;

  useEffect(() => {
    // Adiciona classes específicas ao elemento HTML com base no dispositivo
    const html = document.documentElement;
    
    if (isMobile) {
      html.classList.add('is-mobile');
    } else {
      html.classList.remove('is-mobile');
    }
    
    if (isTablet) {
      html.classList.add('is-tablet');
    } else {
      html.classList.remove('is-tablet');
    }
    
    if (isTouchDevice) {
      html.classList.add('is-touch-device');
      
      // Desativa o destaque azul em dispositivos touch
      const style = document.createElement('style');
      style.innerHTML = `
        * {
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .min-touch-target {
          min-height: 44px;
          min-width: 44px;
        }
        .touch-highlight-none {
          -webkit-tap-highlight-color: transparent;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `;
      document.head.appendChild(style);
    }
    
    if (isIOS) {
      html.classList.add('is-ios');
      
      // Corrige o problema de inputs focados em iOS
      const handleInputFocus = () => {
        // Adiciona um pequeno delay para permitir que o teclado apareça primeiro
        setTimeout(() => {
          // Scroll suave para garantir que o input esteja visível
          window.scrollTo({
            top: window.scrollY,
            behavior: 'smooth'
          });
        }, 50);
      };

      // Aplica a todos os inputs e textareas
      const inputElements = document.querySelectorAll('input, textarea');
      inputElements.forEach(input => {
        input.addEventListener('focus', handleInputFocus);
      });

      // Desativa o comportamento de double-tap zoom em iOS
      const metaViewport = document.querySelector('meta[name="viewport"]');
      if (metaViewport) {
        metaViewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
      } else {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
        document.head.appendChild(meta);
      }

      // Cleanup
      return () => {
        inputElements.forEach(input => {
          input.removeEventListener('focus', handleInputFocus);
        });
      };
    }
    
    if (isAndroid) {
      html.classList.add('is-android');
      
      // Corrige problemas específicos do Android
      const style = document.createElement('style');
      style.innerHTML = `
        input, textarea {
          font-size: 16px; /* Evita zoom automático em campos de formulário */
        }
        body {
          overscroll-behavior-y: none; /* Evita o efeito de "bounce" */
        }
      `;
      document.head.appendChild(style);
    }

    // Ajusta a altura da viewport em dispositivos móveis para lidar com barras de navegação
    if (isMobile || isTablet) {
      const setViewportHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };

      setViewportHeight();
      window.addEventListener('resize', setViewportHeight);
      window.addEventListener('orientationchange', setViewportHeight);

      // Adiciona estilos para usar a altura da viewport corrigida
      const style = document.createElement('style');
      style.innerHTML = `
        .vh-fix {
          height: calc(var(--vh, 1vh) * 100);
        }
        .min-vh-fix {
          min-height: calc(var(--vh, 1vh) * 100);
        }
      `;
      document.head.appendChild(style);

      return () => {
        window.removeEventListener('resize', setViewportHeight);
        window.removeEventListener('orientationchange', setViewportHeight);
      };
    }
    
    // Adiciona suporte para gestos de pinça e zoom
    if (isTouchDevice) {
      const preventZoomHandler = (e: TouchEvent) => {
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      };
      
      // Adiciona apenas se não estivermos em um elemento que precisa de zoom
      document.addEventListener('touchstart', preventZoomHandler, { passive: false });
      
      return () => {
        document.removeEventListener('touchstart', preventZoomHandler);
      };
    }
  }, [isMobile, isTablet, isTouchDevice, isIOS, isAndroid]);

  // Este componente não renderiza nada visualmente
  return null;
};

export default MobileOptimizer;
