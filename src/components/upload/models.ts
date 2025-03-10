
export interface UploadedFile {
  file: File;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  projectId: string | null;
  fileType: 'rent_roll' | 'operating_statement' | null;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  assetType?: string;
  address?: string;
  createdAt?: string;
  createdBy?: string;
  modifiedAt?: string | null;
  modifiedBy?: string | null;
  properties?: Property[];
}

export interface Property {
  id: string;
  name: string;
  streetNo?: string;
  streetName?: string;
  address?: string;
  city?: string;
  country?: string;
  state?: string;
  zip?: string;
  units?: number;
  sqft?: number;
  createdAt?: string;
}

export interface PropertyData {
  name?: string;
  streetNo?: string;
  streetName?: string;
  address?: string;
  city?: string;
  country?: string;
  state?: string;
  zip?: string;
  units?: number;
  sqft?: number;
}

export interface FileType {
  id: string;
  name: string;
}
