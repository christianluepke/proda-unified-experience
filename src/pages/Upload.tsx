import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';
import { UploadedFile, Project, FileType } from '@/components/upload/models';
import FileDropzone from '@/components/upload/FileDropzone';
import FileList from '@/components/upload/FileList';
import { toast } from "@/components/ui/use-toast";

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
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prevFiles => [
      ...prevFiles,
      ...acceptedFiles.map(file => ({
        file: file,
        progress: 0,
        status: 'uploading' as const,
        projectId: null,
        fileType: null
      }))
    ]);

    acceptedFiles.forEach(file => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
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
  }, []);

  const handleRemoveFile = (fileToRemove: File) => {
    setFiles(prevFiles => prevFiles.filter(file => file.file !== fileToRemove));
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

  const handleCreateProject = (name: string) => {
    const newId = (projects.length + 1).toString();
    const newProject: Project = { id: newId, name };
    
    setProjects(prevProjects => [...prevProjects, newProject]);
    
    toast({
      title: "Project Created",
      description: `Project "${name}" has been created.`,
    });
  };

  const startUpload = () => {
    const hasUnassignedFiles = files.some(file => !file.projectId || !file.fileType);
    
    if (hasUnassignedFiles) {
      alert("Please assign a project and file type to all files");
      return;
    }
    
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
        <FileDropzone onDrop={onDrop} />

        {files.length > 0 && (
          <FileList 
            files={files}
            projects={projects}
            fileTypes={FILE_TYPES}
            onRemoveFile={handleRemoveFile}
            onFileProjectChange={handleFileProjectChange}
            onFileTypeChange={handleFileTypeChange}
            onStartUpload={startUpload}
            onCreateProject={handleCreateProject}
          />
        )}
      </div>
    </div>
  );
};

export default Upload;
