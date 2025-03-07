
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';

export interface FileDropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
  className?: string;
  size?: 'large' | 'small';
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ onDrop, className, size = 'small' }) => {
  const onDropCallback = useCallback((acceptedFiles: File[]) => {
    onDrop(acceptedFiles);
  }, [onDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onDropCallback });

  return (
    <div 
      {...getRootProps()} 
      className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-blue-50/50 transition-colors ${
        isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/30 bg-slate-50/50'
      } ${size === 'large' ? 'py-16' : 'py-4'} ${className || ''}`}
    >
      <input {...getInputProps()} />
      <UploadCloud className={`mx-auto text-muted-foreground/80 mb-2 ${size === 'large' ? 'h-16 w-16' : 'h-10 w-10'}`} />
      {isDragActive ? (
        <p className="text-sm text-muted-foreground">Drop the files here...</p>
      ) : (
        <div>
          <p className={`font-medium ${size === 'large' ? 'text-lg' : 'text-sm'}`}>
            Drag and drop files here, or click to select files
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Supported formats: XLS, XLSX, CSV, PDF
          </p>
        </div>
      )}
    </div>
  );
};

export default FileDropzone;
