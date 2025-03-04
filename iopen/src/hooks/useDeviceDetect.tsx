import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouchDevice: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  orientation: 'portrait' | 'landscape' | 'unknown';
}

/**
 * Hook para detectar o tipo de dispositivo e orientação
 * @returns Informações sobre o dispositivo atual
 */
export function useDeviceDetect(): DeviceInfo {
  // Estado inicial - assume desktop como padrão
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouchDevice: false,
    isIOS: false,
    isAndroid: false,
    orientation: 'unknown',
  });

  useEffect(() => {
    // Função para determinar o tipo de dispositivo
    const detectDevice = (): DeviceInfo => {
      // Verifica se estamos em um ambiente de navegador
      if (typeof window === 'undefined' || !window.navigator) {
        return {
          isMobile: false,
          isTablet: false,
          isDesktop: true,
          isTouchDevice: false,
          isIOS: false,
          isAndroid: false,
          orientation: 'unknown',
        };
      }

      const userAgent = navigator.userAgent.toLowerCase();
      const width = window.innerWidth;
      
      // Detecta se é dispositivo de toque
      const isTouchDevice = 
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 || 
        (navigator as any).msMaxTouchPoints > 0;
      
      // Detecta orientação
      let orientation: 'portrait' | 'landscape' | 'unknown' = 'unknown';
      if (typeof window.orientation !== 'undefined') {
        orientation = Math.abs(window.orientation as number) === 90 ? 'landscape' : 'portrait';
      } else if (window.matchMedia) {
        orientation = window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape';
      }
      
      // Detecta plataforma
      const isIOS = /iphone|ipad|ipod/.test(userAgent);
      const isAndroid = /android/.test(userAgent);
      
      // Detecta tipo de dispositivo com base na largura e user agent
      const isMobile = width <= 767 || 
        /iphone|ipod|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/.test(userAgent);
      
      const isTablet = (width >= 768 && width <= 1024) || 
        /ipad|android 3|sch-i800|playbook|tablet|kindle|gt-p1000|sgh-t849|shw-m180s|a510|a511|a100|dell streak|silk/.test(userAgent);
      
      const isDesktop = !isMobile && !isTablet;
      
      return {
        isMobile,
        isTablet,
        isDesktop,
        isTouchDevice,
        isIOS,
        isAndroid,
        orientation,
      };
    };

    // Atualiza o estado com informações do dispositivo
    setDeviceInfo(detectDevice());

    // Adiciona listener para atualizar quando a orientação mudar
    const handleResize = () => {
      setDeviceInfo(detectDevice());
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Limpa os listeners ao desmontar o componente
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return deviceInfo;
}

export default useDeviceDetect;
