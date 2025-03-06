
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { ArrowRight, Upload } from 'lucide-react';
import { Project } from '@/components/upload/models';

interface ProjectListProps {
  projects: Project[];
  onSelectUpload: (projectId: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onSelectUpload }) => {
  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">Project Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Documents</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.name}</TableCell>
              <TableCell>
                {project.description || <span className="text-muted-foreground italic">No description</span>}
              </TableCell>
              <TableCell>
                <div className="text-sm text-muted-foreground">
                  <span className="mr-4">Rent Rolls: 0</span>
                  <span>Op Statements: 0</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onSelectUpload(project.id)}
                  >
                    <Upload className="mr-2 h-3 w-3" /> 
                    Upload
                  </Button>
                  <Button variant="ghost" size="sm">
                    View <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectList;
