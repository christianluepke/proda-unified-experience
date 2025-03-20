
import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { TableColumn } from './models';

interface FileTableHeaderProps {
  visibleColumns: TableColumn[];
  sortField: string;
  sortDirection: 'asc' | 'desc';
  updateSort: (field: string) => void;
}

const FileTableHeader: React.FC<FileTableHeaderProps> = ({
  visibleColumns,
  sortField,
  sortDirection,
  updateSort,
}) => {
  const getSortIcon = (field: string) => {
    if (sortField !== field) return <ArrowUpDown className="ml-2 h-4 w-4" />;
    return sortDirection === 'asc' 
      ? <ArrowUp className="ml-2 h-4 w-4" /> 
      : <ArrowDown className="ml-2 h-4 w-4" />;
  };
  
  return (
    <TableHeader>
      <TableRow>
        {visibleColumns.find(col => col.id === 'name' && col.visible) && (
          <TableHead 
            className="w-[35%] cursor-pointer hover:bg-muted/30"
            onClick={() => updateSort('name')}
          >
            <div className="flex items-center">
              File Name
              {getSortIcon('name')}
            </div>
          </TableHead>
        )}
        
        {visibleColumns.find(col => col.id === 'type' && col.visible) && (
          <TableHead 
            className="w-[15%] cursor-pointer hover:bg-muted/30"
            onClick={() => updateSort('type')}
          >
            <div className="flex items-center">
              Document Type
              {getSortIcon('type')}
            </div>
          </TableHead>
        )}
        
        {visibleColumns.find(col => col.id === 'uploadDate' && col.visible) && (
          <TableHead 
            className="w-[15%] cursor-pointer hover:bg-muted/30"
            onClick={() => updateSort('uploadDate')}
          >
            <div className="flex items-center">
              Upload Date
              {getSortIcon('uploadDate')}
            </div>
          </TableHead>
        )}
        
        {visibleColumns.find(col => col.id === 'property' && col.visible) && (
          <TableHead 
            className="w-[10%] cursor-pointer hover:bg-muted/30"
            onClick={() => updateSort('property')}
          >
            <div className="flex items-center">
              Property
              {getSortIcon('property')}
            </div>
          </TableHead>
        )}
        
        {visibleColumns.find(col => col.id === 'project' && col.visible) && (
          <TableHead 
            className="w-[10%] cursor-pointer hover:bg-muted/30"
            onClick={() => updateSort('project')}
          >
            <div className="flex items-center">
              Project
              {getSortIcon('project')}
            </div>
          </TableHead>
        )}
        
        {visibleColumns.find(col => col.id === 'portfolio' && col.visible) && (
          <TableHead 
            className="w-[10%] cursor-pointer hover:bg-muted/30"
            onClick={() => updateSort('portfolio')}
          >
            <div className="flex items-center">
              Portfolio
              {getSortIcon('portfolio')}
            </div>
          </TableHead>
        )}
        
        {visibleColumns.find(col => col.id === 'size' && col.visible) && (
          <TableHead 
            className="w-[10%] cursor-pointer hover:bg-muted/30"
            onClick={() => updateSort('size')}
          >
            <div className="flex items-center">
              Size
              {getSortIcon('size')}
            </div>
          </TableHead>
        )}
        
        {visibleColumns.find(col => col.id === 'status' && col.visible) && (
          <TableHead 
            className="w-[10%] cursor-pointer hover:bg-muted/30"
            onClick={() => updateSort('status')}
          >
            <div className="flex items-center">
              Status
              {getSortIcon('status')}
            </div>
          </TableHead>
        )}
        
        <TableHead className="w-[10%] text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default FileTableHeader;
