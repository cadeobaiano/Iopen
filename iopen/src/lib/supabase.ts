import { createClient } from '@supabase/supabase-js';
import { analyticsService } from '../services/analytics';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a single supabase client for the entire app
const supabaseOriginal = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);

// Wrapper para o cliente do Supabase que restringe o acesso a tabelas não permitidas
export const supabase = {
  // Repassamos todas as funções de auth diretamente
  auth: supabaseOriginal.auth,
  
  // Função from modificada para permitir apenas tabelas específicas
  from: (tableName: string) => {
    const allowedTables = ['profiles', 'click_analytics'];
    
    if (!allowedTables.includes(tableName)) {
      console.warn(`TABELA PROIBIDA: Acesso à tabela ${tableName} foi bloqueado. Apenas 'profiles' e 'click_analytics' são permitidas.`);
      
      // Retorna um objeto mock que não faz nada quando chamado
      return {
        select: () => ({ data: null, error: new Error('Tabela não permitida') }),
        insert: () => ({ data: null, error: new Error('Tabela não permitida') }),
        update: () => ({ data: null, error: new Error('Tabela não permitida') }),
        delete: () => ({ data: null, error: new Error('Tabela não permitida') }),
        upsert: () => ({ data: null, error: new Error('Tabela não permitida') }),
      };
    }
    
    // Se a tabela for permitida, retorna o acesso normal
    return supabaseOriginal.from(tableName);
  }
};

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return supabaseUrl !== '' && supabaseAnonKey !== '';
};

// Set up auth state change listener
supabaseOriginal.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session) {
    // Update user ID in analytics service when user signs in
    analyticsService.updateUserId(session.user.id);
  } else if (event === 'SIGNED_OUT') {
    // Clear user ID in analytics service when user signs out
    analyticsService.updateUserId(null);
  }
});