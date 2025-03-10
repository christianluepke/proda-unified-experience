
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { UploadedFile, Project, FileType } from './models';
import FileItem from './FileItem';
import { FileStack } from 'lucide-react';

interface FileListProps {
  files: UploadedFile[];
  projects: Project[];
  fileTypes: FileType[];
  onRemoveFile: (file: File) => void;
  onFileProjectChange: (file: File, projectId: string | null) => void;
  onFileTypeChange: (file: File, fileType: 'rent_roll' | 'operating_statement') => void;
  onStartUpload: (file: File) => void;
  onCreateProject: (name: string) => Project;
}

const FileList: React.FC<FileListProps> = ({
  files,
  projects,
  fileTypes,
  onRemoveFile,
  onFileProjectChange,
  onFileTypeChange,
  onStartUpload,
  onCreateProject,
}) => {
  if (files.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-lg font-medium">Assign Projects and File Types</h2>
        <div className="flex items-center bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-xs font-medium">
          <FileStack className="w-3.5 h-3.5 mr-1" />
          {files.length} {files.length === 1 ? 'file' : 'files'}
        </div>
      </div>
      <div className="border rounded-md overflow-hidden">
        <div className="bg-muted/40 p-3 font-medium text-sm flex justify-between items-center">
          <span>Files to Upload ({files.length})</span>
          {files.length > 1 && (
            <span className="text-xs text-muted-foreground">Scroll to see all files</span>
          )}
        </div>
        <Separator />
        <ul className={`divide-y ${files.length > 3 ? 'max-h-[600px] overflow-y-auto' : ''}`}>
          {files.map((fileObj, index) => (
            <li key={index} className={`${index % 2 === 0 ? 'bg-muted/5' : ''}`}>
              <FileItem
                fileObj={fileObj}
                index={index}
                projects={projects}
                fileTypes={fileTypes}
                onRemoveFile={onRemoveFile}
                onFileProjectChange={onFileProjectChange}
                onFileTypeChange={onFileTypeChange}
                onStartUpload={onStartUpload}
                onCreateProject={onCreateProject}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileList;
