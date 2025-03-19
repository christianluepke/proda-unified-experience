
import React, { useState } from 'react';
import { RowSelection } from './types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { Search, Filter, CheckCircle2 } from 'lucide-react';

interface RowFilterTableProps {
  rowSelections: RowSelection[];
  toggleRowSelection: (rowIndex: number) => void;
  previewData: string[][];
}

const RowFilterTable: React.FC<RowFilterTableProps> = ({ 
  rowSelections, 
  toggleRowSelection,
  previewData 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<'all' | 'included' | 'excluded'>('all');
  
  // Get counts for display
  const totalRowsCount = rowSelections.length;
  const excludedCount = rowSelections.filter(row => !row.isSelected).length;
  const autoExcludedCount = rowSelections.filter(row => row.isAutoExcluded).length;
  
  // Filter rows based on search and filter
  const filteredSelections = rowSelections.filter(selection => {
    // Filter by inclusion state
    if (filter === 'included' && !selection.isSelected) return false;
    if (filter === 'excluded' && selection.isSelected) return false;
    
    // Filter by search term
    if (searchTerm) {
      const rowData = previewData[selection.rowIndex];
      // Check if any cell in the row contains the search term
      return rowData && rowData.some(cell => 
        cell && cell.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return true;
  });
  
  // Handle bulk selection
  const selectAll = () => {
    filteredSelections.forEach(selection => {
      if (!selection.isSelected) {
        toggleRowSelection(selection.rowIndex);
      }
    });
  };
  
  const deselectAll = () => {
    filteredSelections.forEach(selection => {
      if (selection.isSelected) {
        toggleRowSelection(selection.rowIndex);
      }
    });
  };

  return (
    <div className="w-full">
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
              <ExclamationTriangleIcon className="h-3 w-3 inline mr-1" />
              Deselect All
            </button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50 sticky top-0 z-10">
            <TableRow>
              <TableHead className="w-[60px]">Include</TableHead>
              <TableHead className="w-[60px]">Row #</TableHead>
              <TableHead>Row Data</TableHead>
              <TableHead className="w-[140px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSelections.map((selection) => {
              const rowData = previewData[selection.rowIndex];
              const displayRowIndex = selection.rowIndex; // 0-based index
              
              return (
                <TableRow 
                  key={selection.rowIndex}
                  className={!selection.isSelected ? "bg-muted/10" : ""}
                >
                  <TableCell>
                    <Checkbox 
                      checked={selection.isSelected}
                      onCheckedChange={() => toggleRowSelection(selection.rowIndex)}
                    />
                  </TableCell>
                  <TableCell className="text-xs font-mono">{displayRowIndex}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap max-w-full pb-2 scrollbar-thin">
                      {rowData?.map((cell, cellIndex) => (
                        <span key={cellIndex} className="text-xs px-2 py-1 bg-muted/20 rounded truncate max-w-[150px]">
                          {cell || "(empty)"}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {selection.isAutoExcluded ? (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
                        <ExclamationTriangleIcon className="h-3 w-3" />
                        <span>{selection.reason}</span>
                      </Badge>
                    ) : (
                      selection.isSelected ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Included
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          Excluded
                        </Badge>
                      )
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
            
            {filteredSelections.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No matching rows found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RowFilterTable;
