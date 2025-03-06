
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Plus, Search } from 'lucide-react';
import { Project } from './models';

interface ProjectAssignmentProps {
  file: File;
  projectId: string | null;
  projects: Project[];
  onFileProjectChange: (file: File, projectId: string) => void;
  onCreateProject: (name: string) => void;
}

const ProjectAssignment: React.FC<ProjectAssignmentProps> = ({
  file,
  projectId,
  projects,
  onFileProjectChange,
  onCreateProject
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isCreatingProject, setIsCreatingProject] = useState<boolean>(false);
  const [newProjectName, setNewProjectName] = useState<string>('');

  const filteredProjects = searchTerm 
    ? projects.filter(project => 
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : projects;

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      onCreateProject(newProjectName.trim());
      setNewProjectName('');
      setIsCreatingProject(false);
    }
  };

  const toggleCreateProject = () => {
    setIsCreatingProject(!isCreatingProject);
    setNewProjectName('');
  };

  return (
    <div>
      <label className="text-sm font-medium mb-1.5 block">Project</label>
      
      {isCreatingProject ? (
        <div className="space-y-2">
          <Input
            placeholder="Enter new project name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            className="text-sm"
          />
          <div className="flex gap-2">
            <Button 
              size="sm" 
              onClick={handleCreateProject}
              disabled={!newProjectName.trim()}
            >
              Create
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={toggleCreateProject}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              className="pl-10 text-sm"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="max-h-40 overflow-y-auto border rounded-md bg-background">
            <select
              className="w-full text-sm border-0 bg-transparent rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary min-h-[100px]"
              value={projectId || ""}
              onChange={(e) => onFileProjectChange(file, e.target.value)}
              size={Math.min(5, filteredProjects.length + 1)}
            >
              <option value="" disabled>Select project</option>
              {filteredProjects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
          </div>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="w-full flex items-center justify-center"
            onClick={toggleCreateProject}
          >
            <Plus className="mr-1 h-4 w-4" /> Create New Project
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectAssignment;
