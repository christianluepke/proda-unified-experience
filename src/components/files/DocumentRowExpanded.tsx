
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Document } from './models';
import DocumentList from './DocumentList';
import { TableColumn } from './models';

interface DocumentRowExpandedProps {
  isExpanded: boolean;
  hasDocuments: boolean;
  documents: Document[];
  visibleColumns: TableColumn[];
}

const DocumentRowExpanded: React.FC<DocumentRowExpandedProps> = ({
  isExpanded,
  hasDocuments,
  documents,
  visibleColumns
}) => {
  if (!isExpanded || !hasDocuments) {
    return null;
  }

  return (
    <TableRow className="bg-muted/10">
      <TableCell colSpan={visibleColumns.filter(col => col.visible).length + 1} className="p-0">
        <div className="pl-10 pr-4 py-2">
          <DocumentList documents={documents} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default DocumentRowExpanded;
