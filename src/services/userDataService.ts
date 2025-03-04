import { supabase } from './auth';

interface UserData {
  id?: string;
  user_id?: string;
  nome?: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
}

class UserDataService {
  /**
   * Get user data from Supabase
   */
  async getUserData(): Promise<UserData | null> {
    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.warn('Usuário não autenticado ao tentar obter dados do usuário');
        return null;
      }
      
      // Query the database for the user's data
      const { data: existingData } = await supabase
        .from('profiles')
        .select()
        .eq('id', user.id)
        .single();
      
      // Return the data if it exists
      return existingData as UserData | null;
    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error);
      return null;
    }
  }

  /**
   * Save user data to Supabase
   */
  async saveUserData(userData: Partial<UserData>): Promise<boolean> {
    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.warn('Usuário não autenticado ao tentar salvar dados do usuário');
        return false;
      }
      
      let result;
      
      // Check if the user already has data
      const { data: existingData } = await supabase
        .from('profiles')
        .select()
        .eq('id', user.id)
        .single();
      
      if (existingData) {
        // Update existing data
        result = await supabase
          .from('profiles')
          .update({
            ...userData,
            updated_at: new Date()
          })
          .eq('id', user.id);
      } else {
        // Insert new data
        result = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            ...userData,
            created_at: new Date(),
            updated_at: new Date()
          });
      }
      
      return !result.error;
    } catch (error) {
      console.error('Erro ao salvar dados do usuário:', error);
      return false;
    }
  }

  /**
   * Delete user data from Supabase
   */
  async deleteUserData(): Promise<boolean> {
    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.warn('Usuário não autenticado ao tentar excluir dados do usuário');
        return false;
      }
      
      // Delete the user's data
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id);
      
      return !error;
    } catch (error) {
      console.error('Erro ao excluir dados do usuário:', error);
      return false;
    }
  }
}

// Export a singleton instance
export const userDataService = new UserDataService();