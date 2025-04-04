
import { UploadedFile } from '../types';

// Mock data for project-specific files (matching the screenshot)
export const PROJECT_FILES_MOCK_DATA: UploadedFile[] = [
  {
    id: 'file-101',
    name: 'Q1 Financial Statement.xlsx',
    fileType: 'excel',
    uploadDate: '2023-03-15T10:30:00Z',
    uploader: {
      id: 'user-1',
      name: 'John Smith',
    },
    size: 2540000,
    documents: [
      {
        id: 'doc-101',
        name: 'Q1-2023-Operating-Statement',
        type: 'operating_statement',
        createdAt: '2023-03-15T10:35:00Z',
        updatedAt: '2023-03-15T14:20:00Z',
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
          id: 'property-1',
          name: 'SF Office Building'
        },
        project: {
          id: '313',
          name: 'SF Office Portfolio'
        },
        portfolio: {
          id: 'portfolio-1',
          name: 'SF Office Portfolio'
        }
      }
    ],
    status: 'complete',
    property: {
      id: 'property-1',
      name: 'SF Office Building'
    },
    project: {
      id: '313',
      name: 'SF Office Portfolio'
    },
    portfolio: {
      id: 'portfolio-1',
      name: 'SF Office Portfolio'
    }
  },
  {
    id: 'file-102',
    name: 'Rent Roll 2023.xlsx',
    fileType: 'excel',
    uploadDate: '2023-02-10T09:45:00Z',
    uploader: {
      id: 'user-2',
      name: 'Sarah Johnson',
    },
    size: 1850000,
    documents: [
      {
        id: 'doc-102',
        name: 'Rent-Roll-2023',
        type: 'rent_roll',
        createdAt: '2023-02-10T09:50:00Z',
        updatedAt: '2023-02-15T15:30:00Z',
        creator: {
          id: 'user-2',
          name: 'Sarah Johnson',
        },
        lastUpdatedBy: {
          id: 'user-1',
          name: 'John Smith',
        },
        status: 'complete',
        property: {
          id: 'property-1',
          name: 'SF Office Building'
        },
        project: {
          id: '313',
          name: 'SF Office Portfolio'
        },
        portfolio: {
          id: 'portfolio-1',
          name: 'SF Office Portfolio'
        }
      }
    ],
    status: 'complete',
    property: {
      id: 'property-1',
      name: 'SF Office Building'
    },
    project: {
      id: '313',
      name: 'SF Office Portfolio'
    },
    portfolio: {
      id: 'portfolio-1',
      name: 'SF Office Portfolio'
    }
  },
  {
    id: 'file-103',
    name: 'Lease Agreement.pdf',
    fileType: 'pdf',
    uploadDate: '2023-04-05T14:15:00Z',
    uploader: {
      id: 'user-1',
      name: 'John Smith',
    },
    size: 1250000,
    documents: [],
    status: 'draft',
    property: {
      id: 'property-1',
      name: 'SF Office Building'
    },
    project: {
      id: '313',
      name: 'SF Office Portfolio'
    },
    portfolio: {
      id: 'portfolio-1',
      name: 'SF Office Portfolio'
    }
  },
  {
    id: 'file-104',
    name: 'Annual Report 2023.pdf',
    fileType: 'pdf',
    uploadDate: '2023-05-10T11:30:00Z',
    uploader: {
      id: 'user-3',
      name: 'Michael Brown',
    },
    size: 4250000,
    documents: [
      {
        id: 'doc-104',
        name: 'Annual-Report-Financial-Data',
        type: 'operating_statement',
        createdAt: '2023-05-10T11:35:00Z',
        updatedAt: '2023-05-10T16:45:00Z',
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
          id: 'property-1',
          name: 'SF Office Building'
        },
        project: {
          id: '313',
          name: 'SF Office Portfolio'
        },
        portfolio: {
          id: 'portfolio-1',
          name: 'SF Office Portfolio'
        }
      }
    ],
    status: 'complete',
    property: {
      id: 'property-1',
      name: 'SF Office Building'
    },
    project: {
      id: '313',
      name: 'SF Office Portfolio'
    },
    portfolio: {
      id: 'portfolio-1',
      name: 'SF Office Portfolio'
    }
  },
  {
    id: 'file-105',
    name: 'Property Portfolio Q2.xlsx',
    fileType: 'excel',
    uploadDate: '2023-06-15T13:20:00Z',
    uploader: {
      id: 'user-2',
      name: 'Sarah Johnson',
    },
    size: 3150000,
    documents: [
      {
        id: 'doc-105',
        name: 'Property-Portfolio-Q2-Data',
        type: 'operating_statement',
        createdAt: '2023-06-15T13:25:00Z',
        updatedAt: '2023-06-16T10:15:00Z',
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
          name: 'SF Office Building'
        },
        project: {
          id: '313',
          name: 'SF Office Portfolio'
        },
        portfolio: {
          id: 'portfolio-1',
          name: 'SF Office Portfolio'
        }
      }
    ],
    status: 'complete',
    property: {
      id: 'property-1',
      name: 'SF Office Building'
    },
    project: {
      id: '313',
      name: 'SF Office Portfolio'
    },
    portfolio: {
      id: 'portfolio-1',
      name: 'SF Office Portfolio'
    }
  }
];
