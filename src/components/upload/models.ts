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
}

export interface PropertyData {
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  units?: number;
  sqft?: number;
}

export interface FileType {
  id: string;
  name: string;
}
