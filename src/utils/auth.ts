
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Provider } from '@supabase/supabase-js';
import { clearResumeFiles } from './resume';

// Login with email/password
export const login = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
      return { error };
    }
    return { error: null };
  } catch (error: any) {
    toast.error('Login failed');
    return { error };
  }
};

// Register a new user
export const signup = async (email: string, password: string, fullName: string) => {
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    });
    if (error) {
      toast.error(error.message);
      return { error };
    }
    toast.success('Registration successful! Please verify your email.');
    return { error: null };
  } catch (error: any) {
    toast.error('Registration failed');
    return { error };
  }
};

// Sign in with social provider
export const signInWithSocial = async (provider: Provider) => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({ 
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    if (error) {
      toast.error(error.message);
      return { error };
    }
    return { error: null };
  } catch (error: any) {
    toast.error(`${provider} login failed`);
    return { error };
  }
};

// Logout the current user
export const logout = async () => {
  try {
    console.log("Attempting to log out...");
    
    // Clear resume data before logging out
    await clearResumeFiles();
    
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Logout error:", error);
      toast.error(error.message);
      return { error };
    }
    
    console.log("Logout successful, state cleared");
    toast.success("Successfully logged out");

    // Help break any potential caching issues
    window.location.href = '/login';
    
    return { error: null };
  } catch (error: any) {
    console.error("Logout error:", error);
    toast.error("Failed to log out");
    return { error };
  }
};
