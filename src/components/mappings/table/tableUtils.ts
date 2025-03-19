
// Helper functions for table operations

// Determine if a row appears to be a unit row
export const isLikelyUnitRow = (rowData: string[]): boolean => {
  // If row has tenant information, it's likely a unit
  const hasTenant = rowData.some(cell => 
    cell && cell.length > 0 && cell.toLowerCase() !== 'vacant' && 
    !cell.toLowerCase().includes('total') && !cell.toLowerCase().includes('subtotal')
  );
  
  // If row has numeric values for area or rent, likely a unit
  const hasNumbers = rowData.some(cell => {
    const numericValue = parseFloat(cell.replace(/[$,]/g, ''));
    return !isNaN(numericValue) && numericValue > 0;
  });
  
  return hasTenant || hasNumbers;
};

// Filter rows based on search and filter settings
export const filterRows = (
  rowSelections: any[], 
  rowFilter: 'all' | 'included' | 'excluded', 
  searchTerm: string, 
  previewData: string[][]
) => {
  return rowSelections.filter(selection => {
    // Filter by inclusion state
    if (rowFilter === 'included' && !selection.isSelected) return false;
    if (rowFilter === 'excluded' && selection.isSelected) return false;
    
    // Filter by search term
    if (searchTerm) {
      const rowData = previewData[selection.rowIndex];
      // Check if any cell in the row contains the search term
      return rowData && rowData.some(cell => 
        cell && cell.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return true;
  });
};
