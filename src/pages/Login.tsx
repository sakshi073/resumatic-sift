
import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

const Login = () => {
  const { isAuthenticated, loading } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        {loading ? (
          <div className="bg-card rounded-lg p-8 shadow-md w-full max-w-md">
            <Skeleton className="h-12 w-12 rounded-full mx-auto mb-4" />
            <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-2/3 mx-auto mb-10" />
            <Skeleton className="h-16 w-full mb-6" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <div className="bg-card rounded-lg p-8 shadow-md">
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-3xl font-bold text-foreground">
                Sign in to Resumatic
              </h1>
              <p className="text-base text-muted-foreground mt-2">
                Enter your credentials to access your account
              </p>
            </div>

            <div className="mt-8">
              <AuthForm 
                type="login" 
                onSuccess={() => {}}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
