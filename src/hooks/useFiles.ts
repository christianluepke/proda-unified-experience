
import { useState, useEffect } from 'react';
import { UploadedFile, Document, DocumentType } from '@/components/files/models';
import { toast } from "@/components/ui/use-toast";

// Mock data for files and documents
const MOCK_FILES: UploadedFile[] = [
  {
    id: 'file-1',
    name: 'Q1-2023-Financials.pdf',
    fileType: 'pdf',
    uploadDate: '2023-03-15T10:30:00Z',
    uploader: {
      id: 'user-1',
      name: 'John Smith',
    },
    size: 2540000, // Size in bytes
    documents: [
      {
        id: 'doc-1',
        name: 'Q1-2023-Operating-Statement',
        type: 'operating_statement',
        createdAt: '2023-03-15T10:35:00Z',
        status: 'processed',
      }
    ],
    status: 'processed',
  },
  {
    id: 'file-2',
    name: 'Skyview-Apartments-Data.xlsx',
    fileType: 'excel',
    uploadDate: '2023-04-05T14:20:00Z',
    uploader: {
      id: 'user-2',
      name: 'Sarah Johnson',
    },
    size: 1250000,
    documents: [
      {
        id: 'doc-2',
        name: 'Skyview-Rent-Roll',
        type: 'rent_roll',
        createdAt: '2023-04-05T14:25:00Z',
        status: 'processed',
      },
      {
        id: 'doc-3',
        name: 'Skyview-Operating-Statement',
        type: 'operating_statement',
        createdAt: '2023-04-05T14:30:00Z',
        status: 'processed',
      }
    ],
    status: 'processed',
  },
  {
    id: 'file-3',
    name: 'Highland-Property-Data.pdf',
    fileType: 'pdf',
    uploadDate: '2023-05-20T09:15:00Z',
    uploader: {
      id: 'user-1',
      name: 'John Smith',
    },
    size: 3100000,
    documents: [
      {
        id: 'doc-4',
        name: 'Highland-Rent-Roll',
        type: 'rent_roll',
        createdAt: '2023-05-20T09:20:00Z',
        status: 'processed',
      }
    ],
    status: 'processed',
  },
  {
    id: 'file-4',
    name: 'New-Acquisition-Data.xlsx',
    fileType: 'excel',
    uploadDate: '2023-06-10T16:45:00Z',
    uploader: {
      id: 'user-3',
      name: 'Michael Brown',
    },
    size: 1800000,
    documents: [
      {
        id: 'doc-5',
        name: 'New-Property-Rent-Roll',
        type: 'rent_roll',
        createdAt: '2023-06-10T16:50:00Z',
        status: 'processing',
      },
      {
        id: 'doc-6',
        name: 'New-Property-Financials',
        type: 'operating_statement',
        createdAt: '2023-06-10T16:55:00Z',
        status: 'processing',
      },
      {
        id: 'doc-7',
        name: 'New-Property-Other',
        type: 'other',
        createdAt: '2023-06-10T17:00:00Z',
        status: 'processing',
      }
    ],
    status: 'processing',
  }
];

export function useFiles() {
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

  // Helper function to determine file document type label
  const getFileDocumentTypeLabel = (file: UploadedFile): string => {
    if (file.documents.length === 0) return 'Unknown';
    
    if (file.documents.length === 1) {
      return getDocumentTypeLabel(file.documents[0].type);
    }
    
    // Check if all documents are of the same type
    const types = new Set(file.documents.map(doc => doc.type));
    if (types.size === 1) {
      return getDocumentTypeLabel(file.documents[0].type);
    }
    
    return 'Mixed';
  };

  // Helper to get readable document type
  const getDocumentTypeLabel = (type: DocumentType): string => {
    switch (type) {
      case 'rent_roll':
        return 'Rent Roll';
      case 'operating_statement':
        return 'Operating Statement';
      default:
        return 'Other';
    }
  };

  return {
    files,
    isLoading,
    deleteFile,
    getFileDocumentTypeLabel,
    getDocumentTypeLabel
  };
}
