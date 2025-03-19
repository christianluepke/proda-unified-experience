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

// Generate sample projects with database field and more realistic data based on the screenshot
const generateSampleProjects = (): Project[] => {
  const projectTypes = ['Multi-Family', 'Office', 'Retail', 'Industrial', 'Mixed-Use'];
  const databases = ['PRODA Engineering Team', 'Development DB', 'Main Database'];
  const projects: Project[] = [];
  
  for (let i = 1; i <= 10; i++) {
    const assetType = projectTypes[Math.floor(Math.random() * projectTypes.length)];
    const createdAt = new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString();
    const propertyCount = Math.floor(Math.random() * 3) + 1; // 1-3 properties
    const id = Math.floor(Math.random() * 500).toString();
    
    projects.push({
      id,
      name: `Project ${i}`,
      description: `Sample ${assetType} project with ${propertyCount} properties`,
      assetType,
      database: databases[Math.floor(Math.random() * databases.length)],
      address: `${Math.floor(Math.random() * 1000) + 1} ${['Southwark St', 'Main St', 'Oak Ave'][Math.floor(Math.random() * 3)]}, ${['London SE1 0SW', 'New York', 'Chicago'][Math.floor(Math.random() * 3)]}`,
      createdAt,
      createdBy: ['john.doe@proda.ai', 'jane.smith@proda.ai', 'admin@proda.ai'][Math.floor(Math.random() * 3)],
      modifiedAt: Math.random() > 0.3 ? new Date(Date.now() - Math.floor(Math.random() * 5000000000)).toISOString() : null,
      modifiedBy: Math.random() > 0.3 ? ['john.doe@proda.ai', 'jane.smith@proda.ai', 'admin@proda.ai'][Math.floor(Math.random() * 3)] : null,
      properties: generateProperties(propertyCount, `Project ${i}`)
    });
  }
  
  return projects;
};

// Mock projects for initial state with additional fields
const MOCK_PROJECTS: Project[] = generateSampleProjects();

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);

  const handleCreateProject = (name: string, description: string = '', assetType: string = ''): Project => {
    const now = new Date().toISOString();
    const newId = (Math.floor(Math.random() * 500)).toString();
    const newProject: Project = { 
      id: newId, 
      name, 
      description,
      assetType,
      database: 'PRODA Engineering Team',
      address: '',
      createdAt: now,
      createdBy: 'current.user@proda.ai', // In a real app, this would come from auth
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
  };
}
