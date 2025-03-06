
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { File as LucideFile } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileDropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <h2 className="text-lg font-medium mb-3">2. Drop or Select Files</h2>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center",
          "bg-muted/50 hover:bg-muted/80 transition-colors duration-200",
          isDragActive ? "border-primary" : "border-muted"
        )}
      >
        <input {...getInputProps()} />
        <LucideFile className="h-10 w-10 text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground">
          {isDragActive
            ? "Drop the files here..."
            : "Drag 'n' drop some files here, or click to select files"}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Bulk upload supported. You can assign projects and file types to each file after uploading.
        </p>
      </div>
    </div>
  );
};

export default FileDropzone;
