
import React from 'react';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

export const SocialLogins: React.FC<{ className?: string }> = ({ className }) => {
  const { signInWithSocial, loading } = useAuth();

  const handleGoogleLogin = () => {
    signInWithSocial('google');
  };

  const handleGitHubLogin = () => {
    signInWithSocial('github');
  };

  return (
    <div className={`flex space-x-2 ${className}`}>
      <Button 
        variant="outline" 
        className="w-full"
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        <FcGoogle className="mr-2" /> Google
      </Button>
      <Button 
        variant="outline" 
        className="w-full"
        onClick={handleGitHubLogin}
        disabled={loading}
      >
        <FaGithub className="mr-2" /> GitHub
      </Button>
    </div>
  );
};
