
import { useState } from 'react';
import { Project } from '@/components/upload/models';
import { toast } from "@/components/ui/use-toast";

// Mock projects for initial state
const MOCK_PROJECTS: Project[] = [
  { id: '1', name: 'Project A', description: 'A sample project for demonstration' },
  { id: '2', name: 'Project B', description: 'Another sample project with different data' },
  { id: '3', name: 'Project C', description: 'A third sample project for testing' },
];

export type ViewMode = 'cards' | 'list';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [viewMode, setViewMode] = useState<ViewMode>('cards');

  const handleCreateProject = (name: string, description: string = ''): Project => {
    const newId = (projects.length + 1).toString();
    const newProject: Project = { id: newId, name, description };
    
    setProjects(prevProjects => [...prevProjects, newProject]);
    
    toast({
      title: "Project Created",
      description: `Project "${name}" has been created.`,
    });

    return newProject;
  };

  return {
    projects,
    createProject: handleCreateProject,
    viewMode,
    setViewMode
  };
}
