
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

const MappingsSidebar: React.FC<MappingsSidebarProps> = ({
  columnMappings,
  rowSelections,
  updateColumnMapping,
  toggleRowSelection,
  previewData,
  activeTab,
  setActiveTab
}) => {
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
