
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
        <span className="truncate">{primary || names[0]}</span>
      </div>
    );
  }
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center text-left hover:bg-muted/50 rounded px-1 -ml-1">
          {getIcon(type)}
          <div className="flex items-center">
            <span className="mr-1 truncate max-w-[120px]">{primary || names[0]}</span>
            <span className="text-xs bg-muted text-muted-foreground rounded-full px-1.5 py-0.5 flex-shrink-0">
              +{count - 1}
            </span>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-72 p-2">
        <h4 className="font-medium mb-2 px-2 flex items-center">
          {getIcon(type, 4)}
          {getTitle(type)} ({count})
        </h4>
        <ScrollArea className="h-[250px] max-h-[60vh]">
          <div className="space-y-1">
            {names.map((name, index) => (
              <div 
                key={index} 
                className={`px-2 py-1.5 text-sm rounded flex items-center ${name === primary ? 'bg-primary/10 font-medium' : 'hover:bg-muted'}`}
              >
                {getIcon(type)}
                <span className="truncate">{name}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

function getIcon(type: 'property' | 'project' | 'portfolio', size: number = 3.5) {
  const className = `h-${size} w-${size} mr-1.5 text-muted-foreground flex-shrink-0`;
  
  switch (type) {
    case 'property':
      return <Building2 className={className} />;
    case 'project':
      return <Briefcase className={className} />;
    case 'portfolio':
      return <FolderArchive className={className} />;
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
