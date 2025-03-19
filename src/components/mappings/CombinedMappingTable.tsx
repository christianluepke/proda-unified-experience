
import React, { useState } from 'react';
import { ColumnMapping, RowSelection, StandardField, getFieldLabel } from './types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, ArrowUpDown, CheckCircle2, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface CombinedMappingTableProps {
  columnMappings: ColumnMapping[];
  rowSelections: RowSelection[];
  updateColumnMapping: (originalIndex: number, standardField: StandardField | null) => void;
  toggleRowSelection: (rowIndex: number) => void;
  previewData: string[][];
}

const CombinedMappingTable: React.FC<CombinedMappingTableProps> = ({
  columnMappings,
  rowSelections,
  updateColumnMapping,
  toggleRowSelection,
  previewData
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rowFilter, setRowFilter] = useState<'all' | 'included' | 'excluded'>('all');

  // Helper function to determine if a row appears to be a unit row
  const isLikelyUnitRow = (rowData: string[]) => {
    // If row has tenant information, it's likely a unit
    const hasTenant = rowData.some(cell => 
      cell && cell.length > 0 && cell.toLowerCase() !== 'vacant' && 
      !cell.toLowerCase().includes('total') && !cell.toLowerCase().includes('subtotal')
    );
    
    // If row has numeric values for area or rent, likely a unit
    const hasNumbers = rowData.some(cell => {
      const numericValue = parseFloat(cell.replace(/[$,]/g, ''));
      return !isNaN(numericValue) && numericValue > 0;
    });
    
    return hasTenant || hasNumbers;
  };

  // Filter rows based on search and filter
  const filteredRows = rowSelections.filter(selection => {
    // Filter by inclusion state
    if (rowFilter === 'included' && !selection.isSelected) return false;
    if (rowFilter === 'excluded' && selection.isSelected) return false;
    
    // Filter by search term
    if (searchTerm) {
      const rowData = previewData[selection.rowIndex];
      // Check if any cell in the row contains the search term
      return rowData && rowData.some(cell => 
        cell && cell.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return true;
  });

  // Handle bulk selection
  const selectAllRows = () => {
    filteredRows.forEach(selection => {
      if (!selection.isSelected) {
        toggleRowSelection(selection.rowIndex);
      }
    });
  };
  
  const deselectAllRows = () => {
    filteredRows.forEach(selection => {
      if (selection.isSelected) {
        toggleRowSelection(selection.rowIndex);
      }
    });
  };

  return (
    <div className="w-full">
      <div className="bg-muted/40 p-4 border-b space-y-3">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search rows..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Show rows:</span>
              <div className="flex">
                <button 
                  className={`px-3 py-1 text-sm rounded-l-md border ${rowFilter === 'all' 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'border-input'}`}
                  onClick={() => setRowFilter('all')}
                >
                  All
                </button>
                <button 
                  className={`px-3 py-1 text-sm border-t border-b ${rowFilter === 'included' 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'border-input'}`}
                  onClick={() => setRowFilter('included')}
                >
                  Included
                </button>
                <button 
                  className={`px-3 py-1 text-sm rounded-r-md border ${rowFilter === 'excluded' 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'border-input'}`}
                  onClick={() => setRowFilter('excluded')}
                >
                  Excluded
                </button>
              </div>
            </div>
            
            <button 
              className="px-3 py-1 text-xs rounded-md border bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
              onClick={selectAllRows}
            >
              <CheckCircle2 className="h-3 w-3 inline mr-1" />
              Select All
            </button>
            <button 
              className="px-3 py-1 text-xs rounded-md border bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
              onClick={deselectAllRows}
            >
              <X className="h-3 w-3 inline mr-1" />
              Deselect All
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10">
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
          </TableHeader>

          <TableBody>
            {filteredRows.map((selection) => {
              const rowData = previewData[selection.rowIndex];
              const displayRowIndex = selection.rowIndex;
              const isUnit = rowData ? isLikelyUnitRow(rowData) : false;
              
              return (
                <TableRow 
                  key={`row-${selection.rowIndex}`}
                  className={!selection.isSelected ? "bg-muted/10" : isUnit ? "bg-green-50" : ""}
                >
                  <TableCell>
                    <Checkbox 
                      checked={selection.isSelected}
                      onCheckedChange={() => toggleRowSelection(selection.rowIndex)}
                    />
                  </TableCell>
                  <TableCell className="text-xs font-mono">{displayRowIndex}</TableCell>
                  <TableCell>
                    {selection.isAutoExcluded ? (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 whitespace-nowrap text-xs">
                        {selection.reason}
                      </Badge>
                    ) : (
                      selection.isSelected ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                          Included
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
                          Excluded
                        </Badge>
                      )
                    )}
                  </TableCell>
                  {/* Data cells */}
                  {columnMappings.map((mapping, cellIndex) => (
                    <TableCell key={`cell-${selection.rowIndex}-${cellIndex}`}>
                      {rowData && rowData[mapping.originalIndex] ? (
                        rowData[mapping.originalIndex]
                      ) : (
                        <span className="text-muted-foreground text-xs">(empty)</span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
            
            {filteredRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columnMappings.length + 3} className="h-24 text-center">
                  No matching rows found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CombinedMappingTable;
