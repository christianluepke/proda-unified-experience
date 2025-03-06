
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Upload Files</h1>
        <Link to="/previous-uploads">
          <Button variant="outline" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            View Previous Uploads
          </Button>
        </Link>
      </div>

      <div className="grid gap-8">
        <FileDropzone onDrop={onDrop} />

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
