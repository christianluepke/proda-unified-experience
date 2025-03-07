
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { ArrowRight, Upload } from 'lucide-react';
import { Project } from '@/components/upload/models';
import { formatDistanceToNow } from 'date-fns';

interface ProjectListProps {
  projects: Project[];
  onSelectUpload: (projectId: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onSelectUpload }) => {
  return (
    <div className="w-full border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[15%]">Property Name</TableHead>
            <TableHead className="w-[10%]">Asset Type</TableHead>
            <TableHead className="w-[20%]">Address</TableHead>
            <TableHead className="w-[10%]">Last Modified</TableHead>
            <TableHead className="w-[10%]">Modified By</TableHead>
            <TableHead className="w-[10%]">Date Added</TableHead>
            <TableHead className="w-[10%]">Created By</TableHead>
            <TableHead className="text-right w-[15%]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.name}</TableCell>
              <TableCell>{project.assetType || <span className="text-muted-foreground italic">Not specified</span>}</TableCell>
              <TableCell>{project.address || <span className="text-muted-foreground italic">No address</span>}</TableCell>
              <TableCell>
                {project.modifiedAt 
                  ? formatDistanceToNow(new Date(project.modifiedAt), { addSuffix: true })
                  : <span className="text-muted-foreground italic">Never</span>}
              </TableCell>
              <TableCell>{project.modifiedBy || <span className="text-muted-foreground italic">-</span>}</TableCell>
              <TableCell>
                {project.createdAt 
                  ? formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })
                  : <span className="text-muted-foreground italic">Unknown</span>}
              </TableCell>
              <TableCell>{project.createdBy || <span className="text-muted-foreground italic">-</span>}</TableCell>
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
