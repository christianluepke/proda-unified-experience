
import { useState } from 'react';
import { UploadedFile } from './types';

export function useFilesSorting() {
  const [sortField, setSortField] = useState<string>('uploadDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Update sort configuration
  const updateSort = (field: string) => {
    if (sortField === field) {
      // Toggle direction if clicking the same field
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Sort files based on current configuration
  const sortFiles = (a: UploadedFile, b: UploadedFile, getFileDocumentTypeLabel: (file: UploadedFile) => string) => {
    // Handle different sort fields
    let valA, valB;
    
    switch (sortField) {
      case 'name':
        valA = a.name;
        valB = b.name;
        break;
      case 'type': {
        const typeA = getFileDocumentTypeLabel(a);
        const typeB = getFileDocumentTypeLabel(b);
        valA = typeA;
        valB = typeB;
        break;
      }
      case 'uploadDate':
        valA = new Date(a.uploadDate).getTime();
        valB = new Date(b.uploadDate).getTime();
        break;
      case 'size':
        valA = a.size;
        valB = b.size;
        break;
      case 'property':
        valA = a.property?.name || '';
        valB = b.property?.name || '';
        break;
      case 'project':
        valA = a.project?.name || '';
        valB = b.project?.name || '';
        break;
      case 'portfolio':
        valA = a.portfolio?.name || '';
        valB = b.portfolio?.name || '';
        break;
      case 'status':
        valA = a.status;
        valB = b.status;
        break;
      default:
        valA = new Date(a.uploadDate).getTime();
        valB = new Date(b.uploadDate).getTime();
    }
    
    // Compare the values
    if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  };

  return {
    sortField,
    sortDirection,
    updateSort,
    sortFiles
  };
}
