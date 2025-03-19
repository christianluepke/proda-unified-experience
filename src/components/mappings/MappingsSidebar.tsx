
import React from 'react';
import { Map, RowsIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ColumnMapper from '@/components/mappings/ColumnMapper';
import RowFilter from '@/components/mappings/RowFilter';
import { ColumnMapping, RowSelection, StandardField } from './types';

interface MappingsSidebarProps {
  columnMappings: ColumnMapping[];
  rowSelections: RowSelection[];
  updateColumnMapping: (originalIndex: number, standardField: StandardField | null) => void;
  toggleRowSelection: (rowIndex: number) => void;
  previewData: string[][];
  activeTab: string;
  setActiveTab: (value: string) => void;
}

// This component is now maintained for backward compatibility
// The main UI has been moved to the inline approach in MappingsContent
const MappingsSidebar: React.FC<MappingsSidebarProps> = ({
  columnMappings,
  rowSelections,
  updateColumnMapping,
  toggleRowSelection,
  previewData,
  activeTab,
  setActiveTab
}) => {
  // Count how many columns are mapped
  const mappedColumnCount = columnMappings.filter(m => m.standardField).length;
  const totalColumns = columnMappings.length;
  const mappingProgress = totalColumns > 0 ? Math.round((mappedColumnCount / totalColumns) * 100) : 0;

  return (
    <div className="p-4 h-full overflow-y-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="column-mapping" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            <span>Column Mappings</span>
          </TabsTrigger>
          <TabsTrigger value="row-filter" className="flex items-center gap-2">
            <RowsIcon className="h-4 w-4" />
            <span>Row Filters</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="mb-3">
          {activeTab === "column-mapping" && (
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{mappedColumnCount} of {totalColumns} columns mapped</span>
              <span>{mappingProgress}%</span>
            </div>
          )}
          {activeTab === "column-mapping" && (
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
              <div 
                className="h-full bg-blue-600 rounded-full" 
                style={{ width: `${mappingProgress}%` }}
              ></div>
            </div>
          )}
        </div>
        
        <TabsContent value="column-mapping">
          <ColumnMapper 
            columnMappings={columnMappings}
            updateColumnMapping={updateColumnMapping}
            previewData={previewData}
          />
        </TabsContent>
        
        <TabsContent value="row-filter">
          <RowFilter 
            rowSelections={rowSelections}
            toggleRowSelection={toggleRowSelection}
            previewData={previewData}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MappingsSidebar;
