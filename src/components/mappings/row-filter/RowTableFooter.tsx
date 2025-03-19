
import React from 'react';

interface RowTableFooterProps {
  totalRows: number;
  visibleRows: number;
}

const RowTableFooter: React.FC<RowTableFooterProps> = ({ 
  totalRows, 
  visibleRows 
}) => {
  if (totalRows <= visibleRows) return null;
  
  return (
    <div className="p-3 text-center text-sm text-muted-foreground border-t">
      + {totalRows - visibleRows} more rows
    </div>
  );
};

export default RowTableFooter;
