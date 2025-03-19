
import React, { useState } from 'react';
import { ColumnMapping, StandardField, getFieldLabel } from './types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, ArrowUpDown, CheckCircle2 } from 'lucide-react';

interface ColumnMappingTableProps {
  columnMappings: ColumnMapping[];
  updateColumnMapping: (originalIndex: number, standardField: StandardField | null) => void;
  previewData: string[][];
}

const ColumnMappingTable: React.FC<ColumnMappingTableProps> = ({ 
  columnMappings, 
  updateColumnMapping,
  previewData 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<'original' | 'mapped'>('original');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Get unmapped count
  const unmappedCount = columnMappings.filter(m => !m.standardField).length;
  
  // Get sample values for a column (up to 3 rows)
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

  // Filter columns based on search term
  const filteredMappings = columnMappings.filter(mapping => {
    const originalNameMatch = mapping.originalName.toLowerCase().includes(searchTerm.toLowerCase());
    const standardFieldMatch = mapping.standardField ? 
      getFieldLabel(mapping.standardField).toLowerCase().includes(searchTerm.toLowerCase()) : 
      false;
    
    return originalNameMatch || standardFieldMatch;
  });

  // Sort columns
  const sortedMappings = [...filteredMappings].sort((a, b) => {
    if (sortBy === 'original') {
      const comparison = a.originalName.localeCompare(b.originalName);
      return sortDirection === 'asc' ? comparison : -comparison;
    } else {
      // Sort by mapped status first, then by field name
      if (!a.standardField && b.standardField) return 1;
      if (a.standardField && !b.standardField) return -1;
      if (!a.standardField && !b.standardField) return 0;
      
      const aLabel = getFieldLabel(a.standardField as StandardField);
      const bLabel = getFieldLabel(b.standardField as StandardField);
      const comparison = aLabel.localeCompare(bLabel);
      return sortDirection === 'asc' ? comparison : -comparison;
    }
  });

  // Toggle sort
  const toggleSort = (field: 'original' | 'mapped') => {
    if (sortBy === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="w-full">
      <div className="bg-muted/40 p-4 border-b flex flex-wrap gap-4 items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search columns..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-muted/30">
            {columnMappings.length} Total Columns
          </Badge>
          {unmappedCount > 0 ? (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              {unmappedCount} Unmapped
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              All Mapped
            </Badge>
          )}
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader className="bg-muted/50 sticky top-0 z-10">
            <TableRow>
              <TableHead 
                className="w-[250px] cursor-pointer hover:bg-muted/70"
                onClick={() => toggleSort('original')}
              >
                <div className="flex items-center gap-1">
                  Original Column
                  {sortBy === 'original' && (
                    <ArrowUpDown className={`h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                  )}
                </div>
              </TableHead>
              <TableHead 
                className="w-[250px] cursor-pointer hover:bg-muted/70"
                onClick={() => toggleSort('mapped')}
              >
                <div className="flex items-center gap-1">
                  Standard Field
                  {sortBy === 'mapped' && (
                    <ArrowUpDown className={`h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                  )}
                </div>
              </TableHead>
              <TableHead className="w-[300px]">Sample Values</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedMappings.map((mapping) => (
              <TableRow key={mapping.originalIndex} className={!mapping.standardField ? "bg-muted/10" : ""}>
                <TableCell className="font-medium">
                  <div className="bg-sky-100 text-blue-800 p-2 rounded">
                    {mapping.originalName}
                  </div>
                </TableCell>
                <TableCell>
                  <Select
                    value={mapping.standardField || "null"}
                    onValueChange={(value) => updateColumnMapping(
                      mapping.originalIndex, 
                      value === "null" ? null : value as StandardField
                    )}
                  >
                    <SelectTrigger className={`w-full ${mapping.standardField ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                      <SelectValue placeholder="Select a field" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
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
                    <Badge className="mt-1 bg-blue-100 text-blue-800 hover:bg-blue-200" variant="outline">
                      {getFieldLabel(mapping.standardField)}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col space-y-1">
                    {getSampleValues(mapping.originalIndex).map((sample, idx) => (
                      <span key={idx} className="text-xs truncate max-w-[280px]">
                        {sample}
                      </span>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredMappings.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No matching columns found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ColumnMappingTable;
