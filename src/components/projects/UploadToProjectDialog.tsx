
import React, { useState } from 'react';
import { Upload, Database as DatabaseIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import FileDropzone from '@/components/upload/FileDropzone';
import { Project } from '@/components/upload/models';
import { Database } from '@/components/sidebar/types';

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
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(initialSelectedProject || null);
  const [fileType, setFileType] = useState<'rent_roll' | 'operating_statement'>('rent_roll');
  const [showDatabaseSelector, setShowDatabaseSelector] = useState(false);
  const [selectedDatabase, setSelectedDatabase] = useState<string>(mockDatabases[0].id);

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
    setOpen(false);
    setShowDatabaseSelector(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload to Project
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Files to Project</DialogTitle>
            <DialogDescription>
              Select a project and file type, then upload your files.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Project</h4>
              <select 
                className="w-full p-2 border rounded-md"
                value={selectedProject || ''}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                <option value="">Select a project</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">File Type</h4>
              <RadioGroup 
                value={fileType} 
                onValueChange={(value) => setFileType(value as 'rent_roll' | 'operating_statement')}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rent_roll" id="rent_roll" />
                  <label htmlFor="rent_roll" className="text-sm cursor-pointer">Rent Roll</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="operating_statement" id="operating_statement" />
                  <label htmlFor="operating_statement" className="text-sm cursor-pointer">Operating Statement</label>
                </div>
              </RadioGroup>
            </div>
            
            <FileDropzone 
              onDrop={handleDrop} 
              size="small"
              className="h-32 shadow-sm"
            />
            
            {files.length > 0 && (
              <div className="mt-2">
                <h4 className="text-sm font-medium mb-2">Files to upload ({files.length})</h4>
                <ul className="max-h-40 overflow-y-auto space-y-2 text-sm">
                  {files.map((fileObj, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <span className="truncate max-w-xs">{fileObj.file.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFile(fileObj.file)}
                        className="h-6 w-6 p-0"
                      >
                        &times;
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
      <Dialog open={showDatabaseSelector} onOpenChange={setShowDatabaseSelector}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select Database</DialogTitle>
            <DialogDescription>
              Choose which database to upload these files to
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <RadioGroup 
              value={selectedDatabase} 
              onValueChange={setSelectedDatabase}
              className="space-y-2"
            >
              {mockDatabases.map(db => (
                <div key={db.id} className="flex items-center space-x-2 p-2 border rounded-md hover:bg-muted">
                  <RadioGroupItem value={db.id} id={`db-${db.id}`} />
                  <label htmlFor={`db-${db.id}`} className="flex items-center gap-2 text-sm cursor-pointer flex-grow">
                    <DatabaseIcon className="h-4 w-4 text-muted-foreground" />
                    {db.name}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDatabaseSelector(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowDatabaseSelector(false)}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadToProjectDialog;
