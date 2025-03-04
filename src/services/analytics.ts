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

// Interface para eventos de clique
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
  created_at?: string;
}

// Nova interface para eventos de navegação
interface PageViewAnalytics {
  id?: string;
  user_id?: string;
  page: string;
  referrer?: string;
  entry_time: string;
  exit_time?: string;
  time_on_page?: number;
  session_id?: string;
  device_info?: Record<string, any>;
  metadata?: Record<string, any>;
  created_at?: string;
}

// Classe para gerenciar o acesso ao Supabase
class AnalyticsService {
  private supabase;
  private sessionId: string;
  private deviceInfo: Record<string, any>;
  private allowedTables = ['profiles', 'click_analytics', 'page_view_analytics'];
  private currentPageView: PageViewAnalytics | null = null;
  private initialized = false;
  private userId: string | null = null;

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
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      platform: navigator.platform,
      vendor: navigator.vendor,
      connection: this.getConnectionInfo()
    };

    console.log('Analytics Service: Inicializado com sessão', this.sessionId);
  }

  // Obter informações de conexão, se disponíveis
  private getConnectionInfo(): Record<string, any> {
    const nav: any = navigator;
    if (nav.connection) {
      return {
        effectiveType: nav.connection.effectiveType,
        downlink: nav.connection.downlink,
        rtt: nav.connection.rtt,
        saveData: nav.connection.saveData
      };
    }
    return {};
  }

  // Inicializar o serviço com ID do usuário
  initialize(userId: string | null): void {
    if (this.initialized) {
      return;
    }
    
    this.initialized = true;
    this.userId = userId;
    
    // Registrar handlers para eventos de navegação
    window.addEventListener('beforeunload', this.handlePageExit.bind(this));
    window.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    
    // Iniciar rastreamento da página atual
    this.trackPageView();
    
    console.log('Analytics Service: Totalmente inicializado com usuário', userId);
  }

  // Atualizar ID do usuário quando o usuário fizer login/logout
  setUserId(userId: string | null): void {
    this.userId = userId;
    console.log('Analytics Service: ID do usuário atualizado', userId);
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
        device_info: this.deviceInfo,
        created_at: new Date().toISOString()
      };

      // Adicionar user_id se o usuário estiver autenticado
      if (this.userId) {
        clickData.user_id = this.userId;
      } else {
        // Tentar obter o usuário atual do Supabase
        const { data: { user } } = await this.supabase.auth.getUser();
        if (user) {
          clickData.user_id = user.id;
          this.userId = user.id;
        }
      }

      console.log('Analytics Service: Rastreando clique', clickData);

      const { error } = await this.supabase
        .from('click_analytics')
        .insert(clickData);

      if (error) {
        console.error('Analytics Service: Erro ao salvar analytics de clique', error);
      } else {
        console.log('Analytics Service: Clique registrado com sucesso');
      }
    } catch (error) {
      console.error('Analytics Service: Erro ao rastrear clique', error);
    }
  }

  // Método para rastrear visualização de páginas
  async trackPageView(metadata: Record<string, any> = {}): Promise<void> {
    try {
      if (!this.isTableAllowed('page_view_analytics')) {
        return;
      }

      // Se já estiver rastreando uma página, finalize-a primeiro
      if (this.currentPageView) {
        await this.finalizePageView();
      }

      const pageViewData: PageViewAnalytics = {
        page: window.location.pathname,
        referrer: document.referrer || undefined,
        entry_time: new Date().toISOString(),
        session_id: this.sessionId,
        device_info: this.deviceInfo,
        metadata: {
          title: document.title,
          url: window.location.href,
          ...metadata
        },
        created_at: new Date().toISOString()
      };

      // Adicionar user_id se o usuário estiver autenticado
      if (this.userId) {
        pageViewData.user_id = this.userId;
      } else {
        // Tentar obter o usuário atual do Supabase
        const { data: { user } } = await this.supabase.auth.getUser();
        if (user) {
          pageViewData.user_id = user.id;
          this.userId = user.id;
        }
      }

      console.log('Analytics Service: Rastreando visualização de página', pageViewData);

      const { data, error } = await this.supabase
        .from('page_view_analytics')
        .insert(pageViewData)
        .select();

      if (error) {
        console.error('Analytics Service: Erro ao salvar analytics de página', error);
      } else if (data && data.length > 0) {
        this.currentPageView = data[0] as PageViewAnalytics;
        console.log('Analytics Service: Visualização de página registrada com sucesso', this.currentPageView.id);
      }
    } catch (error) {
      console.error('Analytics Service: Erro ao rastrear visualização de página', error);
    }
  }

  // Finalizar registro de visualização de página atual
  private async finalizePageView(): Promise<void> {
    if (!this.currentPageView || !this.currentPageView.id) {
      return;
    }

    try {
      const now = new Date();
      const exitTime = now.toISOString();
      
      // Calcular tempo na página em segundos
      const entryTime = new Date(this.currentPageView.entry_time);
      const timeOnPage = Math.round((now.getTime() - entryTime.getTime()) / 1000);
      
      const { error } = await this.supabase
        .from('page_view_analytics')
        .update({
          exit_time: exitTime,
          time_on_page: timeOnPage
        })
        .eq('id', this.currentPageView.id);

      if (error) {
        console.error('Analytics Service: Erro ao finalizar visualização de página', error);
      } else {
        console.log(`Analytics Service: Finalizada visualização da página ${this.currentPageView.page} com ${timeOnPage} segundos`);
      }
      
      // Limpar referência à página atual
      this.currentPageView = null;
    } catch (error) {
      console.error('Analytics Service: Erro ao finalizar visualização de página', error);
    }
  }

  // Tratar saída da página
  private async handlePageExit(): Promise<void> {
    await this.finalizePageView();
  }

  // Tratar mudança de visibilidade (quando o usuário muda de tab ou minimiza)
  private async handleVisibilityChange(): Promise<void> {
    if (document.visibilityState === 'hidden') {
      // Usuário saiu da página
      await this.finalizePageView();
    } else if (document.visibilityState === 'visible') {
      // Usuário voltou para a página
      if (!this.currentPageView) {
        await this.trackPageView();
      }
    }
  }

  // Método para rastrear eventos personalizados
  async trackEvent(
    eventName: string,
    category: string,
    metadata: Record<string, any> = {}
  ): Promise<void> {
    try {
      const eventData = {
        event_name: eventName,
        category,
        page: window.location.pathname,
        user_id: this.userId,
        session_id: this.sessionId,
        device_info: this.deviceInfo,
        metadata,
        created_at: new Date().toISOString()
      };

      console.log('Analytics Service: Rastreando evento', eventData);

      const { error } = await this.supabase
        .from('event_analytics')
        .insert(eventData);

      if (error) {
        console.error('Analytics Service: Erro ao salvar evento', error);
      } else {
        console.log('Analytics Service: Evento registrado com sucesso');
      }
    } catch (error) {
      console.error('Analytics Service: Erro ao rastrear evento', error);
    }
  }
}

// Exportar uma instância singleton do serviço
export const analyticsService = new AnalyticsService();