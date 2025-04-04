
import { useCallback } from 'react';
import { toast } from "@/components/ui/use-toast";
import { useFeatureAccess } from '@/context/FeatureAccessContext';

/**
 * Hook for handling file metadata (project, file type)
 */
export function useFileMetadata(
  setFiles: (updater: (prevFiles: any[]) => any[]) => void
) {
  const { hasAccess } = useFeatureAccess();

  const handleFileProjectChange = useCallback((file: File, projectId: string | null) => {
    setFiles(prevFiles => 
      prevFiles.map(f => 
        f.file === file ? { ...f, projectId } : f
      )
    );
  }, [setFiles]);

  const handleFileTypeChange = useCallback((file: File, fileType: 'rent_roll' | 'operating_statement') => {
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
  }, [setFiles, hasAccess]);

  return {
    handleFileProjectChange,
    handleFileTypeChange
  };
}
