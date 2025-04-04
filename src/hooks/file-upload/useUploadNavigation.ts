
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { UploadedFile } from '@/components/upload/models';

/**
 * Hook for handling navigation after file upload
 */
export function useUploadNavigation(
  setFiles: (updater: (prevFiles: any[]) => any[]) => void
) {
  const navigate = useNavigate();

  const handleUploadCompletion = useCallback((
    file: File, 
    fileObj: UploadedFile
  ) => {
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
  }, [setFiles, navigate]);

  return {
    handleUploadCompletion
  };
}
