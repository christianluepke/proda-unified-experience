
import { useState } from 'react';
import { Project } from '@/components/upload/models';
import { toast } from "@/components/ui/use-toast";

// Mock projects for initial state with additional fields
const MOCK_PROJECTS: Project[] = [
  { 
    id: '1', 
    name: 'Project A', 
    description: 'A sample project for demonstration',
    assetType: 'Multi-Family',
    address: '123 Main St, New York, NY',
    createdAt: new Date('2023-10-15').toISOString(),
    createdBy: 'John Doe',
    modifiedAt: new Date('2023-12-20').toISOString(),
    modifiedBy: 'Jane Smith'
  },
  { 
    id: '2', 
    name: 'Project B', 
    description: 'Another sample project with different data',
    assetType: 'Office',
    address: '456 Oak Ave, Chicago, IL',
    createdAt: new Date('2024-01-05').toISOString(),
    createdBy: 'John Doe',
    modifiedAt: new Date('2024-02-10').toISOString(),
    modifiedBy: 'John Doe'
  },
  { 
    id: '3', 
    name: 'Project C', 
    description: 'A third sample project for testing',
    assetType: 'Retail',
    address: '789 Pine Blvd, San Francisco, CA',
    createdAt: new Date('2024-03-01').toISOString(),
    createdBy: 'Jane Smith',
    modifiedAt: null,
    modifiedBy: null
  },
];

export type ViewMode = 'cards' | 'list';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [viewMode, setViewMode] = useState<ViewMode>('cards');

  const handleCreateProject = (name: string, description: string = '', assetType: string = ''): Project => {
    const now = new Date().toISOString();
    const newId = (projects.length + 1).toString();
    const newProject: Project = { 
      id: newId, 
      name, 
      description,
      assetType,
      address: '',
      createdAt: now,
      createdBy: 'Current User', // In a real app, this would come from auth
      modifiedAt: null,
      modifiedBy: null
    };
    
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
