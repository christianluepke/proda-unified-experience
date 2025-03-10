
import React from 'react';
import { Building2, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Project } from '@/components/upload/models';

interface PropertiesOverviewProps {
  projectDetails: Project | null;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

const PropertiesOverview: React.FC<PropertiesOverviewProps> = ({
  projectDetails,
  isExpanded,
  setIsExpanded,
}) => {
  if (!projectDetails || !projectDetails.properties || projectDetails.properties.length === 0) {
    return null;
  }

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <CollapsibleTrigger asChild>
        <Button variant="outline" size="sm" className="w-full flex justify-between items-center">
          <span className="flex items-center">
            <Building2 className="h-4 w-4 mr-2 text-muted-foreground" /> 
            Properties in this project
            <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-full">
              {projectDetails.properties.length}
            </span>
          </span>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Card className="p-3 bg-muted/20 border mt-2">
          <ScrollArea className="h-[100px]">
            <div className="space-y-2">
              {projectDetails.properties.map(property => (
                <div key={property.id} className="p-2 text-sm bg-background rounded-md">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                    <div className="font-medium truncate">{property.name}</div>
                  </div>
                  <div className="ml-5.5 text-xs text-muted-foreground mt-1">
                    {property.streetNo} {property.streetName}, {property.city}, {property.state} {property.zip}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default PropertiesOverview;
