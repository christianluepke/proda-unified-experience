
import React from 'react';
import { Button } from '@/components/ui/button';

interface UploadFileListProps {
  files: Array<{ file: File; progress: number; status: string }>;
  handleRemoveFile: (file: File) => void;
}

const UploadFileList: React.FC<UploadFileListProps> = ({ files, handleRemoveFile }) => {
  if (files.length === 0) return null;
  
  return (
    <div className="mt-2">
      <h4 className="text-sm font-medium mb-2">Files to upload ({files.length})</h4>
      <ul className="max-h-40 overflow-y-auto space-y-2 text-sm">
        {files.map((fileObj, index) => (
          <li key={index} className="flex items-center justify-between">
            <span className="truncate max-w-xs">{fileObj.file.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveFile(fileObj.file)}
              className="h-6 w-6 p-0"
            >
              &times;
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadFileList;
