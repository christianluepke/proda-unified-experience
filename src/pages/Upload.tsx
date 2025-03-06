import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Progress } from "@/components/ui/progress";
import { Button } from '@/components/ui/button';
import { File as LucideFile, X, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadedFile {
  file: File;
  progress: number;
  status: 'uploading' | 'success' | 'error';
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
        status: 'uploading'
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
                f.file === file ? { ...f, status: 'success', progress: 100 } : f
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleRemoveFile = (fileToRemove: File) => {
    setFiles(prevFiles => prevFiles.filter(file => file.file !== fileToRemove));
  };

  const handleProjectSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProject(event.target.value);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Upload Files</h1>

      <div className="mb-4">
        <label htmlFor="project" className="block text-sm font-medium text-gray-700">
          Select Project:
        </label>
        <select
          id="project"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
          defaultValue=""
          onChange={handleProjectSelect}
        >
          <option value="" disabled>Select a project</option>
          {MOCK_PROJECTS.map(project => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
      </div>

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
      </div>

      {files.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Uploading Files</h2>
          <ul>
            {files.map((fileObj, index) => (
              <li key={index} className="flex items-center justify-between py-2 border-b border-muted/30">
                <div className="flex items-center">
                  {fileObj.status === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  ) : (
                    <LucideFile className="w-5 h-5 text-muted-foreground mr-2" />
                  )}
                  <span className="text-sm font-medium">{fileObj.file.name}</span>
                </div>
                <div className="flex items-center">
                  <Progress 
                    value={fileObj.progress} 
                    className={cn(
                      "h-1.5 transition-all duration-300",
                      fileObj.status === 'success' ? "bg-muted-foreground/20" : "bg-muted-foreground/10"
                    )}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveFile(fileObj.file)}
                    className="ml-4 hover:bg-red-500 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Upload;
