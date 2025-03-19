
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadedFile } from '@/components/upload/models';
import { toast } from "@/components/ui/use-toast";

export function useFileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const navigate = useNavigate();

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

  const handleFileProjectChange = (file: File, projectId: string | null) => {
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

  const startUpload = (file: File) => {
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
        
        toast({
          title: "Upload Complete",
          description: `Successfully uploaded ${fileObj.file.name}`,
        });
        
        // If it's an operating statement, navigate to review page
        if (fileObj.fileType === 'operating_statement' && fileObj.projectId) {
          const operatingStatementId = `os-${Math.random().toString(36).substring(2, 9)}`;
          
          setTimeout(() => {
            setFiles(prevFiles => prevFiles.filter(f => f.file !== file));
            // Navigate to review page
            navigate(`/review/${operatingStatementId}`);
          }, 1000);
        } else {
          setTimeout(() => {
            setFiles(prevFiles => prevFiles.filter(f => f.file !== file));
          }, 2000);
        }
      }
    }, 300);
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
