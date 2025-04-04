
import React, { useState, useEffect } from 'react';
import { FileText, FileSpreadsheet, Download, Trash, PlusCircle, ChevronRight, ChevronDown, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { UploadedFile, Document } from '@/components/files/models';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { useFiles } from '@/hooks/useFiles';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import FileDropzone from '@/components/upload/FileDropzone';
import { useFileUpload } from '@/hooks/useFileUpload';
import { toast } from "@/components/ui/use-toast";

interface ProjectFilesTabProps {
  projectId: string;
}

const ProjectFilesTab: React.FC<ProjectFilesTabProps> = ({ projectId }) => {
  const { files: allFiles, getDocumentTypeLabel, formatFileSize, getFileTypeLabel } = useFiles();
  const [expandedFiles, setExpandedFiles] = useState<Set<string>>(new Set());
  const [projectFiles, setProjectFiles] = useState<UploadedFile[]>([]);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  
  const { 
    files: uploadQueue, 
    onDrop, 
    handleRemoveFile,
    handleFileProjectChange,
    handleFileTypeChange,
    startUpload
  } = useFileUpload();

  // Filter files associated with this project
  useEffect(() => {
    const filesForProject = allFiles.filter(file => 
      file.project?.id === projectId || 
      file.documents.some(doc => doc.project?.id === projectId)
    );
    setProjectFiles(filesForProject);
  }, [allFiles, projectId]);

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

  const handleDeleteFile = (fileId: string) => {
    // Mock file deletion
    toast({
      title: "File Deleted",
      description: "The file has been successfully deleted.",
    });
    setProjectFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleUpload = () => {
    if (uploadQueue.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select files to upload.",
        variant: "destructive"
      });
      return;
    }

    // Set project ID for all files in queue
    uploadQueue.forEach(fileObj => {
      handleFileProjectChange(fileObj.file, projectId);
    });

    // Start upload
    uploadQueue.forEach(fileObj => {
      startUpload(fileObj.file);
    });

    // Close the dialog and show success message
    setIsUploadDialogOpen(false);
    toast({
      title: "Upload Started",
      description: `${uploadQueue.length} file(s) are being uploaded to the project.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5 text-muted-foreground" />
          Project Files
        </h2>
        
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload File
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Files to Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <FileDropzone onDrop={onDrop} size="small" />
              
              {uploadQueue.length > 0 && (
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Size</TableHead>
                        <TableHead className="w-[70px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {uploadQueue.map((fileObj) => (
                        <TableRow key={fileObj.file.name}>
                          <TableCell className="font-medium">{fileObj.file.name}</TableCell>
                          <TableCell className="text-right">{formatFileSize(fileObj.file.size)}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => handleRemoveFile(fileObj.file)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpload}>
                Upload {uploadQueue.length > 0 ? `(${uploadQueue.length})` : ''}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {projectFiles.length === 0 ? (
        <div className="bg-muted/20 rounded-md p-8 text-center">
          <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Files Yet</h3>
          <p className="text-muted-foreground mb-4">This project doesn't have any files. Upload files to get started.</p>
          <Button variant="outline" onClick={() => setIsUploadDialogOpen(true)}>Upload Files</Button>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20">
                <TableHead className="w-[30%]">File Name</TableHead>
                <TableHead className="w-[10%]">Type</TableHead>
                <TableHead className="w-[15%]">Date Added</TableHead>
                <TableHead className="w-[15%]">Added By</TableHead>
                <TableHead className="w-[15%]">Last Modified</TableHead>
                <TableHead className="w-[10%]">Status</TableHead>
                <TableHead className="w-[5%] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectFiles.map((file) => {
                const isExpanded = expandedFiles.has(file.id);
                const hasDocuments = file.documents.length > 0;
                
                return (
                  <React.Fragment key={file.id}>
                    {/* File row */}
                    <TableRow className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {hasDocuments && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 p-0"
                              onClick={() => toggleFileExpand(file.id)}
                            >
                              {isExpanded ? (
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          )}
                          {file.fileType === 'excel' ? (
                            <FileSpreadsheet className="h-5 w-5 text-green-600" />
                          ) : (
                            <FileText className="h-5 w-5 text-blue-500" />
                          )}
                          <span className="font-medium">{file.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {getFileTypeLabel(file.fileType)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {format(new Date(file.uploadDate), 'dd/MM/yyyy')}
                      </TableCell>
                      <TableCell>
                        {file.uploader.name}
                      </TableCell>
                      <TableCell>
                        {format(new Date(file.uploadDate), 'dd/MM/yyyy')}
                      </TableCell>
                      <TableCell>
                        <Badge className={file.status === 'complete' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'}>
                          {file.status === 'complete' ? 'Completed' : 'Draft'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <svg width="15" height="3" viewBox="0 0 15 3" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3 w-3">
                                  <path d="M1.5 1.5C1.5 1.89782 1.65804 2.27936 1.93934 2.56066C2.22064 2.84196 2.60218 3 3 3C3.39782 3 3.77936 2.84196 4.06066 2.56066C4.34196 2.27936 4.5 1.89782 4.5 1.5C4.5 1.10218 4.34196 0.720644 4.06066 0.43934C3.77936 0.158035 3.39782 0 3 0C2.60218 0 2.22064 0.158035 1.93934 0.43934C1.65804 0.720644 1.5 1.10218 1.5 1.5ZM7.5 1.5C7.5 1.89782 7.65804 2.27936 7.93934 2.56066C8.22064 2.84196 8.60218 3 9 3C9.39782 3 9.77936 2.84196 10.0607 2.56066C10.342 2.27936 10.5 1.89782 10.5 1.5C10.5 1.10218 10.342 0.720644 10.0607 0.43934C9.77936 0.158035 9.39782 0 9 0C8.60218 0 8.22064 0.158035 7.93934 0.43934C7.65804 0.720644 7.5 1.10218 7.5 1.5ZM13.5 1.5C13.5 1.89782 13.658 2.27936 13.9393 2.56066C14.2206 2.84196 14.6022 3 15 3C15.3978 3 15.7794 2.84196 16.0607 2.56066C16.342 2.27936 16.5 1.89782 16.5 1.5C16.5 1.10218 16.342 0.720644 16.0607 0.43934C15.7794 0.158035 15.3978 0 15 0C14.6022 0 14.2206 0.158035 13.9393 0.43934C13.658 0.720644 13.5 1.10218 13.5 1.5Z" fill="currentColor"/>
                                </svg>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="flex items-center">
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Create Extraction
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="flex items-center text-destructive focus:text-destructive" 
                                onClick={() => handleDeleteFile(file.id)}
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>

                    {/* Expanded document rows */}
                    {isExpanded && hasDocuments && (
                      <TableRow className="bg-muted/10 hover:bg-muted/20">
                        <TableCell colSpan={7} className="p-0">
                          <div className="pl-10 pr-4 py-2">
                            <Table>
                              <TableHeader>
                                <TableRow className="bg-muted/5">
                                  <TableHead className="w-[25%]">Document Name</TableHead>
                                  <TableHead className="w-[15%]">Type</TableHead>
                                  <TableHead className="w-[15%]">Date Extracted</TableHead>
                                  <TableHead className="w-[15%]">Last Updated</TableHead>
                                  <TableHead className="w-[15%]" colSpan={2}>Extraction Details</TableHead>
                                  <TableHead className="w-[15%] text-right">Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {file.documents.map((document: Document) => (
                                  <TableRow key={document.id} className="hover:bg-muted/20">
                                    <TableCell className="font-medium">{document.name}</TableCell>
                                    <TableCell>
                                      <Badge variant="outline">
                                        {getDocumentTypeLabel(document.type)}
                                      </Badge>
                                    </TableCell>
                                    <TableCell>
                                      {format(new Date(document.createdAt), 'dd/MM/yyyy')}
                                    </TableCell>
                                    <TableCell>
                                      {format(new Date(document.updatedAt), 'dd/MM/yyyy')}
                                    </TableCell>
                                    {document.type === 'rent_roll' ? (
                                      <TableCell colSpan={2}>
                                        <div className="flex items-center gap-2">
                                          <span className="text-sm text-muted-foreground">Rent Roll Date:</span>
                                          <Badge variant="outline" className="text-xs">
                                            {format(new Date(document.createdAt), 'MMM yyyy')}
                                          </Badge>
                                        </div>
                                      </TableCell>
                                    ) : (
                                      <TableCell colSpan={2}>
                                        <div className="flex items-center gap-2">
                                          <span className="text-sm text-muted-foreground">Property:</span>
                                          <Badge variant="outline" className="text-xs">
                                            {document.property?.name || "Not assigned"}
                                          </Badge>
                                        </div>
                                      </TableCell>
                                    )}
                                    <TableCell className="text-right">
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="icon" className="h-7 w-7">
                                            <svg width="15" height="3" viewBox="0 0 15 3" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3 w-3">
                                              <path d="M1.5 1.5C1.5 1.89782 1.65804 2.27936 1.93934 2.56066C2.22064 2.84196 2.60218 3 3 3C3.39782 3 3.77936 2.84196 4.06066 2.56066C4.34196 2.27936 4.5 1.89782 4.5 1.5C4.5 1.10218 4.34196 0.720644 4.06066 0.43934C3.77936 0.158035 3.39782 0 3 0C2.60218 0 2.22064 0.158035 1.93934 0.43934C1.65804 0.720644 1.5 1.10218 1.5 1.5ZM7.5 1.5C7.5 1.89782 7.65804 2.27936 7.93934 2.56066C8.22064 2.84196 8.60218 3 9 3C9.39782 3 9.77936 2.84196 10.0607 2.56066C10.342 2.27936 10.5 1.89782 10.5 1.5C10.5 1.10218 10.342 0.720644 10.0607 0.43934C9.77936 0.158035 9.39782 0 9 0C8.60218 0 8.22064 0.158035 7.93934 0.43934C7.65804 0.720644 7.5 1.10218 7.5 1.5ZM13.5 1.5C13.5 1.89782 13.658 2.27936 13.9393 2.56066C14.2206 2.84196 14.6022 3 15 3C15.3978 3 15.7794 2.84196 16.0607 2.56066C16.342 2.27936 16.5 1.89782 16.5 1.5C16.5 1.10218 16.342 0.720644 16.0607 0.43934C15.7794 0.158035 15.3978 0 15 0C14.6022 0 14.2206 0.158035 13.9393 0.43934C13.658 0.720644 13.5 1.10218 13.5 1.5Z" fill="currentColor"/>
                                            </svg>
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem className="flex items-center">
                                            <FileText className="mr-2 h-4 w-4" />
                                            View Details
                                          </DropdownMenuItem>
                                          <DropdownMenuItem className="flex items-center">
                                            <Download className="mr-2 h-4 w-4" />
                                            Download Data
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ProjectFilesTab;
