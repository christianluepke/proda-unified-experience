
import React, { useState } from 'react';
import { RowSelection } from './types';
import { Table, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import { filterRows } from './table/tableUtils';
import RowFilterHeader from './row-filter-table/RowFilterHeader';
import RowFilterTableBody from './row-filter-table/RowFilterTableBody';

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
  const filteredSelections = filterRows(rowSelections, filter, searchTerm, previewData);
  
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
      <RowFilterHeader
        totalRowsCount={totalRowsCount}
        excludedCount={excludedCount}
        autoExcludedCount={autoExcludedCount}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filter={filter}
        setFilter={setFilter}
        selectAll={selectAll}
        deselectAll={deselectAll}
      />
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50 sticky top-0 z-10">
            <TableRow>
              <TableHead className="w-[50px] py-2">Include</TableHead>
              <TableHead className="w-[50px] py-2">Row #</TableHead>
              <TableHead className="py-2">Row Data</TableHead>
              <TableHead className="w-[130px] py-2">Status</TableHead>
              <TableHead className="w-[90px] py-2">Likely Unit</TableHead>
            </TableRow>
          </TableHeader>
          
          <RowFilterTableBody
            filteredSelections={filteredSelections}
            toggleRowSelection={toggleRowSelection}
            previewData={previewData}
            onSelectAll={selectAll}
            onDeselectAll={deselectAll}
          />
        </Table>
      </div>
    </div>
  );
};

export default RowFilterTable;
