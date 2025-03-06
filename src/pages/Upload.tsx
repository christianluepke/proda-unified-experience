
import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { History, ChevronRight } from 'lucide-react';
import { UploadedFile, Project, FileType } from '@/components/upload/models';
import ProjectSelector from '@/components/upload/ProjectSelector';
import FileTypeSelector from '@/components/upload/FileTypeSelector';
import FileDropzone from '@/components/upload/FileDropzone';
import FileList from '@/components/upload/FileList';

const MOCK_PROJECTS: Project[] = [
  { id: '1', name: 'Project A' },
  { id: '2', name: 'Project B' },
  { id: '3', name: 'Project C' },
];

const FILE_TYPES: FileType[] = [
  { id: 'rent_roll', name: 'Rent Roll' },
  { id: 'operating_statement', name: 'Operating Statement' },
];

const Upload: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedFileType, setSelectedFileType] = useState<'rent_roll' | 'operating_statement' | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prevFiles => [
      ...prevFiles,
      ...acceptedFiles.map(file => ({
        file: file,
        progress: 0,
        status: 'uploading' as const,
        projectId: selectedProject,
        fileType: selectedFileType
      }))
    ]);

    acceptedFiles.forEach(file => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Simulate upload progress
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setFiles(prevFiles =>
            prevFiles.map(f =>
              f.file === file ? { ...f, progress: Math.min(progress, 100) } : f
            )
          );

          if (progress >= 100) {
            clearInterval(interval);
            setFiles(prevFiles =>
              prevFiles.map(f =>
                f.file === file ? { ...f, status: 'success' as const, progress: 100 } : f
              )
            );
            setTimeout(() => {
              setFiles(prevFiles =>
                prevFiles.map(f =>
                  f.file === file ? { ...f, progress: 0 } : f
                )
              );
            }, 2000);
          }
        }, 200);
      };
      reader.readAsArrayBuffer(file);
    });
  }, [selectedProject, selectedFileType]);

  const handleRemoveFile = (fileToRemove: File) => {
    setFiles(prevFiles => prevFiles.filter(file => file.file !== fileToRemove));
  };

  const handleProjectSelect = (projectId: string) => {
    setSelectedProject(projectId);
  };

  const handleFileTypeSelect = (fileType: string) => {
    setSelectedFileType(fileType as 'rent_roll' | 'operating_statement' | null);
  };

  const handleFileProjectChange = (file: File, projectId: string) => {
    setFiles(prevFiles => 
      prevFiles.map(f => 
        f.file === file ? { ...f, projectId } : f
      )
    );
  };

  const handleFileTypeChange = (file: File, fileType: 'rent_roll' | 'operating_statement') => {
    setFiles(prevFiles => 
      prevFiles.map(f => 
        f.file === file ? { ...f, fileType } : f
      )
    );
  };

  const startUpload = () => {
    // Check if all files have project assignments and file types
    const hasUnassignedFiles = files.some(file => !file.projectId || !file.fileType);
    
    if (hasUnassignedFiles) {
      alert("Please assign a project and file type to all files");
      return;
    }
    
    // Pretend to start the upload
    console.log("Starting upload for all files");
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Upload Files</h1>
        <Link to="/previous-uploads">
          <Button variant="outline" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            View Previous Uploads
          </Button>
        </Link>
      </div>

      <div className="grid gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProjectSelector 
            projects={MOCK_PROJECTS}
            selectedProject={selectedProject}
            onChange={handleProjectSelect}
            label="1a. Select Project (Optional)"
            description="You can set a default project for all files or assign projects individually later."
          />
          
          <FileTypeSelector 
            fileTypes={FILE_TYPES}
            selectedFileType={selectedFileType}
            onChange={handleFileTypeSelect}
            label="1b. Select File Type (Optional)"
            description="You can set a default file type for all files or assign types individually later."
          />
        </div>
        
        <FileDropzone onDrop={onDrop} />

        <FileList 
          files={files}
          projects={MOCK_PROJECTS}
          fileTypes={FILE_TYPES}
          onRemoveFile={handleRemoveFile}
          onFileProjectChange={handleFileProjectChange}
          onFileTypeChange={handleFileTypeChange}
          onStartUpload={startUpload}
        />
      </div>
    </div>
  );
};

export default Upload;
