
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/context/AuthContext';

const Register = () => {
  const { isAuthenticated, login } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Sign up to get started with Resumatic
          </p>
        </div>

        <div className="mt-8">
          <AuthForm 
            type="register" 
            onSuccess={login}
          />
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
