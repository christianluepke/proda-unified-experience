
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
  User 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { UploadedFile } from './models';
import { useFiles } from '@/hooks/useFiles';
import DocumentList from './DocumentList';

interface FileListProps {
  files: UploadedFile[];
  onDeleteFile: (fileId: string) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onDeleteFile }) => {
  const [expandedFiles, setExpandedFiles] = useState<Set<string>>(new Set());
  const { getFileDocumentTypeLabel } = useFiles();

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Processed</Badge>;
      case 'processing':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Processing</Badge>;
      case 'error':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Error</Badge>;
      default:
        return null;
    }
  };

  const confirmDelete = (fileId: string, fileName: string) => {
    if (window.confirm(`Are you sure you want to delete "${fileName}"?`)) {
      onDeleteFile(fileId);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">File Name</TableHead>
            <TableHead className="w-[15%]">Document Type</TableHead>
            <TableHead className="w-[15%]">Upload Date</TableHead>
            <TableHead className="w-[15%]">Size</TableHead>
            <TableHead className="w-[15%] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map(file => {
            const isExpanded = expandedFiles.has(file.id);
            const hasDocuments = file.documents.length > 0;
            
            return (
              <React.Fragment key={file.id}>
                <TableRow className={cn("hover:bg-muted/50", isExpanded && "bg-muted/30")}>
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
                      {getStatusBadge(file.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getFileDocumentTypeLabel(file)}
                  </TableCell>
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
                  <TableCell>
                    {formatFileSize(file.size)}
                  </TableCell>
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
                    <TableCell colSpan={5} className="p-0">
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
