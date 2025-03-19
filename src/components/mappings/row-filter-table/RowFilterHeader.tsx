
import React from 'react';
import { Search, Filter, CheckCircle2, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface RowFilterHeaderProps {
  totalRowsCount: number;
  excludedCount: number;
  autoExcludedCount: number;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filter: 'all' | 'included' | 'excluded';
  setFilter: (filter: 'all' | 'included' | 'excluded') => void;
  selectAll: () => void;
  deselectAll: () => void;
}

const RowFilterHeader: React.FC<RowFilterHeaderProps> = ({
  totalRowsCount,
  excludedCount,
  autoExcludedCount,
  searchTerm,
  setSearchTerm,
  filter,
  setFilter,
  selectAll,
  deselectAll
}) => {
  return (
    <div className="bg-muted/40 p-4 border-b space-y-3">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search rows..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-muted/30">
            {totalRowsCount} Total Rows
          </Badge>
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            {excludedCount} Excluded
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {autoExcludedCount} Auto-filtered
          </Badge>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Show:</span>
          <div className="flex">
            <button 
              className={`px-3 py-1 text-sm rounded-l-md border ${filter === 'all' 
                ? 'bg-primary text-primary-foreground border-primary' 
                : 'border-input'}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`px-3 py-1 text-sm border-t border-b ${filter === 'included' 
                ? 'bg-primary text-primary-foreground border-primary' 
                : 'border-input'}`}
              onClick={() => setFilter('included')}
            >
              Included
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-r-md border ${filter === 'excluded' 
                ? 'bg-primary text-primary-foreground border-primary' 
                : 'border-input'}`}
              onClick={() => setFilter('excluded')}
            >
              Excluded
            </button>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            className="px-3 py-1 text-xs rounded-md border bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
            onClick={selectAll}
          >
            <CheckCircle2 className="h-3 w-3 inline mr-1" />
            Select All
          </button>
          <button 
            className="px-3 py-1 text-xs rounded-md border bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
            onClick={deselectAll}
          >
            <X className="h-3 w-3 inline mr-1" />
            Deselect All
          </button>
        </div>
      </div>
    </div>
  );
};

export default RowFilterHeader;
