
import { useState, useMemo, useEffect } from 'react';
import { UploadedFile } from './types';

export interface PaginationOptions {
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
  pageSizeOptions: number[];
}

export function useFilesPagination(files: UploadedFile[]) {
  const pageSizeOptions = [25, 50, 100];
  const [itemsPerPage, setItemsPerPage] = useState<number>(pageSizeOptions[0]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  // Reset to first page when files array length changes
  useEffect(() => {
    setCurrentPage(1);
  }, [files.length]);
  
  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(files.length / itemsPerPage));
  }, [files.length, itemsPerPage]);
  
  // Ensure current page is valid when total pages changes
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);
  
  // Get current page items
  const paginatedFiles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return files.slice(startIndex, endIndex);
  }, [files, currentPage, itemsPerPage]);
  
  // Update page size
  const updatePageSize = (size: number) => {
    setItemsPerPage(size);
    // Reset to first page when changing page size to avoid empty pages
    setCurrentPage(1);
  };
  
  // Go to specific page
  const goToPage = (page: number) => {
    const targetPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(targetPage);
  };
  
  // Next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };
  
  // Previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };
  
  const paginationOptions: PaginationOptions = {
    itemsPerPage,
    currentPage,
    totalPages,
    pageSizeOptions
  };
  
  return {
    paginatedFiles,
    paginationOptions,
    updatePageSize,
    goToPage,
    nextPage,
    prevPage
  };
}
