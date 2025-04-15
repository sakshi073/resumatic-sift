
import React from 'react';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

export const SocialLogins: React.FC<{ className?: string }> = ({ className }) => {
  const { signInWithSocial, loading } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await signInWithSocial('google');
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      await signInWithSocial('github');
    } catch (error) {
      console.error("GitHub login failed:", error);
    }
  };

  return (
    <div className={`flex space-x-2 ${className}`}>
      <Button 
        variant="outline" 
        className="w-full"
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        <FcGoogle className="mr-2 h-4 w-4" /> Google
      </Button>
      <Button 
        variant="outline" 
        className="w-full"
        onClick={handleGitHubLogin}
        disabled={loading}
      >
        <FaGithub className="mr-2 h-4 w-4" /> GitHub
      </Button>
    </div>
  );
};
