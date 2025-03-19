
import React from 'react';
import { Table as TableIcon } from 'lucide-react';
import ResultPreview from '@/components/mappings/ResultPreview';
import { ColumnMapping } from './types';

interface MappingsContentProps {
  mappedData: string[][];
  columnMappings: ColumnMapping[];
}

const MappingsContent: React.FC<MappingsContentProps> = ({ mappedData, columnMappings }) => {
  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="bg-white p-4 rounded-lg border mb-4">
        <div className="flex items-center gap-2 mb-2">
          <TableIcon className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Mapped Rent Roll Preview</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          This is how your rent roll will appear after applying column mappings and row filters.
        </p>
      </div>
      
      <div className="py-2">
        <ResultPreview 
          mappedData={mappedData}
          columnMappings={columnMappings}
          maxRows={10}
        />
      </div>
    </div>
  );
};

export default MappingsContent;
