/**
 * Esta versão do cliente Supabase está OBSOLETA.
 * Por favor, use o cliente Supabase exportado de src/services/auth.ts.
 * 
 * Este arquivo é mantido apenas para retrocompatibilidade,
 * mas será removido em versões futuras.
 */

import { supabase as supabaseAuth } from '../services/auth';

// Exportamos diretamente o cliente de auth.ts
export const supabase = supabaseAuth;

// Export também a função para verificar se o Supabase está configurado
export const isSupabaseConfigured = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  return supabaseUrl !== '' && supabaseKey !== '';
};