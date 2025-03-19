
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

import ProgressSteps from '@/components/table-selector/ProgressSteps';
import TableSelectionStep from '@/components/table-selector/TableSelectionStep';
import TableBoundsStep from '@/components/table-selector/TableBoundsStep';
import TablePreview from '@/components/table-selector/TablePreview';
import { TableBounds, TableOption } from '@/components/table-selector/types';
import { fileName, mockTables, mockRentRollData } from '@/components/table-selector/mockData';

const SelectTable = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [showFullTable, setShowFullTable] = useState(false);
  const [tableBounds, setTableBounds] = useState<TableBounds>({ 
    startRow: 1, 
    endRow: 12, 
    startCol: 1, 
    endCol: 7 
  });
  
  // Initialize selected table if not set
  useEffect(() => {
    if (!selectedTable && mockTables.length > 0) {
      // Auto-select the highest confidence rent roll table
      const highestConfidenceTable = [...mockTables]
        .filter(table => table.tableType === 'rent_roll')
        .sort((a, b) => b.confidence - a.confidence)[0];
      
      if (highestConfidenceTable) {
        setSelectedTable(highestConfidenceTable.id);
      }
    }
  }, [selectedTable]);

  const handleStepChange = (step: number) => {
    if (!selectedTable && step > 1) {
      toast({
        title: "Selection Required",
        description: "Please select a table to continue.",
        variant: "destructive",
      });
      return;
    }
    setActiveStep(step);
  };

  const handleNext = () => {
    if (!selectedTable) {
      toast({
        title: "Selection Required",
        description: "Please select a table to continue.",
        variant: "destructive",
      });
      return;
    }
    
    if (activeStep < 2) {
      setActiveStep(activeStep + 1);
    } else {
      // Process data and navigate to next step
      toast({
        title: "Selection Complete",
        description: "Rent roll table has been selected and bounds adjusted.",
      });
      navigate('/projects');
    }
  };

  const handleCancel = () => {
    toast({
      title: "Process Cancelled",
      description: "You've cancelled the rent roll selection.",
      variant: "destructive",
    });
    navigate('/upload');
  };

  const handleCloseDialog = () => {
    const confirmClose = window.confirm("Are you sure you want to close? Any unsaved selections will be lost.");
    if (confirmClose) {
      navigate('/upload');
    }
  };

  const handleTableSelect = (tableId: string) => {
    setSelectedTable(tableId);
    
    // Reset bounds to default when selecting a new table
    const selectedTableData = mockTables.find(table => table.id === tableId);
    if (selectedTableData) {
      setTableBounds({
        startRow: 1,
        endRow: Math.min(12, selectedTableData.rowCount),
        startCol: 1,
        endCol: Math.min(7, selectedTableData.columnCount)
      });
    }
  };

  const updateBounds = (key: keyof TableBounds, value: number) => {
    setTableBounds(prev => {
      const newBounds = { ...prev, [key]: value };
      
      // Ensure start values are always less than or equal to end values
      if (key === 'startRow' && newBounds.startRow > newBounds.endRow) {
        newBounds.endRow = newBounds.startRow;
      } else if (key === 'endRow' && newBounds.endRow < newBounds.startRow) {
        newBounds.startRow = newBounds.endRow;
      } else if (key === 'startCol' && newBounds.startCol > newBounds.endCol) {
        newBounds.endCol = newBounds.startCol;
      } else if (key === 'endCol' && newBounds.endCol < newBounds.startCol) {
        newBounds.startCol = newBounds.endCol;
      }
      
      return newBounds;
    });
  };

  // Get the selected table information
  const selectedTableInfo = mockTables.find(table => table.id === selectedTable);

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Select Rent Roll Table</h1>
        <Button variant="ghost" size="icon" onClick={handleCloseDialog}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Progress Steps */}
      <div className="px-4 py-3 border-b">
        <ProgressSteps activeStep={activeStep} handleStepChange={handleStepChange} />
      </div>

      {/* Main Content */}
      <ResizablePanelGroup direction="horizontal" className="flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <ResizablePanel defaultSize={25} minSize={20} maxSize={30} className="border-r">
          <div className="p-4 h-full overflow-y-auto">
            {activeStep === 1 && (
              <TableSelectionStep 
                fileName={fileName}
                tables={mockTables}
                selectedTable={selectedTable}
                onTableSelect={handleTableSelect}
              />
            )}

            {activeStep === 2 && (
              <TableBoundsStep 
                tableBounds={tableBounds}
                updateBounds={updateBounds}
                showFullTable={showFullTable}
                setShowFullTable={setShowFullTable}
                selectedTableInfo={selectedTableInfo}
                totalRows={mockRentRollData.length}
                totalColumns={mockRentRollData[0].length}
              />
            )}
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Right Content Area */}
        <ResizablePanel defaultSize={75} className="flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto p-4">
            <div className="bg-muted/10 p-4 rounded-lg border border-dashed border-muted-foreground/50 mb-4">
              <h3 className="text-sm font-medium mb-2">Table Preview</h3>
              <p className="text-xs text-muted-foreground mb-4">
                {activeStep === 1 
                  ? "Select a table from the left panel to preview it."
                  : "Adjust the bounds using the controls on the left."}
              </p>
              
              {selectedTable ? (
                <TablePreview 
                  data={mockRentRollData} 
                  activeStep={activeStep}
                  showFullTable={showFullTable}
                  tableBounds={tableBounds}
                />
              ) : (
                <div className="flex items-center justify-center h-48 bg-muted/5 rounded-md border">
                  <p className="text-muted-foreground">Select a table to preview</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Footer Controls */}
          <div className="border-t p-4 flex justify-between items-center">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <div className="flex gap-2">
              {activeStep > 1 && (
                <Button variant="outline" onClick={() => setActiveStep(activeStep - 1)}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              )}
              <Button onClick={handleNext} disabled={!selectedTable}>
                {activeStep < 2 ? 'Next' : 'Confirm Selection'}
                {activeStep < 2 && <ChevronRight className="ml-2 h-4 w-4" />}
                {activeStep === 2 && <Check className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default SelectTable;
