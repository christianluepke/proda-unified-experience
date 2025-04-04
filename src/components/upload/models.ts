
export interface Property {
  id: string;
  name: string;
  streetNo: string;
  streetName: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  units: number;
  sqft: number;
  createdAt: string;
  assetType?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  assetType: string;
  database: string;
  address: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string | null;
  modifiedBy: string | null;
  properties: Property[];
  status: 'New' | 'Active' | 'Closed' | 'Sold' | 'Lost';
  numberOfUnits: number;
  portfolioName: string;
  projectOwner: string;
}

export interface FileUpload {
  file: File;
  project: string | null;
  fileType: 'rent_roll' | 'operating_statement' | 'budget' | 'other';
  property: string | null;
  progress: number;
  status: 'pending' | 'uploading' | 'complete' | 'error';
  message?: string;
}

export interface UploadStatusResponse {
  success: boolean;
  message: string;
  nextStep?: string;
  extractionId?: string;
}
