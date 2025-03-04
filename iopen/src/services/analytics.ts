import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

// Definição dos tipos para as tabelas do Supabase
interface Profile {
  id: string;
  full_name?: string;
  email?: string;
  phone?: string;
  plan?: string;
  cep?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
}

interface ClickAnalytics {
  id?: string;
  user_id?: string;
  button_id: string;
  page: string;
  component?: string;
  action: string;
  metadata?: Record<string, any>;
  session_id?: string;
  device_info?: Record<string, any>;
}

// Classe para gerenciar o acesso ao Supabase
class AnalyticsService {
  private supabase;
  private sessionId: string;
  private deviceInfo: Record<string, any>;
  private allowedTables = ['profiles', 'click_analytics'];

  constructor() {
    // Inicializar cliente Supabase com as credenciais do .env
    this.supabase = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY
    );

    // Gerar ID de sessão único
    this.sessionId = localStorage.getItem('session_id') || uuidv4();
    localStorage.setItem('session_id', this.sessionId);

    // Coletar informações básicas do dispositivo
    this.deviceInfo = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    console.log('Analytics Service: Inicializado com sessão', this.sessionId);
  }

  // Método privado para verificar se a tabela é permitida
  private isTableAllowed(table: string): boolean {
    if (!this.allowedTables.includes(table)) {
      console.warn(`Analytics Service: Tentativa de acesso à tabela não permitida: ${table}`);
      return false;
    }
    return true;
  }

  // Método para rastrear cliques em botões
  async trackButtonClick(
    buttonId: string,
    component: string,
    action: string,
    metadata: Record<string, any> = {}
  ): Promise<void> {
    try {
      if (!this.isTableAllowed('click_analytics')) {
        return;
      }

      const clickData: ClickAnalytics = {
        button_id: buttonId,
        page: window.location.pathname,
        component,
        action,
        metadata,
        session_id: this.sessionId,
        device_info: this.deviceInfo
      };

      // Adicionar user_id se o usuário estiver autenticado
      const { data: { user } } = await this.supabase.auth.getUser();
      if (user) {
        clickData.user_id = user.id;
      }

      console.log('Analytics Service: Rastreando clique', clickData);

      const { error } = await this.supabase
        .from('click_analytics')
        .insert(clickData);

      if (error) {
        console.error('Analytics Service: Erro ao salvar analytics', error);
      }
    } catch (error) {
      console.error('Analytics Service: Erro ao rastrear clique', error);
    }
  }

  // Método para rastrear entrada em páginas (desativado para economizar tokens)
  trackPageEntry(): void {
    // Método desativado para economizar tokens
    console.log('Analytics Service: Rastreamento de página desativado para economizar tokens');
  }
}

// Exportar uma instância singleton do serviço
export const analyticsService = new AnalyticsService();