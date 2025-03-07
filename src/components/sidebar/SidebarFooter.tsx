
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarFooterProps {
  collapsed: boolean;
  onToggle: () => void;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ collapsed, onToggle }) => {
  return (
    <div className="p-2 border-t">
      <Button 
        variant="ghost" 
        size="sm" 
        className="w-full justify-center"
        onClick={onToggle}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </Button>
    </div>
  );
};

export default SidebarFooter;
