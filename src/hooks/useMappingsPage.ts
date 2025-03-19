
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { mockRentRollData } from '@/components/table-selector/mockData';
import { useMappings } from '@/hooks/useMappings';
import { generateExpandedData } from '@/utils/mappingsDataUtils';

export function useMappingsPage() {
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
        // Navigate to the new RentRollReview page instead of the ReviewMappings page
        navigate(`/rentroll-review/${id}`);
      }
    } else {
      toast({
        title: "Mappings Saved",
        description: "Your column mappings and row filters have been applied.",
      });
      // Navigate to the new RentRollReview page instead of the ReviewMappings page
      navigate(`/rentroll-review/${id}`);
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

  return {
    id,
    activeStep,
    expandedData,
    columnMappings,
    rowSelections,
    updateColumnMapping,
    toggleRowSelection,
    mappedData,
    handleStepChange,
    handleNext,
    handleCancel,
    handleCloseDialog,
    isDataLoaded: expandedData.length > 0
  };
}
