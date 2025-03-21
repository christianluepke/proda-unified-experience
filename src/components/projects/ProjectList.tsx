
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Upload, ExternalLink } from 'lucide-react';
import { Project } from '@/components/upload/models';
import { formatDistanceToNow } from 'date-fns';

interface ProjectListProps {
  projects: Project[];
  onSelectUpload: (projectId: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onSelectUpload }) => {
  // Check if we have more than one database
  const databases = [...new Set(projects.map(project => project.database))].filter(Boolean);
  const showDatabaseColumn = databases.length > 1;

  return (
    <div className="w-full border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[5%]">ID</TableHead>
            <TableHead className="w-[15%]">Project Name</TableHead>
            {showDatabaseColumn && <TableHead className="w-[15%]">Company & Database</TableHead>}
            <TableHead className="w-[10%]">Property Type</TableHead>
            <TableHead className="w-[15%]">Property Name</TableHead>
            <TableHead className="w-[15%]">Property Address</TableHead>
            <TableHead className="w-[10%]">Last Modified At</TableHead>
            <TableHead className="w-[10%]">Last Modified By</TableHead>
            <TableHead className="w-[10%]">Date Added</TableHead>
            <TableHead className="w-[10%]">Created By</TableHead>
            <TableHead className="w-[5%]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => {
            const hasMultipleProperties = project.properties.length > 1;
            
            return (
              <TableRow key={project.id} className="hover:bg-muted/30">
                <TableCell className="font-medium">{project.id}</TableCell>
                <TableCell className="font-medium">{project.name}</TableCell>
                {showDatabaseColumn && (
                  <TableCell>{project.database || <span className="text-muted-foreground italic">Not specified</span>}</TableCell>
                )}
                <TableCell>{project.assetType || <span className="text-muted-foreground italic">Not specified</span>}</TableCell>
                <TableCell>
                  {hasMultipleProperties 
                    ? <span>Multiple</span> 
                    : project.properties.length === 1 
                      ? project.properties[0].name 
                      : <span className="text-muted-foreground italic">No properties</span>}
                </TableCell>
                <TableCell>
                  {hasMultipleProperties 
                    ? <span>Multiple</span> 
                    : project.properties.length === 1 
                      ? `${project.properties[0].streetNo} ${project.properties[0].streetName}, ${project.properties[0].city}` 
                      : project.address || <span className="text-muted-foreground italic">No address</span>}
                </TableCell>
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
                <TableCell>
                  <div className="flex justify-end gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => onSelectUpload(project.id)}
                    >
                      <Upload className="h-4 w-4" /> 
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-7 w-7"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectList;
