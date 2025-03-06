
import React, { useState } from 'react';
import { Plus, Search, Upload, ArrowRight, FileText, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useProjects } from '@/hooks/useProjects';
import { useFileUpload } from '@/hooks/useFileUpload';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import FileDropzone from '@/components/upload/FileDropzone';

const Projects: React.FC = () => {
  const { projects } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [fileType, setFileType] = useState<'rent_roll' | 'operating_statement'>('rent_roll');
  const [openUploadDialog, setOpenUploadDialog] = useState(false);

  const { 
    files, 
    onDrop, 
    handleRemoveFile,
    handleFileProjectChange,
    handleFileTypeChange,
    startUpload
  } = useFileUpload();

  const filteredProjects = searchTerm 
    ? projects.filter(project => 
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : projects;

  const handleUpload = () => {
    if (!selectedProject || files.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please select a project and add files",
        variant: "destructive"
      });
      return;
    }

    // Set project and file type for all files
    files.forEach(fileObj => {
      handleFileProjectChange(fileObj.file, selectedProject);
      handleFileTypeChange(fileObj.file, fileType);
    });

    startUpload();
    setOpenUploadDialog(false);
  };

  const FileTypeSelect = () => (
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
  );

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        
        <Dialog open={openUploadDialog} onOpenChange={setOpenUploadDialog}>
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
              
              <FileTypeSelect />
              
              <FileDropzone 
                onDrop={onDrop} 
                className="h-32"
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
              <Button variant="outline" onClick={() => setOpenUploadDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpload} disabled={!selectedProject || files.length === 0}>
                Upload
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          className="pl-10"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No projects found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <Card key={project.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <CardDescription className="truncate">Project ID: {project.id}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <FileText className="mr-1 h-4 w-4 text-primary/70" />
                    <span>Rent Rolls: 0</span>
                  </div>
                  <div className="flex items-center">
                    <FileSpreadsheet className="mr-1 h-4 w-4 text-primary/70" />
                    <span>Op Statements: 0</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-3 border-t">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedProject(project.id);
                    setOpenUploadDialog(true);
                  }}
                >
                  <Upload className="mr-2 h-3 w-3" /> 
                  Upload
                </Button>
                <Button variant="ghost" size="sm">
                  View Details <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
