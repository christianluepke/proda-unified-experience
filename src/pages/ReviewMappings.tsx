
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, FileText, AlertCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { MappingMethod, OperatingStatement } from '@/lib/types';
import { useMockOperatingStatement } from '@/hooks/useMockOperatingStatement';

const ReviewMappings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { operatingStatement } = useMockOperatingStatement(id);
  const [activeStep, setActiveStep] = useState(1);
  const [mappingMethod, setMappingMethod] = useState<MappingMethod>('machine_learning');
  const [sourceDocument, setSourceDocument] = useState("T12 Income Statement - Mock 12.22.xlsx");
  
  if (!operatingStatement) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Loading...</h2>
          <p className="text-muted-foreground">Loading operating statement data...</p>
        </div>
      </div>
    );
  }

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const handleNext = () => {
    if (activeStep < 2) {
      setActiveStep(activeStep + 1);
    } else {
      // Navigate to next page after review
      toast({
        title: "Review Complete",
        description: "Operating statement mappings have been saved.",
      });
      navigate('/projects');
    }
  };

  const handleDiscard = () => {
    toast({
      title: "Changes Discarded",
      description: "Your changes have been discarded.",
      variant: "destructive",
    });
    navigate('/upload');
  };

  const handleCloseDialog = () => {
    const confirmClose = window.confirm("Are you sure you want to close? Any unsaved changes will be lost.");
    if (confirmClose) {
      navigate('/upload');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">{operatingStatement.propertyName} – Operating Statement</h1>
        <Button variant="ghost" size="icon" onClick={handleCloseDialog}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Progress Steps */}
      <div className="px-4 py-3 border-b">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            className="text-sm px-2 py-1 h-auto"
            onClick={() => handleStepChange(1)}
          >
            <span className={`mr-2 inline-flex items-center justify-center rounded-full h-6 w-6 text-xs ${
              activeStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              1
            </span>
            Review attributes
          </Button>
          <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
          <Button 
            variant="ghost" 
            className="text-sm px-2 py-1 h-auto"
            onClick={() => handleStepChange(2)}
          >
            <span className={`mr-2 inline-flex items-center justify-center rounded-full h-6 w-6 text-xs ${
              activeStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              2
            </span>
            Confirm mappings
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-80 border-r p-4 overflow-y-auto">
          {activeStep === 1 && (
            <>
              <h2 className="text-lg font-medium mb-4">Review and adjust the extracted data.</h2>
              
              <div className="mb-6">
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-md mb-4">
                  <FileText className="h-5 w-5 text-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      T12 Income Statement - Mock 12.22, duplicated accounts.xlsx
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Account labels</h3>
                  <p className="text-sm text-muted-foreground mb-3">Account labels are mapped using:</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="machine_learning" 
                        name="mapping_method" 
                        value="machine_learning"
                        checked={mappingMethod === 'machine_learning'}
                        onChange={() => setMappingMethod('machine_learning')}
                        className="mr-2"
                      />
                      <label htmlFor="machine_learning" className="text-sm">Machine Learning Predictions</label>
                      
                      <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-primary/20 text-primary">or</span>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="previous_documents" 
                        name="mapping_method" 
                        value="previous_documents"
                        checked={mappingMethod === 'previous_documents'}
                        onChange={() => setMappingMethod('previous_documents')}
                        className="mr-2"
                      />
                      <label htmlFor="previous_documents" className="text-sm flex items-center">
                        Previously Uploaded Document(s)
                        <span className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs">?</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm mb-2">Select below how to best map this document:</p>
                  <Select value={sourceDocument} onValueChange={setSourceDocument}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select source document" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="T12 Income Statement - Mock 12.22.xlsx">
                        T12 Income Statement - Mock 12.22.xlsx
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-muted/20 p-4 rounded-md">
                  <h3 className="text-sm font-medium mb-2">Mapping Source Document</h3>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-md mb-1">
                    <FileText className="h-5 w-5 text-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        T12 Income Statement - Mock 12.22.xlsx
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Completed 2023-09-01 19:52
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">97%</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="flex items-center text-sm font-medium mb-2">
                    Errors & Warnings
                    {operatingStatement.sections.length > 0 && (
                      <Check className="ml-2 h-4 w-4 text-green-500" />
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">No errors found</p>
                </div>
              </div>
            </>
          )}

          {activeStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-medium mb-4">Confirm your account mappings</h2>
              <p className="text-sm text-muted-foreground">
                Please review the account mappings below and make any necessary adjustments before finalizing.
              </p>
              
              <div className="space-y-4 mt-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Total accounts:</span>
                      <span className="text-sm font-medium">{
                        operatingStatement.sections.reduce((acc, section) => 
                          acc + section.accounts.length, 0)
                      }</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Mapped accounts:</span>
                      <span className="text-sm font-medium text-green-600">{
                        operatingStatement.sections.reduce((acc, section) => 
                          acc + section.accounts.length, 0)
                      }</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Unmapped accounts:</span>
                      <span className="text-sm font-medium">0</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Categories</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Income accounts:</span>
                      <span className="text-sm font-medium">{
                        operatingStatement.sections.reduce((acc, section) => 
                          acc + section.accounts.filter(a => a.category === 'Income').length, 0)
                      }</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Expense accounts:</span>
                      <span className="text-sm font-medium">{
                        operatingStatement.sections.reduce((acc, section) => 
                          acc + section.accounts.filter(a => a.category === 'Expense').length, 0)
                      }</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Other accounts:</span>
                      <span className="text-sm font-medium">{
                        operatingStatement.sections.reduce((acc, section) => 
                          acc + section.accounts.filter(a => a.category === 'Other').length, 0)
                      }</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto">
            <div className="min-w-max">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="sticky left-0 z-10 bg-primary text-primary-foreground text-left p-3 border-r">Original Account Name</th>
                    <th className="sticky left-[200px] z-10 bg-primary text-primary-foreground text-left p-3 border-r">Account Name</th>
                    {operatingStatement.periods.map((period) => (
                      <th key={period} className="bg-primary text-primary-foreground p-3 border-r text-center min-w-[100px]">
                        {period}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {operatingStatement.sections.map((section, sectionIndex) => (
                    <React.Fragment key={`section-${sectionIndex}`}>
                      {/* Section Header */}
                      <tr>
                        <td colSpan={2 + operatingStatement.periods.length} className="bg-muted/40 p-3 font-medium">
                          {section.title}
                        </td>
                      </tr>
                      
                      {/* Section Accounts */}
                      {section.accounts.map((account, accountIndex) => (
                        <tr key={`account-${sectionIndex}-${accountIndex}`} className={accountIndex % 2 === 0 ? '' : 'bg-muted/5'}>
                          <td className="sticky left-0 z-[5] bg-inherit p-3 border-r min-w-[200px]">
                            {account.originalAccountName}
                          </td>
                          <td className="sticky left-[200px] z-[5] bg-inherit p-3 border-r min-w-[200px] flex items-center">
                            <Badge className="bg-green-100 text-green-800 mr-2">Income</Badge>
                            {account.accountName}
                            <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground" />
                          </td>
                          {account.values.map((value, valueIndex) => (
                            <td key={`value-${sectionIndex}-${accountIndex}-${valueIndex}`} className="p-3 border-r text-right">
                              {value.value.toLocaleString('en-US', { 
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}
                            </td>
                          ))}
                        </tr>
                      ))}
                      
                      {/* Section Totals */}
                      <tr className="font-medium">
                        <td colSpan={2} className="sticky left-0 z-[5] bg-muted/20 p-3 text-right border-r">
                          {section.title}
                        </td>
                        {section.sectionTotals.map((total, totalIndex) => (
                          <td key={`total-${sectionIndex}-${totalIndex}`} className="bg-muted/20 p-3 border-r text-right">
                            {total.value.toLocaleString('en-US', { 
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}
                          </td>
                        ))}
                      </tr>
                    </React.Fragment>
                  ))}
                  
                  {/* Net Income Total */}
                  <tr className="font-medium text-lg">
                    <td colSpan={2} className="sticky left-0 z-[5] bg-muted/30 p-3 text-right border-r">
                      Net Income Total
                    </td>
                    {operatingStatement.netIncomeTotals.map((total, totalIndex) => (
                      <td key={`net-income-${totalIndex}`} className="bg-muted/30 p-3 border-r text-right">
                        {total.value.toLocaleString('en-US', { 
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Footer Controls */}
          <div className="border-t p-4 flex justify-between items-center">
            <Button variant="outline" onClick={handleDiscard}>
              Discard
            </Button>
            <Button onClick={handleNext}>
              {activeStep < 2 ? 'Next' : 'Save Mappings'}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for dropdown icon
const ChevronDown = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

export default ReviewMappings;
