
import { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { UploadedFile } from './types';
import { MOCK_FILES } from './mockData';
import { getFileDocumentTypeLabel, getDocumentTypeLabel, formatFileSize } from './fileUtils';

export function useFilesData() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch files
    const fetchFiles = async () => {
      setIsLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setFiles(MOCK_FILES);
      } catch (error) {
        console.error('Error fetching files:', error);
        toast({
          title: "Error",
          description: "Failed to load files",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const deleteFile = (fileId: string) => {
    // In a real app, this would call an API to delete the file
    setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
    toast({
      title: "File Deleted",
      description: "The file has been successfully deleted",
    });
  };

  return {
    files,
    isLoading,
    deleteFile,
    getFileDocumentTypeLabel,
    getDocumentTypeLabel,
    formatFileSize
  };
}
