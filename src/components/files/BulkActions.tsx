
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Trash2 } from 'lucide-react';
import { UploadedFile } from './models';

interface BulkActionsProps {
  selectedCount: number;
  selectedFiles: Set<string>;
  files: UploadedFile[];
  onBulkDelete: () => void;
}

const BulkActions: React.FC<BulkActionsProps> = ({
  selectedCount,
  selectedFiles,
  files,
  onBulkDelete
}) => {
  if (selectedCount === 0) return null;
  
  // Filter files to get only the selected ones
  const selectedFilesList = files.filter(file => selectedFiles.has(file.id));
  
  // Handle bulk download
  const handleBulkDownload = () => {
    // In a real application, this would trigger downloads for all selected files
    // For this demo, we'll just log the files that would be downloaded
    console.log('Downloading files:', selectedFilesList.map(f => f.name));
    
    // You might implement actual download functionality using fetch or another method
    // This would likely involve creating download URLs for each file and triggering downloads
  };
  
  return (
    <div className="bg-muted/50 p-2 rounded-lg flex items-center gap-4 mb-4">
      <span className="text-sm font-medium">{selectedCount} {selectedCount === 1 ? 'file' : 'files'} selected</span>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={handleBulkDownload}
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 text-destructive hover:text-destructive-foreground hover:bg-destructive"
          onClick={onBulkDelete}
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default BulkActions;
