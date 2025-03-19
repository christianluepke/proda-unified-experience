
import React from 'react';
import { RowSelection } from './types';
import RowFilterSummary from './row-filter/RowFilterSummary';
import RowPreviewTable from './row-filter/RowPreviewTable';
import RowTableFooter from './row-filter/RowTableFooter';

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
  return (
    <div className="space-y-4">
      <RowFilterSummary rowSelections={rowSelections} />
      
      <p className="text-sm text-muted-foreground mb-4">
        We've automatically excluded totals, subtotals, and blank rows. You can manually include or exclude rows below.
      </p>
      
      <div className="border rounded-md overflow-hidden">
        <div className="bg-muted/40 p-3 text-sm">
          Preview first 10 rows (header + 9 data rows)
        </div>
        
        <RowPreviewTable 
          rowSelections={rowSelections.slice(0, 10)}
          toggleRowSelection={toggleRowSelection}
          previewData={previewData}
        />
        
        <RowTableFooter 
          totalRows={rowSelections.length} 
          visibleRows={10} 
        />
      </div>
    </div>
  );
};

export default RowFilter;
