
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from '@/components/ui/button';
import { X, CheckCircle, LucideFile } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UploadedFile, Project, FileType } from './models';
import ProjectAssignment from './ProjectAssignment';

interface FileItemProps {
  fileObj: UploadedFile;
  index: number;
  projects: Project[];
  fileTypes: FileType[];
  onRemoveFile: (file: File) => void;
  onFileProjectChange: (file: File, projectId: string) => void;
  onFileTypeChange: (file: File, fileType: 'rent_roll' | 'operating_statement') => void;
  onCreateProject: (name: string) => Project;
}

const FileItem: React.FC<FileItemProps> = ({
  fileObj,
  index,
  projects,
  fileTypes,
  onRemoveFile,
  onFileProjectChange,
  onFileTypeChange,
  onCreateProject
}) => {
  return (
    <li className="p-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {fileObj.status === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <LucideFile className="w-5 h-5 text-muted-foreground" />
          )}
          <span className="text-sm font-medium truncate max-w-xs">{fileObj.file.name}</span>
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProjectAssignment 
          file={fileObj.file}
          projectId={fileObj.projectId}
          projects={projects}
          onFileProjectChange={onFileProjectChange}
          onCreateProject={onCreateProject}
        />
        
        <div>
          <label className="text-sm font-medium mb-1.5 block">File Type</label>
          <RadioGroup 
            value={fileObj.fileType || ""} 
            onValueChange={(value) => onFileTypeChange(fileObj.file, value as 'rent_roll' | 'operating_statement')}
            className="flex gap-4"
          >
            {fileTypes.map(type => (
              <div key={type.id} className="flex items-center space-x-2">
                <RadioGroupItem value={type.id} id={`${type.id}-${index}`} />
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
      </div>
    </li>
  );
};

export default FileItem;
