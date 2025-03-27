
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
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { UploadedFile } from './models';
import { getStatusBadge } from './StatusBadges';
import FileActionsMenu from './FileActionsMenu';
import { TableColumn } from './models';
import { Checkbox } from "@/components/ui/checkbox";
import MultipleEntityDisplay from './MultipleEntityDisplay';
import { getFileProperties, getFileProjects, getFilePortfolios, getFileTypeLabel } from '@/hooks/files/fileUtils';

interface FileRowProps {
  file: UploadedFile;
  isExpanded: boolean;
  visibleColumns: TableColumn[];
  getFileDocumentTypeLabel: (file: UploadedFile) => string;
  toggleFileExpand: (fileId: string) => void;
  onDeleteFile: (fileId: string) => void;
  formatFileSize: (bytes: number) => string;
  isSelected?: boolean;
  onSelectToggle?: (fileId: string) => void;
}

const FileRow: React.FC<FileRowProps> = ({
  file,
  isExpanded,
  visibleColumns,
  getFileDocumentTypeLabel,
  toggleFileExpand,
  onDeleteFile,
  formatFileSize,
  isSelected = false,
  onSelectToggle
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

  // Get aggregated property/project/portfolio data
  const propertyData = getFileProperties(file);
  const projectData = getFileProjects(file);
  const portfolioData = getFilePortfolios(file);

  return (
    <TableRow className={cn(
      "hover:bg-muted/50", 
      isExpanded && "bg-muted/30",
      isSelected && "bg-primary/5"
    )}>
      {visibleColumns.find(col => col.id === 'select' && col.visible) && (
        <TableCell className="w-12">
          <Checkbox 
            checked={isSelected}
            onCheckedChange={() => onSelectToggle?.(file.id)}
            aria-label={`Select ${file.name}`}
          />
        </TableCell>
      )}
      
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
          {getFileTypeLabel(file.fileType)}
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
          <MultipleEntityDisplay
            type="property"
            primary={propertyData.primary}
            names={propertyData.names}
            count={propertyData.count}
          />
        </TableCell>
      )}
      
      {visibleColumns.find(col => col.id === 'project' && col.visible) && (
        <TableCell>
          <MultipleEntityDisplay
            type="project"
            primary={projectData.primary}
            names={projectData.names}
            count={projectData.count}
          />
        </TableCell>
      )}
      
      {visibleColumns.find(col => col.id === 'portfolio' && col.visible) && (
        <TableCell>
          <MultipleEntityDisplay
            type="portfolio"
            primary={portfolioData.primary}
            names={portfolioData.names}
            count={portfolioData.count}
          />
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
