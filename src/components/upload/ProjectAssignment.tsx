
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Plus, Search, ChevronDown } from 'lucide-react';
import { Project } from './models';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ProjectAssignmentProps {
  file: File;
  projectId: string | null;
  projects: Project[];
  onFileProjectChange: (file: File, projectId: string) => void;
  onCreateProject: (name: string) => Project;
  required?: boolean;
}

const ProjectAssignment: React.FC<ProjectAssignmentProps> = ({
  file,
  projectId,
  projects,
  onFileProjectChange,
  onCreateProject,
  required = false
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isCreatingProject, setIsCreatingProject] = useState<boolean>(false);
  const [newProjectName, setNewProjectName] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const selectedProject = projectId 
    ? projects.find(project => project.id === projectId) 
    : null;

  const filteredProjects = searchTerm 
    ? projects.filter(project => 
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : projects;

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      const newProject = onCreateProject(newProjectName.trim());
      onFileProjectChange(file, newProject.id);
      setNewProjectName('');
      setIsCreatingProject(false);
      setIsOpen(false);
    }
  };

  const toggleCreateProject = () => {
    setIsCreatingProject(!isCreatingProject);
    setNewProjectName('');
  };

  return (
    <div>
      <label className="text-sm font-medium mb-1 block">
        Project {required && <span className="text-red-500">*</span>}
        {!required && <span className="text-muted-foreground text-xs ml-1">(optional for rent rolls)</span>}
      </label>
      
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full justify-between font-normal"
            role="combobox"
          >
            {selectedProject ? selectedProject.name : "Select project"}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-0">
          <div className="p-2">
            <div className="relative mb-2">
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
                    className="w-full"
                  >
                    Create
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={toggleCreateProject}
                    className="w-full"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="max-h-[200px] overflow-y-auto">
                  {filteredProjects.length > 0 ? (
                    <div className="py-1">
                      {filteredProjects.map(project => (
                        <div
                          key={project.id}
                          className={`px-2 py-1.5 text-sm rounded cursor-pointer hover:bg-muted ${
                            project.id === projectId ? 'bg-muted' : ''
                          }`}
                          onClick={() => {
                            onFileProjectChange(file, project.id);
                            setIsOpen(false);
                          }}
                        >
                          {project.name}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-6 text-center text-sm text-muted-foreground">
                      No projects found
                    </div>
                  )}
                </div>
                <div className="p-1 border-t">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="w-full justify-start text-sm"
                    onClick={toggleCreateProject}
                  >
                    <Plus className="mr-2 h-4 w-4" /> 
                    Create New Project
                  </Button>
                </div>
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ProjectAssignment;
