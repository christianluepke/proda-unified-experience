
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WorkflowSteps, { OPERATING_STATEMENT_WORKFLOW } from '@/components/workflow/WorkflowSteps';

interface ReviewHeaderProps {
  propertyName: string;
  activeStep: number;
  handleStepChange: (step: number) => void;
  handleCloseDialog: () => void;
}

const ReviewHeader: React.FC<ReviewHeaderProps> = ({
  propertyName,
  activeStep,
  handleStepChange,
  handleCloseDialog
}) => {
  return (
    <>
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">{propertyName} – Operating Statement</h1>
        <Button variant="ghost" size="icon" onClick={handleCloseDialog}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Progress Steps */}
      <div className="px-4 py-3 border-b">
        <WorkflowSteps 
          workflow={OPERATING_STATEMENT_WORKFLOW}
          activeStep={activeStep}
          handleStepChange={handleStepChange}
        />
      </div>
    </>
  );
};

export default ReviewHeader;
