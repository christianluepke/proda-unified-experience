
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Upload, ExternalLink, Check, ChevronDown, Edit } from 'lucide-react';
import { Project } from '@/components/upload/models';
import { formatDistanceToNow } from 'date-fns';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

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
  selectedDatabases = [],
  updateProject,
  databaseUsers = []
}) => {
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingUnits, setEditingUnits] = useState<number>(0);
  
  const handleEditUnits = (project: Project) => {
    setEditingProjectId(project.id);
    setEditingUnits(project.numberOfUnits || 0);
  };

  const handleSaveUnits = (projectId: string) => {
    if (updateProject) {
      updateProject(projectId, { numberOfUnits: editingUnits });
    }
    setEditingProjectId(null);
  };

  const handleStatusChange = (projectId: string, status: string) => {
    if (updateProject) {
      updateProject(projectId, { status: status as Project['status'] });
    }
  };

  const handleOwnerChange = (projectId: string, owner: string) => {
    if (updateProject) {
      updateProject(projectId, { projectOwner: owner });
    }
  };
  
  return (
    <div className="w-full border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[15%]">Project Name</TableHead>
            <TableHead className="w-[8%]">Property Count</TableHead>
            <TableHead className="w-[10%]">Portfolio</TableHead>
            <TableHead className="w-[10%]">Asset Class</TableHead>
            <TableHead className="w-[8%]">Total Units</TableHead>
            <TableHead className="w-[10%]">Status</TableHead>
            <TableHead className="w-[10%]">Date Added</TableHead>
            <TableHead className="w-[10%]">Created By</TableHead>
            <TableHead className="w-[13%]">Project Owner</TableHead>
            <TableHead className="w-[6%]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id} className="hover:bg-muted/30">
              <TableCell className="font-medium">{project.name}</TableCell>
              <TableCell>{project.properties.length}</TableCell>
              <TableCell>{project.portfolioName || <span className="text-muted-foreground italic">Not set</span>}</TableCell>
              <TableCell>{project.assetType || <span className="text-muted-foreground italic">Not specified</span>}</TableCell>
              <TableCell>
                {editingProjectId === project.id ? (
                  <div className="flex gap-1">
                    <Input 
                      type="number" 
                      value={editingUnits}
                      onChange={(e) => setEditingUnits(parseInt(e.target.value) || 0)}
                      className="w-20 h-8 px-2 py-1"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8" 
                      onClick={() => handleSaveUnits(project.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <span>{project.numberOfUnits || 0}</span>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-6 w-6 opacity-50 hover:opacity-100" 
                      onClick={() => handleEditUnits(project)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </TableCell>
              <TableCell>
                <Select 
                  value={project.status || 'New'} 
                  onValueChange={(value) => handleStatusChange(project.id, value)}
                >
                  <SelectTrigger className="h-8 w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                    <SelectItem value="Sold">Sold</SelectItem>
                    <SelectItem value="Lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                {project.createdAt 
                  ? formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })
                  : <span className="text-muted-foreground italic">Unknown</span>}
              </TableCell>
              <TableCell>{project.createdBy || <span className="text-muted-foreground italic">-</span>}</TableCell>
              <TableCell>
                <Select 
                  value={project.projectOwner || ''} 
                  onValueChange={(value) => handleOwnerChange(project.id, value)}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Select owner" />
                  </SelectTrigger>
                  <SelectContent>
                    {databaseUsers.map(user => (
                      <SelectItem key={user} value={user}>{user}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectList;
