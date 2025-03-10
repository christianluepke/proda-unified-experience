
import { useState } from 'react';
import { Project, Property } from '@/components/upload/models';
import { toast } from "@/components/ui/use-toast";

// Sample properties for the projects
const generateProperties = (count: number, projectName: string): Property[] => {
  const properties: Property[] = [];
  
  for (let i = 1; i <= count; i++) {
    properties.push({
      id: `property-${Math.random().toString(36).substr(2, 9)}`,
      name: `${projectName} Property ${i}`,
      streetNo: `${Math.floor(Math.random() * 1000) + 1}`,
      streetName: ['Main St', 'Oak Ave', 'Maple Rd', 'Broadway', 'Park Ave'][Math.floor(Math.random() * 5)],
      city: ['New York', 'Chicago', 'Los Angeles', 'San Francisco', 'Miami'][Math.floor(Math.random() * 5)],
      state: ['NY', 'IL', 'CA', 'CA', 'FL'][Math.floor(Math.random() * 5)],
      country: 'USA',
      zip: `${Math.floor(Math.random() * 90000) + 10000}`,
      units: Math.floor(Math.random() * 200) + 10,
      sqft: Math.floor(Math.random() * 100000) + 5000,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
    });
  }
  
  return properties;
};

// Generate 10 sample projects
const generateSampleProjects = (): Project[] => {
  const projectTypes = ['Multi-Family', 'Office', 'Retail', 'Industrial', 'Mixed-Use'];
  const projects: Project[] = [];
  
  for (let i = 1; i <= 10; i++) {
    const assetType = projectTypes[Math.floor(Math.random() * projectTypes.length)];
    const createdAt = new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString();
    const propertyCount = Math.floor(Math.random() * 3) + 1; // 1-3 properties
    
    projects.push({
      id: i.toString(),
      name: `Project ${i}`,
      description: `Sample ${assetType} project with ${propertyCount} properties`,
      assetType,
      address: `${Math.floor(Math.random() * 1000) + 1} ${['Main St', 'Oak Ave', 'Maple Rd'][Math.floor(Math.random() * 3)]}, ${['New York', 'Chicago', 'Los Angeles'][Math.floor(Math.random() * 3)]}`,
      createdAt,
      createdBy: Math.random() > 0.5 ? 'John Doe' : 'Jane Smith',
      modifiedAt: Math.random() > 0.3 ? new Date(Date.now() - Math.floor(Math.random() * 5000000000)).toISOString() : null,
      modifiedBy: Math.random() > 0.3 ? (Math.random() > 0.5 ? 'John Doe' : 'Jane Smith') : null,
      properties: generateProperties(propertyCount, `Project ${i}`)
    });
  }
  
  return projects;
};

// Mock projects for initial state with additional fields
const MOCK_PROJECTS: Project[] = generateSampleProjects();

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
      modifiedBy: null,
      properties: []
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
