# Implementação do Chatbot Iop

## Visão Geral

O Chatbot Iop é uma ferramenta de validação de negócio para a Iopen. Ele interage com os usuários após o login, coletando informações valiosas para análise e oferecendo uma recomendação de plano de investimento personalizado.

## Fluxo de Interação

O chatbot conduz uma conversa estruturada com seis estágios principais:

1. **Apresentação do Iop**: Introdução com humor e abordagem amigável
2. **Apresentação da plataforma Iopen**: Explicação sobre o funcionamento da plataforma
3. **Coleta de sonhos e objetivos**: Captura dos objetivos financeiros do usuário
4. **Coleta do perfil de investidor**: Identificação se o usuário é conservador, moderado ou agressivo
5. **Coleta do volume investido**: Obtenção da faixa de valores que o usuário tem investido
6. **Fechamento**: Recomendação personalizada com taxa de gestão e cálculo de economia estimada

## Componentes Técnicos

### 1. Estrutura de Dados

O arquivo `src/data/chatbot-context.json` contém toda a configuração do chatbot:

- Mensagens padrão para cada estágio
- Opções de resposta rápida (botões)
- Lógica de cálculo da taxa de gestão (0,4% a 0,8% a.a.)
- Cálculo da economia estimada (3,45016% a.a.)
- Mapeamento para o banco de dados

### 2. Armazenamento no Banco de Dados

Utilizamos duas tabelas principais no Supabase:

- **chat_interactions**: Armazena dados agregados da conversa completa
  - user_id, session_id, investment_value, investor_profile, goals, etc.
  
- **chat_messages**: Armazena cada mensagem individual da conversa
  - interaction_id, sender, content, stage, timestamp

### 3. Cálculos Principais

#### Taxa de Gestão (0,4% a 0,8% a.a.)
A taxa é calculada com base em:
- Perfil do investidor (conservador, moderado, agressivo)
- Volume investido (diferentes faixas de valores)

#### Economia Estimada (3,45016% a.a.)
Calculada sobre o valor médio da faixa de investimento informada pelo usuário.

## Implementação Técnica

### Arquivos Principais

1. **IopChatPage.tsx**: Interface do chat com estilização diferenciada para mensagens do bot e do usuário
2. **apiService.ts**: Serviço para comunicação com OpenAI e gerenciamento do estado da conversa
3. **AppRoutes.tsx**: Configuração de rotas para acesso à página do chat
4. **chat_tables.sql**: Migração SQL para criar as tabelas necessárias no Supabase

### Integração com OpenAI

O chatbot utiliza a API da OpenAI para:
- Compreender as respostas de texto livre dos usuários
- Classificar as intenções do usuário
- Gerar respostas contextuais quando necessário

## Especificações de Design

- Interface limpa e focada na conversa
- Estilização diferente para mensagens do bot e do usuário
- Campo de entrada para mensagens do usuário
- Botões de resposta rápida para facilitar a interação

## Métricas e Análise de Dados

Os dados coletados pelo chatbot serão usados para:
- Validar a tese de negócio da Iopen
- Analisar a aceitação das diferentes taxas de gestão
- Compreender os objetivos financeiros mais comuns dos usuários
- Identificar a distribuição dos perfis de investidor

## Como Implementar

1. Certifique-se de que o arquivo `src/data/chatbot-context.json` está disponível
2. Execute a migração SQL para criar as tabelas no Supabase
3. Integre o componente `IopChatPage` às rotas da aplicação
4. Teste o fluxo completo de interação

## Observações Importantes

- Preserve o humor nas mensagens de introdução e fechamento
- O cálculo da economia estimada deve ser dinâmico baseado no volume informado
- A taxa de gestão deve variar entre 0,4% e 0,8% a.a.
- As interações devem ser mapeadas corretamente no banco de dados para análise posterior 