
import React, { useState } from 'react';
import {
  Table,
  TableBody,
} from '@/components/ui/table';
import { UploadedFile } from './models';
import { useFiles } from '@/hooks/useFiles';
import ColumnSelector from './ColumnSelector';
import FileTableHeader from './FileTableHeader';
import FileRow from './FileRow';
import DocumentRowExpanded from './DocumentRowExpanded';

interface FileListProps {
  files: UploadedFile[];
  onDeleteFile: (fileId: string) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onDeleteFile }) => {
  const [expandedFiles, setExpandedFiles] = useState<Set<string>>(new Set());
  const { 
    getFileDocumentTypeLabel, 
    sortField, 
    sortDirection, 
    updateSort,
    visibleColumns,
    formatFileSize
  } = useFiles();

  const toggleFileExpand = (fileId: string) => {
    setExpandedFiles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(fileId)) {
        newSet.delete(fileId);
      } else {
        newSet.add(fileId);
      }
      return newSet;
    });
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="p-2 flex justify-end">
        <ColumnSelector />
      </div>
      <Table>
        <FileTableHeader 
          visibleColumns={visibleColumns}
          sortField={sortField}
          sortDirection={sortDirection}
          updateSort={updateSort}
        />
        <TableBody>
          {files.map(file => {
            const isExpanded = expandedFiles.has(file.id);
            const hasDocuments = file.documents.length > 0;
            
            return (
              <React.Fragment key={file.id}>
                <FileRow 
                  file={file}
                  isExpanded={isExpanded}
                  visibleColumns={visibleColumns}
                  getFileDocumentTypeLabel={getFileDocumentTypeLabel}
                  toggleFileExpand={toggleFileExpand}
                  onDeleteFile={onDeleteFile}
                  formatFileSize={formatFileSize}
                />
                <DocumentRowExpanded 
                  isExpanded={isExpanded}
                  hasDocuments={hasDocuments}
                  documents={file.documents}
                  visibleColumns={visibleColumns}
                />
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default FileList;
