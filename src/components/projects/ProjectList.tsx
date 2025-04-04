
import React from 'react';
import { Table, TableBody } from "@/components/ui/table";
import { Project } from '@/components/upload/models';
import { useNavigate } from 'react-router-dom';
import ProjectTableHeader from './ProjectTableHeader';
import ProjectRow from './ProjectRow';

interface ProjectListProps {
  projects: Project[];
  onSelectUpload: (projectId: string) => void;
  selectedDatabases?: { id: string, name: string }[];
  updateProject?: (projectId: string, fields: Partial<Project>) => void;
  databaseUsers?: string[];
}

const ProjectList: React.FC<ProjectListProps> = ({ 
  projects, 
  onSelectUpload, 
  updateProject,
  databaseUsers = []
}) => {
  const navigate = useNavigate();
  
  const viewProject = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };
  
  return (
    <div className="w-full border rounded-md overflow-auto">
      <Table>
        <ProjectTableHeader />
        <TableBody>
          {projects.map((project) => (
            <ProjectRow 
              key={project.id}
              project={project}
              onSelectUpload={onSelectUpload}
              viewProject={viewProject}
              updateProject={updateProject}
              databaseUsers={databaseUsers}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectList;
