
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
      className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
        isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/40 bg-blue-50/50'
      } ${size === 'large' ? 'py-20' : 'py-4'} ${className || ''} hover:bg-blue-100/50`}
    >
      <input {...getInputProps()} />
      <UploadCloud className={`mx-auto text-primary/80 mb-4 ${size === 'large' ? 'h-20 w-20' : 'h-10 w-10'}`} />
      {isDragActive ? (
        <p className={`${size === 'large' ? 'text-lg' : 'text-sm'} text-primary font-medium`}>Drop the files here...</p>
      ) : (
        <div>
          <p className={`font-medium ${size === 'large' ? 'text-xl' : 'text-sm'} text-foreground`}>
            Drag and drop files here, or click to select files
          </p>
          <p className={`${size === 'large' ? 'text-sm' : 'text-xs'} text-muted-foreground mt-2`}>
            Supported formats: XLS, XLSX, CSV, PDF
          </p>
        </div>
      )}
    </div>
  );
};

export default FileDropzone;
