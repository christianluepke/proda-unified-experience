
import { UploadedFile } from '../types';

// Mock data for property-related files
export const PROPERTY_FILES: UploadedFile[] = [
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
    id: 'file-6',
    name: 'Oakview-Property-Analysis.pdf',
    fileType: 'pdf',
    uploadDate: '2023-07-15T14:20:00Z',
    uploader: {
      id: 'user-2',
      name: 'Sarah Johnson',
    },
    size: 2450000,
    documents: [
      {
        id: 'doc-9',
        name: 'Oakview-Property-Analysis',
        type: 'operating_statement',
        createdAt: '2023-07-15T14:25:00Z',
        updatedAt: '2023-07-16T09:30:00Z',
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
          id: 'property-5',
          name: 'Oakview Apartments'
        },
        project: {
          id: 'project-6',
          name: 'Oakview Analysis'
        },
        portfolio: {
          id: 'portfolio-3',
          name: 'Mountain Properties'
        }
      }
    ],
    status: 'complete',
    property: {
      id: 'property-5',
      name: 'Oakview Apartments'
    },
    project: {
      id: 'project-6',
      name: 'Oakview Analysis'
    },
    portfolio: {
      id: 'portfolio-3',
      name: 'Mountain Properties'
    }
  },
  {
    id: 'file-15',
    name: 'Hillcrest-Apartments-Data.xlsx',
    fileType: 'excel',
    uploadDate: '2023-12-10T13:45:00Z',
    uploader: {
      id: 'user-2',
      name: 'Sarah Johnson',
    },
    size: 1850000,
    documents: [
      {
        id: 'doc-18',
        name: 'Hillcrest-Rent-Roll',
        type: 'rent_roll',
        createdAt: '2023-12-10T13:50:00Z',
        updatedAt: '2023-12-11T10:15:00Z',
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
          id: 'property-14',
          name: 'Hillcrest Apartments'
        },
        project: {
          id: 'project-15',
          name: 'Hillcrest Analysis'
        },
        portfolio: {
          id: 'portfolio-3',
          name: 'Mountain Properties'
        }
      }
    ],
    status: 'complete',
    property: {
      id: 'property-14',
      name: 'Hillcrest Apartments'
    },
    project: {
      id: 'project-15',
      name: 'Hillcrest Analysis'
    },
    portfolio: {
      id: 'portfolio-3',
      name: 'Mountain Properties'
    }
  }
];
