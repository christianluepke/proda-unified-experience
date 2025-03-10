
import React from 'react';
import { Building2, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Property } from './models';

interface PropertyListProps {
  properties: Property[];
  isExpanded: boolean;
  onToggleExpand: (expanded: boolean) => void;
}

const PropertyList: React.FC<PropertyListProps> = ({
  properties,
  isExpanded,
  onToggleExpand
}) => {
  if (!properties || properties.length === 0) {
    return null;
  }

  return (
    <Collapsible open={isExpanded} onOpenChange={onToggleExpand}>
      <CollapsibleTrigger asChild>
        <Button variant="outline" size="sm" className="w-full flex justify-between items-center mb-2">
          <span className="flex items-center">
            <Building2 className="h-4 w-4 mr-2 text-muted-foreground" /> 
            Properties in this project
            <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-full">
              {properties.length}
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
        <Card className="p-3 bg-muted/30 border">
          <ScrollArea className="h-[150px]">
            <div className="space-y-2">
              {properties.map(property => (
                <div key={property.id} className="p-2 text-sm bg-background rounded-md">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                    <div className="font-medium truncate">{property.name}</div>
                  </div>
                  <div className="ml-5.5 text-xs text-muted-foreground mt-1">
                    {property.streetNo} {property.streetName}, {property.city}, {property.state} {property.zip}
                  </div>
                  <div className="flex justify-between ml-5.5 text-xs mt-1">
                    <div>{property.units} units</div>
                    <div>{property.sqft?.toLocaleString()} sqft</div>
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

export default PropertyList;
