
import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/context/AuthContext';
import { Sparkles } from 'lucide-react';

const Login = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleSuccess = () => {
    // No action needed, AuthForm handles login logic
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#221F26] via-[#404040]/90 to-[#1A1F2C] dark:bg-gradient-to-br dark:from-[#1c1830] dark:via-[#2b2548] dark:to-[#18142c] overflow-hidden">
      {/* Animated background gradient blobs */}
      <div className="absolute -top-24 -left-24 w-[36rem] h-[36rem] rounded-full bg-gradient-to-tr from-[#9b87f580] via-[#8B5CF630] to-[#403E4380] blur-3xl animate-[spin_30s_linear_infinite] pointer-events-none z-0" />
      <div className="absolute -bottom-32 right-12 w-[24rem] h-[24rem] rounded-full bg-gradient-to-br from-[#1EAEDB80] via-[#D946EF50] to-[#9b87f540] blur-2xl animate-[ping_18s_linear_infinite] pointer-events-none z-0" />
      <div className="relative z-10 w-full max-w-md">
        <div className="glassmorphism rounded-2xl p-8 shadow-lg border-2 border-white/20 animate-fade-in transition-all duration-600">
          <div className="flex flex-col items-center gap-2">
            <span className="inline-flex items-center justify-center bg-gradient-to-br from-primary to-[#D946EF] rounded-full p-3 mb-2 shadow-lg animate-scale-in">
              <Sparkles size={36} className="text-white drop-shadow-glow animate-pulse-slow" />
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-tr from-white via-primary to-[#D946EF] animate-fade-in">
              Sign in to <span className="story-link text-gradient-primary">Resumatic</span>
            </h1>
            <p className="text-base text-muted-foreground mt-2 animate-fade-in">
              Enter your credentials to access your account
            </p>
          </div>

          <div className="mt-10 animate-fade-in">
            <AuthForm 
              type="login" 
              onSuccess={handleSuccess}
            />
          </div>
        </div>
      </div>
      {/* Extra animated particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-1/4 top-1/4 w-16 h-16 rounded-full bg-primary/40 blur-xl animate-pulse-slow" />
        <div className="absolute right-1/2 bottom-20 w-10 h-10 rounded-full bg-[#D946EF]/40 blur-lg animate-pulse-slow" />
        <div className="absolute right-1/5 top-2/3 w-12 h-12 rounded-full bg-[#8B5CF6]/40 blur-2xl animate-pulse" />
      </div>
      <style>
        {`
          .glassmorphism {
            background: rgba(36, 33, 57, 0.85);
            backdrop-filter: blur(16px) saturate(160%);
            -webkit-backdrop-filter: blur(16px) saturate(160%);
            border-radius: 1.25rem;
            border: 1px solid rgba(255,255,255,0.14);
          }
          .drop-shadow-glow {
            filter: drop-shadow(0 0 14px #d946ef88) drop-shadow(0 0 16px #8b5cf655);
          }
          .animate-fade-in {
            animation: fadeInLogin 1s cubic-bezier(0.22,1,0.36,1);
          }
          .animate-pulse-slow {
            animation: pulse 2.2s cubic-bezier(0.4,0,0.6,1) infinite;
          }
          @keyframes fadeInLogin {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
};

export default Login;
