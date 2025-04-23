
import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/context/AuthContext';
import { Sparkles } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const Login = () => {
  const { isAuthenticated, loading } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-login-gradient overflow-hidden">
      {/* Optimized background gradient blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-tr from-[#9b87f550] to-[#403E4340] blur-2xl animate-spin-slow pointer-events-none" />
      <div className="absolute -bottom-32 right-12 w-72 h-72 rounded-full bg-gradient-to-br from-[#1EAEDB40] to-[#9b87f530] blur-xl animate-pulse-slow pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md">
        {loading ? (
          <div className="glassmorphism rounded-2xl p-8 shadow-lg border-2 border-white/20 w-full max-w-md">
            <Skeleton className="h-12 w-12 rounded-full bg-primary/20 mx-auto mb-4" />
            <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-2/3 mx-auto mb-10" />
            <Skeleton className="h-16 w-full mb-6" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <div className="glassmorphism rounded-2xl p-8 shadow-lg border-2 border-white/20 animate-scale-in">
            <div className="flex flex-col items-center gap-2">
              <span className="inline-flex items-center justify-center bg-gradient-to-br from-primary to-[#D946EF] rounded-full p-3 mb-2 shadow-lg">
                <Sparkles size={36} className="text-white drop-shadow-glow" />
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gradient-primary">
                Sign in to <span className="story-link">Resumatic</span>
              </h1>
              <p className="text-base text-muted-foreground mt-2">
                Enter your credentials to access your account
              </p>
            </div>

            <div className="mt-10">
              <AuthForm 
                type="login" 
                onSuccess={() => {}}
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Reduced number of animated particles */}
      <div className="absolute left-1/3 top-1/4 w-12 h-12 rounded-full bg-primary/20 blur-xl animate-pulse-slow" />
      <div className="absolute right-1/3 bottom-1/5 w-8 h-8 rounded-full bg-[#D946EF]/20 blur-lg animate-pulse-slow" />
    </div>
  );
};

export default Login;
