
import { 
  UploadedFile, 
  Document, 
  DocumentType, 
  ProcessingStatus, 
  FileFilters, 
  TableColumn 
} from '@/components/files/models';

export interface FilterOptions {
  documentTypes: DocumentType[];
  uploaders: string[];
  properties: string[];
  projects: string[];
  portfolios: string[];
  statuses: ProcessingStatus[];
}

export type { 
  UploadedFile, 
  Document, 
  DocumentType, 
  ProcessingStatus, 
  FileFilters, 
  TableColumn 
};
