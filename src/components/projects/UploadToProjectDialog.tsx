import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from "@/components/ui/use-toast";
import FileDropzone from '@/components/upload/FileDropzone';
import { Project } from '@/components/upload/models';
import { Database } from '@/components/sidebar/types';
import DatabaseSelectorDialog from './DatabaseSelectorDialog';
import UploadFileList from './UploadFileList';
import UploadFileTypeSelector from './UploadFileTypeSelector';
import UploadProjectSelector from './UploadProjectSelector';
import PropertiesOverview from './PropertiesOverview';

// Example databases for demonstration
const mockDatabases: Database[] = [
  { id: 'db1', name: 'Main Database' },
  { id: 'db2', name: 'Test Database' },
  { id: 'db3', name: 'Development DB' },
];

interface UploadToProjectDialogProps {
  projects: Project[];
  selectedProject?: string | null;
  onUpload: (projectId: string, fileType: 'rent_roll' | 'operating_statement', databaseId?: string) => void;
  files: Array<{ file: File; progress: number; status: string }>;
  onDrop: (acceptedFiles: File[]) => void;
  handleRemoveFile: (file: File) => void;
}

const UploadToProjectDialog: React.FC<UploadToProjectDialogProps> = ({
  projects,
  selectedProject: initialSelectedProject,
  onUpload,
  files,
  onDrop,
  handleRemoveFile
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(initialSelectedProject || null);
  const [fileType, setFileType] = useState<'rent_roll' | 'operating_statement'>('rent_roll');
  const [showDatabaseSelector, setShowDatabaseSelector] = useState(false);
  const [selectedDatabase, setSelectedDatabase] = useState<string>(mockDatabases[0].id);
  const [isPropertiesExpanded, setIsPropertiesExpanded] = useState(false);

  const handleDrop = (acceptedFiles: File[]) => {
    onDrop(acceptedFiles);
    
    // If there are multiple databases, show the database selector
    if (mockDatabases.length > 1 && acceptedFiles.length > 0) {
      setShowDatabaseSelector(true);
    }
  };

  const handleUpload = () => {
    if (!selectedProject || files.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please select a project and add files",
        variant: "destructive"
      });
      return;
    }

    onUpload(selectedProject, fileType, selectedDatabase);
    
    // Generate ID for navigation based on file type
    if (fileType === 'operating_statement') {
      setOpen(false);
      // Generate a random ID for the operating statement
      const operatingStatementId = `os-${Math.random().toString(36).substring(2, 9)}`;
      toast({
        title: "Processing Operating Statement",
        description: "Redirecting to review mappings..."
      });
      
      // Add short delay to allow the toast to be seen
      setTimeout(() => {
        navigate(`/review/${operatingStatementId}`);
      }, 500);
    } else if (fileType === 'rent_roll') {
      setOpen(false);
      // Generate a random ID for the rent roll
      const rentRollId = `rr-${Math.random().toString(36).substring(2, 9)}`;
      toast({
        title: "Processing Rent Roll",
        description: "Redirecting to table selection..."
      });
      
      // Add short delay to allow the toast to be seen
      setTimeout(() => {
        navigate(`/select-table/${rentRollId}`);
      }, 500);
    } else {
      setOpen(false);
      setShowDatabaseSelector(false);
    }
  };

  // Get the selected project details
  const projectDetails = selectedProject 
    ? projects.find(project => project.id === selectedProject) 
    : null;

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload to Project
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Upload Files to Project</DialogTitle>
            <DialogDescription>
              Select a project and file type, then upload your files.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <UploadProjectSelector 
              projects={projects}
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
            />
            
            {/* Project properties overview - collapsed by default */}
            <PropertiesOverview 
              projectDetails={projectDetails}
              isExpanded={isPropertiesExpanded}
              setIsExpanded={setIsPropertiesExpanded}
            />
            
            <UploadFileTypeSelector 
              fileType={fileType}
              setFileType={setFileType}
            />
            
            <FileDropzone 
              onDrop={handleDrop} 
              size="small"
              className="h-32 shadow-sm"
            />
            
            <UploadFileList 
              files={files}
              handleRemoveFile={handleRemoveFile}
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={!selectedProject || files.length === 0}>
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Database Selection Dialog */}
      <DatabaseSelectorDialog 
        open={showDatabaseSelector}
        setOpen={setShowDatabaseSelector}
        databases={mockDatabases}
        selectedDatabase={selectedDatabase}
        setSelectedDatabase={setSelectedDatabase}
      />
    </>
  );
};

export default UploadToProjectDialog;
