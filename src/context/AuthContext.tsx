
import React, { createContext, useContext } from 'react';
import { User, Session, Provider } from '@supabase/supabase-js';
import { useAuthProvider } from '@/hooks/useAuthProvider';
import { login, signup, signInWithSocial, logout } from '@/utils/auth';

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
  const { state, setStates } = useAuthProvider();
  const { setLoading } = setStates;

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      return await login(email, password);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    try {
      return await signup(email, password, fullName);
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWithSocial = async (provider: Provider) => {
    setLoading(true);
    try {
      return await signInWithSocial(provider);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const { error } = await logout();
      
      // Force state update to ensure UI reflects logged out status
      if (!error) {
        setStates.setIsAuthenticated(false);
        setStates.setUser(null);
        setStates.setSession(null);
        setStates.setProfile(null);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      ...state,
      login: handleLogin, 
      signup: handleSignup,
      signInWithSocial: handleSignInWithSocial,
      logout: handleLogout
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
