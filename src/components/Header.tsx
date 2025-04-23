
import React from 'react';
import { FileSpreadsheet, User, LogOut, CircuitBoard } from 'lucide-react';
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
    <header className="py-6 px-8 flex items-center justify-between animate-slide-in glassmorphism rounded-xl shadow-lg border border-white/10 relative z-20 group transition-all duration-700">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9b87f540] to-[#F97316]/20 flex items-center justify-center shadow-lg">
          <FileSpreadsheet className="w-6 h-6 text-primary animate-pulse-slow" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-gradient-primary tracking-tight animate-fade-in">
            Resumatic
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <CircuitBoard className="w-4 h-4 text-primary" /> Futuristic Resume Analyzer
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-5">
        <span className="text-sm text-gradient font-medium px-3 py-1 rounded glassmorphism shadow border border-white/5 animate-fade-up transition-all">
          Welcome, {userName}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full border border-primary/40 hover:scale-105 hover:shadow-lg transition-all duration-300">
              <User className="h-6 w-6 text-primary" />
              <span className="sr-only">User Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glassmorphism border-white/10 shadow-xl">
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer flex items-center gap-2 hover:bg-primary/20 transition-colors">
              <LogOut className="mr-2 h-4 w-4 text-destructive" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline transition-all font-medium animate-fade-in"
        >
          Documentation
        </a>
      </div>
    </header>
  );
};

export default Header;
