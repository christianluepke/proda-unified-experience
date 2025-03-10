
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { ArrowRight, Upload, ChevronDown, ChevronRight, Building2 } from 'lucide-react';
import { Project, Property } from '@/components/upload/models';
import { formatDistanceToNow } from 'date-fns';

interface ProjectListProps {
  projects: Project[];
  onSelectUpload: (projectId: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onSelectUpload }) => {
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});

  const toggleProjectExpansion = (projectId: string) => {
    setExpandedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  return (
    <div className="w-full border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[5%]"></TableHead>
            <TableHead className="w-[15%]">Property Name</TableHead>
            <TableHead className="w-[10%]">Asset Type</TableHead>
            <TableHead className="w-[20%]">Address</TableHead>
            <TableHead className="w-[10%]">Last Modified</TableHead>
            <TableHead className="w-[10%]">Modified By</TableHead>
            <TableHead className="w-[10%]">Date Added</TableHead>
            <TableHead className="w-[10%]">Created By</TableHead>
            <TableHead className="text-right w-[10%]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <React.Fragment key={project.id}>
              <TableRow>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-0 h-6 w-6" 
                    onClick={() => toggleProjectExpansion(project.id)}
                  >
                    {expandedProjects[project.id] ? 
                      <ChevronDown className="h-4 w-4" /> : 
                      <ChevronRight className="h-4 w-4" />}
                  </Button>
                </TableCell>
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
              
              {expandedProjects[project.id] && project.properties && project.properties.length > 0 && (
                project.properties.map(property => (
                  <TableRow key={property.id} className="bg-muted/30">
                    <TableCell></TableCell>
                    <TableCell className="pl-8 flex items-center">
                      <Building2 className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                      <span className="text-sm">{property.name}</span>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-sm">
                      {property.streetNo} {property.streetName}, {property.city}, {property.state} {property.zip}
                    </TableCell>
                    <TableCell colSpan={5} className="text-right">
                      <Button variant="ghost" size="sm">
                        Details <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}

              {expandedProjects[project.id] && (!project.properties || project.properties.length === 0) && (
                <TableRow className="bg-muted/30">
                  <TableCell colSpan={9} className="text-center py-3 text-sm text-muted-foreground italic">
                    No properties found for this project
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectList;
