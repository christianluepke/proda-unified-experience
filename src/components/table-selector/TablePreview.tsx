
import React from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableBounds } from './types';

interface TablePreviewProps {
  data: string[][];
  activeStep: number;
  showFullTable: boolean;
  tableBounds: TableBounds;
}

const TablePreview: React.FC<TablePreviewProps> = ({ 
  data, 
  activeStep, 
  showFullTable, 
  tableBounds 
}) => {
  const getHighlightedRows = () => {
    return data.slice(
      Math.max(0, tableBounds.startRow - 1), 
      Math.min(data.length, tableBounds.endRow)
    );
  };

  return (
    <div className="border rounded-md overflow-auto max-h-[650px] relative">
      {/* Highlight overlay indicator */}
      {activeStep === 2 && !showFullTable && (
        <div className="absolute inset-0 border-2 border-primary pointer-events-none z-10">
          <div className="absolute top-0 left-0 bg-primary text-primary-foreground px-2 py-1 text-xs rounded-br">
            Selected Area
          </div>
        </div>
      )}
      
      <Table>
        <TableHeader>
          <TableRow className={activeStep === 2 ? "bg-primary/80 text-primary-foreground" : "bg-primary text-primary-foreground"}>
            {data[0].map((header, idx) => (
              <TableHead 
                key={`header-${idx}`}
                className={
                  activeStep === 2 && (idx + 1 < tableBounds.startCol || idx + 1 > tableBounds.endCol) 
                    ? 'opacity-40' 
                    : ''
                }
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {(showFullTable ? data.slice(1) : getHighlightedRows().slice(1)).map((row, rowIdx) => {
            const actualRowIndex = showFullTable ? rowIdx + 1 : tableBounds.startRow + rowIdx;
            const isHighlighted = 
              activeStep === 2 && 
              !showFullTable && 
              actualRowIndex >= tableBounds.startRow && 
              actualRowIndex < tableBounds.endRow;
            
            return (
              <TableRow 
                key={`row-${rowIdx}`}
                className={
                  isHighlighted
                    ? 'bg-primary/10'
                    : rowIdx % 2 === 0 ? 'bg-muted/5' : ''
                }
              >
                {row.map((cell, cellIdx) => (
                  <TableCell 
                    key={`cell-${rowIdx}-${cellIdx}`}
                    className={
                      activeStep === 2 && (cellIdx + 1 < tableBounds.startCol || cellIdx + 1 > tableBounds.endCol)
                        ? 'opacity-40'
                        : ''
                    }
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TablePreview;
