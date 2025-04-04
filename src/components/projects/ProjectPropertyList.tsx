
import React from 'react';
import { Property } from '@/components/upload/models';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface ProjectPropertyListProps {
  properties: Property[];
}

const ProjectPropertyList: React.FC<ProjectPropertyListProps> = ({ properties }) => {
  if (properties.length === 0) {
    return (
      <div className="bg-muted/20 rounded-md p-6 text-center">
        <p className="text-muted-foreground">No properties have been added to this project yet.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/20">
            <TableHead className="w-[25%]">Name</TableHead>
            <TableHead className="w-[15%]">Type</TableHead>
            <TableHead className="w-[35%]">Address</TableHead>
            <TableHead className="w-[15%] text-right">Size (sqft)</TableHead>
            <TableHead className="w-[10%] text-right">Units</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.id} className="hover:bg-muted/20">
              <TableCell className="font-medium">{property.name}</TableCell>
              <TableCell>
                {property.assetType ? (
                  <Badge variant="outline">{property.assetType}</Badge>
                ) : (
                  <Badge variant="outline">Office</Badge>
                )}
              </TableCell>
              <TableCell>
                {property.streetNo} {property.streetName}, {property.city}, {property.state} {property.zip}
              </TableCell>
              <TableCell className="text-right">{new Intl.NumberFormat('en-US').format(property.sqft)}</TableCell>
              <TableCell className="text-right">{property.units}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectPropertyList;
