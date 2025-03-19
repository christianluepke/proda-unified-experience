
import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

import MappingsHeader from '@/components/mappings/MappingsHeader';
import MappingsSidebar from '@/components/mappings/MappingsSidebar';
import MappingsContent from '@/components/mappings/MappingsContent';
import MappingsFooter from '@/components/mappings/MappingsFooter';
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
      <MappingsHeader 
        activeStep={activeStep} 
        handleStepChange={handleStepChange} 
        handleCloseDialog={handleCloseDialog} 
      />

      <ResizablePanelGroup direction="horizontal" className="flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <ResizablePanel defaultSize={30} minSize={25} maxSize={40} className="border-r">
          <MappingsSidebar 
            columnMappings={columnMappings}
            rowSelections={rowSelections}
            updateColumnMapping={updateColumnMapping}
            toggleRowSelection={toggleRowSelection}
            previewData={boundedData}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Right Content Area */}
        <ResizablePanel defaultSize={70} className="flex flex-col overflow-hidden">
          <MappingsContent 
            mappedData={mappedData}
            columnMappings={columnMappings}
          />
          
          <MappingsFooter 
            handleCancel={handleCancel}
            handleStepChange={handleStepChange}
            handleNext={handleNext}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Mappings;
