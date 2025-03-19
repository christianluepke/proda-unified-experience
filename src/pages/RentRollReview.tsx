
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { useMockOperatingStatement } from '@/hooks/useMockOperatingStatement';
import WorkflowSteps, { RENT_ROLL_WORKFLOW } from '@/components/workflow/WorkflowSteps';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

const RentRollReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // We're using the same mock data function but will display it differently
  const { operatingStatement } = useMockOperatingStatement(id);
  
  const handleStepChange = (step: number) => {
    if (step === 1) {
      navigate(`/select-table/${id}`);
    } else if (step === 2) {
      navigate(`/select-table/${id}`, { state: { activeStep: 2 } });
    } else if (step === 3) {
      navigate(`/mappings/${id}`);
    }
  };

  const handleComplete = () => {
    toast({
      title: "Process Complete",
      description: "Your rent roll has been successfully processed.",
    });
    navigate('/projects');
  };

  const handleBack = () => {
    navigate(`/mappings/${id}`);
  };

  const handleCloseDialog = () => {
    const confirmClose = window.confirm("Are you sure you want to close? Any unsaved changes will be lost.");
    if (confirmClose) {
      navigate('/projects');
    }
  };

  if (!operatingStatement) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Loading...</h2>
          <p className="text-muted-foreground">Loading rent roll data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Review Rent Roll</h1>
        <Button variant="ghost" size="icon" onClick={handleCloseDialog}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Progress Steps */}
      <div className="px-4 py-3 border-b">
        <WorkflowSteps 
          workflow={RENT_ROLL_WORKFLOW}
          activeStep={4}
          handleStepChange={handleStepChange}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Rent Roll Review</h2>
          
          <div className="bg-muted/20 border rounded-lg p-4 mb-6">
            <h3 className="font-medium text-lg mb-2">Mappings Summary</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Total Units</span>
                <span className="font-medium">24</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Occupied Units</span>
                <span className="font-medium">22</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Vacant Units</span>
                <span className="font-medium">2</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Total Monthly Rent</span>
                <span className="font-medium">$47,250</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Average Rent PSF</span>
                <span className="font-medium">$2.34</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Columns Mapped</span>
                <span className="font-medium">14 of 25</span>
              </li>
            </ul>
          </div>

          <div className="border rounded-lg overflow-hidden mb-8">
            <div className="bg-muted/30 p-3 font-medium">
              Mapped Fields Preview
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/10 border-b">
                    <th className="px-3 py-2 text-left text-sm font-medium">Standard Field</th>
                    <th className="px-3 py-2 text-left text-sm font-medium">Source Column</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-3 py-2 text-sm">Unit ID</td>
                    <td className="px-3 py-2 text-sm">Unit</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-3 py-2 text-sm">Unit Name</td>
                    <td className="px-3 py-2 text-sm">Unit</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-3 py-2 text-sm">Tenant Name</td>
                    <td className="px-3 py-2 text-sm">Tenant</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-3 py-2 text-sm">Lease ID</td>
                    <td className="px-3 py-2 text-sm">Lease #</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-3 py-2 text-sm">Contracted Rent</td>
                    <td className="px-3 py-2 text-sm">Monthly Rent</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-3 py-2 text-sm">Passing Rent</td>
                    <td className="px-3 py-2 text-sm">Current Rent</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-3 py-2 text-sm">Lease Start</td>
                    <td className="px-3 py-2 text-sm">Lease Start</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-3 py-2 text-sm">Lease End</td>
                    <td className="px-3 py-2 text-sm">Lease End</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-4 flex justify-between items-center">
        <Button variant="outline" onClick={handleBack}>
          Back to Mapping
        </Button>
        <Button onClick={handleComplete}>
          Complete
          <Check className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default RentRollReview;
