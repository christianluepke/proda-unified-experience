import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useProjects } from '@/hooks/useProjects';
import { useFileUpload } from '@/hooks/useFileUpload';
import { toast } from "@/components/ui/use-toast";
import ProjectList from '@/components/projects/ProjectList';
import ProjectsGrid from '@/components/projects/ProjectsGrid';
import CreateProjectDialog from '@/components/projects/CreateProjectDialog';
import ViewSelector from '@/components/projects/ViewSelector';
import UploadToProjectDialog from '@/components/projects/UploadToProjectDialog';

const Projects: React.FC = () => {
  const { projects, createProject, viewMode, setViewMode } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

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

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        
        <div className="flex items-center space-x-3">
          <ViewSelector viewMode={viewMode} setViewMode={setViewMode} />
          
          <CreateProjectDialog onCreateProject={createProject} />
          
          <UploadToProjectDialog
            projects={projects}
            selectedProject={selectedProject}
            onUpload={handleUpload}
            files={files}
            onDrop={onDrop}
            handleRemoveFile={handleRemoveFile}
          />
        </div>
      </div>

      <div className="relative mb-6">
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

      {filteredProjects.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No projects found</p>
        </div>
      ) : viewMode === 'list' ? (
        <ProjectList 
          projects={filteredProjects}
          onSelectUpload={openUploadForProject}
        />
      ) : (
        <ProjectsGrid
          projects={filteredProjects}
          onSelectUpload={openUploadForProject}
        />
      )}
    </div>
  );
};

export default Projects;
