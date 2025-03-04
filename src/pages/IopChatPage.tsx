import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ReactMarkdown from 'react-markdown';
import { supabase } from '../services/auth';
import { v4 as uuidv4 } from 'uuid';
import ChatAnalyticsWrapper from '../components/ChatAnalyticsWrapper';
import { useAnalyticsContext } from '../contexts/AnalyticsContext';

// Tipos para os estágios da conversa
type ChatStage = 'intro' | 'platform' | 'goals' | 'profile' | 'volume' | 'closing' | 'completed';

// Interface para as mensagens
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Interface para as opções de resposta rápida
interface QuickResponse {
  text: string;
  value: string;
}

const IopChatPage: React.FC = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { trackEvent } = useAnalyticsContext();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState<ChatStage>('intro');
  const [quickResponses, setQuickResponses] = useState<QuickResponse[]>([]);
  const [chatData, setChatData] = useState<{
    sessionId: string;
    investmentObjective: string | null;
    investorProfile: string | null;
    investmentValue: string | null;
    managementFee: number | null;
    estimatedSavings: number | null;
    acceptedFee: boolean | null;
    openedAccount: boolean | null;
  }>({
    sessionId: uuidv4(),
    investmentObjective: null,
    investorProfile: null,
    investmentValue: null,
    managementFee: null,
    estimatedSavings: null,
    acceptedFee: null,
    openedAccount: null
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Verifica se o usuário está autenticado
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Inicializa o ID da sessão
  useEffect(() => {
    if (isAuthenticated && !chatData.sessionId) {
      setChatData(prev => ({
        ...prev,
        sessionId: uuidv4()
      }));
    }
  }, [isAuthenticated, chatData.sessionId]);

  // Inicia a conversa com a mensagem de boas-vindas
  useEffect(() => {
    if (isAuthenticated && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        role: 'assistant',
        content: 'Olá, eu sou o **IOP**, o especialista de investimentos do futuro. Antes de descobrirmos a nota da sua carteira, preciso conhecer um pouco mais sobre você. Mas não se preocupe: **é rápido e terminaremos antes mesmo de você conseguir pronunciar meu nome**! Podemos começar?',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
      setQuickResponses([
        { text: 'Sim, vamos começar', value: 'sim' },
        { text: 'Conte mais sobre a IOpen', value: 'mais_info' }
      ]);
    }
  }, [isAuthenticated, messages.length]);

  // Rolagem automática para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Avança para o próximo estágio e define as respostas rápidas
  const moveToNextStage = (currentStage: ChatStage, userResponse: string) => {
    let nextStage: ChatStage = currentStage;
    let nextResponses: QuickResponse[] = [];
    let assistantMessage = '';

    // Armazena dados da resposta do usuário
    updateChatData(currentStage, userResponse);

    // Define o próximo estágio baseado no estágio atual
    switch (currentStage) {
      case 'intro':
        nextStage = 'platform';
        assistantMessage = `A **Iopen** é uma solução que analisa seus dados financeiros e revela como bancos tradicionais aplicam taxas excessivas. Oferecemos duas estratégias principais:

**Crescimento Patrimonial**: Maximiza seus ativos via ETFs e títulos do tesouro.
**Objetivos Específicos**: Focado em metas concretas como aposentadoria e projetos pessoais.

Nossa **missão** é garantir uma gestão transparente, devolvendo o controle da sua carteira. E não se preocupe: além deste chatbot, contamos com especialistas humanos para atendê-lo quando necessário.`;
        nextResponses = [
          { text: 'Gostei, quero ser IOpen!', value: 'interesse' },
          { text: 'Tenho algumas dúvidas', value: 'duvidas' }
        ];
        break;
      
      case 'platform':
        nextStage = 'goals';
        assistantMessage = `Agora, me conte: **Quais são os seus principais objetivos financeiros** – seja para viagens, a realização de sonhos ou outros projetos. Pode caprichar na resposta que eu entendo tudo!`;
        nextResponses = [
          { text: 'Aposentadoria', value: 'aposentadoria' },
          { text: 'Preservar patrimônio', value: 'preservacao' },
          { text: 'Crescimento patrimonial', value: 'crescimento' },
          { text: 'Viagens', value: 'viagens' },
          { text: 'Imóvel', value: 'imovel' },
          { text: 'Outro', value: 'outro' }
        ];
        break;
      
      case 'goals':
        nextStage = 'profile';
        assistantMessage = `E como você definiria o seu **perfil de investidor**? Você é mais conservador, moderado, agressivo?`;
        nextResponses = [
          { text: 'Conservador', value: 'conservador' },
          { text: 'Moderado', value: 'moderado' },
          { text: 'Agressivo', value: 'agressivo' }
        ];
        break;
      
      case 'profile':
        nextStage = 'volume';
        assistantMessage = `Atualmente, qual o seu **volume investido**?`;
        nextResponses = [
          { text: '10k a 100k', value: '10k-100k' },
          { text: '100k a 300k', value: '100k-300k' },
          { text: '300k a 500k', value: '300k-500k' },
          { text: '500k a 1mm', value: '500k-1mm' },
          { text: 'Mais de 1mm', value: 'mais-1mm' }
        ];
        break;
      
      case 'volume':
        nextStage = 'closing';
        // Calcular a taxa de gestão e economia estimada com base no perfil e volume investido
        const fee = calculateManagementFee(chatData.investorProfile || 'moderado', userResponse);
        const savings = calculateEstimatedSavings(userResponse);
        
        setChatData(prev => ({
          ...prev,
          managementFee: fee,
          estimatedSavings: savings
        }));
        
        assistantMessage = `Agora que já conhecemos seu perfil, temos plena confiança de que podemos atendê-lo com **excelência**!

Com base no seu perfil, nosso plano Smart parece ser a opção ideal.
Ele custa **${fee.toFixed(1).replace('.', ',')}%** ao ano, sendo mais de quatro vezes mais barato do que um banco ou uma corretora tradicional.
Estimamos que, com o valor investido atualmente, podemos gerar pelo menos **R$ ${savings.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}** em lucros adicionais todo ano, apenas evitando custos desnecessários e investindo de forma descomplicada.

Ah, e para os mais curiosos: meu nome completo é **IOPenildo, oráculo dos investimentos da Silva Junior**. Agradeço por compartilhar suas informações. Estamos ansiosos para guiá-lo rumo a uma gestão financeira mais transparente e eficiente!`;
        
        nextResponses = [
          { text: 'Iniciar período de teste', value: 'iniciar_teste' }
        ];
        break;
      
      case 'closing':
        nextStage = 'completed';
        assistantMessage = `Excelente escolha! Vamos iniciar seu período de teste agora mesmo. Em breve, um de nossos consultores entrará em contato para te ajudar com os próximos passos.`;
        nextResponses = [
          { text: 'Entendido', value: 'entendido' }
        ];
        break;
      
      default:
        break;
    }

    // Atualiza o estágio
    setStage(nextStage);
    
    // Define as novas respostas rápidas
    setQuickResponses(nextResponses);
    
    // Adiciona a mensagem do assistente se houver
    if (assistantMessage) {
      setTimeout(() => {
        const newMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: assistantMessage,
          timestamp: new Date()
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
      }, 500);
    }

    // Se estiver no último estágio, salva os dados no Supabase
    if (nextStage === 'completed') {
      saveChatInteraction();
    }

    // Rastrear evento de mudança de estágio
    trackEvent('chat_stage_transition', 'chat', {
      fromStage: currentStage,
      toStage: nextStage,
      userId: user?.id,
      sessionId: chatData.sessionId,
      timestamp: new Date().toISOString()
    });
  };

  // Atualiza os dados coletados com base no estágio atual e resposta do usuário
  const updateChatData = (currentStage: ChatStage, userResponse: string) => {
    let updatedData = { ...chatData };

    switch (currentStage) {
      case 'goals':
        updatedData.investmentObjective = userResponse;
        break;
      
      case 'profile':
        updatedData.investorProfile = userResponse;
        break;
      
      case 'volume':
        updatedData.investmentValue = userResponse;
        // Calcular a taxa e economia estimada
        const fee = calculateManagementFee(updatedData.investorProfile || 'moderado', userResponse);
        const savings = calculateEstimatedSavings(userResponse);
        updatedData.managementFee = fee;
        updatedData.estimatedSavings = savings;
        break;
      
      case 'closing':
        updatedData.acceptedFee = userResponse.toLowerCase().includes('sim') || 
                            userResponse.toLowerCase().includes('aceito') || 
                            userResponse.toLowerCase().includes('concordo');
        updatedData.openedAccount = false; // Por padrão a conta não está aberta ainda
        break;
    }

    setChatData(updatedData);
    return updatedData;
  };

  // Calcula a taxa recomendada com base no perfil e volume
  const calculateManagementFee = (profile: string, volume: string): number => {
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
  };

  // Calcula a economia estimada com base no volume investido
  const calculateEstimatedSavings = (volumeRange: string): number => {
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
  };

  // Salva a interação no Supabase
  const saveChatInteraction = async () => {
    if (!user) return;
    
    try {
      console.log("Iniciando salvamento da interação do chat...");
      console.log("Dados a serem salvos:", {
        user_id: user.id,
        session_id: chatData.sessionId,
        investment_value: chatData.investmentValue,
        investor_profile: chatData.investorProfile,
        investment_objective: chatData.investmentObjective,
        management_fee: chatData.managementFee,
        estimated_savings: chatData.estimatedSavings,
        accepted_fee: chatData.acceptedFee,
        opened_account: chatData.openedAccount
      });
      
      // Salva os dados da interação
      const { error: interactionError } = await supabase
        .from('chat_interactions')
        .insert({
          user_id: user.id,
          session_id: chatData.sessionId,
          investment_value: chatData.investmentValue,
          investor_profile: chatData.investorProfile,
          investment_objective: chatData.investmentObjective,
          management_fee: chatData.managementFee,
          estimated_savings: chatData.estimatedSavings,
          accepted_fee: chatData.acceptedFee,
          opened_account: chatData.openedAccount || false
        });

      if (interactionError) throw interactionError;
      
      console.log("Interação salva com sucesso, salvando agora as mensagens...");
      console.log(`Total de ${messages.length} mensagens a serem salvas`);
      
      // Salva todas as mensagens
      const messagesToSave = messages.map(msg => ({
        interaction_id: chatData.sessionId,
        sender: msg.role,
        content: msg.content,
        stage: stage,
        timestamp: msg.timestamp
      }));
      
      const { error: messagesError } = await supabase
        .from('chat_messages')
        .insert(messagesToSave);
        
      if (messagesError) throw messagesError;
      
      console.log('Interação e mensagens salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar interação:', error);
    }
  };

  // Envia a mensagem do usuário e avança o estágio
  const handleSendMessage = (text: string = input) => {
    if ((!text.trim() && !input.trim()) || isLoading) return;
    
    const messageText = text.trim() || input.trim();
    
    // Cria a mensagem do usuário
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content: messageText,
      timestamp: new Date()
    };
    
    // Rastrear evento de envio de mensagem
    trackEvent('chat_message_sent', 'chat', {
      messageId: userMessage.id,
      chatStage: stage,
      userId: user?.id,
      sessionId: chatData.sessionId,
      timestamp: userMessage.timestamp.toISOString()
    });
    
    // Atualiza o estado com a nova mensagem
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Após um breve delay, processa a resposta e avança o estágio
    setTimeout(() => {
      moveToNextStage(stage, messageText);
      setIsLoading(false);
    }, 800);
  };

  // Manipulador para resposta rápida
  const handleQuickResponse = (response: QuickResponse) => {
    // Verificar se é o botão de iniciar período de teste
    if (response.value === 'iniciar_teste') {
      // Adicionar a mensagem do usuário ao chat
      const userMessage: Message = {
        id: uuidv4(),
        role: 'user',
        content: response.text,
        timestamp: new Date()
      };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      
      // Salvar a interação antes de redirecionar
      if (stage === 'closing') {
        saveChatInteraction();
      }
      
      // Redirecionar para a página de manutenção após um pequeno delay
      setTimeout(() => {
        navigate('/manutencao');
      }, 500);
      
      return;
    }
    
    // Para outras respostas, comportamento normal
    handleSendMessage(response.text);
  };

  // Manipulador para envio de mensagem com a tecla Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Adicionar formatação correta para valores monetários
  const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Exemplo de uso na mensagem de fechamento
  const getClosingMessage = () => {
    // Corrigindo o erro de referência a 'stages'
    const stage = 'closing';
    const formattedFee = chatData.managementFee?.toFixed(1).replace('.', ',') || '0,6';
    const formattedSavings = formatCurrency(chatData.estimatedSavings || 0);
    
    return `Agora que já conhecemos seu perfil, temos plena confiança de que podemos atendê-lo com **excelência**!

Com base no seu perfil, nosso plano Smart parece ser a opção ideal.
Ele custa **${formattedFee}%** ao ano, sendo mais de quatro vezes mais barato do que um banco ou uma corretora tradicional.
Estimamos que, com o valor investido atualmente, podemos gerar pelo menos **R$ ${formattedSavings}** em lucros adicionais todo ano, apenas evitando custos desnecessários e investindo de forma descomplicada.

Ah, e para os mais curiosos: meu nome completo é **IOPenildo, oráculo dos investimentos da Silva Junior**. Agradeço por compartilhar suas informações. Estamos ansiosos para guiá-lo rumo a uma gestão financeira mais transparente e eficiente!`;
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FEFEFE]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2AA0E5]"></div>
      </div>
    );
  }

  return (
    <ChatAnalyticsWrapper 
      chatStage={stage} 
      userId={user?.id}
    >
      <div className="flex flex-col h-screen bg-[#FEFEFE]">
        {/* Header */}
        <header className="iopen-header shadow-md py-5 px-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <span className="text-[#FEFEFE] font-bold text-2xl mr-2">IOP</span>
              <span className="text-[#FEFEFE] mx-2">|</span>
              <span className="text-[#FEFEFE] font-medium">Especialista em investimentos</span>
              <span className="text-[#FEFEFE] font-semibold ml-1">Iopen</span>
            </div>
          </div>
        </header>

        {/* Área de mensagens */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-[#FEFEFE] custom-scrollbar">
          <div className="max-w-3xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-3`}
              >
                <div
                  className={`px-3 py-2 sm:px-4 sm:py-3 ${
                    message.role === 'user'
                      ? 'message-bubble-user'
                      : 'message-bubble-assistant'
                  }`}
                >
                  <div className="markdown-content">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                  <div 
                    className={message.role === 'user' ? 'message-footer-user' : 'message-footer-assistant'}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Área de respostas rápidas */}
        {quickResponses.length > 0 && (
          <div className="bg-[#FEFEFE] border-t border-[#E8F4FE] py-3 px-2">
            <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-2">
              {quickResponses.map((response, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickResponse(response)}
                  disabled={isLoading}
                  className="quick-response-button flex items-center"
                >
                  {response.text}
                  <ArrowRight size={14} className="ml-1" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Área de input */}
        <div className="bg-[#FEFEFE] border-t border-[#E8F4FE] p-4 ios-padding-fix">
          <div className="max-w-3xl mx-auto flex">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="flex-1 resize-none border border-[#2AA0E5] rounded-l-md p-3 focus:outline-none focus:ring-2 focus:ring-[#367BF2] focus:border-transparent input-focus-effect touch-highlight-none"
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !input.trim()}
              className="gradient-iopen-blue hover:bg-[#418AF4] text-[#FEFEFE] rounded-r-md px-4 min-w-[50px] min-h-[44px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed button-pulse touch-highlight-none"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#FEFEFE]"></div>
              ) : (
                <Send size={20} />
              )}
            </button>
          </div>
        </div>
      </div>
    </ChatAnalyticsWrapper>
  );
};

export default IopChatPage; 