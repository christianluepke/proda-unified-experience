
import { useState } from 'react';
import { TableColumn } from './types';

// Define the available columns
export const FILE_COLUMNS: TableColumn[] = [
  { id: 'select', label: 'Select', visible: true },
  { id: 'name', label: 'File Name', visible: true },
  { id: 'type', label: 'File Type', visible: true },
  { id: 'uploadDate', label: 'Upload Date', visible: true },
  { id: 'property', label: 'Property', visible: true },
  { id: 'project', label: 'Project', visible: true },
  { id: 'portfolio', label: 'Portfolio', visible: false },
  { id: 'status', label: 'Status', visible: true },
];

export function useFilesColumns() {
  const [visibleColumns, setVisibleColumns] = useState(FILE_COLUMNS);

  // Toggle a column's visibility
  const toggleColumnVisibility = (columnId: string) => {
    // Never hide the select column
    if (columnId === 'select') return;
    
    setVisibleColumns(prevColumns => 
      prevColumns.map(col => 
        col.id === columnId ? { ...col, visible: !col.visible } : col
      )
    );
  };

  return {
    visibleColumns,
    toggleColumnVisibility
  };
}
