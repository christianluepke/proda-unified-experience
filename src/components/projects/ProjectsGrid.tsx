
import React from 'react';
import { Project } from '@/components/upload/models';
import ProjectCard from './ProjectCard';

interface ProjectsGridProps {
  projects: Project[];
  onSelectUpload: (projectId: string) => void;
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects, onSelectUpload }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          onSelectUpload={onSelectUpload} 
        />
      ))}
    </div>
  );
};

export default ProjectsGrid;
