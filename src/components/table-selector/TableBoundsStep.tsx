
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Slider } from "@/components/ui/slider";
import { TableBounds, TableOption } from './types';

interface TableBoundsStepProps {
  tableBounds: TableBounds;
  updateBounds: (key: keyof TableBounds, value: number) => void;
  showFullTable: boolean;
  setShowFullTable: (show: boolean) => void;
  selectedTableInfo?: TableOption;
  totalRows: number;
  totalColumns: number;
}

const TableBoundsStep: React.FC<TableBoundsStepProps> = ({
  tableBounds,
  updateBounds,
  showFullTable,
  setShowFullTable,
  selectedTableInfo,
  totalRows,
  totalColumns
}) => {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-medium mb-4">Adjust table bounds</h2>
      <p className="text-sm text-muted-foreground">
        Fine-tune the rows and columns to include only relevant rent roll data.
      </p>
      
      <div className="space-y-4 mt-6">
        <div>
          <h3 className="text-sm font-medium mb-3">Table Bounds</h3>
          
          <div className="space-y-6">
            {/* Row bounds sliders */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm text-muted-foreground">Start Row</label>
                  <span className="text-sm font-medium">Row {tableBounds.startRow}</span>
                </div>
                <Slider 
                  value={[tableBounds.startRow]} 
                  min={1} 
                  max={selectedTableInfo?.rowCount || totalRows}
                  step={1}
                  onValueChange={(value) => updateBounds('startRow', value[0])}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm text-muted-foreground">End Row</label>
                  <span className="text-sm font-medium">Row {tableBounds.endRow}</span>
                </div>
                <Slider 
                  value={[tableBounds.endRow]} 
                  min={1} 
                  max={selectedTableInfo?.rowCount || totalRows} 
                  step={1}
                  onValueChange={(value) => updateBounds('endRow', value[0])}
                />
              </div>
            </div>
            
            {/* Column bounds sliders */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm text-muted-foreground">Start Column</label>
                  <span className="text-sm font-medium">Column {tableBounds.startCol}</span>
                </div>
                <Slider 
                  value={[tableBounds.startCol]} 
                  min={1} 
                  max={selectedTableInfo?.columnCount || totalColumns}
                  step={1}
                  onValueChange={(value) => updateBounds('startCol', value[0])}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm text-muted-foreground">End Column</label>
                  <span className="text-sm font-medium">Column {tableBounds.endCol}</span>
                </div>
                <Slider 
                  value={[tableBounds.endCol]} 
                  min={1} 
                  max={selectedTableInfo?.columnCount || totalColumns} 
                  step={1}
                  onValueChange={(value) => updateBounds('endCol', value[0])}
                />
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Show Full Table</span>
          <Switch 
            checked={showFullTable} 
            onCheckedChange={setShowFullTable} 
          />
        </div>
      </div>
    </div>
  );
};

export default TableBoundsStep;
