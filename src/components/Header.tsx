
import React from 'react';
import { FileSpreadsheet, LogOut, User } from 'lucide-react';
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
    // Adding async/await to ensure the logout completes
    await logout();
    navigate('/login');
  };

  const userName = user?.user_metadata?.name || 'User';

  return (
    <header className="py-6 px-8 flex items-center justify-between animate-fade-in">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <FileSpreadsheet className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Resumatic</h1>
          <p className="text-sm text-muted-foreground">Extract, analyze and compare resume data</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-muted-foreground">Welcome, {userName}</span>
        <div className="h-4 w-px bg-border"></div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
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
          className="text-sm text-primary hover:underline transition-all"
        >
          Documentation
        </a>
      </div>
    </header>
  );
};

export default Header;
