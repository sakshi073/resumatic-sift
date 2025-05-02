
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';

const Register = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleSuccess = () => {
    // This function will be called after successful registration
    // We don't need to do anything here since AuthForm already handles the login logic
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-muted/50 animate-fade-in transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md space-y-8">
        <div className="bg-card/80 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-border transition-all duration-300 hover:shadow-xl animate-scale-in">
          <div className="flex flex-col items-center gap-2">
            <div className="h-20 w-20 rounded-full bg-gradient-to-r from-primary to-primary/70 flex items-center justify-center mb-2 shadow-inner">
              <span className="text-2xl text-primary-foreground font-bold">R</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Create an account</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Sign up to get started with Resumatic
            </p>
          </div>

          <div className="mt-8">
            <AuthForm 
              type="register" 
              onSuccess={handleSuccess}
            />
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary hover:underline hover:text-primary/80 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
