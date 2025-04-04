
import { useCallback } from 'react';
import { useFileState } from './useFileState';
import { useFileMetadata } from './useFileMetadata';
import { useFileProgress } from './useFileProgress';
import { useUploadNavigation } from './useUploadNavigation';
import { useStartUpload } from './useStartUpload';
import { useRentRollOnly } from './useRentRollOnly';
import { useFeatureAccess } from '@/context/FeatureAccessContext';

/**
 * Main hook for file upload functionality
 */
export function useFileUpload() {
  const { accessLevel } = useFeatureAccess();
  const { files, setFiles, addFiles, removeFile } = useFileState();
  const { handleFileProjectChange, handleFileTypeChange } = useFileMetadata(setFiles);
  const { simulateProgress } = useFileProgress(setFiles);
  const { handleUploadCompletion } = useUploadNavigation(setFiles);
  const { startUpload } = useStartUpload(files, setFiles, handleUploadCompletion);
  const { handleRentRollOnly } = useRentRollOnly();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // If we only have access to rent rolls and it's a single file, 
    // streamline the process for rent roll handling
    if (accessLevel === 'rent_roll_only' && handleRentRollOnly(acceptedFiles)) {
      return;
    }
    
    // For multiple files in rent roll only mode or full access mode,
    // use the normal file upload process with UI
    addFiles(acceptedFiles);

    // Simulate progress for each file
    acceptedFiles.forEach(file => {
      simulateProgress(file);
    });
  }, [accessLevel, addFiles, simulateProgress, handleRentRollOnly]);

  return {
    files,
    onDrop,
    handleRemoveFile: removeFile,
    handleFileProjectChange,
    handleFileTypeChange,
    startUpload
  };
}

// Re-export all individual hooks
export * from './useFileState';
export * from './useFileMetadata';
export * from './useFileProgress';
export * from './useUploadNavigation';
export * from './useStartUpload';
export * from './useRentRollOnly';
