
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Project } from '@/components/upload/models';

interface UploadProjectSelectorProps {
  projects: Project[];
  selectedProject: string | null;
  setSelectedProject: (projectId: string | null) => void;
}

const UploadProjectSelector: React.FC<UploadProjectSelectorProps> = ({
  projects,
  selectedProject,
  setSelectedProject,
}) => {
  const clearProjectSelection = () => {
    setSelectedProject(null);
  };

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Project</h4>
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <select 
            className="w-full p-2 border rounded-md"
            value={selectedProject || ''}
            onChange={(e) => setSelectedProject(e.target.value || null)}
          >
            <option value="">Select a project</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        
        {selectedProject && (
          <Button
            variant="outline" 
            size="icon"
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={clearProjectSelection}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default UploadProjectSelector;
