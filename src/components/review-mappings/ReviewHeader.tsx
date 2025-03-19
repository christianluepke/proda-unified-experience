
import React from 'react';
import { X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
            Review attributes
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
            Confirm mappings
          </Button>
        </div>
      </div>
    </>
  );
};

export default ReviewHeader;
