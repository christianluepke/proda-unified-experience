import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

import MappingsHeader from '@/components/mappings/MappingsHeader';
import MappingsContent from '@/components/mappings/MappingsContent';
import MappingsFooter from '@/components/mappings/MappingsFooter';
import { useMappings } from '@/hooks/useMappings';
import { mockRentRollData } from '@/components/table-selector/mockData';

// Helper function to generate expanded example data with 25 columns
const generateExpandedData = (baseData: string[][]) => {
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

const Mappings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(3);
  const [expandedData, setExpandedData] = useState<string[][]>([]);
  
  const tableBounds = location.state?.tableBounds || { 
    startRow: 1, 
    endRow: mockRentRollData.length - 1,
    startCol: 1,
    endCol: mockRentRollData[0].length - 1
  };
  
  // Initialize the expanded data on component mount
  useEffect(() => {
    const boundedData = mockRentRollData.slice(
      tableBounds.startRow - 1, 
      tableBounds.endRow
    ).map(row => 
      row.slice(tableBounds.startCol - 1, tableBounds.endCol)
    );
    
    setExpandedData(generateExpandedData(boundedData));
  }, [tableBounds]);
  
  const { 
    columnMappings, 
    rowSelections, 
    updateColumnMapping, 
    toggleRowSelection,
    getMappedData
  } = useMappings(expandedData);

  const handleStepChange = (step: number) => {
    if (step === 1) {
      navigate(`/select-table/${id}`);
    } else if (step === 2) {
      navigate(`/select-table/${id}`, { state: { activeStep: 2 } });
    } else {
      setActiveStep(step);
    }
  };

  const handleNext = () => {
    const requiredFields = [
      'unit_id', 'unit_name', 'tenant_name', 'lease_id', 
      'contracted_rent', 'passing_rent'
    ];
    
    const mappedFields = columnMappings
      .filter(mapping => mapping.standardField)
      .map(mapping => mapping.standardField);
    
    const missingRequiredFields = requiredFields.filter(
      field => !mappedFields.includes(field as any)
    );
    
    if (missingRequiredFields.length > 3) {
      if (confirm("Some important fields like Unit ID, Tenant Name, or Rent values appear to be unmapped. Do you want to continue anyway?")) {
        toast({
          title: "Mappings Saved",
          description: "Your column mappings and row filters have been applied.",
        });
        const reviewId = `rr-review-${id?.replace('rr-', '')}`;
        navigate(`/review/${reviewId}`);
      }
    } else {
      toast({
        title: "Mappings Saved",
        description: "Your column mappings and row filters have been applied.",
      });
      const reviewId = `rr-review-${id?.replace('rr-', '')}`;
      navigate(`/review/${reviewId}`);
    }
  };

  const handleCancel = () => {
    toast({
      title: "Process Cancelled",
      description: "You've cancelled the column mapping.",
      variant: "destructive",
    });
    navigate('/projects');
  };

  const handleCloseDialog = () => {
    const confirmClose = window.confirm("Are you sure you want to close? Any unsaved mappings will be lost.");
    if (confirmClose) {
      navigate('/projects');
    }
  };

  const mappedData = getMappedData();

  // Only render the content when expandedData is ready
  if (expandedData.length === 0) {
    return <div className="fixed inset-0 bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      <MappingsHeader 
        activeStep={activeStep} 
        handleStepChange={handleStepChange} 
        handleCloseDialog={handleCloseDialog} 
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <MappingsContent 
            mappedData={mappedData}
            columnMappings={columnMappings}
            rowSelections={rowSelections}
            updateColumnMapping={updateColumnMapping}
            toggleRowSelection={toggleRowSelection}
            previewData={expandedData}
            activeTab="" // This prop is no longer needed but kept for compatibility
          />
        </div>
        
        <MappingsFooter 
          handleCancel={handleCancel}
          handleStepChange={handleStepChange}
          handleNext={handleNext}
        />
      </div>
    </div>
  );
};

export default Mappings;
