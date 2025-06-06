
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { MappingMethod } from '@/lib/types';
import { useMockOperatingStatement } from '@/hooks/useMockOperatingStatement';

// Import the new components
import ReviewHeader from '@/components/review-mappings/ReviewHeader';
import AttributesReviewSidebar from '@/components/review-mappings/AttributesReviewSidebar';
import MappingsConfirmationSidebar from '@/components/review-mappings/MappingsConfirmationSidebar';
import StatementTable from '@/components/review-mappings/StatementTable';
import ReviewFooter from '@/components/review-mappings/ReviewFooter';

const ReviewMappings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { operatingStatement } = useMockOperatingStatement(id);
  
  // Operating statements use steps 1-2
  // Rent rolls (when coming from mapping step) will be on step 4
  const isRentRoll = id?.startsWith('rr-review');
  const [activeStep, setActiveStep] = useState(isRentRoll ? 4 : 1);
  
  const [mappingMethod, setMappingMethod] = useState<MappingMethod>('machine_learning');
  const [sourceDocument, setSourceDocument] = useState("T12 Income Statement - Mock 12.22.xlsx");
  
  if (!operatingStatement) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Loading...</h2>
          <p className="text-muted-foreground">Loading operating statement data...</p>
        </div>
      </div>
    );
  }

  const handleStepChange = (step: number) => {
    // For operating statements, we can switch between steps 1 and 2
    // For rent rolls (when in review), we're already at the final step (4)
    if (!isRentRoll || (isRentRoll && step <= 4)) {
      setActiveStep(step);
    }
  };

  const handleNext = () => {
    if (!isRentRoll && activeStep < 2) {
      setActiveStep(activeStep + 1);
    } else {
      // Workflow complete, navigation to projects
      toast({
        title: "Review Complete",
        description: isRentRoll 
          ? "Rent roll mappings have been saved."
          : "Operating statement mappings have been saved.",
      });
      navigate('/projects');
    }
  };

  const handleDiscard = () => {
    toast({
      title: "Changes Discarded",
      description: "Your changes have been discarded.",
      variant: "destructive",
    });
    navigate('/upload');
  };

  const handleCloseDialog = () => {
    const confirmClose = window.confirm("Are you sure you want to close? Any unsaved changes will be lost.");
    if (confirmClose) {
      navigate('/upload');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Header with Progress Steps */}
      <ReviewHeader 
        propertyName={operatingStatement.propertyName}
        activeStep={activeStep}
        handleStepChange={handleStepChange}
        handleCloseDialog={handleCloseDialog}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-80 border-r p-4 overflow-y-auto">
          {activeStep === 1 || (isRentRoll && activeStep === 4) ? (
            <AttributesReviewSidebar
              operatingStatement={operatingStatement}
              mappingMethod={mappingMethod}
              setMappingMethod={setMappingMethod}
              sourceDocument={sourceDocument}
              setSourceDocument={setSourceDocument}
            />
          ) : (
            <MappingsConfirmationSidebar 
              operatingStatement={operatingStatement}
            />
          )}
        </div>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto">
            <StatementTable operatingStatement={operatingStatement} />
          </div>
          
          {/* Footer Controls */}
          <ReviewFooter 
            activeStep={activeStep}
            handleDiscard={handleDiscard}
            handleNext={handleNext}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewMappings;
