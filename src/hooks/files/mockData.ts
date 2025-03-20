import { UploadedFile } from './types';

// Mock data for files and documents
export const MOCK_FILES: UploadedFile[] = [
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
    id: 'file-8',
    name: 'Sunset-Gardens-OperationalData.pdf',
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
    id: 'file-10',
    name: 'Meadowbrook-Estate-Report.pdf',
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
  },
  {
    id: 'file-12',
    name: 'Parkview-Gardens-Data.pdf',
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
    id: 'file-14',
    name: 'Woodland-Terrace-Report.pdf',
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
