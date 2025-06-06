
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from '@/components/ui/button';
import { X, CheckCircle, LucideFile, Upload, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UploadedFile, Project, FileType } from './models';
import ProjectAssignmentWithProperties from './ProjectAssignmentWithProperties';

interface FileItemProps {
  fileObj: UploadedFile;
  index: number;
  projects: Project[];
  fileTypes: FileType[];
  onRemoveFile: (file: File) => void;
  onFileProjectChange: (file: File, projectId: string | null) => void;
  onFileTypeChange: (file: File, fileType: 'rent_roll' | 'operating_statement') => void;
  onCreateProject: (name: string) => Project;
  onStartUpload: (file: File) => void;
  showFileTypeSelector?: boolean;
}

const FileItem: React.FC<FileItemProps> = ({
  fileObj,
  index,
  projects,
  fileTypes,
  onRemoveFile,
  onFileProjectChange,
  onFileTypeChange,
  onCreateProject,
  onStartUpload,
  showFileTypeSelector = true
}) => {
  const isProjectRequired = fileObj.fileType === 'operating_statement';
  const showProjectSelection = fileObj.fileType === 'operating_statement' || fileObj.fileType === 'rent_roll';
  
  const isUploadDisabled = !fileObj.fileType || (isProjectRequired && !fileObj.projectId);

  // Determine file extension for better visual cue
  const fileExtension = fileObj.file.name.split('.').pop()?.toUpperCase();
  const fileIcon = getFileIcon(fileExtension);

  return (
    <li className="p-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary/10 text-primary">
            {fileObj.status === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              fileIcon
            )}
          </div>
          <div>
            <span className="text-sm font-medium truncate max-w-xs block">{fileObj.file.name}</span>
            <span className="text-xs text-muted-foreground">
              {formatFileSize(fileObj.file.size)} • {fileExtension}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {fileObj.progress > 0 && (
            <div className="w-24">
              <Progress 
                value={fileObj.progress} 
                className={cn(
                  "h-1.5 transition-all duration-300",
                  fileObj.status === 'success' ? "bg-muted-foreground/20" : "bg-muted-foreground/10"
                )}
              />
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemoveFile(fileObj.file)}
            className="hover:bg-red-500 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 ml-11">
        {/* File Type Selection - Show only if showFileTypeSelector is true */}
        {showFileTypeSelector && (
          <div>
            <label className="text-sm font-medium mb-1.5 block">File Type</label>
            <RadioGroup 
              value={fileObj.fileType || ""} 
              onValueChange={(value) => onFileTypeChange(fileObj.file, value as 'rent_roll' | 'operating_statement')}
              className="flex gap-4"
            >
              {fileTypes.map(type => (
                <div key={type.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={type.value} id={`${type.id}-${index}`} />
                  <label 
                    htmlFor={`${type.id}-${index}`} 
                    className="text-sm cursor-pointer"
                  >
                    {type.name}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}
        
        {/* Project Selection with Properties Panel */}
        {showProjectSelection && (
          <ProjectAssignmentWithProperties 
            file={fileObj.file}
            projectId={fileObj.projectId}
            projects={projects}
            onFileProjectChange={onFileProjectChange}
            onCreateProject={onCreateProject}
            required={isProjectRequired}
          />
        )}
      </div>
      
      {/* Upload button for individual file */}
      <div className="mt-4 flex justify-end">
        <Button 
          onClick={() => onStartUpload(fileObj.file)} 
          disabled={isUploadDisabled}
          size="sm"
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Upload File
        </Button>
      </div>
    </li>
  );
};

// Helper function to get appropriate icon based on file extension
function getFileIcon(extension?: string) {
  switch (extension?.toLowerCase()) {
    case 'pdf':
      return <FileText className="w-4 h-4" />;
    case 'csv':
    case 'xls':
    case 'xlsx':
      return <FileText className="w-4 h-4" />;
    default:
      return <LucideFile className="w-4 h-4" />;
  }
}

// Helper function to format file size
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export default FileItem;
