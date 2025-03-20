
export type FileType = 'pdf' | 'excel' | 'csv' | 'other';
export type DocumentType = 'rent_roll' | 'operating_statement' | 'other';

export interface FileUploader {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  createdAt: string;
  extractedData?: any;
  status: 'processed' | 'processing' | 'error';
}

export interface UploadedFile {
  id: string;
  name: string;
  fileType: FileType;
  uploadDate: string;
  uploader: FileUploader;
  size: number;
  documents: Document[];
  status: 'processed' | 'processing' | 'error';
}
