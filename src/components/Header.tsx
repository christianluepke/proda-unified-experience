
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Database as DatabaseIcon, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  className?: string;
}

interface Database {
  id: string;
  name: string;
}

// Example databases for demonstration
const mockDatabases: Database[] = [
  { id: 'db1', name: 'Main Database' },
  { id: 'db2', name: 'Test Database' },
  { id: 'db3', name: 'Development DB' },
];

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [selectedDatabases, setSelectedDatabases] = useState<Database[]>([mockDatabases[0]]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDatabase = (database: Database) => {
    setSelectedDatabases(prev => {
      const isSelected = prev.some(db => db.id === database.id);
      if (isSelected) {
        // Only allow deselection if there would still be at least one database selected
        if (prev.length > 1) {
          return prev.filter(db => db.id !== database.id);
        }
        return prev;
      } else {
        return [...prev, database];
      }
    });
  };

  const removeDatabase = (databaseId: string) => {
    setSelectedDatabases(prev => {
      // Only remove if there would still be at least one database selected
      if (prev.length > 1) {
        return prev.filter(db => db.id !== databaseId);
      }
      return prev;
    });
  };

  return (
    <header className={cn('w-full py-4 px-6 flex items-center justify-between gap-4', className)}>
      <div className="flex items-center gap-3 flex-grow max-w-xl">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full"
          />
        </div>
      </div>
      
      <nav className="flex items-center gap-6">
        <Link 
          to="/previous-uploads" 
          className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
        >
          Previous Uploads
        </Link>
        
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-background border rounded-md hover:bg-muted transition-colors">
                <DatabaseIcon className="h-4 w-4 text-muted-foreground" />
                <span className="truncate max-w-[150px]">
                  {selectedDatabases.length === 1 
                    ? selectedDatabases[0].name 
                    : `${selectedDatabases.length} Databases`}
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground ml-1" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <div className="p-3 border-b">
                <h3 className="font-medium">Select Databases</h3>
              </div>
              <div className="p-2">
                {mockDatabases.map(db => (
                  <div key={db.id} className="flex items-center space-x-2 p-2 hover:bg-muted rounded-sm">
                    <Checkbox 
                      id={db.id} 
                      checked={selectedDatabases.some(selected => selected.id === db.id)}
                      onCheckedChange={() => toggleDatabase(db)}
                    />
                    <label htmlFor={db.id} className="text-sm cursor-pointer flex-grow">{db.name}</label>
                  </div>
                ))}
              </div>
              
              {selectedDatabases.length > 0 && (
                <div className="border-t p-3">
                  <p className="text-sm text-muted-foreground mb-2">Selected databases:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedDatabases.map(db => (
                      <Badge 
                        key={db.id} 
                        variant="outline" 
                        className="flex items-center gap-1"
                      >
                        {db.name}
                        {selectedDatabases.length > 1 && (
                          <button 
                            onClick={() => removeDatabase(db.id)}
                            className="ml-1 hover:text-destructive"
                          >
                            ×
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </nav>
    </header>
  );
};

export default Header;
