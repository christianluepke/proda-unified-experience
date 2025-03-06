
import { useState } from 'react';
import { Project } from '@/components/upload/models';
import { toast } from "@/components/ui/use-toast";

// Mock projects for initial state
const MOCK_PROJECTS: Project[] = [
  { id: '1', name: 'Project A' },
  { id: '2', name: 'Project B' },
  { id: '3', name: 'Project C' },
];

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);

  const handleCreateProject = (name: string) => {
    const newId = (projects.length + 1).toString();
    const newProject: Project = { id: newId, name };
    
    setProjects(prevProjects => [...prevProjects, newProject]);
    
    toast({
      title: "Project Created",
      description: `Project "${name}" has been created.`,
    });

    return newProject;
  };

  return {
    projects,
    createProject: handleCreateProject
  };
}
