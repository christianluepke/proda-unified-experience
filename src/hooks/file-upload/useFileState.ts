
import { useState, useCallback } from 'react';
import { UploadedFile } from '@/components/upload/models';

/**
 * Hook for managing file state (adding/removing files)
 */
export function useFileState() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const addFiles = useCallback((acceptedFiles: File[]) => {
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
  }, []);

  const removeFile = useCallback((fileToRemove: File) => {
    setFiles(prevFiles => prevFiles.filter(file => file.file !== fileToRemove));
  }, []);

  return {
    files,
    setFiles,
    addFiles,
    removeFile
  };
}
