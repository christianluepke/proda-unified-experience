
import React from 'react';
import { 
  Popover, 
  PopoverTrigger, 
  PopoverContent 
} from '@/components/ui/popover';
import { Building2, Briefcase, FolderArchive } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MultipleEntityDisplayProps {
  type: 'property' | 'project' | 'portfolio';
  primary?: string;
  names: string[];
  count: number;
}

const MultipleEntityDisplay: React.FC<MultipleEntityDisplayProps> = ({
  type,
  primary,
  names,
  count
}) => {
  if (count === 0) return <span className="text-muted-foreground">None</span>;
  
  if (count === 1) {
    return (
      <div className="flex items-center">
        {getIcon(type)}
        <span>{primary || names[0]}</span>
      </div>
    );
  }
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center text-left">
          {getIcon(type)}
          <div>
            <span className="mr-1">{primary}</span>
            <span className="text-xs bg-muted text-muted-foreground rounded-full px-1.5 py-0.5">
              +{count - 1}
            </span>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 p-2">
        <h4 className="font-medium mb-2 px-2">
          {getTitle(type)} ({count})
        </h4>
        <ScrollArea className="h-[200px]">
          <div className="space-y-1">
            {names.map((name, index) => (
              <div 
                key={index} 
                className={`px-2 py-1.5 text-sm rounded ${name === primary ? 'bg-primary/10 font-medium' : 'hover:bg-muted'}`}
              >
                {getIcon(type)}
                <span>{name}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

function getIcon(type: 'property' | 'project' | 'portfolio') {
  switch (type) {
    case 'property':
      return <Building2 className="h-3.5 w-3.5 mr-1.5 text-muted-foreground flex-shrink-0" />;
    case 'project':
      return <Briefcase className="h-3.5 w-3.5 mr-1.5 text-muted-foreground flex-shrink-0" />;
    case 'portfolio':
      return <FolderArchive className="h-3.5 w-3.5 mr-1.5 text-muted-foreground flex-shrink-0" />;
  }
}

function getTitle(type: 'property' | 'project' | 'portfolio') {
  switch (type) {
    case 'property':
      return 'Properties';
    case 'project':
      return 'Projects';
    case 'portfolio':
      return 'Portfolios';
  }
}

export default MultipleEntityDisplay;
