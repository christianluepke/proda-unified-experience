import { useState, useEffect, useMemo } from 'react';
import { UploadedFile, Document, DocumentType, ProcessingStatus, FileFilters, TableColumn } from '@/components/files/models';
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

// Define the available columns
export const FILE_COLUMNS: TableColumn[] = [
  { id: 'name', label: 'File Name', visible: true },
  { id: 'type', label: 'Document Type', visible: true },
  { id: 'uploadDate', label: 'Upload Date', visible: true },
  { id: 'size', label: 'Size', visible: true },
  { id: 'property', label: 'Property', visible: false },
  { id: 'project', label: 'Project', visible: false },
  { id: 'portfolio', label: 'Portfolio', visible: false },
  { id: 'status', label: 'Status', visible: true },
];

export function useFiles() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('uploadDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [activeFilters, setActiveFilters] = useState<FileFilters>({
    documentTypes: [],
    uploaders: [],
    properties: [],
    projects: [],
    portfolios: [],
    status: []
  });
  const [visibleColumns, setVisibleColumns] = useState(FILE_COLUMNS);

  // Get available filter options from the data
  const filterOptions = useMemo(() => {
    const documentTypes = new Set<DocumentType>();
    const uploaders = new Set<string>();
    const properties = new Set<string>();
    const projects = new Set<string>();
    const portfolios = new Set<string>();
    const statuses = new Set<ProcessingStatus>();

    files.forEach(file => {
      if (file.uploader.id) uploaders.add(file.uploader.id);
      if (file.property?.id) properties.add(file.property.id);
      if (file.project?.id) projects.add(file.project.id);
      if (file.portfolio?.id) portfolios.add(file.portfolio.id);
      if (file.status) statuses.add(file.status);
      
      file.documents.forEach(doc => {
        documentTypes.add(doc.type);
      });
    });

    return {
      documentTypes: Array.from(documentTypes),
      uploaders: Array.from(uploaders),
      properties: Array.from(properties),
      projects: Array.from(projects),
      portfolios: Array.from(portfolios),
      statuses: Array.from(statuses)
    };
  }, [files]);

  // Filtered and sorted files
  const filteredFiles = useMemo(() => {
    return files
      .filter(file => {
        // Search term filter
        const matchesSearch = searchTerm === '' || 
          file.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Document type filter
        const hasDocumentTypeFilter = activeFilters.documentTypes.length > 0;
        const matchesDocType = !hasDocumentTypeFilter || 
          file.documents.some(doc => activeFilters.documentTypes.includes(doc.type));
        
        // Uploader filter
        const hasUploaderFilter = activeFilters.uploaders.length > 0;
        const matchesUploader = !hasUploaderFilter || 
          activeFilters.uploaders.includes(file.uploader.id);
        
        // Property filter
        const hasPropertyFilter = activeFilters.properties.length > 0;
        const matchesProperty = !hasPropertyFilter || 
          (file.property && activeFilters.properties.includes(file.property.id));
        
        // Project filter
        const hasProjectFilter = activeFilters.projects.length > 0;
        const matchesProject = !hasProjectFilter || 
          (file.project && activeFilters.projects.includes(file.project.id));
        
        // Portfolio filter
        const hasPortfolioFilter = activeFilters.portfolios.length > 0;
        const matchesPortfolio = !hasPortfolioFilter || 
          (file.portfolio && activeFilters.portfolios.includes(file.portfolio.id));
        
        // Status filter
        const hasStatusFilter = activeFilters.status.length > 0;
        const matchesStatus = !hasStatusFilter || 
          activeFilters.status.includes(file.status);
        
        return matchesSearch && matchesDocType && matchesUploader && 
               matchesProperty && matchesProject && matchesPortfolio && matchesStatus;
      })
      .sort((a, b) => {
        // Handle different sort fields
        let valA, valB;
        
        switch (sortField) {
          case 'name':
            valA = a.name;
            valB = b.name;
            break;
          case 'type': {
            const typeA = getFileDocumentTypeLabel(a);
            const typeB = getFileDocumentTypeLabel(b);
            valA = typeA;
            valB = typeB;
            break;
          }
          case 'uploadDate':
            valA = new Date(a.uploadDate).getTime();
            valB = new Date(b.uploadDate).getTime();
            break;
          case 'size':
            valA = a.size;
            valB = b.size;
            break;
          case 'property':
            valA = a.property?.name || '';
            valB = b.property?.name || '';
            break;
          case 'project':
            valA = a.project?.name || '';
            valB = b.project?.name || '';
            break;
          case 'portfolio':
            valA = a.portfolio?.name || '';
            valB = b.portfolio?.name || '';
            break;
          case 'status':
            valA = a.status;
            valB = b.status;
            break;
          default:
            valA = new Date(a.uploadDate).getTime();
            valB = new Date(b.uploadDate).getTime();
        }
        
        // Compare the values
        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
  }, [files, searchTerm, activeFilters, sortField, sortDirection]);

  // Toggle a column's visibility
  const toggleColumnVisibility = (columnId: string) => {
    setVisibleColumns(prevColumns => 
      prevColumns.map(col => 
        col.id === columnId ? { ...col, visible: !col.visible } : col
      )
    );
  };

  // Update sort configuration
  const updateSort = (field: string) => {
    if (sortField === field) {
      // Toggle direction if clicking the same field
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Update filters
  const updateFilters = (newFilters: Partial<FileFilters>) => {
    setActiveFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setActiveFilters({
      documentTypes: [],
      uploaders: [],
      properties: [],
      projects: [],
      portfolios: [],
      status: []
    });
    setSearchTerm('');
  };

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
    getDocumentTypeLabel,
    searchTerm,
    setSearchTerm,
    sortField,
    sortDirection,
    updateSort,
    activeFilters,
    updateFilters,
    resetFilters,
    filteredFiles,
    filterOptions,
    visibleColumns,
    toggleColumnVisibility
  };
}
