
import React from 'react';
import { format } from 'date-fns';
import { 
  TableCell, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  ChevronDown, 
  ChevronRight, 
  FileIcon, 
  FileText, 
  FileSpreadsheet,
  Clock,
  User,
  Building,
  Briefcase,
  FolderArchive
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { UploadedFile } from './models';
import { getStatusBadge } from './StatusBadges';
import FileActionsMenu from './FileActionsMenu';
import { TableColumn } from './models';

interface FileRowProps {
  file: UploadedFile;
  isExpanded: boolean;
  visibleColumns: TableColumn[];
  getFileDocumentTypeLabel: (file: UploadedFile) => string;
  toggleFileExpand: (fileId: string) => void;
  onDeleteFile: (fileId: string) => void;
  formatFileSize: (bytes: number) => string;
}

const FileRow: React.FC<FileRowProps> = ({
  file,
  isExpanded,
  visibleColumns,
  getFileDocumentTypeLabel,
  toggleFileExpand,
  onDeleteFile,
  formatFileSize
}) => {
  const hasDocuments = file.documents.length > 0;
  
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

  return (
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
        <FileActionsMenu 
          fileId={file.id}
          fileName={file.name}
          onDeleteFile={onDeleteFile}
        />
      </TableCell>
    </TableRow>
  );
};

export default FileRow;
