
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import AccessToggle from './AccessToggle';

interface SidebarFooterProps {
  collapsed: boolean;
  onToggle?: () => void;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ collapsed, onToggle }) => {
  return (
    <div className="mt-auto border-t">
      {/* Access Toggle for demo purposes */}
      <AccessToggle collapsed={collapsed} />

      {/* Divider before the collapse button */}
      <div className="border-t"></div>
      
      {/* Collapse button */}
      <div className="p-3 flex justify-end">
        <button 
          onClick={onToggle}
          className="rounded-md p-1.5 hover:bg-accent hover:text-accent-foreground transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default SidebarFooter;
