
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, FileIcon, Search } from 'lucide-react';
import FileList from '@/components/files/FileList';
import { useFiles } from '@/hooks/useFiles';
import { Input } from '@/components/ui/input';
import FileFilters from '@/components/files/FileFilters';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

const Files: React.FC = () => {
  const { 
    files, 
    isLoading, 
    deleteFile, 
    filteredFiles,
    paginatedFiles, 
    setSearchTerm, 
    searchTerm,
    selectedCount,
    bulkDeleteFiles
  } = useFiles();
  const [showFilters, setShowFilters] = useState(false);
  
  return (
    <div className="w-full max-w-full px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Files</h1>
          {selectedCount > 0 && (
            <div className="bg-primary/10 text-primary text-sm font-medium px-2 py-1 rounded-full">
              {selectedCount} selected
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Link to="/upload">
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload File
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex gap-4 mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search files..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        {showFilters && <FileFilters />}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : filteredFiles.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-8 text-center">
          <FileIcon className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Files Found</h2>
          <p className="text-muted-foreground mb-4">Upload a file to get started</p>
          <Link to="/upload">
            <Button>Upload File</Button>
          </Link>
        </Card>
      ) : (
        <div className="w-full h-[calc(100vh-250px)]">
          <ResizablePanelGroup
            direction="horizontal"
            className="w-full h-full border rounded-lg overflow-hidden"
          >
            <ResizablePanel defaultSize={100} minSize={50}>
              <FileList files={paginatedFiles} onDeleteFile={deleteFile} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      )}
    </div>
  );
};

export default Files;
