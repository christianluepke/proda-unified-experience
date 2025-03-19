
import React from 'react';
import TablePreview from '@/components/table-selector/TablePreview';

interface TableSelectorContentProps {
  selectedTable: string | null;
  showFullTable: boolean;
  tableBounds: {
    startRow: number;
    endRow: number;
    startCol: number;
    endCol: number;
  };
  activeStep: number;
  tableData: string[][];
}

const TableSelectorContent: React.FC<TableSelectorContentProps> = ({
  selectedTable,
  showFullTable,
  tableBounds,
  activeStep,
  tableData
}) => {
  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="bg-muted/10 p-4 rounded-lg border border-dashed border-muted-foreground/50 mb-4">
        <h3 className="text-sm font-medium mb-2">Table Preview</h3>
        <p className="text-xs text-muted-foreground mb-4">
          {activeStep === 1 
            ? "Select a table from the left panel to preview it."
            : "Adjust the bounds using the controls on the left."}
        </p>
        
        {selectedTable ? (
          <TablePreview 
            data={tableData} 
            activeStep={activeStep}
            showFullTable={showFullTable}
            tableBounds={tableBounds}
          />
        ) : (
          <div className="flex items-center justify-center h-48 bg-muted/5 rounded-md border">
            <p className="text-muted-foreground">Select a table to preview</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableSelectorContent;
