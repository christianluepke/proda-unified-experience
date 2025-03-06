
import React, { useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator";
import { X, CheckCircle, LucideFile, Plus, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

interface UploadedFile {
  file: File;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  projectId: string | null;
  fileType: 'rent_roll' | 'operating_statement' | null;
}

interface Project {
  id: string;
  name: string;
}

interface FileType {
  id: string;
  name: string;
}

interface FileListProps {
  files: UploadedFile[];
  projects: Project[];
  fileTypes: FileType[];
  onRemoveFile: (file: File) => void;
  onFileProjectChange: (file: File, projectId: string) => void;
  onFileTypeChange: (file: File, fileType: 'rent_roll' | 'operating_statement') => void;
  onStartUpload: () => void;
  onCreateProject: (name: string) => void;
}

const FileList: React.FC<FileListProps> = ({
  files,
  projects,
  fileTypes,
  onRemoveFile,
  onFileProjectChange,
  onFileTypeChange,
  onStartUpload,
  onCreateProject,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isCreatingProject, setIsCreatingProject] = useState<boolean>(false);
  const [newProjectName, setNewProjectName] = useState<string>('');
  const [activeFileIndex, setActiveFileIndex] = useState<number | null>(null);

  if (files.length === 0) return null;

  const filteredProjects = searchTerm 
    ? projects.filter(project => 
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : projects;

  const handleCreateProject = (index: number) => {
    if (newProjectName.trim()) {
      onCreateProject(newProjectName.trim());
      setNewProjectName('');
      setIsCreatingProject(false);
      setActiveFileIndex(null);
    }
  };

  const toggleCreateProject = (index: number) => {
    setIsCreatingProject(!isCreatingProject);
    setActiveFileIndex(index === activeFileIndex ? null : index);
    setNewProjectName('');
  };

  return (
    <div>
      <h2 className="text-lg font-medium mb-3">Assign Projects and File Types</h2>
      <div className="border rounded-md overflow-hidden">
        <div className="bg-muted/40 p-3 font-medium text-sm">
          Files to Upload ({files.length})
        </div>
        <Separator />
        <ul className="divide-y">
          {files.map((fileObj, index) => (
            <li key={index} className="p-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {fileObj.status === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <LucideFile className="w-5 h-5 text-muted-foreground" />
                  )}
                  <span className="text-sm font-medium truncate max-w-xs">{fileObj.file.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  {fileObj.progress > 0 && (
                    <div className="w-24">
                      <Progress 
                        value={fileObj.progress} 
                        className={cn(
                          "h-1.5 transition-all duration-300",
                          fileObj.status === 'success' ? "bg-muted-foreground/20" : "bg-muted-foreground/10"
                        )}
                      />
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveFile(fileObj.file)}
                    className="hover:bg-red-500 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Project</label>
                  
                  {activeFileIndex === index && isCreatingProject ? (
                    <div className="space-y-2">
                      <Input
                        placeholder="Enter new project name"
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                        className="text-sm"
                      />
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleCreateProject(index)}
                          disabled={!newProjectName.trim()}
                        >
                          Create
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => {
                            setIsCreatingProject(false);
                            setActiveFileIndex(null);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Search className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Input
                          className="pl-10 text-sm"
                          placeholder="Search projects..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          onFocus={() => setActiveFileIndex(index)}
                        />
                      </div>
                      
                      <div className="max-h-40 overflow-y-auto border rounded-md bg-background">
                        <select
                          className="w-full text-sm border-0 bg-transparent rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary min-h-[100px]"
                          value={fileObj.projectId || ""}
                          onChange={(e) => onFileProjectChange(fileObj.file, e.target.value)}
                          size={Math.min(5, filteredProjects.length + 1)}
                        >
                          <option value="" disabled>Select project</option>
                          {filteredProjects.map(project => (
                            <option key={project.id} value={project.id}>{project.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full flex items-center justify-center"
                        onClick={() => toggleCreateProject(index)}
                      >
                        <Plus className="mr-1 h-4 w-4" /> Create New Project
                      </Button>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1.5 block">File Type</label>
                  <RadioGroup 
                    value={fileObj.fileType || ""} 
                    onValueChange={(value) => onFileTypeChange(fileObj.file, value as 'rent_roll' | 'operating_statement')}
                    className="flex gap-4"
                  >
                    {fileTypes.map(type => (
                      <div key={type.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={type.id} id={`${type.id}-${index}`} />
                        <label 
                          htmlFor={`${type.id}-${index}`} 
                          className="text-sm cursor-pointer"
                        >
                          {type.name}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={onStartUpload} className="flex items-center gap-2">
          Start Upload
        </Button>
      </div>
    </div>
  );
};

export default FileList;
