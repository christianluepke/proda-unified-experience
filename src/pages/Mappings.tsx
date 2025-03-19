
import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

import MappingsHeader from '@/components/mappings/MappingsHeader';
import MappingsContent from '@/components/mappings/MappingsContent';
import MappingsFooter from '@/components/mappings/MappingsFooter';
import { useMappings } from '@/hooks/useMappings';
import { mockRentRollData } from '@/components/table-selector/mockData';

const Mappings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(3);
  
  const tableBounds = location.state?.tableBounds || { 
    startRow: 1, 
    endRow: mockRentRollData.length - 1,
    startCol: 1,
    endCol: mockRentRollData[0].length - 1
  };
  
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
      navigate(`/select-table/${id}`);
    } else if (step === 2) {
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
    
    const mappedFields = columnMappings
      .filter(mapping => mapping.standardField)
      .map(mapping => mapping.standardField);
    
    const missingRequiredFields = requiredFields.filter(
      field => !mappedFields.includes(field as any)
    );
    
    if (missingRequiredFields.length > 3) {
      if (confirm("Some important fields like Unit ID, Tenant Name, or Rent values appear to be unmapped. Do you want to continue anyway?")) {
        toast({
          title: "Mappings Saved",
          description: "Your column mappings and row filters have been applied.",
        });
        const reviewId = `rr-review-${id.replace('rr-', '')}`;
        navigate(`/review/${reviewId}`);
      }
    } else {
      toast({
        title: "Mappings Saved",
        description: "Your column mappings and row filters have been applied.",
      });
      const reviewId = `rr-review-${id.replace('rr-', '')}`;
      navigate(`/review/${reviewId}`);
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

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <MappingsContent 
            mappedData={mappedData}
            columnMappings={columnMappings}
            rowSelections={rowSelections}
            updateColumnMapping={updateColumnMapping}
            toggleRowSelection={toggleRowSelection}
            previewData={boundedData}
            activeTab="" // This prop is no longer needed but kept for compatibility
          />
        </div>
        
        <MappingsFooter 
          handleCancel={handleCancel}
          handleStepChange={handleStepChange}
          handleNext={handleNext}
        />
      </div>
    </div>
  );
};

export default Mappings;
