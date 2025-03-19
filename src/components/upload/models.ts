
// If the file doesn't exist, or we need to add to it, we'll create/update it
export interface Project {
  id: string;
  name: string;
  description: string;
  assetType: string;
  database?: string;
  address: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string | null;
  modifiedBy: string | null;
  properties: Property[];
}

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
}

export interface PropertyData {
  name?: string;
  streetNo?: string;
  streetName?: string;
  address: string;
  city: string;
  state: string;
  country?: string;
  zip: string;
  units?: number;
  sqft?: number;
}

export type FileType = {
  id: string;
  value: 'rent_roll' | 'operating_statement';
  label: string;
  description?: string;
  name: string;
};

export interface UploadedFile {
  file: File;
  progress: number;
  status: 'uploading' | 'error' | 'success';
  projectId: string | null;
  fileType: 'rent_roll' | 'operating_statement' | null;
}
