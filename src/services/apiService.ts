import OpenAI from 'openai';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from './auth';

// Tipos para o estado do chat
export type ChatStage = 'intro' | 'platform' | 'goals' | 'profile' | 'volume' | 'closing' | 'completed';

// Interface para os dados do chat
export interface ChatData {
  userId?: string;
  sessionId: string;
  stage: ChatStage;
  investmentObjective: string | null;
  investorProfile: string | null;
  investmentValue: string | null;
  managementFee: number | null;
  estimatedSavings: number | null;
  acceptedFee: boolean | null;
  openedAccount: boolean | null;
}

// Interface para as mensagens
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Interface para opções de resposta rápida
export interface QuickResponse {
  text: string;
  value: string;
}

interface MessageContent {
  role: string;
  content: string;
}

class ApiService {
  private openai: OpenAI;
  private conversationState: Map<string, ChatData>;
  private apiKey: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
    this.openai = new OpenAI({
      apiKey: this.apiKey,
      dangerouslyAllowBrowser: true // Para uso no cliente
    });
    this.conversationState = new Map<string, ChatData>();
  }

  // Método para inicializar o estado da conversa
  public initConversation(userId?: string): ChatData {
    const sessionId = uuidv4();
    const initialState: ChatData = {
      userId,
      sessionId,
      stage: 'intro',
      investmentObjective: null,
      investorProfile: null,
      investmentValue: null,
      managementFee: null,
      estimatedSavings: null,
      acceptedFee: null,
      openedAccount: null
    };
    
    this.conversationState.set(sessionId, initialState);
    return initialState;
  }

  // Método para atualizar o estado da conversa
  public updateConversationState(sessionId: string, updates: Partial<ChatData>): ChatData | null {
    const state = this.conversationState.get(sessionId);
    if (!state) return null;
    
    const updatedState = { ...state, ...updates };
    this.conversationState.set(sessionId, updatedState);
    return updatedState;
  }

  // Método para obter o estado atual da conversa
  public getConversationState(sessionId: string): ChatData | null {
    return this.conversationState.get(sessionId) || null;
  }

  // Método para avançar para o próximo estágio
  public moveToNextStage(sessionId: string, userResponse: string): ChatStage | null {
    const state = this.conversationState.get(sessionId);
    if (!state) return null;
    
    // Atualizar o estado com base na resposta do usuário
    switch (state.stage) {
      case 'intro':
        this.updateConversationState(sessionId, { stage: 'platform' });
        return 'platform';
      
      case 'platform':
        this.updateConversationState(sessionId, { stage: 'goals' });
        return 'goals';
      
      case 'goals':
        this.updateConversationState(sessionId, { investmentObjective: userResponse, stage: 'profile' });
        return 'profile';
      
      case 'profile':
        this.updateConversationState(sessionId, { investorProfile: userResponse, stage: 'volume' });
        return 'profile';
      
      case 'volume':
        const managementFee = this.calculateManagementFee(state.investorProfile || 'moderado', userResponse);
        const estimatedSavings = this.calculateEstimatedSavings(userResponse);
        
        this.updateConversationState(sessionId, { 
          investmentValue: userResponse,
          managementFee,
          estimatedSavings,
          stage: 'closing'
        });
        return 'closing';
      
      case 'closing':
        this.updateConversationState(sessionId, { 
          acceptedFee: userResponse.toLowerCase().includes('iniciar') || userResponse.toLowerCase().includes('agendar'),
          openedAccount: false,
          stage: 'completed'
        });
        return 'completed';
      
      default:
        return state.stage;
    }
  }

  // Método para calcular a taxa recomendada (entre 0,4% e 0,8% a.a.)
  public calculateManagementFee(profile: string, volume: string): number {
    // Base da taxa
    let baseRate = 0.4;
    
    // Ajuste pelo perfil do investidor
    if (profile.toLowerCase().includes('conservador')) {
      baseRate += 0.1;
    } else if (profile.toLowerCase().includes('agressivo')) {
      baseRate += 0.2;
    } else { // moderado
      baseRate += 0.15;
    }
    
    // Ajuste pelo volume investido
    if (volume.toLowerCase().includes('10k') || volume.toLowerCase().includes('100k')) {
      baseRate += 0.2;
    } else if (volume.toLowerCase().includes('300k') || volume.toLowerCase().includes('500k')) {
      baseRate += 0.1;
    } else { // mais de 1mm
      baseRate += 0.05;
    }
    
    // Garantir que a taxa está no range especificado
    return Math.min(Math.max(baseRate, 0.4), 0.8);
  }

  // Método para calcular a economia estimada (3,45016% a.a.)
  public calculateEstimatedSavings(volumeRange: string): number {
    let minValue = 0;
    let maxValue = 0;
    
    // Determinar o range de valores com base na seleção do usuário
    if (volumeRange.toLowerCase().includes('10k') || 
        (volumeRange.toLowerCase().includes('10') && volumeRange.toLowerCase().includes('100'))) {
      minValue = 10000;
      maxValue = 100000;
    } else if (volumeRange.toLowerCase().includes('100k') || 
               (volumeRange.toLowerCase().includes('100') && volumeRange.toLowerCase().includes('300'))) {
      minValue = 100000;
      maxValue = 300000;
    } else if (volumeRange.toLowerCase().includes('300k') || 
               (volumeRange.toLowerCase().includes('300') && volumeRange.toLowerCase().includes('500'))) {
      minValue = 300000;
      maxValue = 500000;
    } else if (volumeRange.toLowerCase().includes('500k') || 
               (volumeRange.toLowerCase().includes('500') && volumeRange.toLowerCase().includes('1'))) {
      minValue = 500000;
      maxValue = 1000000;
    } else { // Mais de 1mm
      minValue = 1000000;
      maxValue = 2000000; // Usar 2mm como valor máximo arbitrário
    }
    
    // Calcular o valor médio do range
    const averageValue = (minValue + maxValue) / 2;
    
    // Aplicar a taxa de economia anual (3,45016%)
    return averageValue * 0.0345016;
  }

  // Método para salvar interação completa no Supabase
  public async saveChatInteraction(sessionId: string): Promise<boolean> {
    try {
      const state = this.conversationState.get(sessionId);
      if (!state || !state.userId) return false;
      
      const { error } = await supabase
        .from('chat_interactions')
        .insert({
          user_id: state.userId,
          session_id: sessionId,
          investment_value: state.investmentValue,
          investor_profile: state.investorProfile,
          investment_objective: state.investmentObjective,
          management_fee: state.managementFee,
          estimated_savings: state.estimatedSavings,
          accepted_fee: state.acceptedFee,
          opened_account: state.openedAccount || false
        });
      
      if (error) {
        console.error('Erro ao salvar interação:', error);
        return false;
      }
      
      return true;
    } catch (err) {
      console.error('Erro ao salvar interação:', err);
      return false;
    }
  }

  // Método para salvar uma mensagem individual no Supabase
  public async saveChatMessage(
    interactionId: string, 
    sender: 'user' | 'assistant', 
    content: string, 
    stage: ChatStage
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          interaction_id: interactionId,
          sender,
          content,
          stage
        });
      
      if (error) {
        console.error('Erro ao salvar mensagem:', error);
        return false;
      }
      
      return true;
    } catch (err) {
      console.error('Erro ao salvar mensagem:', err);
      return false;
    }
  }

  // Método para obter respostas rápidas com base no estágio atual
  public getQuickResponses(stage: ChatStage): QuickResponse[] {
    switch (stage) {
      case 'intro':
        return [
          { text: "Sim, vamos começar", value: "vamos_comecar" },
          { text: "Conte mais sobre a IOpen", value: "mais_info" }
        ];
      
      case 'platform':
        return [
          { text: "Gostei, quero ser IOpen!", value: "quero_ser_iopen" },
          { text: "Tenho algumas dúvidas", value: "tenho_duvidas" }
        ];
      
      case 'goals':
        return [
          { text: "Aposentadoria", value: "aposentadoria" },
          { text: "Preservar patrimônio", value: "preservar_patrimonio" },
          { text: "Crescimento patrimonial", value: "crescimento_patrimonial" },
          { text: "Viagens", value: "viagens" },
          { text: "Imóvel", value: "imovel" },
          { text: "Outro", value: "outro" }
        ];
      
      case 'profile':
        return [
          { text: "Conservador", value: "conservador" },
          { text: "Moderado", value: "moderado" },
          { text: "Agressivo", value: "agressivo" }
        ];
      
      case 'volume':
        return [
          { text: "10k a 100k", value: "10k_100k" },
          { text: "100k a 300k", value: "100k_300k" },
          { text: "300k a 500k", value: "300k_500k" },
          { text: "500k a 1mm", value: "500k_1mm" },
          { text: "Mais de 1mm", value: "mais_1mm" }
        ];
      
      case 'closing':
        return [
          { text: "Iniciar período de teste", value: "iniciar_teste" },
          { text: "Agendar conversa com consultor", value: "agendar_consultor" },
          { text: "Voltar depois", value: "voltar_depois" }
        ];
      
      default:
        return [];
    }
  }

  // Método para obter mensagem do sistema com base no estágio atual
  private getSystemPrompt(stage: ChatStage): string {
    const basePrompt = "Você é o IOP, um assistente virtual amigável da IOpen, uma plataforma de investimentos. Seu tom é cordial e levemente bem-humorado. ";
    
    switch (stage) {
      case 'intro':
        return basePrompt + "Você está dando as boas-vindas ao usuário e apresentando-se brevemente. Mencione que você pode ajudar o usuário a encontrar as melhores estratégias de investimento.";
      
      case 'platform':
        return basePrompt + "Explique brevemente o que é a IOpen, uma plataforma transparente e com taxas justas que visa simplificar investimentos. Mencione que a plataforma utiliza tecnologia de ponta e tem equipe experiente.";
      
      case 'goals':
        return basePrompt + "Pergunte sobre os objetivos financeiros do usuário de forma amigável. Escute atentamente e responda com empatia.";
      
      case 'profile':
        return basePrompt + "Pergunte sobre o perfil de investidor do usuário, explicando brevemente o que significa cada perfil (conservador, moderado, agressivo).";
      
      case 'volume':
        return basePrompt + "Pergunte sobre o volume aproximado que o usuário pretende investir. Seja discreto e explique que isso ajudará a calcular as economias potenciais.";
      
      case 'closing':
        return basePrompt + "Com base nas informações coletadas, apresente uma recomendação personalizada, mencionando a taxa calculada e a economia estimada ao investir com a IOpen. Ofereça opções para o usuário continuar o relacionamento.";
      
      default:
        return basePrompt;
    }
  }

  // Método para gerar resposta com a OpenAI
  public async getAiResponse(messages: Array<{role: string, content: string}>, stage: ChatStage): Promise<string> {
    try {
      if (!this.apiKey) {
        return "Desculpe, estou temporariamente indisponível. Por favor, tente novamente mais tarde.";
      }

      const systemPrompt = this.getSystemPrompt(stage);
      
      // Definindo tipos corretos para a API OpenAI
      type MessageRole = 'system' | 'user' | 'assistant';
      
      // Aqui corrigimos o tipo das mensagens para a API OpenAI
      const formattedMessages = [
        { role: 'system' as MessageRole, content: systemPrompt },
        ...messages.map(msg => {
          const role = (msg.role === 'user' || msg.role === 'assistant') 
            ? msg.role as MessageRole 
            : 'user' as MessageRole;
          return { role, content: msg.content };
        })
      ];

      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: formattedMessages,
        max_tokens: 1000,
        temperature: 0.7,
      });

      return response.choices[0]?.message?.content || "Desculpe, não consegui processar sua solicitação.";
    } catch (err) {
      console.error('Erro ao obter resposta da IA:', err);
      return "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.";
    }
  }

  // Método para resetar a conversa
  public resetConversation(sessionId: string): void {
    this.conversationState.delete(sessionId);
  }

  async sendMessage(message: string, sessionId: string, userId?: string): Promise<any> {
    try {
      // Aqui poderia ser uma integração com OpenAI ou outro serviço de chat
      // Por enquanto, vamos apenas simular uma resposta
      
      // Salva a mensagem do usuário no Supabase
      await this.saveMessage({
        sessionId,
        role: 'user',
        content: message,
        userId
      });
      
      // Gera uma resposta simples
      const response = this.generateSimpleResponse(message);
      
      // Salva a resposta no Supabase
      await this.saveMessage({
        sessionId,
        role: 'assistant',
        content: response,
        userId
      });
      
      return {
        message: response,
        success: true
      };
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      return {
        message: 'Desculpe, ocorreu um erro ao processar sua mensagem.',
        success: false
      };
    }
  }
  
  private generateSimpleResponse(message: string): string {
    // Lógica simples para gerar respostas
    if (message.toLowerCase().includes('olá') || message.toLowerCase().includes('oi')) {
      return 'Olá! Como posso ajudar você hoje?';
    } else if (message.toLowerCase().includes('ajuda')) {
      return 'Estou aqui para ajudar. O que você gostaria de saber sobre nossos serviços?';
    } else if (message.toLowerCase().includes('investimento') || message.toLowerCase().includes('investir')) {
      return 'Nossos serviços de investimento são personalizados para atender suas necessidades financeiras. Podemos conversar mais sobre seus objetivos?';
    } else {
      return 'Obrigado por sua mensagem. Estou processando sua solicitação e retornarei em breve.';
    }
  }
  
  async saveMessage({ sessionId, role, content, userId }: { sessionId: string; role: string; content: string; userId?: string }): Promise<void> {
    try {
      // Verificar se já existe uma interação com este sessionId
      if (userId) {
        const { data } = await supabase
          .from('chat_interactions')
          .select('id')
          .eq('session_id', sessionId)
          .single();
          
        // Se não existir, criar uma nova interação
        if (!data) {
          await supabase
            .from('chat_interactions')
            .insert({
              user_id: userId,
              session_id: sessionId,
              created_at: new Date()
            });
        }
      }
      
      // Inserir a mensagem
      const { error } = await supabase
        .from('chat_messages')
        .insert([
          {
            interaction_id: sessionId,
            sender: role,
            content,
            stage: 'chat',
            timestamp: new Date(),
          },
        ]);
      
      if (error) throw error;
      
      console.log(`Mensagem ${role} salva com sucesso`);
    } catch (error) {
      console.error('Erro ao salvar mensagem:', error);
    }
  }
}

// Exportar uma instância única do serviço
export const apiService = new ApiService();
export default apiService; 