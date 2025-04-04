
import { useCallback } from 'react';
import { toast } from "@/components/ui/use-toast";
import { UploadedFile } from '@/components/upload/models';

/**
 * Hook for starting file uploads
 */
export function useStartUpload(
  files: UploadedFile[],
  setFiles: (updater: (prevFiles: any[]) => any[]) => void,
  handleUploadCompletion: (file: File, fileObj: UploadedFile) => void
) {
  const startUpload = useCallback((file: File) => {
    // Find the file in our state
    const fileObj = files.find(f => f.file === file);
    
    if (!fileObj) {
      toast({
        title: "Error",
        description: "File not found",
        variant: "destructive"
      });
      return;
    }
    
    // Check if file type is selected
    if (!fileObj.fileType) {
      toast({
        title: "Missing Information",
        description: "Please select a file type for this file",
        variant: "destructive"
      });
      return;
    }
    
    // Check if project is selected for operating statements
    if (fileObj.fileType === 'operating_statement' && !fileObj.projectId) {
      toast({
        title: "Missing Information",
        description: "Please assign a project to this operating statement file",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Upload Started",
      description: `Starting upload for ${fileObj.file.name}`,
    });
    
    console.log("Starting upload for file", fileObj);
    
    // Simulate upload process
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
        
        handleUploadCompletion(file, fileObj);
      }
    }, 300);
  }, [files, setFiles, handleUploadCompletion]);

  return {
    startUpload
  };
}
