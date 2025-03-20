import { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { UploadedFile, DocumentType } from './types';

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
        updatedAt: '2023-03-16T14:20:00Z',
        creator: {
          id: 'user-1',
          name: 'John Smith',
        },
        lastUpdatedBy: {
          id: 'user-2',
          name: 'Sarah Johnson',
        },
        status: 'complete',
        property: {
          id: 'property-1',
          name: 'Skyview Apartments'
        },
        project: {
          id: 'project-1',
          name: 'Q1 Financial Review'
        },
        portfolio: {
          id: 'portfolio-1',
          name: 'Downtown Properties'
        }
      }
    ],
    status: 'complete',
    property: {
      id: 'property-1',
      name: 'Skyview Apartments'
    },
    project: {
      id: 'project-1',
      name: 'Q1 Financial Review'
    },
    portfolio: {
      id: 'portfolio-1',
      name: 'Downtown Properties'
    }
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
        updatedAt: '2023-04-06T09:15:00Z',
        creator: {
          id: 'user-2',
          name: 'Sarah Johnson',
        },
        lastUpdatedBy: {
          id: 'user-2',
          name: 'Sarah Johnson',
        },
        status: 'complete',
        property: {
          id: 'property-1',
          name: 'Skyview Apartments'
        },
        project: {
          id: 'project-2',
          name: 'Skyview Analysis'
        },
        portfolio: {
          id: 'portfolio-1',
          name: 'Downtown Properties'
        }
      },
      {
        id: 'doc-3',
        name: 'Skyview-Operating-Statement',
        type: 'operating_statement',
        createdAt: '2023-04-05T14:30:00Z',
        updatedAt: '2023-04-07T11:45:00Z',
        creator: {
          id: 'user-2',
          name: 'Sarah Johnson',
        },
        lastUpdatedBy: {
          id: 'user-3',
          name: 'Michael Brown',
        },
        status: 'complete',
        property: {
          id: 'property-1',
          name: 'Skyview Apartments'
        },
        project: {
          id: 'project-2',
          name: 'Skyview Analysis'
        },
        portfolio: {
          id: 'portfolio-1',
          name: 'Downtown Properties'
        }
      }
    ],
    status: 'complete',
    property: {
      id: 'property-1',
      name: 'Skyview Apartments'
    },
    project: {
      id: 'project-2',
      name: 'Skyview Analysis'
    },
    portfolio: {
      id: 'portfolio-1',
      name: 'Downtown Properties'
    }
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
        updatedAt: '2023-05-21T10:30:00Z',
        creator: {
          id: 'user-1',
          name: 'John Smith',
        },
        lastUpdatedBy: {
          id: 'user-1',
          name: 'John Smith',
        },
        status: 'complete',
        property: {
          id: 'property-2',
          name: 'Highland Towers'
        },
        project: {
          id: 'project-3',
          name: 'Highland Acquisition'
        },
        portfolio: {
          id: 'portfolio-2',
          name: 'Uptown Properties'
        }
      }
    ],
    status: 'complete',
    property: {
      id: 'property-2',
      name: 'Highland Towers'
    },
    project: {
      id: 'project-3',
      name: 'Highland Acquisition'
    },
    portfolio: {
      id: 'portfolio-2',
      name: 'Uptown Properties'
    }
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
        updatedAt: '2023-06-10T16:50:00Z',
        creator: {
          id: 'user-3',
          name: 'Michael Brown',
        },
        lastUpdatedBy: {
          id: 'user-3',
          name: 'Michael Brown',
        },
        status: 'processing',
        property: {
          id: 'property-3',
          name: 'Riverfront Residences'
        },
        project: {
          id: 'project-4',
          name: 'Riverfront Acquisition'
        },
        portfolio: {
          id: 'portfolio-2',
          name: 'Uptown Properties'
        }
      },
      {
        id: 'doc-6',
        name: 'New-Property-Financials',
        type: 'operating_statement',
        createdAt: '2023-06-10T16:55:00Z',
        updatedAt: '2023-06-10T16:55:00Z',
        creator: {
          id: 'user-3',
          name: 'Michael Brown',
        },
        lastUpdatedBy: {
          id: 'user-3',
          name: 'Michael Brown',
        },
        status: 'processing',
        property: {
          id: 'property-3',
          name: 'Riverfront Residences'
        },
        project: {
          id: 'project-4',
          name: 'Riverfront Acquisition'
        },
        portfolio: {
          id: 'portfolio-2',
          name: 'Uptown Properties'
        }
      },
      {
        id: 'doc-7',
        name: 'New-Property-Other',
        type: 'other',
        createdAt: '2023-06-10T17:00:00Z',
        updatedAt: '2023-06-11T09:20:00Z',
        creator: {
          id: 'user-3',
          name: 'Michael Brown',
        },
        lastUpdatedBy: {
          id: 'user-3',
          name: 'Michael Brown',
        },
        status: 'processing',
        property: {
          id: 'property-3',
          name: 'Riverfront Residences'
        },
        project: {
          id: 'project-4',
          name: 'Riverfront Acquisition'
        },
        portfolio: {
          id: 'portfolio-2',
          name: 'Uptown Properties'
        }
      }
    ],
    status: 'processing',
    property: {
      id: 'property-3',
      name: 'Riverfront Residences'
    },
    project: {
      id: 'project-4',
      name: 'Riverfront Acquisition'
    },
    portfolio: {
      id: 'portfolio-2',
      name: 'Uptown Properties'
    }
  },
  {
    id: 'file-5',
    name: 'Draft-Import-Test.pdf',
    fileType: 'pdf',
    uploadDate: '2023-07-01T08:30:00Z',
    uploader: {
      id: 'user-1',
      name: 'John Smith',
    },
    size: 950000,
    documents: [
      {
        id: 'doc-8',
        name: 'Draft-Operating-Statement',
        type: 'operating_statement',
        createdAt: '2023-07-01T08:35:00Z',
        updatedAt: '2023-07-01T08:35:00Z',
        creator: {
          id: 'user-1',
          name: 'John Smith',
        },
        lastUpdatedBy: {
          id: 'user-1',
          name: 'John Smith',
        },
        status: 'draft',
        property: {
          id: 'property-4',
          name: 'Mountain View Apartments'
        },
        project: {
          id: 'project-5',
          name: 'Mountain View Analysis'
        },
        portfolio: {
          id: 'portfolio-3',
          name: 'Mountain Properties'
        }
      }
    ],
    status: 'draft',
    property: {
      id: 'property-4',
      name: 'Mountain View Apartments'
    },
    project: {
      id: 'project-5',
      name: 'Mountain View Analysis'
    },
    portfolio: {
      id: 'portfolio-3',
      name: 'Mountain Properties'
    }
  }
];

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

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
