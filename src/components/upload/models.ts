
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
  propertyData?: PropertyData;
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
