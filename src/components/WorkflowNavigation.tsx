
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { ChevronRight, Home, Upload, FileSpreadsheet, Table2, Columns } from 'lucide-react';
import { RENT_ROLL_WORKFLOW, OPERATING_STATEMENT_WORKFLOW, WorkflowStep } from './workflow/WorkflowSteps';

interface WorkflowNavigationProps {
  className?: string;
}

const WorkflowNavigation: React.FC<WorkflowNavigationProps> = ({ className }) => {
  const location = useLocation();
  const path = location.pathname;
  
  // Determine if we're in a workflow and which one
  const isSelectTable = path.includes('/select-table/');
  const isMappings = path.includes('/mappings/');
  const isReview = path.includes('/review/');
  
  // If not in a workflow, don't render the breadcrumbs
  if (!isSelectTable && !isMappings && !isReview) return null;
  
  // Get the document ID from the path
  const documentId = path.split('/').pop() || '';
  
  // Determine the workflow type and current step
  const isOperatingStatement = isReview && documentId.startsWith('os-');
  const isRentRoll = (isSelectTable || isMappings) || (isReview && documentId.startsWith('rr-'));
  
  // Determine the current step in the workflow
  let currentStep = 0;
  let workflow: WorkflowStep[] = [];
  
  if (isRentRoll) {
    workflow = RENT_ROLL_WORKFLOW;
    if (isSelectTable) {
      // Determine if we're on step 1 or 2 based on state
      // For breadcrumbs, we'll just show the highest level (Select Table)
      currentStep = 1;
    } else if (isMappings) {
      currentStep = 3;
    } else if (isReview) {
      currentStep = 4;
    }
  } else if (isOperatingStatement) {
    workflow = OPERATING_STATEMENT_WORKFLOW;
    // For breadcrumbs, we'll just show the highest level (Review)
    currentStep = 1;
  }
  
  // If we can't determine the workflow, don't render anything
  if (workflow.length === 0) return null;
  
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        <BreadcrumbSeparator />
        
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/upload">
              <Upload className="h-4 w-4 mr-1" />
              Upload
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        <BreadcrumbSeparator />
        
        {isRentRoll ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <FileSpreadsheet className="h-4 w-4 mr-1" />
                Rent Roll
              </BreadcrumbLink>
            </BreadcrumbItem>
            
            <BreadcrumbSeparator />
            
            {workflow.slice(0, currentStep + 1).map((step, index) => (
              <React.Fragment key={step.number}>
                {index > 0 && <BreadcrumbSeparator />}
                {index === currentStep ? (
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {getIconForStep(step.number)}
                      {step.label}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to={`/${step.route}/${documentId}`}>
                        {getIconForStep(step.number)}
                        {step.label}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                )}
              </React.Fragment>
            ))}
          </>
        ) : (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <FileSpreadsheet className="h-4 w-4 mr-1" />
                Operating Statement
              </BreadcrumbLink>
            </BreadcrumbItem>
            
            <BreadcrumbSeparator />
            
            <BreadcrumbItem>
              <BreadcrumbPage>
                Review
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

// Helper function to get icons for different steps
function getIconForStep(step: number): React.ReactNode {
  switch (step) {
    case 1:
      return <Table2 className="h-4 w-4 mr-1" />;
    case 2:
      return <Table2 className="h-4 w-4 mr-1" />;
    case 3:
      return <Columns className="h-4 w-4 mr-1" />;
    case 4:
      return <FileSpreadsheet className="h-4 w-4 mr-1" />;
    default:
      return null;
  }
}

export default WorkflowNavigation;
