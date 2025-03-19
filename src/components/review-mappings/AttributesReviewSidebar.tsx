
import React from 'react';
import { FileText, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MappingMethod, OperatingStatement } from '@/lib/types';

interface AttributesReviewSidebarProps {
  operatingStatement: OperatingStatement;
  mappingMethod: MappingMethod;
  setMappingMethod: (method: MappingMethod) => void;
  sourceDocument: string;
  setSourceDocument: (document: string) => void;
}

const AttributesReviewSidebar: React.FC<AttributesReviewSidebarProps> = ({
  operatingStatement,
  mappingMethod,
  setMappingMethod,
  sourceDocument,
  setSourceDocument
}) => {
  return (
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
  );
};

export default AttributesReviewSidebar;
