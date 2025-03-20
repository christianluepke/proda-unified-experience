
import { useMemo } from 'react';
import { useFilesData } from './files/useFilesData';
import { useFilesFiltering } from './files/useFilesFiltering';
import { useFilesSorting } from './files/useFilesSorting';
import { useFilesColumns, FILE_COLUMNS } from './files/useFilesColumns';

export { FILE_COLUMNS } from './files/useFilesColumns';

export function useFiles() {
  const { 
    files, 
    isLoading, 
    deleteFile, 
    getFileDocumentTypeLabel, 
    getDocumentTypeLabel,
    formatFileSize
  } = useFilesData();
  
  const {
    searchTerm,
    setSearchTerm,
    activeFilters,
    updateFilters,
    resetFilters,
    filterOptions,
    applyFilters
  } = useFilesFiltering(files);
  
  const {
    sortField,
    sortDirection,
    updateSort,
    sortFiles
  } = useFilesSorting();
  
  const {
    visibleColumns,
    toggleColumnVisibility
  } = useFilesColumns();

  // Filtered and sorted files
  const filteredFiles = useMemo(() => {
    return files
      .filter(applyFilters)
      .sort((a, b) => sortFiles(a, b, getFileDocumentTypeLabel));
  }, [files, applyFilters, sortFiles, getFileDocumentTypeLabel]);

  return {
    files,
    isLoading,
    deleteFile,
    getFileDocumentTypeLabel,
    getDocumentTypeLabel,
    formatFileSize,
    searchTerm,
    setSearchTerm,
    sortField,
    sortDirection,
    updateSort,
    activeFilters,
    updateFilters,
    resetFilters,
    filteredFiles,
    filterOptions,
    visibleColumns,
    toggleColumnVisibility
  };
}
