
import React from 'react';
import { Table, TableBody } from '@/components/ui/table';
import { Property } from '@/components/upload/models';
import PropertyTableHeader from './PropertyTableHeader';
import PropertyRow from './PropertyRow';
import { PropertyColumn } from '@/hooks/useProperties';

interface PropertyListProps {
  properties: Property[];
  columns: PropertyColumn[];
  onDelete: (id: string) => void;
}

const PropertyList: React.FC<PropertyListProps> = ({ properties, columns, onDelete }) => {
  if (properties.length === 0) {
    return (
      <div className="text-center p-10 border rounded-md">
        <p className="text-muted-foreground">No properties found</p>
      </div>
    );
  }
  
  return (
    <div className="rounded-md border overflow-hidden">
      <div className="relative w-full overflow-auto">
        <Table>
          <PropertyTableHeader columns={columns} />
          <TableBody>
            {properties.map(property => (
              <PropertyRow
                key={property.id}
                property={property}
                columns={columns}
                onDelete={onDelete}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PropertyList;
