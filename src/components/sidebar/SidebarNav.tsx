
import React from 'react';
import { cn } from '@/lib/utils';
import { TooltipProvider } from '@/components/ui/tooltip';
import SidebarItem from './SidebarItem';
import { sidebarItems } from './SidebarItems';

interface SidebarNavProps {
  collapsed: boolean;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ collapsed }) => {
  return (
    <div className="flex-1 overflow-y-auto py-4">
      <TooltipProvider delayDuration={300}>
        <nav className="space-y-1 px-2">
          {sidebarItems.map((item, index) => (
            <SidebarItem 
              key={`item-${index}`} 
              item={item} 
              collapsed={collapsed} 
            />
          ))}
        </nav>
      </TooltipProvider>
    </div>
  );
};

export default SidebarNav;
