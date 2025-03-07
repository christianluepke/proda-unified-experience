
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { SidebarItemType } from './types';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, collapsed }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  // If this is a section header
  if (item.section) {
    return (
      <div 
        className={cn(
          "text-xs font-medium text-muted-foreground pt-4 pb-2",
          collapsed && "sr-only"
        )}
      >
        {item.label}
      </div>
    );
  }
  
  // For regular nav items
  const itemClass = cn(
    "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors",
    isActive(item.path || "") 
      ? "bg-primary/10 text-primary" 
      : "text-muted-foreground hover:bg-muted hover:text-foreground",
    collapsed && "justify-center",
    item.dividerAfter ? "mb-4" : ""
  );

  if (item.icon && collapsed) {
    return (
      <div className={item.dividerAfter ? "pb-4 border-b mb-4" : ""}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link 
              to={item.path || "#"} 
              className={itemClass}
            >
              <item.icon size={22} />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            {item.label}
          </TooltipContent>
        </Tooltip>
      </div>
    );
  }
  
  return (
    <div className={item.dividerAfter ? "pb-4 border-b mb-4" : ""}>
      <Link 
        to={item.path || "#"} 
        className={itemClass}
      >
        {item.icon && <item.icon size={collapsed ? 22 : 18} className={cn("shrink-0", !collapsed && "mr-2")} />}
        {!collapsed && <span>{item.label}</span>}
      </Link>
    </div>
  );
};

export default SidebarItem;
