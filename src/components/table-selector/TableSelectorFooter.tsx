
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TableSelectorFooterProps {
  activeStep: number;
  handleCancel: () => void;
  handleNext: () => void;
  setActiveStep: (step: number) => void;
  isNextDisabled: boolean;
}

const TableSelectorFooter: React.FC<TableSelectorFooterProps> = ({ 
  activeStep,
  handleCancel, 
  handleNext,
  setActiveStep,
  isNextDisabled
}) => {
  return (
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
        <Button onClick={handleNext} disabled={isNextDisabled}>
          {activeStep < 2 ? 'Next' : 'Next: Map Columns'}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TableSelectorFooter;
