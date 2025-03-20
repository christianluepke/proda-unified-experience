
import React from 'react';
import { useFiles } from '@/hooks/useFiles';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const FileFilters: React.FC = () => {
  const { 
    filterOptions, 
    activeFilters, 
    updateFilters, 
    resetFilters,
    getDocumentTypeLabel
  } = useFiles();

  // Handle document type filter
  const handleDocTypeFilter = (value: string) => {
    if (value === "all") {
      updateFilters({ documentTypes: [] });
    } else {
      updateFilters({ 
        documentTypes: [value as any] 
      });
    }
  };

  // Handle status filter
  const handleStatusFilter = (value: string) => {
    if (value === "all") {
      updateFilters({ status: [] });
    } else {
      updateFilters({ 
        status: [value as any] 
      });
    }
  };

  // Get document type name for display
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return 'Draft';
      case 'processing': return 'Processing';
      case 'complete': return 'Complete';
      case 'error': return 'Error';
      default: return status;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 border rounded-md bg-muted/10">
      <div>
        <label className="text-sm font-medium block mb-2">Document Type</label>
        <Select
          value={activeFilters.documentTypes.length ? activeFilters.documentTypes[0] : "all"}
          onValueChange={handleDocTypeFilter}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Document Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Document Types</SelectItem>
            {filterOptions.documentTypes.map(type => (
              <SelectItem key={type} value={type}>
                {getDocumentTypeLabel(type)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium block mb-2">Status</label>
        <Select
          value={activeFilters.status.length ? activeFilters.status[0] : "all"}
          onValueChange={handleStatusFilter}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {filterOptions.statuses.map(status => (
              <SelectItem key={status} value={status}>
                {getStatusLabel(status)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="md:col-span-2 flex items-end">
        <Button 
          variant="secondary" 
          onClick={resetFilters}
          className="ml-auto"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default FileFilters;
