
import { UploadedFile } from '../types';

// Mock data for portfolio-related files
export const PORTFOLIO_FILES: UploadedFile[] = [
  {
    id: 'file-8',
    name: 'Sunset Gardens Operating Statement.pdf',
    fileType: 'pdf',
    uploadDate: '2023-08-20T09:45:00Z',
    uploader: {
      id: 'user-1',
      name: 'John Smith',
    },
    size: 3250000,
    documents: [
      {
        id: 'doc-11',
        name: 'Sunset-Gardens-OS',
        type: 'operating_statement',
        createdAt: '2023-08-20T09:50:00Z',
        updatedAt: '2023-08-21T13:15:00Z',
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
          id: 'property-7',
          name: 'Sunset Gardens'
        },
        project: {
          id: 'project-8',
          name: 'Sunset Gardens Review'
        },
        portfolio: {
          id: 'portfolio-4',
          name: 'Coastal Properties'
        }
      }
    ],
    status: 'complete',
    property: {
      id: 'property-7',
      name: 'Sunset Gardens'
    },
    project: {
      id: 'project-8',
      name: 'Sunset Gardens Review'
    },
    portfolio: {
      id: 'portfolio-4',
      name: 'Coastal Properties'
    }
  },
  {
    id: 'file-14',
    name: 'Woodland Terrace Operating Statement.pdf',
    fileType: 'pdf',
    uploadDate: '2023-11-20T11:30:00Z',
    uploader: {
      id: 'user-1',
      name: 'John Smith',
    },
    size: 2850000,
    documents: [
      {
        id: 'doc-17',
        name: 'Woodland-Terrace-OS',
        type: 'operating_statement',
        createdAt: '2023-11-20T11:35:00Z',
        updatedAt: '2023-11-21T14:20:00Z',
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
          id: 'property-13',
          name: 'Woodland Terrace'
        },
        project: {
          id: 'project-14',
          name: 'Woodland Review'
        },
        portfolio: {
          id: 'portfolio-10',
          name: 'Luxury Properties'
        }
      }
    ],
    status: 'complete',
    property: {
      id: 'property-13',
      name: 'Woodland Terrace'
    },
    project: {
      id: 'project-14',
      name: 'Woodland Review'
    },
    portfolio: {
      id: 'portfolio-10',
      name: 'Luxury Properties'
    }
  }
];
