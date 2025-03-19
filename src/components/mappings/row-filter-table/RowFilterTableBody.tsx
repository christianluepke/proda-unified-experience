
import React from 'react';
import { TableBody, TableRow, TableCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { RowSelection } from '../types';
import RowStatusBadge from './RowStatusBadge';
import DataCellList from './DataCellList';
import { isLikelyUnitRow } from '../table/tableUtils';

interface RowFilterTableBodyProps {
  filteredSelections: RowSelection[];
  toggleRowSelection: (rowIndex: number) => void;
  previewData: string[][];
  onSelectAll?: () => void;
  onDeselectAll?: () => void;
}

const RowFilterTableBody: React.FC<RowFilterTableBodyProps> = ({
  filteredSelections,
  toggleRowSelection,
  previewData,
  onSelectAll,
  onDeselectAll
}) => {
  return (
    <TableBody>
      {filteredSelections.length === 0 ? (
        <TableRow>
          <TableCell colSpan={5} className="h-24 text-center">
            No matching rows found.
          </TableCell>
        </TableRow>
      ) : (
        <>
          {/* Quick selection row */}
          <TableRow className="bg-muted/20 border-b border-t">
            <TableCell colSpan={2} className="py-1">
              <div className="flex space-x-2">
                <button 
                  onClick={onSelectAll}
                  className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded border border-green-200 hover:bg-green-100"
                >
                  Select All
                </button>
                <button 
                  onClick={onDeselectAll}
                  className="text-xs px-2 py-0.5 bg-amber-50 text-amber-700 rounded border border-amber-200 hover:bg-amber-100"
                >
                  Deselect All
                </button>
              </div>
            </TableCell>
            <TableCell colSpan={3} className="text-xs text-muted-foreground py-1">
              {filteredSelections.length} rows shown
            </TableCell>
          </TableRow>
          
          {/* Data rows */}
          {filteredSelections.map((selection) => {
            const rowData = previewData[selection.rowIndex];
            const displayRowIndex = selection.rowIndex;
            const isUnit = rowData ? isLikelyUnitRow(rowData) : false;
            
            return (
              <TableRow 
                key={selection.rowIndex}
                className={!selection.isSelected ? "bg-muted/10" : isUnit ? "bg-green-50" : ""}
              >
                <TableCell className="py-1.5">
                  <Checkbox 
                    checked={selection.isSelected}
                    onCheckedChange={() => toggleRowSelection(selection.rowIndex)}
                  />
                </TableCell>
                <TableCell className="text-xs font-mono py-1.5">{displayRowIndex}</TableCell>
                <TableCell className="py-1.5">
                  <DataCellList rowData={rowData} maxCells={10} />
                </TableCell>
                <TableCell className="py-1.5">
                  <RowStatusBadge 
                    isAutoExcluded={selection.isAutoExcluded}
                    isSelected={selection.isSelected}
                    reason={selection.reason}
                  />
                </TableCell>
                <TableCell className="py-1.5">
                  {isUnit ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Yes
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      No
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </>
      )}
    </TableBody>
  );
};

export default RowFilterTableBody;
