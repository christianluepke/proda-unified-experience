
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
