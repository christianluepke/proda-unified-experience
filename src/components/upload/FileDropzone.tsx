
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';

export interface FileDropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
  className?: string;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ onDrop, className }) => {
  const onDropCallback = useCallback((acceptedFiles: File[]) => {
    onDrop(acceptedFiles);
  }, [onDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onDropCallback });

  return (
    <div 
      {...getRootProps()} 
      className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors ${
        isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/20'
      } ${className || ''}`}
    >
      <input {...getInputProps()} />
      <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground/80 mb-2" />
      {isDragActive ? (
        <p className="text-sm text-muted-foreground">Drop the files here...</p>
      ) : (
        <div>
          <p className="text-sm font-medium">Drag and drop files here, or click to select files</p>
          <p className="text-xs text-muted-foreground mt-1">
            Supported formats: XLS, XLSX, CSV, PDF
          </p>
        </div>
      )}
    </div>
  );
};

export default FileDropzone;
