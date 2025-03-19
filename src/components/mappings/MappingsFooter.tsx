
import React from 'react';
import { ChevronLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MappingsFooterProps {
  handleCancel: () => void;
  handleStepChange: (step: number) => void;
  handleNext: () => void;
}

const MappingsFooter: React.FC<MappingsFooterProps> = ({ 
  handleCancel,
  handleStepChange,
  handleNext
}) => {
  return (
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
  );
};

export default MappingsFooter;
