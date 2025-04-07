
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Project } from '@/components/upload/models';

interface ProjectDetailsHeaderProps {
  project: Project;
}

const ProjectDetailsHeader: React.FC<ProjectDetailsHeaderProps> = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/projects')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{project.name}</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" className="flex items-center gap-2">
          <Pencil className="h-4 w-4" />
          Edit
        </Button>
        <Button variant="destructive" className="flex items-center gap-2">
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProjectDetailsHeader;
