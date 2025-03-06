
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator";
import { UploadedFile, Project, FileType } from './models';
import FileItem from './FileItem';

interface FileListProps {
  files: UploadedFile[];
  projects: Project[];
  fileTypes: FileType[];
  onRemoveFile: (file: File) => void;
  onFileProjectChange: (file: File, projectId: string) => void;
  onFileTypeChange: (file: File, fileType: 'rent_roll' | 'operating_statement') => void;
  onStartUpload: () => void;
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
      <h2 className="text-lg font-medium mb-3">Assign Projects and File Types</h2>
      <div className="border rounded-md overflow-hidden">
        <div className="bg-muted/40 p-3 font-medium text-sm">
          Files to Upload ({files.length})
        </div>
        <Separator />
        <ul className="divide-y">
          {files.map((fileObj, index) => (
            <FileItem
              key={index}
              fileObj={fileObj}
              index={index}
              projects={projects}
              fileTypes={fileTypes}
              onRemoveFile={onRemoveFile}
              onFileProjectChange={onFileProjectChange}
              onFileTypeChange={onFileTypeChange}
              onCreateProject={onCreateProject}
            />
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
