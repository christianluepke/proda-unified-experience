
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
}

export interface FileType {
  id: string;
  name: string;
}
