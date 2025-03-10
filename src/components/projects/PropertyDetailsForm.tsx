
import React from 'react';
import { Input } from '@/components/ui/input';
import { PropertyData } from '@/components/upload/models';
import { Search } from 'lucide-react';

interface PropertyDetailsFormProps {
  propertyData: PropertyData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onPropertySearch?: (searchTerm: string) => void;
}

const PropertyDetailsForm: React.FC<PropertyDetailsFormProps> = ({ 
  propertyData, 
  onInputChange,
  onPropertySearch
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onPropertySearch) {
      onPropertySearch(e.target.value);
    }
  };

  return (
    <div className="space-y-4 py-4">
      {/* Property Search */}
      <div className="space-y-2">
        <label htmlFor="propertySearch" className="text-sm font-medium">Search Property</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="propertySearch"
            name="propertySearch"
            placeholder="Start typing to search..."
            className="pl-9"
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Property Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">Property Name</label>
        <Input
          id="name"
          name="name"
          value={propertyData.name || ''}
          onChange={onInputChange}
          placeholder="Enter property name"
        />
      </div>
      
      {/* Street Details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="streetNo" className="text-sm font-medium">Street No.</label>
          <Input
            id="streetNo"
            name="streetNo"
            value={propertyData.streetNo || ''}
            onChange={onInputChange}
            placeholder="Street number"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="streetName" className="text-sm font-medium">Street Name</label>
          <Input
            id="streetName"
            name="streetName"
            value={propertyData.streetName || ''}
            onChange={onInputChange}
            placeholder="Street name"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="city" className="text-sm font-medium">City</label>
          <Input
            id="city"
            name="city"
            value={propertyData.city || ''}
            onChange={onInputChange}
            placeholder="City"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="country" className="text-sm font-medium">Country</label>
          <Input
            id="country"
            name="country"
            value={propertyData.country || ''}
            onChange={onInputChange}
            placeholder="Country"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="zip" className="text-sm font-medium">ZIP Code</label>
          <Input
            id="zip"
            name="zip"
            value={propertyData.zip || ''}
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
