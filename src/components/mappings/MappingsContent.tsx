
import React from 'react';
import { TableIcon } from 'lucide-react';
import { ColumnMapping, RowSelection, StandardField } from './types';
import ColumnMappingTable from './ColumnMappingTable';
import RowFilterTable from './RowFilterTable';

interface MappingsContentProps {
  mappedData: string[][];
  columnMappings: ColumnMapping[];
  rowSelections: RowSelection[];
  updateColumnMapping: (originalIndex: number, standardField: StandardField | null) => void;
  toggleRowSelection: (rowIndex: number) => void;
  previewData: string[][];
  activeTab: string;
}

const MappingsContent: React.FC<MappingsContentProps> = ({
  mappedData,
  columnMappings,
  rowSelections,
  updateColumnMapping,
  toggleRowSelection,
  previewData,
  activeTab
}) => {
  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="bg-white p-4 rounded-lg border mb-4">
        <div className="flex items-center gap-2 mb-2">
          <TableIcon className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">
            {activeTab === "column-mapping" 
              ? "Map Columns to Standard Fields" 
              : "Filter Rows from Data"}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">
          {activeTab === "column-mapping"
            ? "Map each column from your rent roll to the corresponding standard field. Drag to scroll horizontally if needed."
            : "We've automatically excluded totals, subtotals, and blank rows. You can manually include or exclude rows below."}
        </p>
      </div>
      
      <div className="rounded-lg border overflow-hidden">
        {activeTab === "column-mapping" ? (
          <ColumnMappingTable
            columnMappings={columnMappings}
            updateColumnMapping={updateColumnMapping}
            previewData={previewData}
          />
        ) : (
          <RowFilterTable
            rowSelections={rowSelections}
            toggleRowSelection={toggleRowSelection}
            previewData={previewData}
          />
        )}
      </div>
    </div>
  );
};

export default MappingsContent;
