
import { useState, useCallback } from 'react';
import { UploadedFile } from './types';

export function useFilesSelection(files: UploadedFile[]) {
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  
  // Toggle selection for a single file
  const toggleFileSelection = useCallback((fileId: string) => {
    setSelectedFiles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(fileId)) {
        newSet.delete(fileId);
      } else {
        newSet.add(fileId);
      }
      return newSet;
    });
  }, []);
  
  // Select all files
  const selectAllFiles = useCallback(() => {
    const allFileIds = files.map(file => file.id);
    setSelectedFiles(new Set(allFileIds));
  }, [files]);
  
  // Deselect all files
  const deselectAllFiles = useCallback(() => {
    setSelectedFiles(new Set());
  }, []);
  
  // Check if all files are selected
  const areAllFilesSelected = useCallback(() => {
    return files.length > 0 && selectedFiles.size === files.length;
  }, [files, selectedFiles]);
  
  // Toggle select all
  const toggleSelectAll = useCallback(() => {
    if (areAllFilesSelected()) {
      deselectAllFiles();
    } else {
      selectAllFiles();
    }
  }, [areAllFilesSelected, deselectAllFiles, selectAllFiles]);
  
  return {
    selectedFiles,
    toggleFileSelection,
    selectAllFiles,
    deselectAllFiles,
    areAllFilesSelected,
    toggleSelectAll,
    selectedCount: selectedFiles.size
  };
}
