
import React from 'react';

interface DataCellListProps {
  rowData: string[];
  maxCells?: number;
}

const DataCellList: React.FC<DataCellListProps> = ({ rowData, maxCells = 8 }) => {
  const displayCells = rowData?.slice(0, maxCells) || [];
  const hiddenCount = rowData && rowData.length > maxCells ? rowData.length - maxCells : 0;
  
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap max-w-full pb-1 scrollbar-thin">
      {displayCells.map((cell, cellIndex) => (
        <span 
          key={cellIndex} 
          className="text-xs px-1.5 py-0.5 bg-muted/20 rounded truncate max-w-[120px]"
          title={cell || "(empty)"}
        >
          {cell || "(empty)"}
        </span>
      ))}
      {hiddenCount > 0 && (
        <span className="text-xs px-1.5 py-0.5 bg-sky-100 text-sky-700 rounded">
          +{hiddenCount} more
        </span>
      )}
    </div>
  );
};

export default DataCellList;
