
import React from 'react';
import { Info, FileText, ToggleLeft, ToggleRight } from 'lucide-react';
import { AccessLevel, useFeatureAccess } from '@/context/FeatureAccessContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface AccessToggleProps {
  collapsed: boolean;
}

const AccessToggle: React.FC<AccessToggleProps> = ({ collapsed }) => {
  const { accessLevel, setAccessLevel } = useFeatureAccess();

  const handleToggle = () => {
    const newAccessLevel: AccessLevel = accessLevel === 'full' 
      ? 'rent_roll_only' 
      : 'full';
    
    setAccessLevel(newAccessLevel);
  };

  return (
    <div className="px-3 py-2">
      <div className="flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center text-xs text-muted-foreground">
            <span className="mr-1">Access Mode</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3 w-3 cursor-help text-muted-foreground/70" />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p className="text-xs">For Demo purposes only</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={handleToggle}
                className="flex items-center text-xs text-primary hover:text-primary/80 transition-colors"
              >
                {accessLevel === 'full' ? (
                  <>
                    {!collapsed && <span className="mr-1 whitespace-nowrap">Full Access</span>}
                    <ToggleRight className={`h-5 w-5 ${collapsed ? 'text-primary' : ''}`} />
                  </>
                ) : (
                  <>
                    {!collapsed && <span className="mr-1 whitespace-nowrap">Rent Roll Only</span>}
                    <ToggleLeft className={`h-5 w-5 ${collapsed ? 'text-muted-foreground' : ''}`} />
                  </>
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium">For Demo purposes only</p>
                {accessLevel === 'full' ? (
                  <p className="text-xs">Currently: Access to Rent Rolls & Operating Statements</p>
                ) : (
                  <p className="text-xs">Currently: Access to Rent Rolls only</p>
                )}
                <div className="flex items-center gap-1 text-xs mt-1">
                  <FileText className="h-3 w-3" />
                  <span>Click to toggle access level</span>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default AccessToggle;
