
import { UploadedFile } from '../types';

// Mock data for financial-related files
export const FINANCIAL_FILES: UploadedFile[] = [
  {
    id: 'file-1',
    name: 'Q1-2023 Operating Statement.pdf',
    fileType: 'pdf',
    uploadDate: '2023-03-15T10:30:00Z',
    uploader: {
      id: 'user-1',
      name: 'John Smith',
    },
    size: 2540000,
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
    id: 'file-10',
    name: 'Meadowbrook Estate Operating Statement.pdf',
    fileType: 'pdf',
    uploadDate: '2023-09-25T12:15:00Z',
    uploader: {
      id: 'user-3',
      name: 'Michael Brown',
    },
    size: 1850000,
    documents: [
      {
        id: 'doc-13',
        name: 'Meadowbrook-Operating-Statement',
        type: 'operating_statement',
        createdAt: '2023-09-25T12:20:00Z',
        updatedAt: '2023-09-26T14:10:00Z',
        creator: {
          id: 'user-3',
          name: 'Michael Brown',
        },
        lastUpdatedBy: {
          id: 'user-3',
          name: 'Michael Brown',
        },
        status: 'complete',
        property: {
          id: 'property-9',
          name: 'Meadowbrook Estate'
        },
        project: {
          id: 'project-10',
          name: 'Meadowbrook Review'
        },
        portfolio: {
          id: 'portfolio-6',
          name: 'Suburban Properties'
        }
      }
    ],
    status: 'complete',
    property: {
      id: 'property-9',
      name: 'Meadowbrook Estate'
    },
    project: {
      id: 'project-10',
      name: 'Meadowbrook Review'
    },
    portfolio: {
      id: 'portfolio-6',
      name: 'Suburban Properties'
    }
  },
  {
    id: 'file-12',
    name: 'Parkview Gardens Operating Statement Q4.pdf',
    fileType: 'pdf',
    uploadDate: '2023-10-18T14:30:00Z',
    uploader: {
      id: 'user-2',
      name: 'Sarah Johnson',
    },
    size: 2750000,
    documents: [
      {
        id: 'doc-15',
        name: 'Parkview-Operating-Statement',
        type: 'operating_statement',
        createdAt: '2023-10-18T14:35:00Z',
        updatedAt: '2023-10-19T11:45:00Z',
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
          id: 'property-11',
          name: 'Parkview Gardens'
        },
        project: {
          id: 'project-12',
          name: 'Parkview Review'
        },
        portfolio: {
          id: 'portfolio-8',
          name: 'Residential Properties'
        }
      }
    ],
    status: 'complete',
    property: {
      id: 'property-11',
      name: 'Parkview Gardens'
    },
    project: {
      id: 'project-12',
      name: 'Parkview Review'
    },
    portfolio: {
      id: 'portfolio-8',
      name: 'Residential Properties'
    }
  }
];
