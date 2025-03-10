
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface UploadFileTypeSelectorProps {
  fileType: 'rent_roll' | 'operating_statement';
  setFileType: (value: 'rent_roll' | 'operating_statement') => void;
}

const UploadFileTypeSelector: React.FC<UploadFileTypeSelectorProps> = ({ fileType, setFileType }) => {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">File Type</h4>
      <RadioGroup 
        value={fileType} 
        onValueChange={(value) => setFileType(value as 'rent_roll' | 'operating_statement')}
        className="flex gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="rent_roll" id="rent_roll" />
          <label htmlFor="rent_roll" className="text-sm cursor-pointer">Rent Roll</label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="operating_statement" id="operating_statement" />
          <label htmlFor="operating_statement" className="text-sm cursor-pointer">Operating Statement</label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default UploadFileTypeSelector;
