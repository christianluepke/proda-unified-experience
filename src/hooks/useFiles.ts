
import { useMemo } from 'react';
import { useFilesData } from './files/useFilesData';
import { useFilesFiltering } from './files/useFilesFiltering';
import { useFilesSorting } from './files/useFilesSorting';
import { useFilesColumns, FILE_COLUMNS } from './files/useFilesColumns';
import { useFilesSelection } from './files/useFilesSelection';
import { useFilesPagination } from './files/useFilesPagination';
import { 
  getFileDocumentTypeLabel, 
  getFileProperties, 
  getFileProjects, 
  getFilePortfolios,
  getFileTypeLabel
} from './files/fileUtils';

export { FILE_COLUMNS } from './files/useFilesColumns';

export function useFiles() {
  const { 
    files, 
    isLoading, 
    deleteFile, 
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
  }, [files, applyFilters, sortFiles]);

  // Pagination
  const {
    paginatedFiles,
    paginationOptions,
    updatePageSize,
    goToPage,
    nextPage,
    prevPage
  } = useFilesPagination(filteredFiles);

  // File selection
  const {
    selectedFiles,
    toggleFileSelection,
    selectAllFiles,
    deselectAllFiles,
    areAllFilesSelected,
    toggleSelectAll,
    selectedCount
  } = useFilesSelection(paginatedFiles);

  // Bulk delete files
  const bulkDeleteFiles = () => {
    selectedFiles.forEach(fileId => {
      deleteFile(fileId);
    });
    deselectAllFiles();
  };

  return {
    files,
    isLoading,
    deleteFile,
    getFileDocumentTypeLabel,
    getDocumentTypeLabel,
    getFileTypeLabel,
    formatFileSize,
    getFileProperties,
    getFileProjects,
    getFilePortfolios,
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
    toggleColumnVisibility,
    selectedFiles,
    toggleFileSelection,
    selectAllFiles,
    deselectAllFiles,
    areAllFilesSelected,
    toggleSelectAll,
    selectedCount,
    bulkDeleteFiles,
    // Pagination-related items
    paginatedFiles,
    paginationOptions,
    updatePageSize,
    goToPage,
    nextPage,
    prevPage
  };
}
