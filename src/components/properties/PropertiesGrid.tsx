
import React from 'react';
import { Property } from '@/components/upload/models';
import PropertyCard from './PropertyCard';

interface PropertiesGridProps {
  properties: Property[];
  onDelete: (id: string) => void;
}

const PropertiesGrid: React.FC<PropertiesGridProps> = ({ properties, onDelete }) => {
  if (properties.length === 0) {
    return (
      <div className="text-center p-10 border rounded-md">
        <p className="text-muted-foreground">No properties found</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {properties.map(property => (
        <PropertyCard 
          key={property.id} 
          property={property} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default PropertiesGrid;
