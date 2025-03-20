
import { UploadedFile } from '../types';

// Mock data for rent roll files
export const RENT_ROLL_FILES: UploadedFile[] = [
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
    id: 'file-7',
    name: 'Lakeshore-Heights-RentRoll.xlsx',
    fileType: 'excel',
    uploadDate: '2023-08-05T11:15:00Z',
    uploader: {
      id: 'user-3',
      name: 'Michael Brown',
    },
    size: 1750000,
    documents: [
      {
        id: 'doc-10',
        name: 'Lakeshore-Rent-Roll',
        type: 'rent_roll',
        createdAt: '2023-08-05T11:20:00Z',
        updatedAt: '2023-08-06T14:30:00Z',
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
          id: 'property-6',
          name: 'Lakeshore Heights'
        },
        project: {
          id: 'project-7',
          name: 'Lakeshore Analysis'
        },
        portfolio: {
          id: 'portfolio-3',
          name: 'Mountain Properties'
        }
      }
    ],
    status: 'complete',
    property: {
      id: 'property-6',
      name: 'Lakeshore Heights'
    },
    project: {
      id: 'project-7',
      name: 'Lakeshore Analysis'
    },
    portfolio: {
      id: 'portfolio-3',
      name: 'Mountain Properties'
    }
  },
  {
    id: 'file-9',
    name: 'Cityview-Tower-Analysis.xlsx',
    fileType: 'excel',
    uploadDate: '2023-09-10T15:30:00Z',
    uploader: {
      id: 'user-2',
      name: 'Sarah Johnson',
    },
    size: 2100000,
    documents: [
      {
        id: 'doc-12',
        name: 'Cityview-Rent-Roll',
        type: 'rent_roll',
        createdAt: '2023-09-10T15:35:00Z',
        updatedAt: '2023-09-11T10:20:00Z',
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
          id: 'property-8',
          name: 'Cityview Tower'
        },
        project: {
          id: 'project-9',
          name: 'Cityview Analysis'
        },
        portfolio: {
          id: 'portfolio-5',
          name: 'Urban Properties'
        }
      }
    ],
    status: 'complete',
    property: {
      id: 'property-8',
      name: 'Cityview Tower'
    },
    project: {
      id: 'project-9',
      name: 'Cityview Analysis'
    },
    portfolio: {
      id: 'portfolio-5',
      name: 'Urban Properties'
    }
  },
  {
    id: 'file-11',
    name: 'Pinecrest-Plaza-Data.xlsx',
    fileType: 'excel',
    uploadDate: '2023-10-07T10:45:00Z',
    uploader: {
      id: 'user-1',
      name: 'John Smith',
    },
    size: 1950000,
    documents: [
      {
        id: 'doc-14',
        name: 'Pinecrest-Plaza-Rent-Roll',
        type: 'rent_roll',
        createdAt: '2023-10-07T10:50:00Z',
        updatedAt: '2023-10-08T09:15:00Z',
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
          id: 'property-10',
          name: 'Pinecrest Plaza'
        },
        project: {
          id: 'project-11',
          name: 'Pinecrest Analysis'
        },
        portfolio: {
          id: 'portfolio-7',
          name: 'Commercial Properties'
        }
      }
    ],
    status: 'complete',
    property: {
      id: 'property-10',
      name: 'Pinecrest Plaza'
    },
    project: {
      id: 'project-11',
      name: 'Pinecrest Analysis'
    },
    portfolio: {
      id: 'portfolio-7',
      name: 'Commercial Properties'
    }
  }
];
