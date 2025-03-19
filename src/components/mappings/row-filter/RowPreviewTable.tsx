
import React from 'react';
import { RowSelection } from '../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface RowPreviewTableProps {
  rowSelections: RowSelection[];
  toggleRowSelection: (rowIndex: number) => void;
  previewData: string[][];
}

const RowPreviewTable: React.FC<RowPreviewTableProps> = ({ 
  rowSelections, 
  toggleRowSelection,
  previewData 
}) => {
  return (
    <Table>
      <TableHeader className="bg-muted/50">
        <TableRow>
          <TableHead className="w-[50px]">Include</TableHead>
          <TableHead className="w-[50px]">Row</TableHead>
          <TableHead>Row Data</TableHead>
          <TableHead className="w-[140px]">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rowSelections.slice(0, 10).map((selection) => {
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
                <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap max-w-[500px] scrollbar-thin">
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
      </TableBody>
    </Table>
  );
};

export default RowPreviewTable;
