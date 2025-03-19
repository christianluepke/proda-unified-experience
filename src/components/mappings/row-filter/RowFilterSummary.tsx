
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { RowSelection } from '../types';

interface RowFilterSummaryProps {
  rowSelections: RowSelection[];
}

const RowFilterSummary: React.FC<RowFilterSummaryProps> = ({ rowSelections }) => {
  const getTotalRowsExcluded = () => {
    return rowSelections.filter(row => !row.isSelected).length;
  };
  
  const getAutoExcludedCount = () => {
    return rowSelections.filter(row => row.isAutoExcluded).length;
  };

  return (
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-medium">Filter Rows</h3>
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="bg-muted/30">
          {rowSelections.length} Total Rows
        </Badge>
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
          {getTotalRowsExcluded()} Excluded
        </Badge>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          {getAutoExcludedCount()} Auto-filtered
        </Badge>
      </div>
    </div>
  );
};

export default RowFilterSummary;
