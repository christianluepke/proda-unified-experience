
import React from 'react';
import { ColumnMapping, StandardField } from '../types';
import { 
  TableHead, 
  TableRow, 
  TableHeader as UITableHeader 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface TableHeaderProps {
  columnMappings: ColumnMapping[];
  updateColumnMapping: (originalIndex: number, standardField: StandardField | null) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  columnMappings,
  updateColumnMapping
}) => {
  return (
    <UITableHeader className="sticky top-0 z-10">
      <TableRow className="bg-muted/50">
        <TableHead className="w-[50px]">Select</TableHead>
        <TableHead className="w-[50px]">Row</TableHead>
        <TableHead className="w-[80px]">Status</TableHead>
        {columnMappings.map((mapping) => (
          <TableHead key={`header-${mapping.originalIndex}`} className="min-w-[120px]">
            <Select
              value={mapping.standardField || "null"}
              onValueChange={(value) => updateColumnMapping(
                mapping.originalIndex, 
                value === "null" ? null : value as StandardField
              )}
            >
              <SelectTrigger className={`${mapping.standardField ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-100 text-blue-800'}`}>
                <SelectValue placeholder="Not Mapped" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="null">Not Mapped</SelectItem>
                <SelectItem value="unit_id">Unit ID</SelectItem>
                <SelectItem value="unit_name">Unit Name</SelectItem>
                <SelectItem value="tenant_name">Tenant Name</SelectItem>
                <SelectItem value="lease_id">Lease ID</SelectItem>
                <SelectItem value="lease_start">Lease Start Date</SelectItem>
                <SelectItem value="lease_end">Lease End Date</SelectItem>
                <SelectItem value="contracted_rent">Contracted Rent</SelectItem>
                <SelectItem value="passing_rent">Passing Rent</SelectItem>
                <SelectItem value="area_sqft">Area (sq ft)</SelectItem>
                <SelectItem value="vacant">Vacant</SelectItem>
                <SelectItem value="unit_type">Unit Type</SelectItem>
              </SelectContent>
            </Select>
            <div className="mt-2 font-normal text-xs bg-sky-100 text-blue-800 p-1.5 rounded truncate">
              {mapping.originalName}
            </div>
          </TableHead>
        ))}
      </TableRow>
    </UITableHeader>
  );
};

export default TableHeader;
