
import React from 'react';
import { TableHeader, TableRow, TableHead } from '@/components/ui/table';
import { TableColumn } from './models';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";

interface FileTableHeaderProps {
  visibleColumns: TableColumn[];
  sortField: string | null;
  sortDirection: 'asc' | 'desc' | null;
  updateSort: (field: string) => void;
  areAllFilesSelected?: boolean;
  toggleSelectAll?: () => void;
  hasFiles?: boolean;
}

const FileTableHeader: React.FC<FileTableHeaderProps> = ({
  visibleColumns,
  sortField,
  sortDirection,
  updateSort,
  areAllFilesSelected = false,
  toggleSelectAll,
  hasFiles = true
}) => {
  return (
    <TableHeader>
      <TableRow>
        {visibleColumns.map(column => {
          if (!column.visible) return null;
          
          // Handle select column with checkbox
          if (column.id === 'select') {
            return (
              <TableHead key={column.id} className="w-12">
                <Checkbox 
                  checked={areAllFilesSelected}
                  onCheckedChange={toggleSelectAll}
                  disabled={!hasFiles}
                  aria-label="Select all files"
                />
              </TableHead>
            );
          }
          
          const isSorted = sortField === column.id;
          const isExcludedFromSorting = column.id === 'select';
          
          return (
            <TableHead 
              key={column.id}
              className={isExcludedFromSorting ? "" : "cursor-pointer hover:text-foreground"}
              onClick={isExcludedFromSorting ? undefined : () => updateSort(column.id)}
            >
              <div className="flex items-center gap-1">
                {column.label}
                {isSorted && (
                  <>
                    {sortDirection === 'asc' ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </>
                )}
              </div>
            </TableHead>
          );
        })}
        <TableHead className="w-10"></TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default FileTableHeader;
