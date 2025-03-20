
import { UploadedFile, DocumentType } from './types';

/**
 * Gets a human-readable label for a document type
 */
export const getDocumentTypeLabel = (type: DocumentType): string => {
  switch (type) {
    case 'rent_roll':
      return 'Rent Roll';
    case 'operating_statement':
      return 'Operating Statement';
    default:
      return 'Other';
  }
};

/**
 * Determines the document type label for a file
 */
export const getFileDocumentTypeLabel = (file: UploadedFile): string => {
  if (file.documents.length === 0) return 'Unknown';
  
  if (file.documents.length === 1) {
    return getDocumentTypeLabel(file.documents[0].type);
  }
  
  // Check if all documents are of the same type
  const types = new Set(file.documents.map(doc => doc.type));
  if (types.size === 1) {
    return getDocumentTypeLabel(file.documents[0].type);
  }
  
  return 'Mixed';
};

/**
 * Formats file size in bytes to a human-readable string
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Gets unique property names from documents in a file
 */
export const getFileProperties = (file: UploadedFile): { 
  names: string[]; 
  count: number;
  primary?: string;
} => {
  if (!file.documents || file.documents.length === 0) {
    return { 
      names: file.property ? [file.property.name] : [], 
      count: file.property ? 1 : 0,
      primary: file.property?.name
    };
  }
  
  // Get unique property names from documents
  const propertyNames = file.documents
    .filter(doc => doc.property)
    .map(doc => doc.property!.name);
  
  // Use Set to get unique property names
  const uniqueNames = [...new Set(propertyNames)];
  
  return { 
    names: uniqueNames, 
    count: uniqueNames.length,
    // Use the file-level property as primary, or the first document property
    primary: file.property?.name || (uniqueNames.length > 0 ? uniqueNames[0] : undefined)
  };
};

/**
 * Gets unique project names from documents in a file
 */
export const getFileProjects = (file: UploadedFile): { 
  names: string[]; 
  count: number;
  primary?: string;
} => {
  if (!file.documents || file.documents.length === 0) {
    return { 
      names: file.project ? [file.project.name] : [], 
      count: file.project ? 1 : 0,
      primary: file.project?.name
    };
  }
  
  // Get unique project names from documents
  const projectNames = file.documents
    .filter(doc => doc.project)
    .map(doc => doc.project!.name);
  
  // Use Set to get unique project names
  const uniqueNames = [...new Set(projectNames)];
  
  return { 
    names: uniqueNames, 
    count: uniqueNames.length,
    // Use the file-level project as primary, or the first document project
    primary: file.project?.name || (uniqueNames.length > 0 ? uniqueNames[0] : undefined)
  };
};

/**
 * Gets unique portfolio names from documents in a file
 */
export const getFilePortfolios = (file: UploadedFile): { 
  names: string[]; 
  count: number;
  primary?: string;
} => {
  if (!file.documents || file.documents.length === 0) {
    return { 
      names: file.portfolio ? [file.portfolio.name] : [], 
      count: file.portfolio ? 1 : 0,
      primary: file.portfolio?.name
    };
  }
  
  // Get unique portfolio names from documents
  const portfolioNames = file.documents
    .filter(doc => doc.portfolio)
    .map(doc => doc.portfolio!.name);
  
  // Use Set to get unique portfolio names
  const uniqueNames = [...new Set(portfolioNames)];
  
  return { 
    names: uniqueNames, 
    count: uniqueNames.length,
    // Use the file-level portfolio as primary, or the first document portfolio
    primary: file.portfolio?.name || (uniqueNames.length > 0 ? uniqueNames[0] : undefined)
  };
};
