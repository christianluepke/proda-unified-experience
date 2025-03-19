
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface ProgressStepsProps {
  activeStep: number;
  handleStepChange: (step: number) => void;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ activeStep, handleStepChange }) => {
  return (
    <div className="flex items-center">
      <Button 
        variant="ghost" 
        className="text-sm px-2 py-1 h-auto"
        onClick={() => handleStepChange(1)}
      >
        <span className={`mr-2 inline-flex items-center justify-center rounded-full h-6 w-6 text-xs ${
          activeStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
        }`}>
          1
        </span>
        Select table
      </Button>
      <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
      <Button 
        variant="ghost" 
        className="text-sm px-2 py-1 h-auto"
        onClick={() => handleStepChange(2)}
      >
        <span className={`mr-2 inline-flex items-center justify-center rounded-full h-6 w-6 text-xs ${
          activeStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
        }`}>
          2
        </span>
        Adjust bounds
      </Button>
      <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
      <Button 
        variant="ghost" 
        className="text-sm px-2 py-1 h-auto"
        onClick={() => handleStepChange(3)}
      >
        <span className={`mr-2 inline-flex items-center justify-center rounded-full h-6 w-6 text-xs ${
          activeStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
        }`}>
          3
        </span>
        Map columns
      </Button>
    </div>
  );
};

export default ProgressSteps;
