
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import WorkflowSteps, { RENT_ROLL_WORKFLOW } from '@/components/workflow/WorkflowSteps';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

const MapProperties = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const handleStepChange = (step: number) => {
    if (step === 1) {
      navigate(`/select-table/${id}`);
    } else if (step === 2) {
      navigate(`/select-table/${id}`, { state: { activeStep: 2 } });
    } else if (step === 3) {
      navigate(`/mappings/${id}`);
    } else if (step === 5) {
      navigate(`/rentroll-review/${id}`);
    }
  };

  const handleNext = () => {
    navigate(`/rentroll-review/${id}`);
  };

  const handleBack = () => {
    navigate(`/mappings/${id}`);
  };

  const handleCloseDialog = () => {
    const confirmClose = window.confirm("Are you sure you want to close? Any unsaved changes will be lost.");
    if (confirmClose) {
      navigate('/projects');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Map Properties</h1>
        <Button variant="ghost" size="icon" onClick={handleCloseDialog}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Progress Steps */}
      <div className="px-4 py-3 border-b">
        <WorkflowSteps 
          workflow={RENT_ROLL_WORKFLOW}
          activeStep={4}
          handleStepChange={handleStepChange}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Dummy page</h2>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-4 flex justify-between items-center">
        <Button variant="outline" onClick={handleBack}>
          Back
        </Button>
        <Button onClick={handleNext}>
          Next
          <Check className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MapProperties;
