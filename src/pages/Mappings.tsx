
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, Check, Map, RowsIcon, Table as TableIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ProgressSteps from '@/components/mappings/ProgressSteps';
import ColumnMapper from '@/components/mappings/ColumnMapper';
import RowFilter from '@/components/mappings/RowFilter';
import ResultPreview from '@/components/mappings/ResultPreview';
import { useMappings } from '@/hooks/useMappings';
import { mockRentRollData } from '@/components/table-selector/mockData';

const Mappings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(3); // This is step 3 in the overall flow
  const [activeTab, setActiveTab] = useState("column-mapping");
  
  // Get table bounds from location state or use default
  const tableBounds = location.state?.tableBounds || { 
    startRow: 1, 
    endRow: mockRentRollData.length - 1,
    startCol: 1,
    endCol: mockRentRollData[0].length - 1
  };
  
  // Extract the data based on the bounds
  const boundedData = mockRentRollData.slice(
    tableBounds.startRow - 1, 
    tableBounds.endRow
  ).map(row => 
    row.slice(tableBounds.startCol - 1, tableBounds.endCol)
  );
  
  const { 
    columnMappings, 
    rowSelections, 
    updateColumnMapping, 
    toggleRowSelection,
    getMappedData
  } = useMappings(boundedData);

  const handleStepChange = (step: number) => {
    if (step === 1) {
      // Go back to the select table page
      navigate(`/select-table/${id}`);
    } else if (step === 2) {
      // Go back to the adjust bounds page
      navigate(`/select-table/${id}`, { state: { activeStep: 2 } });
    } else {
      setActiveStep(step);
    }
  };

  const handleNext = () => {
    const requiredFields = [
      'unit_id', 'unit_name', 'tenant_name', 'lease_id', 
      'contracted_rent', 'passing_rent'
    ];
    
    // Check if at least some of the required fields are mapped
    const mappedFields = columnMappings
      .filter(mapping => mapping.standardField)
      .map(mapping => mapping.standardField);
    
    const missingRequiredFields = requiredFields.filter(
      field => !mappedFields.includes(field as any)
    );
    
    if (missingRequiredFields.length > 3) { // Allow some flexibility
      if (confirm("Some important fields like Unit ID, Tenant Name, or Rent values appear to be unmapped. Do you want to continue anyway?")) {
        // Process data and navigate to next step
        toast({
          title: "Mappings Saved",
          description: "Your column mappings and row filters have been applied.",
        });
        navigate('/projects');
      }
    } else {
      // Process data and navigate to next step
      toast({
        title: "Mappings Saved",
        description: "Your column mappings and row filters have been applied.",
      });
      navigate('/projects');
    }
  };

  const handleCancel = () => {
    toast({
      title: "Process Cancelled",
      description: "You've cancelled the column mapping.",
      variant: "destructive",
    });
    navigate('/projects');
  };

  const handleCloseDialog = () => {
    const confirmClose = window.confirm("Are you sure you want to close? Any unsaved mappings will be lost.");
    if (confirmClose) {
      navigate('/projects');
    }
  };

  const mappedData = getMappedData();

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Map Rent Roll Columns</h1>
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
        <ResizablePanel defaultSize={30} minSize={25} maxSize={40} className="border-r">
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
                  previewData={boundedData}
                />
              </TabsContent>
              
              <TabsContent value="row-filter">
                <RowFilter 
                  rowSelections={rowSelections}
                  toggleRowSelection={toggleRowSelection}
                  previewData={boundedData}
                />
              </TabsContent>
            </Tabs>
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Right Content Area */}
        <ResizablePanel defaultSize={70} className="flex flex-col overflow-hidden">
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
          
          {/* Footer Controls */}
          <div className="border-t p-4 flex justify-between items-center">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleStepChange(2)}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={handleNext}>
                Confirm Mapping
                <Check className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Mappings;
