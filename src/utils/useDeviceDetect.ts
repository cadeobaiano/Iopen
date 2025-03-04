import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isPortrait: boolean;
  isLandscape: boolean;
}

/**
 * Hook para detectar o tipo de dispositivo, sistema operacional e orientação
 * 
 * @returns Objeto com informações sobre o dispositivo
 */
export const useDeviceDetect = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isIOS: false,
    isAndroid: false,
    isPortrait: true,
    isLandscape: false,
  });

  useEffect(() => {
    const checkDevice = () => {
      // Detecta o User Agent
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      
      // Detecta se é iOS
      const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
      
      // Detecta se é Android
      const isAndroid = /android/i.test(userAgent);
      
      // Detecta tamanho da tela
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Detecta orientação
      const isPortrait = height > width;
      const isLandscape = width > height;
      
      // Classifica o dispositivo com base no tamanho da tela
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;
      
      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        isIOS,
        isAndroid,
        isPortrait,
        isLandscape,
      });
    };

    // Verifica o dispositivo na montagem do componente
    checkDevice();
    
    // Adiciona listener para mudanças de tamanho da tela
    window.addEventListener('resize', checkDevice);
    
    // Adiciona listener para mudanças de orientação
    window.addEventListener('orientationchange', checkDevice);
    
    // Limpa os listeners quando o componente é desmontado
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  return deviceInfo;
};

export default useDeviceDetect;
