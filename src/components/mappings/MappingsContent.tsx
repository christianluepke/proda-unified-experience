
import React from 'react';
import { TableIcon } from 'lucide-react';
import { ColumnMapping, RowSelection, StandardField } from './types';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import CombinedMappingTable from './CombinedMappingTable';

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
  previewData
}) => {
  // Count how many columns are mapped
  const mappedColumnCount = columnMappings.filter(m => m.standardField).length;
  const totalColumns = columnMappings.length;
  const mappingProgress = totalColumns > 0 ? Math.round((mappedColumnCount / totalColumns) * 100) : 0;

  // Count how many rows are selected
  const selectedRowCount = rowSelections.filter(r => r.isSelected).length;
  const totalRows = rowSelections.length;
  
  return (
    <div className="flex-1 overflow-hidden p-4">
      <div className="bg-white p-4 rounded-lg border mb-4">
        <div className="flex items-center gap-2 mb-2">
          <TableIcon className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Map Columns & Filter Rows</h3>
        </div>
        
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Column Mapping:</span> {mappedColumnCount} of {totalColumns} columns mapped ({mappingProgress}%)
              </p>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full" 
                  style={{ width: `${mappingProgress}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Row Selection:</span> {selectedRowCount} of {totalRows} rows selected
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-sky-100 text-blue-800 border-sky-200">
              Original Headers
            </Badge>
            <Badge variant="outline" className="bg-blue-600 text-white border-blue-700">
              Mapped Headers
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Likely Units
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border overflow-hidden">
        <ScrollArea className="h-[calc(100vh-250px)]">
          <CombinedMappingTable
            columnMappings={columnMappings}
            rowSelections={rowSelections}
            updateColumnMapping={updateColumnMapping}
            toggleRowSelection={toggleRowSelection}
            previewData={previewData}
          />
        </ScrollArea>
      </div>
    </div>
  );
};

export default MappingsContent;
