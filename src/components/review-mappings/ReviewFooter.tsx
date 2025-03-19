
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReviewFooterProps {
  activeStep: number;
  handleDiscard: () => void;
  handleNext: () => void;
}

const ReviewFooter: React.FC<ReviewFooterProps> = ({
  activeStep,
  handleDiscard,
  handleNext
}) => {
  return (
    <div className="border-t p-4 flex justify-between items-center">
      <Button variant="outline" onClick={handleDiscard}>
        Discard
      </Button>
      <Button onClick={handleNext}>
        {activeStep < 2 ? 'Next' : 'Save Mappings'}
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default ReviewFooter;
