
import React from 'react';

interface Project {
  id: string;
  name: string;
}

interface ProjectSelectorProps {
  projects: Project[];
  selectedProject: string | null;
  onChange: (projectId: string) => void;
  label: string;
  description: string;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  projects,
  selectedProject,
  onChange,
  label,
  description,
}) => {
  return (
    <div>
      <h2 className="text-lg font-medium mb-3">{label}</h2>
      <p className="text-sm text-muted-foreground mb-3">
        {description}
      </p>
      <select
        id="project"
        className="w-full pl-3 pr-10 py-2 text-base border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
        defaultValue=""
        onChange={(e) => onChange(e.target.value)}
        value={selectedProject || ""}
      >
        <option value="" disabled>Select a default project</option>
        {projects.map(project => (
          <option key={project.id} value={project.id}>{project.name}</option>
        ))}
      </select>
    </div>
  );
};

export default ProjectSelector;
