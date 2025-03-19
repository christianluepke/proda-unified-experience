
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { OperatingStatement } from '@/lib/types';

interface MappingsConfirmationSidebarProps {
  operatingStatement: OperatingStatement;
}

const MappingsConfirmationSidebar: React.FC<MappingsConfirmationSidebarProps> = ({
  operatingStatement
}) => {
  return (
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
  );
};

export default MappingsConfirmationSidebar;
