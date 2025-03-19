
import React from 'react';
import { Search, Filter, CheckCircle2, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { RowSelection } from '../types';

interface TableFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  rowFilter: 'all' | 'included' | 'excluded';
  setRowFilter: (filter: 'all' | 'included' | 'excluded') => void;
  filteredRows: RowSelection[];
  selectAllRows: () => void;
  deselectAllRows: () => void;
}

const TableFilters: React.FC<TableFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  rowFilter,
  setRowFilter,
  filteredRows,
  selectAllRows,
  deselectAllRows
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
        
        <div className="flex gap-2">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Show rows:</span>
            <div className="flex">
              <button 
                className={`px-3 py-1 text-sm rounded-l-md border ${rowFilter === 'all' 
                  ? 'bg-primary text-primary-foreground border-primary' 
                  : 'border-input'}`}
                onClick={() => setRowFilter('all')}
              >
                All
              </button>
              <button 
                className={`px-3 py-1 text-sm border-t border-b ${rowFilter === 'included' 
                  ? 'bg-primary text-primary-foreground border-primary' 
                  : 'border-input'}`}
                onClick={() => setRowFilter('included')}
              >
                Included
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-r-md border ${rowFilter === 'excluded' 
                  ? 'bg-primary text-primary-foreground border-primary' 
                  : 'border-input'}`}
                onClick={() => setRowFilter('excluded')}
              >
                Excluded
              </button>
            </div>
          </div>
          
          <button 
            className="px-3 py-1 text-xs rounded-md border bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
            onClick={selectAllRows}
          >
            <CheckCircle2 className="h-3 w-3 inline mr-1" />
            Select All
          </button>
          <button 
            className="px-3 py-1 text-xs rounded-md border bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
            onClick={deselectAllRows}
          >
            <X className="h-3 w-3 inline mr-1" />
            Deselect All
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableFilters;
