
import React from 'react';
import { TableIcon } from 'lucide-react';
import { ColumnMapping, RowSelection, StandardField } from './types';
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
      <div className="bg-white rounded-lg border mb-1.5">
        <div className="flex items-center justify-between px-3 py-1.5">
          <div className="flex items-center gap-1.5">
            <TableIcon className="h-4 w-4 text-[#050543]" />
            <h3 className="text-sm font-medium">Map Columns & Filter Rows</h3>
          </div>
          
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="font-medium">{mappedColumnCount}/{totalColumns}</span> columns mapped
              <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#050543] rounded-full" 
                  style={{ width: `${mappingProgress}%` }}
                ></div>
              </div>
            </div>
            <div className="h-3 mx-0.5 border-l border-gray-200"></div>
            <div className="text-muted-foreground">
              <span className="font-medium">{selectedRowCount}/{totalRows}</span> rows selected
            </div>
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border overflow-hidden">
        <ScrollArea className="h-[calc(100vh-175px)]">
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
