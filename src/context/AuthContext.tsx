
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, Session, Provider } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Database } from '@/integrations/supabase/types';
import { clearResumeFiles } from '@/utils/resume';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  session: Session | null;
  profile: any; // Profile type
  login: (email: string, password: string) => Promise<{ error: any }>;
  signup: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signInWithSocial: (provider: Provider) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Improved session fetching with better error handling
    const fetchSession = async () => {
      try {
        // Set up auth state listener FIRST to avoid missing auth events
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            console.log("Auth state changed:", event);
            
            // Perform synchronous updates to avoid deadlocks
            setSession(session);
            setUser(session?.user ?? null);
            setIsAuthenticated(!!session);
            
            // Clear resume data when user logs in or changes
            if (event === 'SIGNED_IN') {
              // Always clear resume files first to ensure a clean state
              await clearResumeFiles();
              toast.success("Welcome back!");
            }
            
            // Defer profile fetching using setTimeout to avoid Supabase deadlocks
            if (session?.user) {
              setTimeout(async () => {
                try {
                  const { data: profileData } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                  setProfile(profileData);
                } catch (error) {
                  console.error("Profile fetch error:", error);
                }
              }, 0);
            } else {
              setProfile(null);
            }
          }
        );

        // THEN check for existing session
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        setIsAuthenticated(!!session);

        if (session) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          setProfile(profileData);
        }
      } catch (error) {
        console.error("Session initialization error:", error);
      } finally {
        // Always turn off loading state regardless of success/failure
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, fullName: string) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const signInWithSocial = async (provider: Provider) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log("Attempting to log out...");
      setLoading(true);
      
      // Clear resume data before logging out
      await clearResumeFiles();
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Logout error:", error);
        toast.error(error.message);
        return;
      }
      
      // Force state update to ensure UI reflects logged out status
      setIsAuthenticated(false);
      setUser(null);
      setSession(null);
      setProfile(null);
      
      console.log("Logout successful, state cleared");
      toast.success("Successfully logged out");

      // Help break any potential caching issues
      window.location.href = '/login';
      
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.error("Failed to log out");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      session,
      profile,
      login, 
      signup,
      signInWithSocial,
      logout,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
