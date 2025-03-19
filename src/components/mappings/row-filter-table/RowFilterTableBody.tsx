
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
}

const RowFilterTableBody: React.FC<RowFilterTableBodyProps> = ({
  filteredSelections,
  toggleRowSelection,
  previewData
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
        filteredSelections.map((selection) => {
          const rowData = previewData[selection.rowIndex];
          const displayRowIndex = selection.rowIndex;
          const isUnit = rowData ? isLikelyUnitRow(rowData) : false;
          
          return (
            <TableRow 
              key={selection.rowIndex}
              className={!selection.isSelected ? "bg-muted/10" : isUnit ? "bg-green-50" : ""}
            >
              <TableCell>
                <Checkbox 
                  checked={selection.isSelected}
                  onCheckedChange={() => toggleRowSelection(selection.rowIndex)}
                />
              </TableCell>
              <TableCell className="text-xs font-mono">{displayRowIndex}</TableCell>
              <TableCell>
                <DataCellList rowData={rowData} />
              </TableCell>
              <TableCell>
                <RowStatusBadge 
                  isAutoExcluded={selection.isAutoExcluded}
                  isSelected={selection.isSelected}
                  reason={selection.reason}
                />
              </TableCell>
              <TableCell>
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
        })
      )}
    </TableBody>
  );
};

export default RowFilterTableBody;
