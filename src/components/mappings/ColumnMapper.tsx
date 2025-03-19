
import React from 'react';
import { ColumnMapping, StandardField, STANDARD_FIELD_LABELS } from './types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface ColumnMapperProps {
  columnMappings: ColumnMapping[];
  updateColumnMapping: (originalIndex: number, standardField: StandardField) => void;
  previewData: string[][];
}

const ColumnMapper: React.FC<ColumnMapperProps> = ({ 
  columnMappings, 
  updateColumnMapping,
  previewData 
}) => {
  // Get sample values for each column (up to 3 rows)
  const getSampleValues = (columnIndex: number) => {
    if (!previewData || previewData.length <= 1) return [];
    
    const samples: string[] = [];
    // Start from index 1 to skip header
    for (let i = 1; i < Math.min(previewData.length, 4); i++) {
      if (previewData[i] && previewData[i][columnIndex]) {
        samples.push(previewData[i][columnIndex]);
      }
    }
    return samples;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Map Columns to Standard Fields</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Map each column from your rent roll to the corresponding standard field.
      </p>
      
      <Table className="border">
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[200px]">Original Column</TableHead>
            <TableHead className="w-[200px]">Standard Field</TableHead>
            <TableHead>Sample Values</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {columnMappings.map((mapping) => (
            <TableRow key={mapping.originalIndex}>
              <TableCell className="font-medium">{mapping.originalName}</TableCell>
              <TableCell>
                <Select
                  value={mapping.standardField || "null"}
                  onValueChange={(value) => updateColumnMapping(
                    mapping.originalIndex, 
                    value as StandardField
                  )}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a field" />
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
                
                {mapping.standardField && (
                  <Badge className="mt-1" variant="outline">
                    {STANDARD_FIELD_LABELS[mapping.standardField]}
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="flex flex-col space-y-1">
                  {getSampleValues(mapping.originalIndex).map((sample, idx) => (
                    <span key={idx} className="text-xs truncate max-w-[400px]">
                      {sample}
                    </span>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ColumnMapper;
