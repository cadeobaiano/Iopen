import { supabase } from './supabase';

/**
 * Função para criar as tabelas de chat necessárias para a aplicação
 * Esta função deve ser executada uma vez para configurar o banco de dados
 */
export async function createChatTables() {
  console.log('Iniciando criação das tabelas de chat...');
  
  try {
    // Verificar se a tabela chat_interactions já existe
    const { data: existingInteractions, error: checkError } = await supabase
      .from('chat_interactions')
      .select('id')
      .limit(1);
    
    if (checkError && checkError.code === '42P01') { // Código para "relation does not exist"
      console.log('Tabela chat_interactions não existe, criando...');
      
      // Criar tabela chat_interactions
      const { error: createInteractionsError } = await supabase.rpc('create_chat_tables');
      
      if (createInteractionsError) {
        console.error('Erro ao criar as tabelas:', createInteractionsError);
        
        // Se falhar, podemos tentar uma abordagem alternativa
        console.log('Tentando abordagem alternativa: criando tabelas via SQL...');
        
        // Você precisará criar uma função RPC no Supabase chamada 'execute_sql'
        // que permita executar comandos SQL arbitrários (apenas para administradores)
        const sql = `
        -- Create chat_interactions table
        CREATE TABLE IF NOT EXISTS public.chat_interactions (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id uuid REFERENCES auth.users NOT NULL,
          session_id text,
          investment_value text,
          investor_profile text,
          goals text,
          recommended_rate decimal(5,4),
          estimated_savings decimal(10,2),
          accepted_proposal boolean DEFAULT false,
          created_at timestamptz DEFAULT now()
        );

        -- Create chat_messages table
        CREATE TABLE IF NOT EXISTS public.chat_messages (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          interaction_id text NOT NULL,
          sender text NOT NULL,
          content text NOT NULL,
          stage text NOT NULL,
          timestamp timestamptz DEFAULT now()
        );

        -- Enable Row Level Security
        ALTER TABLE public.chat_interactions ENABLE ROW LEVEL SECURITY;
        ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

        -- Create policies for chat_interactions
        CREATE POLICY "Users can create their own chat interactions"
          ON public.chat_interactions
          FOR INSERT
          TO authenticated
          WITH CHECK (auth.uid() = user_id);

        CREATE POLICY "Users can view their own chat interactions"
          ON public.chat_interactions
          FOR SELECT
          TO authenticated
          USING (auth.uid() = user_id);

        -- Create policies for chat_messages
        CREATE POLICY "Users can insert chat messages"
          ON public.chat_messages
          FOR INSERT
          TO authenticated
          WITH CHECK (true);

        CREATE POLICY "Users can view chat messages"
          ON public.chat_messages
          FOR SELECT
          TO authenticated
          USING (true);
        `;
        
        alert('As tabelas necessárias para o chat não existem no banco de dados. Por favor, entre no painel administrativo do Supabase e execute o SQL fornecido no console.');
        console.log('SQL para criação das tabelas:', sql);
      } else {
        console.log('Tabelas criadas com sucesso!');
      }
    } else {
      console.log('Tabelas já existem, não é necessário criar.');
    }
    
    return !checkError || checkError.code === '42P01';
  } catch (error) {
    console.error('Erro ao verificar/criar tabelas:', error);
    return false;
  }
}

// Exportar função para ser usada na inicialização da aplicação
export default createChatTables; 