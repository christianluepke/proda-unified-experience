
import React from 'react';
import MappingsHeader from '@/components/mappings/MappingsHeader';
import MappingsContent from '@/components/mappings/MappingsContent';
import MappingsFooter from '@/components/mappings/MappingsFooter';
import { useMappingsPage } from '@/hooks/useMappingsPage';

const Mappings = () => {
  const {
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
    isDataLoaded
  } = useMappingsPage();

  // Show loading state while data is being prepared
  if (!isDataLoaded) {
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
