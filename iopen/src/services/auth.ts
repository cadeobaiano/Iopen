import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

export interface UserRegistrationData {
  email: string;
  password: string;
  full_name: string;
  phone: string;
  plan?: string;
  cep?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
}

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  plan?: string;
  cep?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Registra um novo usuário no Supabase
 * @param userData Dados do usuário para registro
 * @returns O usuário criado ou um erro
 */
export const registerUser = async (userData: UserRegistrationData) => {
  try {
    // 1. Registra o usuário na autenticação do Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          full_name: userData.full_name,
        },
      },
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('Falha ao criar usuário');

    // 2. Cria o perfil do usuário na tabela profiles
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        full_name: userData.full_name,
        email: userData.email,
        phone: userData.phone,
        plan: userData.plan || null,
        cep: userData.cep || null,
        street: userData.street || null,
        number: userData.number || null,
        complement: userData.complement || null,
        neighborhood: userData.neighborhood || null,
        city: userData.city || null,
        state: userData.state || null
      });

    if (profileError) {
      // Se falhar ao criar o perfil, tenta excluir o usuário para evitar inconsistências
      await supabase.auth.admin.deleteUser(authData.user.id);
      throw profileError;
    }

    return { user: authData.user, success: true };
  } catch (error) {
    console.error('Erro no registro:', error);
    return { error: (error as Error).message, success: false };
  }
};

/**
 * Realiza login de um usuário
 * @param email Email do usuário
 * @param password Senha do usuário
 * @returns O usuário autenticado ou um erro
 */
export const loginUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    if (!data.user) throw new Error('Falha ao autenticar usuário');

    return { user: data.user, success: true };
  } catch (error) {
    console.error('Erro no login:', error);
    return { error: (error as Error).message, success: false };
  }
};

/**
 * Realiza logout do usuário atual
 * @returns Sucesso ou erro
 */
export const logoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Erro no logout:', error);
    return { error: (error as Error).message, success: false };
  }
};

/**
 * Obtém o usuário atual
 * @returns O usuário atual ou null
 */
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data } = await supabase.auth.getUser();
    return data.user;
  } catch (error) {
    console.error('Erro ao obter usuário atual:', error);
    return null;
  }
};

/**
 * Obtém o perfil do usuário atual
 * @returns O perfil do usuário ou null
 */
export const getUserProfile = async (): Promise<UserProfile | null> => {
  try {
    const user = await getCurrentUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return data as UserProfile;
  } catch (error) {
    console.error('Erro ao obter perfil do usuário:', error);
    return null;
  }
};

/**
 * Atualiza o perfil do usuário
 * @param profileData Dados do perfil para atualizar
 * @returns Sucesso ou erro
 */
export const updateUserProfile = async (profileData: Partial<UserProfile>) => {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error('Usuário não autenticado');

    const { error } = await supabase
      .from('profiles')
      .update({
        ...profileData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    return { error: (error as Error).message, success: false };
  }
};
