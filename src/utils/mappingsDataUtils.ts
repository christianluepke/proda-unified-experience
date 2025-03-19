
// Helper function to generate expanded example data with 25 columns
export const generateExpandedData = (baseData: string[][]) => {
  // Create expanded header row with 25 columns
  const expandedHeaders = [
    ...baseData[0],
    "Unit Type", "Building", "Floor", "Section", 
    "Market Rent", "Rent PSF", "Security Deposit", 
    "Lease Start", "Lease End", "Term (Months)",
    "Renewal Option", "Escalation Rate", "CAM Charges",
    "Move-in Date", "Move-out Date", "Lease Status",
    "Occupancy Status", "Lease Notes", "Additional Charges",
    "Payment Frequency"
  ];
  
  // Ensure we have exactly 25 columns
  const finalHeaders = expandedHeaders.slice(0, 25);
  while (finalHeaders.length < 25) {
    finalHeaders.push(`Column ${finalHeaders.length + 1}`);
  }
  
  // Function to generate sample data for each new column based on row index
  const generateCellValue = (colIdx: number, rowIdx: number) => {
    // Skip the first row (header)
    if (rowIdx === 0) return finalHeaders[colIdx];
    
    const isHeaderRow = rowIdx === 0;
    const isUnitRow = rowIdx % 3 === 1; // Make every third row a unit row
    
    switch (colIdx) {
      case 10: return isUnitRow ? "Office" : "Retail"; // Unit Type
      case 11: return `Building ${String.fromCharCode(65 + (rowIdx % 3))}`; // Building
      case 12: return `${rowIdx % 5 + 1}`; // Floor
      case 13: return `Section ${rowIdx % 4 + 1}`; // Section
      case 14: return isUnitRow ? `$${(Math.floor(Math.random() * 50) + 20) * 100}` : ""; // Market Rent
      case 15: return isUnitRow ? `$${(Math.floor(Math.random() * 5) + 1)}.${Math.floor(Math.random() * 99)}` : ""; // Rent PSF
      case 16: return isUnitRow ? `$${(Math.floor(Math.random() * 20) + 5) * 100}` : ""; // Security Deposit
      case 17: return isUnitRow ? `${1 + (rowIdx % 12)}/1/2023` : ""; // Lease Start
      case 18: return isUnitRow ? `${1 + (rowIdx % 12)}/1/2024` : ""; // Lease End
      case 19: return isUnitRow ? `${12 * (1 + (rowIdx % 3))}` : ""; // Term
      case 20: return isUnitRow ? (rowIdx % 3 === 0 ? "Yes" : "No") : ""; // Renewal Option
      case 21: return isUnitRow ? `${(Math.floor(Math.random() * 3) + 1)}.${Math.floor(Math.random() * 9)}%` : ""; // Escalation Rate
      case 22: return isUnitRow ? `$${(Math.floor(Math.random() * 10) + 2) * 10}` : ""; // CAM Charges
      case 23: return isUnitRow ? `${1 + (rowIdx % 12)}/5/2023` : ""; // Move-in Date
      case 24: return ""; // Move-out Date
      default:
        return colIdx < baseData[0].length ? 
          (rowIdx < baseData.length ? baseData[rowIdx][colIdx] || "" : "") : 
          "";
    }
  };
  
  // Generate all rows with 25 columns each
  return baseData.map((row, rowIdx) => {
    const newRow = [];
    for (let colIdx = 0; colIdx < 25; colIdx++) {
      newRow.push(generateCellValue(colIdx, rowIdx));
    }
    return newRow;
  });
};
