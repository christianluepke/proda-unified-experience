
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
  // Count how many columns are mapped
  const mappedColumnCount = columnMappings.filter(m => m.standardField).length;
  const totalColumns = columnMappings.length;
  const mappingProgress = totalColumns > 0 ? Math.round((mappedColumnCount / totalColumns) * 100) : 0;

  // Count how many rows are selected
  const selectedRowCount = rowSelections.filter(r => r.isSelected).length;
  const totalRows = rowSelections.length;
  
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
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {activeTab === "column-mapping"
              ? `${mappedColumnCount} of ${totalColumns} columns mapped (${mappingProgress}%). Original headers are in light blue, mapped headers in dark blue.`
              : `${selectedRowCount} of ${totalRows} rows selected. Likely unit rows are highlighted in green. We've automatically excluded totals, subtotals, and blank rows.`}
          </p>
          
          {activeTab === "column-mapping" && (
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full" 
                style={{ width: `${mappingProgress}%` }}
              ></div>
            </div>
          )}
        </div>
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
