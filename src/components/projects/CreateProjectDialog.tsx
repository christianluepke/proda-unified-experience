
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { Project, PropertyData } from '@/components/upload/models';
import { useToast } from '@/components/ui/use-toast';
import ProjectInfoForm from './ProjectInfoForm';
import PropertyDetailsForm from './PropertyDetailsForm';

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
          <ProjectInfoForm 
            projectName={projectName}
            projectDescription={projectDescription}
            onInputChange={handleInputChange}
          />
        ) : (
          <PropertyDetailsForm 
            propertyData={propertyData}
            onInputChange={handleInputChange}
          />
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
