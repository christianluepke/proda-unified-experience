
import React, { useState } from 'react';
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Upload, ExternalLink, Check, Edit } from 'lucide-react';
import { Project } from '@/components/upload/models';
import { formatDistanceToNow } from 'date-fns';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface ProjectRowProps {
  project: Project;
  onSelectUpload: (projectId: string) => void;
  viewProject: (projectId: string) => void;
  updateProject?: (projectId: string, fields: Partial<Project>) => void;
  databaseUsers?: string[];
}

const ProjectRow: React.FC<ProjectRowProps> = ({ 
  project, 
  onSelectUpload, 
  viewProject, 
  updateProject,
  databaseUsers = [] 
}) => {
  const [editingUnits, setEditingUnits] = useState<number>(0);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  const handleEditUnits = () => {
    setEditingProjectId(project.id);
    setEditingUnits(project.numberOfUnits || 0);
  };

  const handleSaveUnits = () => {
    if (updateProject) {
      updateProject(project.id, { numberOfUnits: editingUnits });
    }
    setEditingProjectId(null);
  };

  const handleStatusChange = (status: string) => {
    if (updateProject) {
      updateProject(project.id, { status: status as Project['status'] });
    }
  };

  const handleOwnerChange = (owner: string) => {
    if (updateProject) {
      updateProject(project.id, { projectOwner: owner });
    }
  };

  return (
    <TableRow className="hover:bg-muted/30">
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
              onClick={handleSaveUnits}
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
              onClick={handleEditUnits}
            >
              <Edit className="h-3 w-3" />
            </Button>
          </div>
        )}
      </TableCell>
      <TableCell>
        <Select 
          value={project.status || 'New'} 
          onValueChange={handleStatusChange}
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
          onValueChange={handleOwnerChange}
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
            title="Upload files"
          >
            <Upload className="h-4 w-4" /> 
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-7 w-7"
            onClick={() => viewProject(project.id)}
            title="View project details"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ProjectRow;
