
import React from 'react';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("Logout button clicked");
    try {
      await logout();
      // Navigation handled on logout in AuthContext.
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const userName = user?.user_metadata?.name || 'User';

  return (
    <header className="py-4 px-6 flex items-center justify-between bg-card shadow rounded-lg mb-6">
      <div className="flex items-center space-x-3">
        <div className="font-bold text-xl">Resumatic</div>
        <span className="text-xs text-muted-foreground">Resume Analyzer</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-sm">
          Welcome, {userName}
        </span>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">User Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline"
        >
          Documentation
        </a>
      </div>
    </header>
  );
};

export default Header;
