
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadedFile } from '@/components/upload/models';
import { toast } from "@/components/ui/use-toast";
import { useFeatureAccess } from '@/context/FeatureAccessContext';

export function useFileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const navigate = useNavigate();
  const { accessLevel, hasAccess } = useFeatureAccess();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // If we only have access to rent rolls and it's a single file, 
    // streamline the process for rent roll handling
    if (accessLevel === 'rent_roll_only' && acceptedFiles.length === 1) {
      // Create a temporary file ID for rent roll
      const rentRollId = `rr-${Math.random().toString(36).substring(2, 9)}`;
      
      // Start the upload animation
      const file = acceptedFiles[0];
      toast({
        title: "Processing Rent Roll",
        description: `Uploading ${file.name}...`,
      });

      // Simulate upload process
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        if (progress >= 100) {
          clearInterval(interval);
          toast({
            title: "Upload Complete",
            description: "Redirecting to table selection...",
          });
          
          // Navigate to select table page after "upload"
          setTimeout(() => {
            navigate(`/select-table/${rentRollId}`);
          }, 500);
        }
      }, 200);
      
      return;
    }
    
    // For multiple files in rent roll only mode or full access mode,
    // use the normal file upload process with UI
    setFiles(prevFiles => [
      ...prevFiles,
      ...acceptedFiles.map(file => ({
        file: file,
        progress: 0,
        status: 'uploading' as const,
        projectId: null,
        // If in rent_roll_only mode, pre-select the file type
        fileType: accessLevel === 'rent_roll_only' ? 'rent_roll' as const : null
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
  }, [accessLevel, navigate]);

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
    // Only allow changing to file types the user has access to
    if (!hasAccess(fileType)) {
      toast({
        title: "Access Restricted",
        description: `You don't have access to upload ${fileType === 'operating_statement' ? 'operating statements' : 'rent rolls'}`,
        variant: "destructive"
      });
      return;
    }
    
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
        
        // Navigate based on file type
        if (fileObj.fileType === 'operating_statement' && fileObj.projectId) {
          const operatingStatementId = `os-${Math.random().toString(36).substring(2, 9)}`;
          
          setTimeout(() => {
            setFiles(prevFiles => prevFiles.filter(f => f.file !== file));
            // Navigate to review page
            navigate(`/review/${operatingStatementId}`);
          }, 1000);
        } else if (fileObj.fileType === 'rent_roll') {
          // Generate a random ID for the rent roll
          const rentRollId = `rr-${Math.random().toString(36).substring(2, 9)}`;
          
          setTimeout(() => {
            setFiles(prevFiles => prevFiles.filter(f => f.file !== file));
            // Navigate to select table page
            navigate(`/select-table/${rentRollId}`);
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
