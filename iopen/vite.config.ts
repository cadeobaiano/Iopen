import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    // Desabilita HTTPS para permitir conexões HTTP simples
    https: false,
    // Configuração para permitir acesso de qualquer origem
    cors: true,
  },
});
