
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
    <div className="flex-1 overflow-hidden px-4 pt-2 pb-4">
      <div className="bg-white rounded-lg border mb-2">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            <TableIcon className="h-5 w-5 text-primary" />
            <h3 className="text-base font-medium">Map Columns & Filter Rows</h3>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="font-medium">{mappedColumnCount}/{totalColumns}</span> columns mapped
              <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full" 
                  style={{ width: `${mappingProgress}%` }}
                ></div>
              </div>
            </div>
            <div className="h-4 mx-0.5 border-l border-gray-200"></div>
            <div className="text-xs text-muted-foreground">
              <span className="font-medium">{selectedRowCount}/{totalRows}</span> rows selected
            </div>
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border overflow-hidden">
        <ScrollArea className="h-[calc(100vh-190px)]">
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
