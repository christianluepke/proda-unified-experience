
import React, { useState } from 'react';
import { ColumnMapping, RowSelection, StandardField } from './types';
import { Table, TableBody } from '@/components/ui/table';
import TableFilters from './table/TableFilters';
import TableHeader from './table/TableHeader';
import DataRow from './table/DataRow';
import { isLikelyUnitRow, filterRows } from './table/tableUtils';

interface CombinedMappingTableProps {
  columnMappings: ColumnMapping[];
  rowSelections: RowSelection[];
  updateColumnMapping: (originalIndex: number, standardField: StandardField | null) => void;
  toggleRowSelection: (rowIndex: number) => void;
  previewData: string[][];
}

const CombinedMappingTable: React.FC<CombinedMappingTableProps> = ({
  columnMappings,
  rowSelections,
  updateColumnMapping,
  toggleRowSelection,
  previewData
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rowFilter, setRowFilter] = useState<'all' | 'included' | 'excluded'>('all');

  // Filter rows based on search and filter
  const filteredRows = filterRows(rowSelections, rowFilter, searchTerm, previewData);

  // Handle bulk selection
  const selectAllRows = () => {
    filteredRows.forEach(selection => {
      if (!selection.isSelected) {
        toggleRowSelection(selection.rowIndex);
      }
    });
  };
  
  const deselectAllRows = () => {
    filteredRows.forEach(selection => {
      if (selection.isSelected) {
        toggleRowSelection(selection.rowIndex);
      }
    });
  };

  return (
    <div className="w-full">
      <TableFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        rowFilter={rowFilter}
        setRowFilter={setRowFilter}
        filteredRows={filteredRows}
        selectAllRows={selectAllRows}
        deselectAllRows={deselectAllRows}
      />

      <div className="overflow-auto">
        <Table>
          <TableHeader 
            columnMappings={columnMappings}
            updateColumnMapping={updateColumnMapping}
          />

          <TableBody>
            {filteredRows.map((selection) => {
              const rowData = previewData[selection.rowIndex];
              const isUnit = rowData ? isLikelyUnitRow(rowData) : false;
              
              return (
                <DataRow
                  key={`row-${selection.rowIndex}`}
                  selection={selection}
                  rowData={rowData}
                  columnMappings={columnMappings}
                  toggleRowSelection={toggleRowSelection}
                  isUnit={isUnit}
                />
              );
            })}
            
            {filteredRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columnMappings.length + 3} className="h-24 text-center">
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

// Adding the missing TableRow and TableCell components for the empty state
import { TableRow, TableCell } from '@/components/ui/table';

export default CombinedMappingTable;
