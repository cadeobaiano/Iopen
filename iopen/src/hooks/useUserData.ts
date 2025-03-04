import { useState, useEffect } from 'react';
import { userDataService } from '../services/userDataService';
import { supabase } from '../lib/supabase';

interface UserData {
  id?: string;
  user_id?: string;
  nome?: string;
  email?: string;
  created_at?: string;
}

/**
 * Hook to manage user data
 */
export function useUserData() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  // Load user data on mount
  useEffect(() => {
    let isMounted = true;
    
    const loadUserData = async () => {
      try {
        setLoading(true);
        
        // Check if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          if (isMounted) {
            setUserData(null);
            setLoading(false);
          }
          return;
        }
        
        // Get user data
        const { data, error } = await userDataService.getUserData();
        
        if (isMounted) {
          if (error) {
            setError(error);
          } else {
            setUserData(data);
          }
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      }
    };
    
    loadUserData();
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        loadUserData();
      } else if (event === 'SIGNED_OUT') {
        if (isMounted) {
          setUserData(null);
        }
      }
    });
    
    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  /**
   * Save user data
   */
  const saveUserData = async (data: Partial<UserData>): Promise<boolean> => {
    try {
      setLoading(true);
      
      const { data: savedData, error } = await userDataService.saveUserData(data);
      
      if (error) {
        setError(error);
        return false;
      }
      
      setUserData(savedData);
      return true;
    } catch (err) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete user data
   */
  const deleteUserData = async (): Promise<boolean> => {
    try {
      setLoading(true);
      
      const { success, error } = await userDataService.deleteUserData();
      
      if (error) {
        setError(error);
        return false;
      }
      
      setUserData(null);
      return success;
    } catch (err) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    userData,
    loading,
    error,
    saveUserData,
    deleteUserData
  };
}