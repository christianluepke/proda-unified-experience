
import { useState, useCallback } from 'react';
import { UploadedFile } from '@/components/upload/models';
import { toast } from "@/components/ui/use-toast";

export function useFileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

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

  const startUpload = () => {
    // Check for missing file types
    const hasUnassignedFileTypes = files.some(file => !file.fileType);
    
    if (hasUnassignedFileTypes) {
      toast({
        title: "Missing Information",
        description: "Please select a file type for all files",
        variant: "destructive"
      });
      return;
    }
    
    // Check for operating statements without projects
    const hasOperatingStatementsWithoutProjects = files.some(
      file => file.fileType === 'operating_statement' && !file.projectId
    );
    
    if (hasOperatingStatementsWithoutProjects) {
      toast({
        title: "Missing Information",
        description: "Please assign a project to all operating statement files",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Upload Started",
      description: `Starting upload for ${files.length} files`,
    });
    
    console.log("Starting upload for all files", files);
  };

  return {
    files,
    onDrop,
    handleRemoveFile,
    handleFileProjectChange,
    handleFileTypeChange,
    startUpload
  };
}
