import OpenAI from 'openai';
import { v4 as uuidv4 } from 'uuid';

// Serviço para gerenciar as chamadas à API
class ApiService {
  private openai: OpenAI;
  private conversationState: Map<string, any>;
  
  constructor() {
    // Inicializa a OpenAI com a API key
    this.openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true // Em produção, tratar no backend
    });
    console.log('API Key definida?', !!import.meta.env.VITE_OPENAI_API_KEY);
    
    // Inicializa o estado da conversa
    this.conversationState = new Map();
  }
  
  // Método para obter a resposta da AI com fluxo estruturado
  async getAiResponse(messages: Array<{role: string, content: string}>) {
    console.log('API Service: getAiResponse chamado com', messages.length, 'mensagens');
    
    try {
      // Recupera ou cria o ID da conversa para esta sessão
      let sessionId = localStorage.getItem('conversation_id');
      if (!sessionId) {
        sessionId = uuidv4();
        localStorage.setItem('conversation_id', sessionId);
        console.log('API Service: Nova conversa iniciada com ID', sessionId);
      } else {
        console.log('API Service: Continuando conversa com ID', sessionId);
      }
      
      // Recupera ou inicializa o estado da conversa
      let state = this.conversationState.get(sessionId) || this.getInitialState();
      console.log('API Service: Estado da conversa atual:', JSON.stringify(state));
      
      // Processa a última mensagem do usuário para detectar intenções
      const lastUserMessage = [...messages].reverse().find(msg => msg.role === 'user');
      if (lastUserMessage) {
        console.log('API Service: Última mensagem do usuário:', lastUserMessage.content);
        
        // Detectar valor de investimento
        const investmentMatch = lastUserMessage.content.match(/R?\$?\s?(\d{1,3}(\.|\,)?\d*)/);
        if (investmentMatch && !state.investmentValue) {
          state.investmentValue = investmentMatch[0];
          console.log('API Service: Valor de investimento detectado:', state.investmentValue);
        }
        
        // Detectar objetivo
        const objectiveKeywords = {
          'aposentadoria': 'aposentadoria',
          'aposent': 'aposentadoria',
          'faculdade': 'educação',
          'estud': 'educação',
          'educa': 'educação',
          'casa': 'imóvel',
          'imóvel': 'imóvel',
          'imovel': 'imóvel',
          'financ': 'imóvel',
          'reserva': 'emergência',
          'emergencia': 'emergência',
          'emergência': 'emergência'
        };
        
        if (!state.objective) {
          const lowerContent = lastUserMessage.content.toLowerCase();
          for (const [keyword, objective] of Object.entries(objectiveKeywords)) {
            if (lowerContent.includes(keyword)) {
              state.objective = objective;
              console.log('API Service: Objetivo detectado:', state.objective, 'a partir da palavra-chave', keyword);
              break;
            }
          }
        }
      }
      
      // Conta as mensagens do usuário para definir o estágio da conversa
      const userMessages = messages.filter(msg => msg.role === 'user');
      const userMessageCount = userMessages.length;
      
      // Verificar se a última mensagem já foi processada
      const lastMessageId = localStorage.getItem('last_processed_message');
      const currentMessageId = userMessages.length > 0 ? 
        JSON.stringify(userMessages[userMessages.length - 1]) : '';
      
      // Se a última mensagem for igual à que já processamos, não avançar o estágio
      const isDuplicateMessage = lastMessageId === currentMessageId;
      
      console.log('API Service: Verificação de duplicação:', {
        userMessageCount,
        currentStage: state.stage,
        lastMessageId,
        currentMessageId,
        isDuplicate: isDuplicateMessage
      });
      
      // Só avançar o estágio se não for uma mensagem duplicada
      if (!isDuplicateMessage) {
        if (state.stage === 'intro' && userMessageCount >= 1) {
          state.stage = 'collecting_info';
          console.log('API Service: Avançando para estágio collecting_info');
        } else if (state.stage === 'collecting_info' && userMessageCount >= 2) {
          state.stage = 'presenting_plans';
          console.log('API Service: Avançando para estágio presenting_plans');
        }
        
        // Salvar a mensagem atual como processada
        localStorage.setItem('last_processed_message', currentMessageId);
      } else {
        console.log('API Service: Mensagem duplicada detectada, mantendo estágio atual:', state.stage);
      }
      
      // Prepara o prompt do sistema com base no estado da conversa
      let systemPrompt = '';
      let response = '';
      
      if (state.stage === 'intro') {
        systemPrompt = `Você está plugado em uma plataforma de investimentos MVP em fase de validação. Sua interação com o usuário será dividida em três momentos. Assuma o papel de "IOP", o especialista de investimentos do futuro.

Interação 1 – Apresentação e Funcionamento da Plataforma

"Olá, eu sou o **IOP**, o especialista de investimentos do futuro. Antes de descobrirmos a nota da sua carteira, preciso conhecer um pouco mais sobre você. Mas não se preocupe: **é rápido e terminaremos antes mesmo de você conseguir pronunciar meu nome!** A **Iopen** revela como os bancos exploram seus clientes e propõe duas estratégias de investimento: **crescimento patrimonial** (com ETFs e títulos) e **objetivos específicos** (como aposentadoria). A missão é oferecer uma **gestão transparente e eficiente**, com suporte humano disponível. Vamos começar?"`;

        // Para a primeira interação, retornar diretamente o texto do prompt após a primeira mensagem do usuário
        if (userMessageCount === 1 && !isDuplicateMessage) {
          response = "Agora, me conte: **Qual o seu volume aproximado atual de investimentos?** **Quais são os seus principais objetivos financeiros?** – seja para viagens, a realização de sonhos ou outros projetos – e como você descreveria seu **perfil de investidor?** Estou aqui para ajudar a transformar a sua jornada financeira, então compartilhe suas metas e aspirações!";
          
          // Atualizar o estágio para evitar repetição
          state.stage = 'collecting_info';
          console.log('API Service: Avançando para estágio collecting_info (resposta direta)');
        }
      } else if (state.stage === 'collecting_info') {
        systemPrompt = `Você está plugado em uma plataforma de investimentos MVP em fase de validação. Sua interação com o usuário será dividida em três momentos. Assuma o papel de "IOP", o especialista de investimentos do futuro.

Interação 2 – Coleta de Informações do Usuário

"Agora, me conte: **Qual o seu volume aproximado atual de investimentos?** **Quais são os seus principais objetivos financeiros?** – seja para viagens, a realização de sonhos ou outros projetos – e como você descreveria seu **perfil de investidor?** Estou aqui para ajudar a transformar a sua jornada financeira, então compartilhe suas metas e aspirações!"

${state.investmentValue ? `O usuário já mencionou que investe ${state.investmentValue}.` : ''}
${state.objective ? `O usuário está interessado em investir para ${state.objective}.` : ''}`;

        // Para a segunda interação, retornar diretamente o texto do prompt após a segunda mensagem do usuário
        if (userMessageCount === 2 && !isDuplicateMessage) {
          // Gerar valores aleatórios para taxas e mensalidades
          const feeRate = (Math.floor(Math.random() * 5) + 4) / 10; // Entre 0,4% e 0,8%
          
          response = `Agora que já conhecemos seu perfil, temos plena confiança de que podemos atendê-lo com **excelência**! Veja como nosso custo é estruturado:

**Taxa de Gestão Iopen**: ${feeRate}% a.a.

${state.investmentValue ? `Considerando o seu investimento de ${state.investmentValue},` : 'Baseado no que conversamos,'}
${state.objective ? `e seu objetivo de ${state.objective},` : ''}
diante dos rendimentos superiores que a **Iopen** oferece, esse custo é praticamente **insignificante** para o seu portfólio.

Ah, e para os mais curiosos: meu nome completo é **IOPenildo, oráculo dos investimentos da Silva Junior**. Agradeço por compartilhar suas informações. Estamos ansiosos para guiá-lo rumo a uma gestão financeira mais transparente e eficiente!`;
          
          // Atualizar o estágio para evitar repetição
          state.stage = 'presenting_plans';
          console.log('API Service: Avançando para estágio presenting_plans (resposta direta)');
        }
      } else if (state.stage === 'presenting_plans') {
        // Gerar valores aleatórios para taxas e mensalidades
        const feeRate = (Math.floor(Math.random() * 5) + 4) / 10; // Entre 0,4% e 0,8%
        
        systemPrompt = `Você está plugado em uma plataforma de investimentos MVP em fase de validação. Sua interação com o usuário será dividida em três momentos. Assuma o papel de "IOP", o especialista de investimentos do futuro.

Interação 3 – Encerramento com Personalização e Surpresa

"Agora que já conhecemos seu perfil, temos plena confiança de que podemos atendê-lo com **excelência**! Veja como nosso custo é estruturado:

**Taxa de Gestão Iopen**: ${feeRate}% a.a.

${state.investmentValue ? `Considerando o seu investimento de ${state.investmentValue},` : 'Baseado no que conversamos,'}
${state.objective ? `e seu objetivo de ${state.objective},` : ''}
diante dos rendimentos superiores que a **Iopen** oferece, esse custo é praticamente **insignificante** para o seu portfólio.

Ah, e para os mais curiosos: meu nome completo é **IOPenildo, oráculo dos investimentos da Silva Junior**. Agradeço por compartilhar suas informações. Estamos ansiosos para guiá-lo rumo a uma gestão financeira mais transparente e eficiente!"`;
      }
      
      // Se não temos uma resposta direta, chamar a OpenAI
      if (!response) {
        try {
          console.log('API Service: Chamando OpenAI API com prompt:', systemPrompt);
          
          // Call OpenAI API with prepared messages
          const completion = await this.openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages
            ],
            max_tokens: 1000,
            temperature: 0.7,
          });
          
          console.log('API Service: Resposta da OpenAI recebida com status OK');
          console.log('API Service: Conteúdo da resposta:', completion.choices[0].message.content);
          
          response = completion.choices[0].message.content || "Desculpe, não consegui processar sua solicitação.";
        } catch (error: any) {
          console.error('API Service: Erro ao chamar OpenAI API:', error.message);
          if (error.response) {
            console.error('API Service: Status do erro:', error.response.status);
            console.error('API Service: Detalhes do erro:', error.response.data);
          }
          response = "Desculpe, estou enfrentando dificuldades para processar sua mensagem. Por favor, tente novamente em alguns instantes.";
        }
      }
      
      // Salvar o estado atualizado
      this.conversationState.set(sessionId, state);
      
      return response;
    } catch (error: any) {
      console.error('API Service: Erro geral em getAiResponse:', error.message);
      return "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.";
    }
  }
  
  // Reinicia o estado da conversa
  resetConversation() {
    localStorage.removeItem('conversation_id');
    localStorage.removeItem('last_processed_message');
    console.log('API Service: Conversa resetada');
  }
  
  // Retorna o estado inicial da conversa
  getInitialState() {
    return {
      stage: 'intro',
      investmentValue: null,
      objective: null,
    };
  }
}

// Exporta uma instância única do serviço
export const apiService = new ApiService();
