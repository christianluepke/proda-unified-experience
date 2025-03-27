
import React, { useState } from 'react';
import { Search, Group, ListTree } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useProjects } from '@/hooks/useProjects';
import { useFileUpload } from '@/hooks/useFileUpload';
import { toast } from "@/components/ui/use-toast";
import ProjectList from '@/components/projects/ProjectList';
import CreateProjectDialog from '@/components/projects/CreateProjectDialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Project } from '@/components/upload/models';
import { Button } from '@/components/ui/button';

// Mock selected databases from the Header component
const mockSelectedDatabases = [
  { id: 'db1', name: 'Main Database' }
];

// Modified to use "none" instead of empty string for "No grouping"
type GroupByField = 'none' | 'portfolioName' | 'assetType' | 'status' | 'createdBy' | 'projectOwner';

const Projects: React.FC = () => {
  const { projects, createProject, updateProject, getDatabaseUsers } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [groupBy, setGroupBy] = useState<GroupByField>('none');
  const databaseUsers = getDatabaseUsers();

  const { 
    files, 
    onDrop, 
    handleRemoveFile,
    handleFileProjectChange,
    handleFileTypeChange,
    startUpload
  } = useFileUpload();

  const filteredProjects = searchTerm 
    ? projects.filter(project => 
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : projects;

  const handleUpload = (projectId: string, fileType: 'rent_roll' | 'operating_statement') => {
    // Set project and file type for all files
    files.forEach(fileObj => {
      handleFileProjectChange(fileObj.file, projectId);
      handleFileTypeChange(fileObj.file, fileType);
      
      // Start the upload for each file
      startUpload(fileObj.file);
    });
  };

  const openUploadForProject = (projectId: string) => {
    setSelectedProject(projectId);
  };

  // Function to group projects based on the selected field
  const getGroupedProjects = (projects: Project[], groupBy: GroupByField) => {
    if (groupBy === 'none') return null;

    const groups: Record<string, Project[]> = {};
    
    projects.forEach(project => {
      const groupValue = project[groupBy] as string || 'Not specified';
      if (!groups[groupValue]) {
        groups[groupValue] = [];
      }
      groups[groupValue].push(project);
    });
    
    return groups;
  };

  // Get grouped projects if groupBy is selected
  const groupedProjects = getGroupedProjects(filteredProjects, groupBy);

  return (
    <div className="w-full max-w-[95%] 2xl:max-w-[90%] mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        
        <div className="flex items-center space-x-3">
          <div className="relative w-48">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              className="pl-10"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <ListTree className="h-4 w-4 text-muted-foreground" />
            <Select value={groupBy} onValueChange={(value) => setGroupBy(value as GroupByField)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Group by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No grouping</SelectItem>
                <SelectItem value="portfolioName">Portfolio</SelectItem>
                <SelectItem value="assetType">Asset Class</SelectItem>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="createdBy">Created By</SelectItem>
                <SelectItem value="projectOwner">Project Owner</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <CreateProjectDialog onCreateProject={createProject} />
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No projects found</p>
        </div>
      ) : groupedProjects ? (
        // Render grouped projects
        <div className="space-y-8">
          {Object.entries(groupedProjects).map(([groupName, groupProjects]) => (
            <div key={groupName} className="space-y-4">
              <div className="flex items-center gap-2">
                <Group className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold">{groupName}</h2>
                <span className="text-sm text-muted-foreground">({groupProjects.length} projects)</span>
              </div>
              <ProjectList 
                projects={groupProjects}
                onSelectUpload={openUploadForProject}
                selectedDatabases={mockSelectedDatabases}
                updateProject={updateProject}
                databaseUsers={databaseUsers}
              />
            </div>
          ))}
        </div>
      ) : (
        // Render ungrouped projects (default view)
        <ProjectList 
          projects={filteredProjects}
          onSelectUpload={openUploadForProject}
          selectedDatabases={mockSelectedDatabases}
          updateProject={updateProject}
          databaseUsers={databaseUsers}
        />
      )}
    </div>
  );
};

export default Projects;
