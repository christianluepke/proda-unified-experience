
import React, { useState } from 'react';
import { Project } from './models';
import ProjectSelector from './ProjectSelector';
import PropertyList from './PropertyList';
import { Badge } from "@/components/ui/badge";

interface ProjectAssignmentWithPropertiesProps {
  file: File;
  projectId: string | null;
  projects: Project[];
  onFileProjectChange: (file: File, projectId: string | null) => void;
  onCreateProject: (name: string) => Project;
  required?: boolean;
}

const ProjectAssignmentWithProperties: React.FC<ProjectAssignmentWithPropertiesProps> = ({
  file,
  projectId,
  projects,
  onFileProjectChange,
  onCreateProject,
  required = false
}) => {
  const [isPropertiesExpanded, setIsPropertiesExpanded] = useState(false);

  const selectedProject = projectId 
    ? projects.find(project => project.id === projectId) 
    : null;

  const handleProjectChange = (newProjectId: string | null) => {
    onFileProjectChange(file, newProjectId);
  };

  // Extract filename for the badge
  const fileName = file.name.length > 20 
    ? file.name.substring(0, 20) + '...' 
    : file.name;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-1">
        <label className="text-sm font-medium">Project Assignment</label>
        <Badge variant="outline" className="text-xs bg-muted/40">
          For: {fileName}
        </Badge>
      </div>
      
      <ProjectSelector
        selectedProject={selectedProject}
        projectId={projectId}
        projects={projects}
        onSelectProject={handleProjectChange}
        onCreateProject={onCreateProject}
        required={required}
      />

      {/* Properties panel that's collapsed by default when a project is selected */}
      {selectedProject && selectedProject.properties && (
        <PropertyList
          properties={selectedProject.properties}
          isExpanded={isPropertiesExpanded}
          onToggleExpand={setIsPropertiesExpanded}
        />
      )}
    </div>
  );
};

export default ProjectAssignmentWithProperties;
