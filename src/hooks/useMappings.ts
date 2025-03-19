
import { useState, useEffect } from 'react';
import { ColumnMapping, RowSelection, StandardField, COMMON_HEADER_MAPPINGS, getFieldLabel } from '@/components/mappings/types';

export function useMappings(data: string[][]) {
  const [columnMappings, setColumnMappings] = useState<ColumnMapping[]>([]);
  const [rowSelections, setRowSelections] = useState<RowSelection[]>([]);
  
  // Initialize column mappings from the data headers
  useEffect(() => {
    if (data && data.length > 0) {
      const headers = data[0];
      
      // Create initial column mappings with auto-detection
      const initialMappings: ColumnMapping[] = headers.map((headerText, index) => {
        const headerLower = headerText.toLowerCase().trim();
        const detectedField = COMMON_HEADER_MAPPINGS[headerLower] || null;
        
        return {
          originalIndex: index,
          originalName: headerText,
          standardField: detectedField
        };
      });
      
      setColumnMappings(initialMappings);
      
      // Initialize row selections (skip the header row)
      const initialRowSelections: RowSelection[] = [];
      
      // Start from index 1 to skip header row
      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const isBlank = row.every(cell => !cell || cell.trim() === '');
        const hasTotal = row.some(cell => 
          cell.toLowerCase().includes('total') || 
          cell.toLowerCase().includes('sum')
        );
        
        initialRowSelections.push({
          rowIndex: i,
          isSelected: !isBlank && !hasTotal,
          isAutoExcluded: isBlank || hasTotal,
          reason: isBlank ? 'Blank Row' : (hasTotal ? 'Total Row' : undefined)
        });
      }
      
      setRowSelections(initialRowSelections);
    }
  }, [data]);
  
  // Update a single column mapping
  const updateColumnMapping = (originalIndex: number, standardField: StandardField | null) => {
    setColumnMappings(prevMappings => 
      prevMappings.map(mapping => 
        mapping.originalIndex === originalIndex 
          ? { ...mapping, standardField } 
          : mapping
      )
    );
  };
  
  // Toggle row selection
  const toggleRowSelection = (rowIndex: number) => {
    setRowSelections(prevSelections =>
      prevSelections.map(selection =>
        selection.rowIndex === rowIndex
          ? { ...selection, isSelected: !selection.isSelected }
          : selection
      )
    );
  };
  
  // Get the filtered data based on row selections
  const getFilteredData = () => {
    if (!data || data.length === 0) return [];
    
    // Always include the header row (index 0)
    const filteredData = [data[0]];
    
    // Add all selected rows
    rowSelections.forEach(selection => {
      if (selection.isSelected && selection.rowIndex < data.length) {
        filteredData.push(data[selection.rowIndex]);
      }
    });
    
    return filteredData;
  };
  
  // Get the mapped data with standardized headers
  const getMappedData = () => {
    const filteredData = getFilteredData();
    if (filteredData.length === 0) return [];
    
    // Create a new header row with standardized fields
    const standardizedHeaders = columnMappings.map(mapping => 
      getFieldLabel(mapping.standardField)
    );
    
    // Replace the header row with standardized headers
    const mappedData = [standardizedHeaders];
    
    // Add all the data rows (skip the original header)
    for (let i = 1; i < filteredData.length; i++) {
      mappedData.push(filteredData[i]);
    }
    
    return mappedData;
  };
  
  return {
    columnMappings,
    rowSelections,
    updateColumnMapping,
    toggleRowSelection,
    getFilteredData,
    getMappedData
  };
}
