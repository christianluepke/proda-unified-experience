
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator";
import { X, CheckCircle, LucideFile } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadedFile {
  file: File;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  projectId: string | null;
  fileType: 'rent_roll' | 'operating_statement' | null;
}

interface Project {
  id: string;
  name: string;
}

interface FileType {
  id: string;
  name: string;
}

interface FileListProps {
  files: UploadedFile[];
  projects: Project[];
  fileTypes: FileType[];
  onRemoveFile: (file: File) => void;
  onFileProjectChange: (file: File, projectId: string) => void;
  onFileTypeChange: (file: File, fileType: 'rent_roll' | 'operating_statement') => void;
  onStartUpload: () => void;
}

const FileList: React.FC<FileListProps> = ({
  files,
  projects,
  fileTypes,
  onRemoveFile,
  onFileProjectChange,
  onFileTypeChange,
  onStartUpload,
}) => {
  if (files.length === 0) return null;

  return (
    <div>
      <h2 className="text-lg font-medium mb-3">Assign Projects and File Types</h2>
      <div className="border rounded-md overflow-hidden">
        <div className="bg-muted/40 p-3 font-medium text-sm">
          Files to Upload ({files.length})
        </div>
        <Separator />
        <ul className="divide-y">
          {files.map((fileObj, index) => (
            <li key={index} className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                {fileObj.status === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <LucideFile className="w-5 h-5 text-muted-foreground" />
                )}
                <span className="text-sm font-medium truncate max-w-xs">{fileObj.file.name}</span>
              </div>
              <div className="flex items-center gap-3 flex-wrap justify-end">
                <select
                  className="text-sm border border-input bg-background rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
                  value={fileObj.projectId || ""}
                  onChange={(e) => onFileProjectChange(fileObj.file, e.target.value)}
                >
                  <option value="" disabled>Select project</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.id}>{project.name}</option>
                  ))}
                </select>
                
                <select
                  className="text-sm border border-input bg-background rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
                  value={fileObj.fileType || ""}
                  onChange={(e) => onFileTypeChange(fileObj.file, e.target.value as 'rent_roll' | 'operating_statement')}
                >
                  <option value="" disabled>Select file type</option>
                  {fileTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>

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
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={onStartUpload} className="flex items-center gap-2">
          Start Upload
        </Button>
      </div>
    </div>
  );
};

export default FileList;
