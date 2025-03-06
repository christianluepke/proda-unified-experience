
import React, { useState, useRef, useCallback } from 'react';
import { toast } from "sonner";
import { 
  Upload, 
  Files, 
  FilePlus, 
  FileText, 
  Check, 
  X, 
  Plus,
  ChevronDown
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';

type FileType = 'rent_roll' | 'operating_statement';

interface FileUpload {
  id: string;
  file: File;
  type: FileType | '';
  progress: number;
  status: 'idle' | 'uploading' | 'success' | 'error';
  project?: string;
}

interface Project {
  id: string;
  name: string;
}

const MOCK_PROJECTS: Project[] = [
  { id: '1', name: 'New York High-Rise' },
  { id: '2', name: 'San Francisco Office Park' },
  { id: '3', name: 'Chicago Retail Center' },
];

const Upload: React.FC = () => {
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map(file => ({
        id: Math.random().toString(36).substring(2, 9),
        file,
        type: '',
        progress: 0,
        status: 'idle' as const,
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).map(file => ({
        id: Math.random().toString(36).substring(2, 9),
        file,
        type: '',
        progress: 0,
        status: 'idle' as const,
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  }, []);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const setFileType = (id: string, type: FileType) => {
    setFiles(files.map(file => 
      file.id === id ? { ...file, type } : file
    ));
  };

  const setFileProject = (id: string, project: string) => {
    setFiles(files.map(file => 
      file.id === id ? { ...file, project } : file
    ));
  };

  const removeFile = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
  };

  const uploadFiles = () => {
    // Validate file types are set
    const invalidFiles = files.filter(file => !file.type);
    if (invalidFiles.length > 0) {
      toast.error("Please specify file types for all files before uploading.");
      return;
    }

    // Validate project selection for operating statements
    const invalidOperatingStatements = files.filter(
      file => file.type === 'operating_statement' && !file.project
    );
    if (invalidOperatingStatements.length > 0) {
      toast.error("Please select a project for all operating statements.");
      return;
    }

    // Simulate file upload
    setFiles(files.map(file => ({
      ...file,
      status: 'uploading',
    })));

    files.forEach(file => {
      const updatedFile = { ...file, status: 'uploading' as const };
      simulateFileUpload(updatedFile);
    });

    toast.success("Upload started. You can track progress below.");
  };

  const simulateFileUpload = (file: FileUpload) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setFiles(prev => 
            prev.map(f => 
              f.id === file.id 
                ? { ...f, progress: 100, status: 'success' } 
                : f
            )
          );
          toast.success(`${file.file.name} uploaded successfully!`);
        }, 400);
      }
      setFiles(prev => 
        prev.map(f => 
          f.id === file.id ? { ...f, progress } : f
        )
      );
    }, 300);
  };

  const createNewProject = () => {
    if (!newProjectName.trim()) {
      toast.error("Please enter a project name");
      return;
    }
    
    const newProject = {
      id: `new-${Date.now()}`,
      name: newProjectName
    };
    
    MOCK_PROJECTS.push(newProject);
    setNewProjectName('');
    setIsCreatingProject(false);
    toast.success(`Project "${newProjectName}" created successfully!`);
  };

  const allFilesHaveTypes = files.every(file => file.type);
  const allOperatingStatementsHaveProjects = files
    .filter(file => file.type === 'operating_statement')
    .every(file => file.project);
  const canUpload = files.length > 0 && allFilesHaveTypes && allOperatingStatementsHaveProjects;

  return (
    <div className="min-h-screen bg-background flex flex-col animate-fade-in">
      <Header />
      
      <main className="flex-1 container max-w-5xl py-8 px-4 md:py-12">
        <div className="space-y-1 mb-8 animate-slide-in">
          <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
            File Management
          </span>
          <h1 className="text-3xl font-semibold tracking-tight">Upload Files</h1>
          <p className="text-muted-foreground max-w-3xl">
            Upload and process your rent rolls and operating statements. Operating statements must be associated with a project.
          </p>
        </div>

        <Card className="mb-8 overflow-hidden border-none shadow-md">
          <div
            className={cn(
              "flex flex-col items-center justify-center py-12 px-4 transition-all duration-200 bg-gradient-to-b from-secondary/30 to-secondary/10 rounded-t-lg border-2 border-dashed border-primary/20 hover:border-primary/30",
              isDragging && "border-primary/50 bg-primary/5"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              multiple
            />
            <div className={cn(
              "w-16 h-16 mb-4 rounded-full flex items-center justify-center bg-primary/10 text-primary transition-transform duration-300",
              isDragging ? "scale-110" : "hover:scale-105"
            )}>
              <Upload size={28} className={isDragging ? "animate-bounce" : ""} />
            </div>
            <h3 className="text-xl font-medium mb-2">Drag & Drop Files</h3>
            <p className="text-muted-foreground text-center max-w-md mb-4">
              Supported file types: Rent Rolls and Operating Statements
            </p>
            <Button variant="secondary" type="button" className="group">
              <span>Browse Files</span>
              <FilePlus size={16} className="ml-2 group-hover:rotate-12 transition-transform duration-200" />
            </Button>
          </div>
          
          {files.length > 0 && (
            <div className="p-6 bg-white rounded-b-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium flex items-center">
                  <Files size={18} className="mr-2" />
                  Files to Upload ({files.length})
                </h3>
                {files.some(file => file.status !== 'idle') ? (
                  <div className="text-sm text-muted-foreground">
                    Upload in progress...
                  </div>
                ) : (
                  <Button 
                    onClick={uploadFiles} 
                    disabled={!canUpload}
                    size="sm"
                    className="transition-all duration-200"
                  >
                    <span>Upload All</span>
                    {canUpload && (
                      <Upload size={14} className="ml-2" />
                    )}
                  </Button>
                )}
              </div>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {files.map((file) => (
                  <div key={file.id} className="p-4 rounded-lg border bg-card group animate-slide-in">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <FileText size={18} className="text-muted-foreground mr-3" />
                        <div>
                          <h4 className="font-medium text-sm line-clamp-1 mb-0.5">
                            {file.file.name}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {(file.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      
                      {file.status === 'idle' ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(file.id);
                          }}
                        >
                          <X size={16} className="text-muted-foreground" />
                        </Button>
                      ) : (
                        <div className="flex items-center h-8 px-2 text-xs font-medium">
                          {file.status === 'success' ? (
                            <span className="text-green-600 flex items-center">
                              <Check size={14} className="mr-1" /> Complete
                            </span>
                          ) : file.status === 'error' ? (
                            <span className="text-red-600 flex items-center">
                              <X size={14} className="mr-1" /> Failed
                            </span>
                          ) : (
                            <span className="text-primary flex items-center">
                              <span className="h-2 w-2 rounded-full bg-primary animate-pulse mr-2" />
                              Uploading
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {file.status === 'uploading' || file.status === 'success' ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{Math.round(file.progress)}%</span>
                        </div>
                        <Progress 
                          value={file.progress} 
                          className={cn(
                            "h-1.5 transition-all duration-300",
                            file.status === 'success' ? "bg-muted-foreground/20" : "bg-muted-foreground/10"
                          )}
                          indicatorClassName={cn(
                            file.status === 'success' ? "bg-green-500" : "bg-primary"
                          )}
                        />
                      </div>
                    ) : (
                      <div className="grid gap-4 mt-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
                        <div>
                          <Label htmlFor={`file-type-${file.id}`} className="mb-1.5 block text-xs">
                            File Type
                          </Label>
                          <Select
                            value={file.type}
                            onValueChange={(value) => setFileType(file.id, value as FileType)}
                          >
                            <SelectTrigger id={`file-type-${file.id}`}>
                              <SelectValue placeholder="Select file type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="rent_roll">Rent Roll</SelectItem>
                              <SelectItem value="operating_statement">Operating Statement</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {file.type === 'operating_statement' && (
                          <div>
                            <Label htmlFor={`project-${file.id}`} className="mb-1.5 block text-xs">
                              Project
                            </Label>
                            <div className="flex space-x-2">
                              <Select
                                value={file.project}
                                onValueChange={(value) => setFileProject(file.id, value)}
                              >
                                <SelectTrigger id={`project-${file.id}`} className="flex-1">
                                  <SelectValue placeholder="Select or create project" />
                                </SelectTrigger>
                                <SelectContent>
                                  {MOCK_PROJECTS.map((project) => (
                                    <SelectItem key={project.id} value={project.id}>
                                      {project.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              
                              <Dialog open={isCreatingProject} onOpenChange={setIsCreatingProject}>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="icon" className="shrink-0">
                                    <Plus size={14} />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                  <DialogHeader>
                                    <DialogTitle>Create New Project</DialogTitle>
                                    <DialogDescription>
                                      Enter a name for your new project. Click save when you're done.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="py-4">
                                    <Label htmlFor="project-name" className="mb-2 block">
                                      Project Name
                                    </Label>
                                    <Input
                                      id="project-name"
                                      value={newProjectName}
                                      onChange={(e) => setNewProjectName(e.target.value)}
                                      placeholder="Enter project name"
                                      className="w-full"
                                    />
                                  </div>
                                  <DialogFooter>
                                    <Button 
                                      variant="outline" 
                                      onClick={() => setIsCreatingProject(false)}
                                    >
                                      Cancel
                                    </Button>
                                    <Button type="submit" onClick={createNewProject}>
                                      Create Project
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {files.length > 0 && files.every(file => file.status === 'idle') && (
                <div className="mt-6 flex justify-end">
                  <Button 
                    onClick={uploadFiles} 
                    disabled={!canUpload}
                    className="px-6 transition-all duration-200"
                  >
                    <span>Upload All Files</span>
                    {canUpload && (
                      <Upload size={16} className="ml-2" />
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </Card>

        <div className="text-sm text-muted-foreground max-w-lg mx-auto text-center mt-12">
          <h3 className="font-medium text-foreground mb-2">Upload Guidelines</h3>
          <p>
            For operating statements, you must select or create a project. Rent rolls can be processed without a project association.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Upload;
