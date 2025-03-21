
import React from 'react';
import { FileSpreadsheet } from 'lucide-react';

const Header = () => {
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
        <span className="text-sm text-muted-foreground">Designed with precision</span>
        <div className="h-4 w-px bg-border"></div>
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
