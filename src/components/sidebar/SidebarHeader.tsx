
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SidebarHeaderProps {
  collapsed: boolean;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ collapsed }) => {
  return (
    <div className={cn(
      "flex items-center justify-center h-16 px-4 border-b bg-background",
      collapsed && "h-16"
    )}>
      {!collapsed && (
        <Link to="/" className="flex items-center overflow-hidden">
          <img 
            src="/lovable-uploads/ff312c1a-15a4-4831-a6f3-378a86fda5a4.png" 
            alt="PRODA Logo" 
            className="h-8"
          />
        </Link>
      )}
    </div>
  );
};

export default SidebarHeader;
