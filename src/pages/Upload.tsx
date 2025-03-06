
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Progress } from "@/components/ui/progress";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  File as LucideFile, 
  X, 
  CheckCircle, 
  Clock, 
  ChevronRight, 
  History 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from "@/components/ui/separator";

interface UploadedFile {
  file: File;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  projectId: string | null;
}

interface Project {
  id: string;
  name: string;
}

const MOCK_PROJECTS: Project[] = [
  { id: '1', name: 'Project A' },
  { id: '2', name: 'Project B' },
  { id: '3', name: 'Project C' },
];

const Upload: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prevFiles => [
      ...prevFiles,
      ...acceptedFiles.map(file => ({
        file: file,
        progress: 0,
        status: 'uploading' as const,
        projectId: selectedProject
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
  }, [selectedProject]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleRemoveFile = (fileToRemove: File) => {
    setFiles(prevFiles => prevFiles.filter(file => file.file !== fileToRemove));
  };

  const handleProjectSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProject(event.target.value);
  };

  const handleFileProjectChange = (file: File, projectId: string) => {
    setFiles(prevFiles => 
      prevFiles.map(f => 
        f.file === file ? { ...f, projectId } : f
      )
    );
  };

  const startUpload = () => {
    // In a real app, we would check if all files have project assignments
    // For now, let's just simulate it
    const hasUnassignedFiles = files.some(file => !file.projectId);
    
    if (hasUnassignedFiles) {
      alert("Please assign a project to all files");
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
        <div>
          <h2 className="text-lg font-medium mb-3">1. Select Project (Optional)</h2>
          <p className="text-sm text-muted-foreground mb-3">
            You can set a default project for all files or assign projects individually later.
          </p>
          <select
            id="project"
            className="w-full max-w-xs pl-3 pr-10 py-2 text-base border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
            defaultValue=""
            onChange={handleProjectSelect}
          >
            <option value="" disabled>Select a default project</option>
            {MOCK_PROJECTS.map(project => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <h2 className="text-lg font-medium mb-3">2. Drop or Select Files</h2>
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center",
              "bg-muted/50 hover:bg-muted/80 transition-colors duration-200",
              isDragActive ? "border-primary" : "border-muted"
            )}
          >
            <input {...getInputProps()} />
            <LucideFile className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">
              {isDragActive
                ? "Drop the files here..."
                : "Drag 'n' drop some files here, or click to select files"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Bulk upload supported. You can assign projects to each file after uploading.
            </p>
          </div>
        </div>

        {files.length > 0 && (
          <div>
            <h2 className="text-lg font-medium mb-3">3. Assign Projects to Files</h2>
            <div className="border rounded-md overflow-hidden">
              <div className="bg-muted/40 p-3 font-medium text-sm">
                Files to Upload ({files.length})
              </div>
              <Separator />
              <ul className="divide-y">
                {files.map((fileObj, index) => (
                  <li key={index} className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      {fileObj.status === 'success' ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <LucideFile className="w-5 h-5 text-muted-foreground" />
                      )}
                      <span className="text-sm font-medium truncate max-w-xs">{fileObj.file.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <select
                        className="text-sm border border-input bg-background rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
                        value={fileObj.projectId || ""}
                        onChange={(e) => handleFileProjectChange(fileObj.file, e.target.value)}
                      >
                        <option value="" disabled>Select project</option>
                        {MOCK_PROJECTS.map(project => (
                          <option key={project.id} value={project.id}>{project.name}</option>
                        ))}
                      </select>

                      {fileObj.progress > 0 && (
                        <div className="w-24">
                          <Progress 
                            value={fileObj.progress} 
                            className={cn(
                              "h-1.5 transition-all duration-300",
                              fileObj.status === 'success' ? "bg-muted-foreground/20" : "bg-muted-foreground/10"
                            )}
                          />
                        </div>
                      )}

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveFile(fileObj.file)}
                        className="hover:bg-red-500 hover:text-white"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={startUpload} className="flex items-center gap-2">
                Start Upload
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
