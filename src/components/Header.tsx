
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Database as DatabaseIcon, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

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
  const [selectedDatabase, setSelectedDatabase] = useState<Database>(mockDatabases[0]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className={cn('w-full py-4 px-6 flex items-center justify-between gap-4', className)}>
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-medium tracking-tight">PRODA</span>
        </Link>
      </div>
      
      <div className="flex items-center gap-3 flex-grow max-w-xl">
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-background border rounded-md hover:bg-muted transition-colors">
              <DatabaseIcon className="h-4 w-4 text-muted-foreground" />
              <span className="truncate max-w-[150px]">{selectedDatabase.name}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground ml-1" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <div className="p-3 border-b">
              <h3 className="font-medium">Select Database</h3>
            </div>
            <RadioGroup 
              value={selectedDatabase.id} 
              onValueChange={(value) => {
                const db = mockDatabases.find(db => db.id === value);
                if (db) setSelectedDatabase(db);
              }}
              className="p-1"
            >
              {mockDatabases.map(db => (
                <div key={db.id} className="flex items-center space-x-2 p-2 hover:bg-muted rounded-sm">
                  <RadioGroupItem value={db.id} id={db.id} />
                  <label htmlFor={db.id} className="text-sm cursor-pointer flex-grow">{db.name}</label>
                </div>
              ))}
            </RadioGroup>
          </PopoverContent>
        </Popover>
        
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
      
      <nav className="hidden md:flex items-center gap-6">
        <Link 
          to="/marketing" 
          className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
        >
          About
        </Link>
        <Link 
          to="/previous-uploads" 
          className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
        >
          Previous Uploads
        </Link>
        <Link 
          to="/dashboard" 
          className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
        >
          Dashboard
        </Link>
      </nav>
    </header>
  );
};

export default Header;
