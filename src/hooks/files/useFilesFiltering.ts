
import { useState, useMemo } from 'react';
import { UploadedFile, FileFilters, FilterOptions, DocumentType, ProcessingStatus } from './types';

export function useFilesFiltering(files: UploadedFile[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<FileFilters>({
    documentTypes: [],
    uploaders: [],
    properties: [],
    projects: [],
    portfolios: [],
    status: []
  });

  // Get available filter options from the data
  const filterOptions = useMemo<FilterOptions>(() => {
    const documentTypes = new Set<DocumentType>();
    const uploaders = new Set<string>();
    const properties = new Set<string>();
    const projects = new Set<string>();
    const portfolios = new Set<string>();
    const statuses = new Set<ProcessingStatus>();

    files.forEach(file => {
      if (file.uploader.id) uploaders.add(file.uploader.id);
      if (file.property?.id) properties.add(file.property.id);
      if (file.project?.id) projects.add(file.project.id);
      if (file.portfolio?.id) portfolios.add(file.portfolio.id);
      if (file.status) statuses.add(file.status);
      
      file.documents.forEach(doc => {
        documentTypes.add(doc.type);
      });
    });

    return {
      documentTypes: Array.from(documentTypes),
      uploaders: Array.from(uploaders),
      properties: Array.from(properties),
      projects: Array.from(projects),
      portfolios: Array.from(portfolios),
      statuses: Array.from(statuses)
    };
  }, [files]);

  // Update filters
  const updateFilters = (newFilters: Partial<FileFilters>) => {
    setActiveFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setActiveFilters({
      documentTypes: [],
      uploaders: [],
      properties: [],
      projects: [],
      portfolios: [],
      status: []
    });
    setSearchTerm('');
  };

  // Apply filters to files
  const applyFilters = (file: UploadedFile) => {
    // Search term filter
    const matchesSearch = searchTerm === '' || 
      file.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Document type filter
    const hasDocumentTypeFilter = activeFilters.documentTypes.length > 0;
    const matchesDocType = !hasDocumentTypeFilter || 
      file.documents.some(doc => activeFilters.documentTypes.includes(doc.type));
    
    // Uploader filter
    const hasUploaderFilter = activeFilters.uploaders.length > 0;
    const matchesUploader = !hasUploaderFilter || 
      activeFilters.uploaders.includes(file.uploader.id);
    
    // Property filter
    const hasPropertyFilter = activeFilters.properties.length > 0;
    const matchesProperty = !hasPropertyFilter || 
      (file.property && activeFilters.properties.includes(file.property.id));
    
    // Project filter
    const hasProjectFilter = activeFilters.projects.length > 0;
    const matchesProject = !hasProjectFilter || 
      (file.project && activeFilters.projects.includes(file.project.id));
    
    // Portfolio filter
    const hasPortfolioFilter = activeFilters.portfolios.length > 0;
    const matchesPortfolio = !hasPortfolioFilter || 
      (file.portfolio && activeFilters.portfolios.includes(file.portfolio.id));
    
    // Status filter
    const hasStatusFilter = activeFilters.status.length > 0;
    const matchesStatus = !hasStatusFilter || 
      activeFilters.status.includes(file.status);
    
    return matchesSearch && matchesDocType && matchesUploader && 
           matchesProperty && matchesProject && matchesPortfolio && matchesStatus;
  };

  return {
    searchTerm,
    setSearchTerm,
    activeFilters,
    updateFilters,
    resetFilters,
    filterOptions,
    applyFilters
  };
}
