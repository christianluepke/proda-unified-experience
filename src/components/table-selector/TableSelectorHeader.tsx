
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WorkflowSteps, { RENT_ROLL_WORKFLOW } from '@/components/workflow/WorkflowSteps';

interface TableSelectorHeaderProps {
  activeStep: number;
  handleStepChange: (step: number) => void;
  handleCloseDialog: () => void;
}

const TableSelectorHeader: React.FC<TableSelectorHeaderProps> = ({ 
  activeStep, 
  handleStepChange, 
  handleCloseDialog 
}) => {
  return (
    <>
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Select Rent Roll Table</h1>
        <Button variant="ghost" size="icon" onClick={handleCloseDialog}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Progress Steps */}
      <div className="px-4 py-3 border-b">
        <WorkflowSteps 
          workflow={RENT_ROLL_WORKFLOW}
          activeStep={activeStep}
          handleStepChange={handleStepChange}
        />
      </div>
    </>
  );
};

export default TableSelectorHeader;
