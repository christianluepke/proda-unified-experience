
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
  projectId?: string;
  projectName?: string;
  portfolioName?: string;
  latestRentRollDate?: string;
  parkingArea?: number;
  tenantCount?: number;
  occupancy?: number;
  vacancy?: number;
  contractedRentPA?: number;
  waltBreak?: number;
  waltExpiry?: number;
  propertyManager?: string;
  assetManager?: string;
  region?: string;
  acquisitionDate?: string;
  saleDate?: string;
  underwritingStartDate?: string;
  areaUnit?: 'sqft' | 'sqm';
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

// Add PropertyData interface for property form data
export interface PropertyData {
  name?: string;
  streetNo?: string;
  streetName?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  units?: number;
  sqft?: number;
}

// Add UploadedFile interface for file upload state
export interface UploadedFile {
  file: File;
  projectId?: string | null;
  fileType: 'rent_roll' | 'operating_statement' | 'budget' | 'other' | null;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
}

// Add FileType interface for file type selection
export interface FileType {
  id: string;
  value: string;
  name: string;
  label?: string;
}
