
import React from 'react';

interface DataCellListProps {
  rowData: string[];
}

const DataCellList: React.FC<DataCellListProps> = ({ rowData }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap max-w-full pb-2 scrollbar-thin">
      {rowData?.map((cell, cellIndex) => (
        <span 
          key={cellIndex} 
          className="text-xs px-2 py-1 bg-muted/20 rounded truncate max-w-[150px]"
        >
          {cell || "(empty)"}
        </span>
      ))}
    </div>
  );
};

export default DataCellList;
