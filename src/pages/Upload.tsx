
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileType } from '@/components/upload/models';
import FileDropzone from '@/components/upload/FileDropzone';
import FileList from '@/components/upload/FileList';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useProjects } from '@/hooks/useProjects';

// Constants
const FILE_TYPES: FileType[] = [
  { id: 'rent_roll', name: 'Rent Roll' },
  { id: 'operating_statement', name: 'Operating Statement' },
];

const Upload: React.FC = () => {
  const { 
    files, 
    onDrop, 
    handleRemoveFile, 
    handleFileProjectChange, 
    handleFileTypeChange, 
    startUpload 
  } = useFileUpload();
  
  const { projects, createProject } = useProjects();

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Upload Files</h1>
      </div>

      <div className="grid gap-8">
        {files.length === 0 ? (
          <div className="mx-auto w-full max-w-3xl py-8">
            <FileDropzone onDrop={onDrop} size="large" className="shadow-md" />
          </div>
        ) : (
          <FileDropzone onDrop={onDrop} size="small" />
        )}

        {files.length > 0 && (
          <FileList 
            files={files}
            projects={projects}
            fileTypes={FILE_TYPES}
            onRemoveFile={handleRemoveFile}
            onFileProjectChange={handleFileProjectChange}
            onFileTypeChange={handleFileTypeChange}
            onStartUpload={startUpload}
            onCreateProject={createProject}
          />
        )}
      </div>
    </div>
  );
};

export default Upload;
