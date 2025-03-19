
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export type WorkflowStep = {
  number: number;
  label: string;
  route?: string;
};

export const RENT_ROLL_WORKFLOW: WorkflowStep[] = [
  { number: 1, label: 'Select Table', route: 'select-table' },
  { number: 2, label: 'Adjust Bounds', route: 'select-table' },
  { number: 3, label: 'Map Columns', route: 'mappings' },
  { number: 4, label: 'Map Properties', route: 'map-properties' },
  { number: 5, label: 'Review', route: 'rentroll-review' },
];

export const OPERATING_STATEMENT_WORKFLOW: WorkflowStep[] = [
  { number: 1, label: 'Review Attributes', route: 'review' },
  { number: 2, label: 'Confirm Mappings', route: 'review' },
];

interface WorkflowStepsProps {
  workflow: WorkflowStep[];
  activeStep: number;
  handleStepChange?: (step: number) => void;
  baseDocumentId?: string;
  readOnly?: boolean;
}

const WorkflowSteps: React.FC<WorkflowStepsProps> = ({
  workflow,
  activeStep,
  handleStepChange,
  baseDocumentId,
  readOnly = false
}) => {
  return (
    <div className="flex items-center overflow-x-auto px-1 py-2">
      {workflow.map((step, index) => (
        <React.Fragment key={step.number}>
          {index > 0 && (
            <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground flex-shrink-0" />
          )}
          <Button 
            variant="ghost" 
            className="text-sm px-2 py-1 h-auto whitespace-nowrap flex-shrink-0"
            onClick={() => !readOnly && handleStepChange && handleStepChange(step.number)}
            disabled={readOnly || step.number > activeStep}
          >
            <span className={`mr-2 inline-flex items-center justify-center rounded-full h-6 w-6 text-xs ${
              activeStep >= step.number ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              {step.number}
            </span>
            {step.label}
          </Button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default WorkflowSteps;
