
import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileIcon, 
  FileText, 
  FileSpreadsheet, 
  Download, 
  Trash, 
  MoreVertical, 
  PlusCircle, 
  ChevronRight, 
  ChevronDown, 
  Clock, 
  User,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Building,
  Briefcase,
  FolderArchive
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { UploadedFile } from './models';
import { useFiles } from '@/hooks/useFiles';
import DocumentList from './DocumentList';
import ColumnSelector from './ColumnSelector';

interface FileListProps {
  files: UploadedFile[];
  onDeleteFile: (fileId: string) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onDeleteFile }) => {
  const [expandedFiles, setExpandedFiles] = useState<Set<string>>(new Set());
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const { 
    getFileDocumentTypeLabel, 
    getStatusBadge, 
    sortField, 
    sortDirection, 
    updateSort,
    visibleColumns
  } = useFiles();

  const toggleFileExpand = (fileId: string) => {
    setExpandedFiles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(fileId)) {
        newSet.delete(fileId);
      } else {
        newSet.add(fileId);
      }
      return newSet;
    });
  };
  
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'excel':
        return <FileSpreadsheet className="h-5 w-5 text-green-600" />;
      default:
        return <FileIcon className="h-5 w-5 text-blue-500" />;
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return <ArrowUpDown className="ml-2 h-4 w-4" />;
    return sortDirection === 'asc' 
      ? <ArrowUp className="ml-2 h-4 w-4" /> 
      : <ArrowDown className="ml-2 h-4 w-4" />;
  };

  const confirmDelete = (fileId: string, fileName: string) => {
    if (window.confirm(`Are you sure you want to delete "${fileName}"?`)) {
      onDeleteFile(fileId);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="p-2 flex justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowColumnSelector(!showColumnSelector)}
        >
          Columns
        </Button>
        {showColumnSelector && <ColumnSelector />}
      </div>
      <Table>
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
        <TableBody>
          {files.map(file => {
            const isExpanded = expandedFiles.has(file.id);
            const hasDocuments = file.documents.length > 0;
            
            return (
              <React.Fragment key={file.id}>
                <TableRow className={cn("hover:bg-muted/50", isExpanded && "bg-muted/30")}>
                  {visibleColumns.find(col => col.id === 'name' && col.visible) && (
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {hasDocuments && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 p-0"
                            onClick={() => toggleFileExpand(file.id)}
                          >
                            {isExpanded ? (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        )}
                        {getFileIcon(file.fileType)}
                        <span className="truncate">{file.name}</span>
                      </div>
                    </TableCell>
                  )}
                  
                  {visibleColumns.find(col => col.id === 'type' && col.visible) && (
                    <TableCell>
                      {getFileDocumentTypeLabel(file)}
                    </TableCell>
                  )}
                  
                  {visibleColumns.find(col => col.id === 'uploadDate' && col.visible) && (
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {format(new Date(file.uploadDate), 'MMM d, yyyy')}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <User className="mr-1 h-3 w-3" />
                          {file.uploader.name}
                        </div>
                      </div>
                    </TableCell>
                  )}
                  
                  {visibleColumns.find(col => col.id === 'property' && col.visible) && (
                    <TableCell>
                      {file.property && (
                        <div className="flex items-center">
                          <Building className="mr-1 h-3 w-3 text-muted-foreground" />
                          <span>{file.property.name}</span>
                        </div>
                      )}
                    </TableCell>
                  )}
                  
                  {visibleColumns.find(col => col.id === 'project' && col.visible) && (
                    <TableCell>
                      {file.project && (
                        <div className="flex items-center">
                          <Briefcase className="mr-1 h-3 w-3 text-muted-foreground" />
                          <span>{file.project.name}</span>
                        </div>
                      )}
                    </TableCell>
                  )}
                  
                  {visibleColumns.find(col => col.id === 'portfolio' && col.visible) && (
                    <TableCell>
                      {file.portfolio && (
                        <div className="flex items-center">
                          <FolderArchive className="mr-1 h-3 w-3 text-muted-foreground" />
                          <span>{file.portfolio.name}</span>
                        </div>
                      )}
                    </TableCell>
                  )}
                  
                  {visibleColumns.find(col => col.id === 'size' && col.visible) && (
                    <TableCell>
                      {formatFileSize(file.size)}
                    </TableCell>
                  )}
                  
                  {visibleColumns.find(col => col.id === 'status' && col.visible) && (
                    <TableCell>
                      {getStatusBadge(file.status)}
                    </TableCell>
                  )}
                  
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Add Extraction
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center">
                          <Download className="mr-2 h-4 w-4" />
                          Download Original
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center">
                          <Download className="mr-2 h-4 w-4" />
                          Download Processed
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="flex items-center text-red-600 focus:text-red-600"
                          onClick={() => confirmDelete(file.id, file.name)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete File
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                
                {/* Document rows (expanded view) */}
                {isExpanded && hasDocuments && (
                  <TableRow className="bg-muted/10">
                    <TableCell colSpan={visibleColumns.filter(col => col.visible).length + 1} className="p-0">
                      <div className="pl-10 pr-4 py-2">
                        <DocumentList documents={file.documents} />
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default FileList;
