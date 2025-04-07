
import React from 'react';
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PropertyColumn } from '@/hooks/useProperties';

interface PropertyTableHeaderProps {
  columns: PropertyColumn[];
}

const PropertyTableHeader: React.FC<PropertyTableHeaderProps> = ({ columns }) => {
  // Filter only visible columns
  const visibleColumns = columns.filter(column => column.visible);
  
  return (
    <TableHeader>
      <TableRow className="bg-muted/20">
        {visibleColumns.map((column) => (
          <TableHead key={column.id} className="whitespace-nowrap">
            {column.label}
          </TableHead>
        ))}
        <TableHead className="text-right w-[100px]">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default PropertyTableHeader;
