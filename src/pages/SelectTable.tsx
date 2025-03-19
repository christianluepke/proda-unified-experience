
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

import TableSelectionStep from '@/components/table-selector/TableSelectionStep';
import TableBoundsStep from '@/components/table-selector/TableBoundsStep';
import TableSelectorHeader from '@/components/table-selector/TableSelectorHeader';
import TableSelectorFooter from '@/components/table-selector/TableSelectorFooter';
import TableSelectorContent from '@/components/table-selector/TableSelectorContent';
import { TableBounds } from '@/components/table-selector/types';
import { fileName, mockTables, mockRentRollData } from '@/components/table-selector/mockData';

const SelectTable = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(location.state?.activeStep || 1);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [showFullTable, setShowFullTable] = useState(false);
  const [tableBounds, setTableBounds] = useState<TableBounds>({ 
    startRow: 1, 
    endRow: 12, 
    startCol: 1, 
    endCol: 7 
  });
  
  useEffect(() => {
    if (!selectedTable && mockTables.length > 0) {
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
      navigate(`/mappings/${id}`, { state: { tableBounds } });
    }
  };

  const handleCancel = () => {
    toast({
      title: "Process Cancelled",
      description: "You've cancelled the rent roll selection.",
      variant: "destructive",
    });
    navigate('/projects');
  };

  const handleCloseDialog = () => {
    const confirmClose = window.confirm("Are you sure you want to close? Any unsaved selections will be lost.");
    if (confirmClose) {
      navigate('/projects');
    }
  };

  const handleTableSelect = (tableId: string) => {
    setSelectedTable(tableId);
    
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

  const selectedTableInfo = mockTables.find(table => table.id === selectedTable);

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      <TableSelectorHeader 
        activeStep={activeStep} 
        handleStepChange={handleStepChange} 
        handleCloseDialog={handleCloseDialog} 
      />

      <ResizablePanelGroup direction="horizontal" className="flex-1 overflow-hidden">
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
        
        <ResizablePanel defaultSize={75} className="flex flex-col overflow-hidden">
          <TableSelectorContent
            selectedTable={selectedTable}
            showFullTable={showFullTable}
            tableBounds={tableBounds}
            activeStep={activeStep}
            tableData={mockRentRollData}
          />
          
          <TableSelectorFooter
            activeStep={activeStep}
            handleCancel={handleCancel}
            handleNext={handleNext}
            setActiveStep={setActiveStep}
            isNextDisabled={!selectedTable}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default SelectTable;
