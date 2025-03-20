
import { UploadedFile } from '../types';

// Mock data for files with multiple properties
export const MULTI_PROPERTY_FILES: UploadedFile[] = [
  {
    id: 'file-4',
    name: 'Multi-Property-Analysis.xlsx',
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
        name: 'Riverfront-Rent-Roll',
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
        name: 'Parkside-Financials',
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
          id: 'property-15',
          name: 'Parkside Villas'
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
        name: 'Lakefront-Data',
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
          id: 'property-16',
          name: 'Lakefront Towers'
        },
        project: {
          id: 'project-4',
          name: 'Riverfront Acquisition'
        },
        portfolio: {
          id: 'portfolio-11',
          name: 'Waterside Collection'
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
  },
  {
    id: 'file-13',
    name: 'Portfolio-Wide-Analysis.xlsx',
    fileType: 'excel',
    uploadDate: '2023-11-05T09:15:00Z',
    uploader: {
      id: 'user-3',
      name: 'Michael Brown',
    },
    size: 2650000,
    documents: [
      {
        id: 'doc-18',
        name: 'Harborview-Rent-Roll',
        type: 'rent_roll',
        createdAt: '2023-11-05T09:20:00Z',
        updatedAt: '2023-11-06T13:45:00Z',
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
          id: 'property-12',
          name: 'Harborview Heights'
        },
        project: {
          id: 'project-13',
          name: 'Coastal Portfolio Review'
        },
        portfolio: {
          id: 'portfolio-9',
          name: 'Waterfront Properties'
        }
      },
      {
        id: 'doc-19',
        name: 'Bayview-Rent-Roll',
        type: 'rent_roll',
        createdAt: '2023-11-05T10:30:00Z',
        updatedAt: '2023-11-06T15:20:00Z',
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
          id: 'property-17',
          name: 'Bayview Point'
        },
        project: {
          id: 'project-13',
          name: 'Coastal Portfolio Review'
        },
        portfolio: {
          id: 'portfolio-9',
          name: 'Waterfront Properties'
        }
      },
      {
        id: 'doc-20',
        name: 'Marina-Rent-Roll',
        type: 'rent_roll',
        createdAt: '2023-11-05T11:45:00Z',
        updatedAt: '2023-11-06T16:50:00Z',
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
          id: 'property-18',
          name: 'Marina Apartments'
        },
        project: {
          id: 'project-13',
          name: 'Coastal Portfolio Review'
        },
        portfolio: {
          id: 'portfolio-9',
          name: 'Waterfront Properties'
        }
      }
    ],
    // File has no direct property assignment, only at document level
    status: 'complete',
    project: {
      id: 'project-13',
      name: 'Coastal Portfolio Review'
    },
    portfolio: {
      id: 'portfolio-9',
      name: 'Waterfront Properties'
    }
  },
  {
    id: 'file-16',
    name: 'Mixed-Metro-Properties.pdf',
    fileType: 'pdf',
    uploadDate: '2023-12-20T09:30:00Z',
    uploader: {
      id: 'user-1',
      name: 'John Smith',
    },
    size: 4250000,
    documents: [
      {
        id: 'doc-21',
        name: 'Downtown-OS',
        type: 'operating_statement',
        createdAt: '2023-12-20T09:40:00Z',
        updatedAt: '2023-12-21T11:20:00Z',
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
          id: 'property-19',
          name: 'Downtown Lofts'
        },
        project: {
          id: 'project-16',
          name: 'Metro Analysis'
        },
        portfolio: {
          id: 'portfolio-12',
          name: 'Urban Core Properties'
        }
      },
      {
        id: 'doc-22',
        name: 'Midtown-OS',
        type: 'operating_statement',
        createdAt: '2023-12-20T10:15:00Z',
        updatedAt: '2023-12-21T13:45:00Z',
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
          id: 'property-20',
          name: 'Midtown Suites'
        },
        project: {
          id: 'project-16',
          name: 'Metro Analysis'
        },
        portfolio: {
          id: 'portfolio-12',
          name: 'Urban Core Properties'
        }
      },
      {
        id: 'doc-23',
        name: 'Uptown-OS',
        type: 'operating_statement',
        createdAt: '2023-12-20T11:30:00Z',
        updatedAt: '2023-12-21T15:10:00Z',
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
          id: 'property-21',
          name: 'Uptown Heights'
        },
        project: {
          id: 'project-16',
          name: 'Metro Analysis'
        },
        portfolio: {
          id: 'portfolio-12',
          name: 'Urban Core Properties'
        }
      }
    ],
    status: 'complete',
    // This file demonstrates multiple different properties in documents with no single property assigned at the file level
    project: {
      id: 'project-16',
      name: 'Metro Analysis'
    },
    portfolio: {
      id: 'portfolio-12',
      name: 'Urban Core Properties'
    }
  }
];
