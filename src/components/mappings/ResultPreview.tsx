
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';
import { ColumnMapping } from './types';

interface ResultPreviewProps {
  mappedData: string[][];
  columnMappings: ColumnMapping[];
  maxRows?: number;
}

const ResultPreview: React.FC<ResultPreviewProps> = ({ 
  mappedData, 
  columnMappings,
  maxRows = 5
}) => {
  const [showFullPreview, setShowFullPreview] = useState(false);
  
  if (!mappedData || mappedData.length === 0) {
    return (
      <div className="border rounded-md p-6 text-center">
        <p className="text-muted-foreground">No data to preview</p>
      </div>
    );
  }
  
  const displayData = showFullPreview 
    ? mappedData 
    : mappedData.slice(0, Math.min(mappedData.length, maxRows + 1)); // +1 for header
  
  const totalRows = mappedData.length - 1; // Exclude header row
  const visibleRows = displayData.length - 1; // Exclude header row

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Result Preview</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowFullPreview(!showFullPreview)}
          className="flex items-center gap-2"
        >
          {showFullPreview ? (
            <>
              <EyeOff className="h-4 w-4" />
              <span>Show Less</span>
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              <span>Show All ({totalRows} Rows)</span>
            </>
          )}
        </Button>
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <div className="bg-muted/40 p-3 text-sm flex justify-between items-center">
          <span>Mapped data preview</span>
          <span className="text-xs text-muted-foreground">
            Showing {visibleRows} of {totalRows} rows
          </span>
        </div>
        
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-background">
              <TableRow>
                {displayData[0]?.map((header, index) => (
                  <TableHead key={index} className="font-medium">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayData.slice(1).map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <TableCell key={cellIndex}>
                      {cell || <span className="text-muted-foreground italic">(empty)</span>}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {!showFullPreview && totalRows > visibleRows && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full flex items-center justify-center gap-1 py-2 rounded-none border-t"
            onClick={() => setShowFullPreview(true)}
          >
            <ChevronDown className="h-4 w-4" />
            <span>Show All {totalRows} Rows</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        )}
        
        {showFullPreview && totalRows > maxRows && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full flex items-center justify-center gap-1 py-2 rounded-none border-t"
            onClick={() => setShowFullPreview(false)}
          >
            <ChevronUp className="h-4 w-4" />
            <span>Show Less</span>
            <ChevronUp className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ResultPreview;
