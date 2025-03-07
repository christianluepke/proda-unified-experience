
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Upload, 
  FolderOpen, 
  Building2, 
  FileText, 
  FileSpreadsheet, 
  Map, 
  Bot, 
  HelpCircle, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';

interface SidebarProps {
  className?: string;
  collapsed?: boolean;
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  className, 
  collapsed = false,
  onToggle
}) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const sidebarItems = [
    { 
      label: 'Upload', 
      icon: Upload, 
      path: '/upload',
      section: null
    },
    { 
      label: 'Manage',
      icon: null,
      path: null,
      section: true
    },
    { 
      label: 'Files', 
      icon: FolderOpen, 
      path: '/files'
    },
    { 
      label: 'Projects', 
      icon: Building2, 
      path: '/projects'
    },
    { 
      label: 'Properties', 
      icon: Building2, 
      path: '/properties'
    },
    { 
      label: 'Analyse',
      icon: null,
      path: null,
      section: true
    },
    { 
      label: 'Rent Rolls', 
      icon: FileText, 
      path: '/rent-rolls'
    },
    { 
      label: 'Operating Statements', 
      icon: FileSpreadsheet, 
      path: '/operating-statements'
    },
    { 
      label: 'Explorer', 
      icon: Map, 
      path: '/explorer'
    },
    { 
      label: 'PRODA Assistant', 
      icon: Bot, 
      path: '/assistant',
      dividerAfter: true
    },
    { 
      label: 'Get Help', 
      icon: HelpCircle, 
      path: '/help'
    },
    { 
      label: 'Settings', 
      icon: Settings, 
      path: '/settings'
    }
  ];

  return (
    <div className={cn(
      "flex flex-col h-screen border-r bg-muted/40 transition-all duration-300 relative",
      collapsed ? "w-[60px]" : "w-[250px]",
      className
    )}>
      <div className="flex items-center justify-center h-16 px-4 border-b bg-background">
        <Link to="/" className="flex items-center overflow-hidden">
          <img 
            src="/lovable-uploads/ff312c1a-15a4-4831-a6f3-378a86fda5a4.png" 
            alt="PRODA Logo" 
            className="h-8"
          />
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <TooltipProvider delayDuration={300}>
          <nav className="space-y-1 px-2">
            {sidebarItems.map((item, index) => 
              item.section ? (
                <div 
                  key={`section-${index}`} 
                  className={cn(
                    "text-xs font-medium text-muted-foreground pt-4 pb-2",
                    collapsed && "sr-only"
                  )}
                >
                  {item.label}
                </div>
              ) : (
                <div key={`item-${index}`} className={item.dividerAfter ? "pb-4 border-b mb-4" : ""}>
                  {item.icon && collapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link 
                          to={item.path || "#"} 
                          className={cn(
                            "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors",
                            isActive(item.path || "") 
                              ? "bg-primary/10 text-primary" 
                              : "text-muted-foreground hover:bg-muted hover:text-foreground",
                            "justify-center"
                          )}
                        >
                          <item.icon size={22} />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        {item.label}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Link 
                      to={item.path || "#"} 
                      className={cn(
                        "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors",
                        isActive(item.path || "") 
                          ? "bg-primary/10 text-primary" 
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        collapsed && "justify-center"
                      )}
                    >
                      {item.icon && <item.icon size={collapsed ? 22 : 18} className={cn("shrink-0", !collapsed && "mr-2")} />}
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  )}
                </div>
              )
            )}
          </nav>
        </TooltipProvider>
      </div>
      
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
    </div>
  );
};

export default Sidebar;
