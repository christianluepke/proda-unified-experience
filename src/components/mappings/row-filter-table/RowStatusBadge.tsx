
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface RowStatusBadgeProps {
  isAutoExcluded: boolean;
  isSelected: boolean;
  reason?: string;
}

const RowStatusBadge: React.FC<RowStatusBadgeProps> = ({ 
  isAutoExcluded, 
  isSelected, 
  reason 
}) => {
  if (isAutoExcluded) {
    return (
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
        <ExclamationTriangleIcon className="h-3 w-3" />
        <span>{reason}</span>
      </Badge>
    );
  }
  
  if (isSelected) {
    return (
      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
        Included
      </Badge>
    );
  }
  
  return (
    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
      Excluded
    </Badge>
  );
};

export default RowStatusBadge;
