
import React from 'react';
import { RowSelection } from './types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface RowFilterProps {
  rowSelections: RowSelection[];
  toggleRowSelection: (rowIndex: number) => void;
  previewData: string[][];
}

const RowFilter: React.FC<RowFilterProps> = ({ 
  rowSelections, 
  toggleRowSelection,
  previewData 
}) => {
  const getTotalRowsExcluded = () => {
    return rowSelections.filter(row => !row.isSelected).length;
  };
  
  const getAutoExcludedCount = () => {
    return rowSelections.filter(row => row.isAutoExcluded).length;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Filter Rows</h3>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-muted/30">
            {rowSelections.length} Total Rows
          </Badge>
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            {getTotalRowsExcluded()} Excluded
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {getAutoExcludedCount()} Auto-filtered
          </Badge>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        We've automatically excluded totals, subtotals, and blank rows. You can manually include or exclude rows below.
      </p>
      
      <div className="border rounded-md overflow-hidden">
        <div className="bg-muted/40 p-3 text-sm">
          Preview first 10 rows (header + 9 data rows)
        </div>
        
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
        
        {rowSelections.length > 10 && (
          <div className="p-3 text-center text-sm text-muted-foreground border-t">
            + {rowSelections.length - 10} more rows
          </div>
        )}
      </div>
    </div>
  );
};

export default RowFilter;
