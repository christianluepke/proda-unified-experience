
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
import BulkActions from './BulkActions';

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
    formatFileSize,
    selectedFiles,
    toggleFileSelection,
    areAllFilesSelected,
    toggleSelectAll,
    selectedCount,
    bulkDeleteFiles
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
    <div>
      {/* Bulk Actions Bar */}
      <BulkActions 
        selectedCount={selectedCount}
        selectedFiles={selectedFiles}
        files={files}
        onBulkDelete={bulkDeleteFiles}
      />

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
            areAllFilesSelected={areAllFilesSelected()}
            toggleSelectAll={toggleSelectAll}
            hasFiles={files.length > 0}
          />
          <TableBody>
            {files.map(file => {
              const isExpanded = expandedFiles.has(file.id);
              const hasDocuments = file.documents.length > 0;
              const isSelected = selectedFiles.has(file.id);
              
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
                    isSelected={isSelected}
                    onSelectToggle={toggleFileSelection}
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
    </div>
  );
};

export default FileList;
