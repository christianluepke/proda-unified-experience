
import React from 'react';
import { FileText, TableIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { TableOption } from './types';

interface TableSelectionStepProps {
  fileName: string;
  tables: TableOption[];
  selectedTable: string | null;
  onTableSelect: (tableId: string) => void;
}

const TableSelectionStep: React.FC<TableSelectionStepProps> = ({
  fileName,
  tables,
  selectedTable,
  onTableSelect
}) => {
  return (
    <>
      <h2 className="text-lg font-medium mb-4">Select the correct rent roll table.</h2>
      
      <div className="mb-6">
        <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-md mb-4">
          <FileText className="h-5 w-5 text-primary" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{fileName}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium mb-2">Detected Tables</h3>
        
        <RadioGroup value={selectedTable || ""} onValueChange={onTableSelect}>
          {tables.map(table => (
            <div 
              key={table.id}
              className={`mb-3 p-3 border rounded-lg transition-colors ${
                selectedTable === table.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
              }`}
            >
              <div className="flex items-start mb-2">
                <RadioGroupItem value={table.id} id={table.id} className="mt-1" />
                <div className="ml-3 flex-1">
                  <label htmlFor={table.id} className="font-medium cursor-pointer flex items-center gap-2">
                    {table.name}
                    <Badge className={
                      table.confidence > 90 ? "bg-green-100 text-green-800" : 
                      table.confidence > 80 ? "bg-amber-100 text-amber-800" : 
                      "bg-red-100 text-red-800"
                    }>
                      {table.confidence}%
                    </Badge>
                  </label>
                  <div className="text-xs text-muted-foreground mt-1">
                    Sheet: {table.sheetName}
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <TableIcon className="h-3 w-3" />
                      <span>{table.rowCount} rows</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TableIcon className="h-3 w-3 rotate-90" />
                      <span>{table.columnCount} columns</span>
                    </div>
                  </div>
                </div>
              </div>
              <Badge 
                variant="outline" 
                className={
                  table.tableType === 'rent_roll' ? "bg-blue-50 text-blue-700 border-blue-200" : 
                  table.tableType === 'property' ? "bg-purple-50 text-purple-700 border-purple-200" : 
                  "bg-gray-50 text-gray-700 border-gray-200"
                }
              >
                {table.tableType === 'rent_roll' ? 'Rent Roll' : 
                 table.tableType === 'property' ? 'Property Data' : 
                 'Unknown Type'}
              </Badge>
            </div>
          ))}
        </RadioGroup>
      </div>
    </>
  );
};

export default TableSelectionStep;
