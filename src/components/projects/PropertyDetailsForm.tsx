
import React from 'react';
import { Input } from '@/components/ui/input';
import { PropertyData } from '@/components/upload/models';

interface PropertyDetailsFormProps {
  propertyData: PropertyData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PropertyDetailsForm: React.FC<PropertyDetailsFormProps> = ({ 
  propertyData, 
  onInputChange 
}) => {
  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <label htmlFor="address" className="text-sm font-medium">Address</label>
        <Input
          id="address"
          name="address"
          value={propertyData.address}
          onChange={onInputChange}
          placeholder="Enter property address"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="city" className="text-sm font-medium">City</label>
          <Input
            id="city"
            name="city"
            value={propertyData.city}
            onChange={onInputChange}
            placeholder="City"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="state" className="text-sm font-medium">State</label>
          <Input
            id="state"
            name="state"
            value={propertyData.state}
            onChange={onInputChange}
            placeholder="State"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="zip" className="text-sm font-medium">ZIP Code</label>
          <Input
            id="zip"
            name="zip"
            value={propertyData.zip}
            onChange={onInputChange}
            placeholder="ZIP Code"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="units" className="text-sm font-medium">Units</label>
          <Input
            id="units"
            name="units"
            type="number"
            value={propertyData.units || ''}
            onChange={onInputChange}
            placeholder="Number of units"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="sqft" className="text-sm font-medium">Square Footage</label>
        <Input
          id="sqft"
          name="sqft"
          type="number"
          value={propertyData.sqft || ''}
          onChange={onInputChange}
          placeholder="Total square footage"
        />
      </div>
    </div>
  );
};

export default PropertyDetailsForm;
