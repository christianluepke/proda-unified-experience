
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { Project, PropertyData } from '@/components/upload/models';
import { useToast } from '@/components/ui/use-toast';

interface CreateProjectDialogProps {
  onCreateProject: (name: string, description: string) => Project;
}

const CreateProjectDialog: React.FC<CreateProjectDialogProps> = ({ onCreateProject }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [propertyData, setPropertyData] = useState<PropertyData>({
    address: '',
    city: '',
    state: '',
    zip: '',
    units: undefined,
    sqft: undefined
  });
  const { toast } = useToast();

  const handleNext = () => {
    if (!projectName.trim()) {
      toast({
        title: "Error",
        description: "Project name is required",
        variant: "destructive"
      });
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleCreate = () => {
    const newProject = onCreateProject(projectName, projectDescription);
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setProjectName('');
    setProjectDescription('');
    setPropertyData({
      address: '',
      city: '',
      state: '',
      zip: '',
      units: undefined,
      sqft: undefined
    });
    setStep(1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'projectName') {
      setProjectName(value);
    } else if (name === 'projectDescription') {
      setProjectDescription(value);
    } else {
      // Handle property data
      setPropertyData(prev => ({
        ...prev,
        [name]: name === 'units' || name === 'sqft' ? (value ? Number(value) : undefined) : value
      }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (!newOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === 1 ? "Create New Project" : "Property Details"}
          </DialogTitle>
          <DialogDescription>
            {step === 1 
              ? "Enter the basic information for your new project." 
              : "Add property details for this project (optional)."}
          </DialogDescription>
        </DialogHeader>
        
        {step === 1 ? (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="projectName" className="text-sm font-medium">
                Project Name <span className="text-destructive">*</span>
              </label>
              <Input
                id="projectName"
                name="projectName"
                value={projectName}
                onChange={handleInputChange}
                placeholder="Enter project name"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="projectDescription" className="text-sm font-medium">
                Project Description
              </label>
              <Textarea
                id="projectDescription"
                name="projectDescription"
                value={projectDescription}
                onChange={handleInputChange}
                placeholder="Enter project description"
                rows={3}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium">Address</label>
              <Input
                id="address"
                name="address"
                value={propertyData.address}
                onChange={handleInputChange}
                placeholder="Enter property address"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="city" className="text-sm font-medium">City</label>
                <Input
                  id="city"
                  name="city"
                  value={propertyData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="state" className="text-sm font-medium">State</label>
                <Input
                  id="state"
                  name="state"
                  value={propertyData.state}
                  onChange={handleInputChange}
                  placeholder="State"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="zip" className="text-sm font-medium">ZIP Code</label>
                <Input
                  id="zip"
                  name="zip"
                  value={propertyData.zip}
                  onChange={handleInputChange}
                  placeholder="ZIP Code"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="units" className="text-sm font-medium">Units</label>
                <Input
                  id="units"
                  name="units"
                  type="number"
                  value={propertyData.units || ''}
                  onChange={handleInputChange}
                  placeholder="Number of units"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="sqft" className="text-sm font-medium">Square Footage</label>
              <Input
                id="sqft"
                name="sqft"
                type="number"
                value={propertyData.sqft || ''}
                onChange={handleInputChange}
                placeholder="Total square footage"
              />
            </div>
          </div>
        )}
        
        <DialogFooter>
          {step === 2 && (
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="mr-auto"
            >
              Back
            </Button>
          )}
          
          {step === 1 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleCreate}>Create Project</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;
