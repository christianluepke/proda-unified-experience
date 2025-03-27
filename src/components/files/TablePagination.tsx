
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PaginationOptions } from '@/hooks/files/useFilesPagination';

interface TablePaginationProps {
  paginationOptions: PaginationOptions;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  totalItems: number;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  paginationOptions,
  onPageChange,
  onPageSizeChange,
  totalItems,
}) => {
  const { currentPage, totalPages, pageSizeOptions, itemsPerPage } = paginationOptions;
  
  // Generate array of page numbers to show
  const generatePageNumbers = () => {
    const pages: (number | null)[] = [];
    
    // Always show first page
    pages.push(1);
    
    // If we're on page 4 or higher, add an ellipsis after page 1
    if (currentPage >= 4) {
      pages.push(null);
    }
    
    // Add pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i <= totalPages - 1) {
        pages.push(i);
      }
    }
    
    // If we're not near the last page, add an ellipsis
    if (currentPage <= totalPages - 3) {
      pages.push(null);
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  const pageNumbers = generatePageNumbers();
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-4">
      <div className="text-sm text-muted-foreground">
        Showing {Math.min(totalItems, (currentPage - 1) * itemsPerPage + 1)} to {Math.min(totalItems, currentPage * itemsPerPage)} of {totalItems} items
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-sm">Rows per page:</span>
          <Select 
            value={itemsPerPage.toString()} 
            onValueChange={(value) => onPageSizeChange(parseInt(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={itemsPerPage.toString()} />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map(option => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => onPageChange(currentPage - 1)}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {pageNumbers.map((page, index) => {
              if (page === null) {
                return (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              
              return (
                <PaginationItem key={`page-${page}`}>
                  <PaginationLink
                    isActive={page === currentPage}
                    onClick={() => onPageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => onPageChange(currentPage + 1)}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default TablePagination;
