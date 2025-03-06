
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, FileSpreadsheet, Upload } from 'lucide-react';
import { Project } from '@/components/upload/models';

interface ProjectCardProps {
  project: Project;
  onSelectUpload: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelectUpload }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{project.name}</CardTitle>
        <CardDescription className="truncate">
          {project.description || `Project ID: ${project.id}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <FileText className="mr-1 h-4 w-4 text-primary/70" />
            <span>Rent Rolls: 0</span>
          </div>
          <div className="flex items-center">
            <FileSpreadsheet className="mr-1 h-4 w-4 text-primary/70" />
            <span>Op Statements: 0</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-3 border-t">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onSelectUpload(project.id)}
        >
          <Upload className="mr-2 h-3 w-3" /> 
          Upload
        </Button>
        <Button variant="ghost" size="sm">
          View Details <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
