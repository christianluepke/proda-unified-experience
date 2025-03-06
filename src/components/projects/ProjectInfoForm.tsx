
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ProjectInfoFormProps {
  projectName: string;
  projectDescription: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ProjectInfoForm: React.FC<ProjectInfoFormProps> = ({ 
  projectName, 
  projectDescription, 
  onInputChange 
}) => {
  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <label htmlFor="projectName" className="text-sm font-medium">
          Project Name <span className="text-destructive">*</span>
        </label>
        <Input
          id="projectName"
          name="projectName"
          value={projectName}
          onChange={onInputChange}
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
          onChange={onInputChange}
          placeholder="Enter project description"
          rows={3}
        />
      </div>
    </div>
  );
};

export default ProjectInfoForm;
