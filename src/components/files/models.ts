
export type FileType = 'pdf' | 'excel' | 'csv' | 'other';
export type DocumentType = 'rent_roll' | 'operating_statement' | 'budget' | 'other';
export type ProcessingStatus = 'draft' | 'processing' | 'complete' | 'error';

export interface FileUploader {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface ProjectInfo {
  id: string;
  name: string;
}

export interface PropertyInfo {
  id: string;
  name: string;
}

export interface PortfolioInfo {
  id: string;
  name: string;
}

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  createdAt: string;
  updatedAt: string;
  creator: FileUploader;
  lastUpdatedBy: FileUploader;
  extractedData?: any;
  status: ProcessingStatus;
  property?: PropertyInfo;
  project?: ProjectInfo;
  portfolio?: PortfolioInfo;
}

export interface UploadedFile {
  id: string;
  name: string;
  fileType: FileType;
  uploadDate: string;
  uploader: FileUploader;
  size: number;
  documents: Document[];
  status: ProcessingStatus;
  property?: PropertyInfo;
  project?: ProjectInfo;
  portfolio?: PortfolioInfo;
}

export interface FileFilters {
  documentTypes: DocumentType[];
  uploaders: string[];
  properties: string[];
  projects: string[];
  portfolios: string[];
  status: ProcessingStatus[];
}

export interface TableColumn {
  id: string;
  label: string;
  visible: boolean;
}
