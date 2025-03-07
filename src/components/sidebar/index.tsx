
import React from 'react';
import { cn } from '@/lib/utils';
import { SidebarProps } from './types';
import SidebarHeader from './SidebarHeader';
import SidebarNav from './SidebarNav';
import SidebarFooter from './SidebarFooter';

const Sidebar: React.FC<SidebarProps> = ({ 
  className, 
  collapsed = false,
  onToggle
}) => {
  return (
    <div className={cn(
      "flex flex-col h-screen border-r bg-muted/40 transition-all duration-300 relative",
      collapsed ? "w-[60px]" : "w-[250px]",
      className
    )}>
      <SidebarHeader collapsed={collapsed} />
      <SidebarNav collapsed={collapsed} />
      <SidebarFooter collapsed={collapsed} onToggle={onToggle} />
    </div>
  );
};

export default Sidebar;
