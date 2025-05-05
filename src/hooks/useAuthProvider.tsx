
import { useState, useEffect } from 'react';
import { User, Session, Provider } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { clearResumeFiles } from '@/utils/resume';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  session: Session | null;
  profile: any; // Profile type
  loading: boolean;
}

export const useAuthProvider = () => {
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

  return {
    state: {
      isAuthenticated,
      user, 
      session,
      profile,
      loading
    },
    setStates: {
      setIsAuthenticated,
      setUser,
      setSession,
      setProfile,
      setLoading
    }
  };
};
