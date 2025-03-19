
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProgressSteps from '@/components/mappings/ProgressSteps';

interface MappingsHeaderProps {
  activeStep: number;
  handleStepChange: (step: number) => void;
  handleCloseDialog: () => void;
}

const MappingsHeader: React.FC<MappingsHeaderProps> = ({ 
  activeStep, 
  handleStepChange, 
  handleCloseDialog 
}) => {
  return (
    <>
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
    </>
  );
};

export default MappingsHeader;
