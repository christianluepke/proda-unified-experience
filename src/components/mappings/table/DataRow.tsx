
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { TableCell, TableRow } from '@/components/ui/table';
import { ColumnMapping, RowSelection } from '../types';

interface DataRowProps {
  selection: RowSelection;
  rowData: string[] | undefined;
  columnMappings: ColumnMapping[];
  toggleRowSelection: (rowIndex: number) => void;
  isUnit: boolean;
}

const DataRow: React.FC<DataRowProps> = ({
  selection,
  rowData,
  columnMappings,
  toggleRowSelection,
  isUnit
}) => {
  return (
    <TableRow 
      className={!selection.isSelected ? "bg-muted/10" : isUnit ? "bg-green-50" : ""}
    >
      <TableCell>
        <Checkbox 
          checked={selection.isSelected}
          onCheckedChange={() => toggleRowSelection(selection.rowIndex)}
        />
      </TableCell>
      <TableCell className="text-xs font-mono">{selection.rowIndex}</TableCell>
      <TableCell>
        {selection.isAutoExcluded ? (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 whitespace-nowrap text-xs">
            {selection.reason}
          </Badge>
        ) : (
          selection.isSelected ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
              Included
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
              Excluded
            </Badge>
          )
        )}
      </TableCell>
      {/* Data cells */}
      {columnMappings.map((mapping, cellIndex) => (
        <TableCell key={`cell-${selection.rowIndex}-${cellIndex}`}>
          {rowData && rowData[mapping.originalIndex] ? (
            rowData[mapping.originalIndex]
          ) : (
            <span className="text-muted-foreground text-xs">(empty)</span>
          )}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default DataRow;
