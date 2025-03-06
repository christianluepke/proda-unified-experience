
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn('w-full py-4 px-6 flex items-center justify-between', className)}>
      <div className="hidden">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-medium tracking-tight">PRODA</span>
        </Link>
      </div>
      <div></div>
      <nav className="hidden md:flex items-center gap-6">
        <Link 
          to="/marketing" 
          className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
        >
          About
        </Link>
        <Link 
          to="/previous-uploads" 
          className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
        >
          Previous Uploads
        </Link>
        <Link 
          to="/dashboard" 
          className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
        >
          Dashboard
        </Link>
      </nav>
    </header>
  );
};

export default Header;
