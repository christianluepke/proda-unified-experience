
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Upload, FileIcon } from 'lucide-react';
import FileList from '@/components/files/FileList';
import { useFiles } from '@/hooks/useFiles';

const Files: React.FC = () => {
  const { files, isLoading, deleteFile } = useFiles();
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Files</h1>
        <div className="flex gap-2">
          <Link to="/upload">
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload File
            </Button>
          </Link>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Extraction
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : files.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-8 text-center">
          <FileIcon className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Files Found</h2>
          <p className="text-muted-foreground mb-4">Upload a file to get started</p>
          <Link to="/upload">
            <Button>Upload File</Button>
          </Link>
        </Card>
      ) : (
        <FileList files={files} onDeleteFile={deleteFile} />
      )}
    </div>
  );
};

export default Files;
