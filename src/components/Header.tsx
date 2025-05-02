
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
  const { user, profile, logout } = useAuth();
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

  // Use profile name first if available, then check user_metadata, fallback to "User"
  const userName = profile?.name || user?.user_metadata?.full_name || 'User';

  return (
    <header className="py-4 px-6 flex items-center justify-between bg-gradient-to-r from-card to-blue-50/70 shadow-md rounded-lg mb-6 backdrop-blur-sm border border-white/20 animate-fade-in">
      <div className="flex items-center space-x-3">
        <div className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Resumatic</div>
        <span className="text-xs text-muted-foreground px-2 py-1 bg-blue-500/10 rounded-full">Resume Analyzer</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-sm bg-blue-500/10 px-3 py-1 rounded-full animate-fade-up">
          Welcome, {userName}
        </span>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 border-blue-200 hover:bg-blue-200 transition-all duration-300">
              <User className="h-5 w-5 text-blue-700" />
              <span className="sr-only">User Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="animate-scale-in">
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
          className="text-sm text-primary hover:underline bg-blue-500/10 px-3 py-1 rounded-full transition-colors hover:bg-blue-500/20"
        >
          Documentation
        </a>
      </div>
    </header>
  );
};

export default Header;
