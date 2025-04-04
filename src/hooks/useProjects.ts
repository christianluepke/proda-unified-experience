
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
      streetName: ['Main St', 'Oak Ave', 'Maple Rd', 'Broadway', 'Park Ave', 'Fifth Ave', 'Ocean Blvd', 'Mountain View', 'Sunset Dr', 'Wilshire Blvd'][Math.floor(Math.random() * 10)],
      city: ['New York', 'Chicago', 'Los Angeles', 'San Francisco', 'Miami', 'Boston', 'Seattle', 'Austin', 'Denver', 'Portland'][Math.floor(Math.random() * 10)],
      state: ['NY', 'IL', 'CA', 'CA', 'FL', 'MA', 'WA', 'TX', 'CO', 'OR'][Math.floor(Math.random() * 10)],
      country: 'USA',
      zip: `${Math.floor(Math.random() * 90000) + 10000}`,
      units: Math.floor(Math.random() * 200) + 10,
      sqft: Math.floor(Math.random() * 100000) + 5000,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
    });
  }
  
  return properties;
};

// Mock database users
const DATABASE_USERS = [
  'john.doe@proda.ai',
  'jane.smith@proda.ai',
  'admin@proda.ai',
  'alex.johnson@proda.ai',
  'sarah.williams@proda.ai',
  'mike.brown@proda.ai',
  'emma.davis@proda.ai',
  'david.miller@proda.ai',
  'olivia.wilson@proda.ai',
  'james.taylor@proda.ai'
];

// Mock portfolios
const PORTFOLIOS = [
  'Main Portfolio',
  'US Residential',
  'European Commercial',
  'Asia Pacific Retail',
  'North America Office',
  'Global Logistics',
  'West Coast Properties',
  'East Coast Apartments',
  'Downtown Retail',
  'Suburban Office Parks',
  'Value-Add Opportunities',
  'Core Properties'
];

// Generate sample projects with database field and more realistic data
const generateSampleProjects = (): Project[] => {
  // Adjust project type distribution - more Multi-Family, fewer Hospitality
  const projectTypes = [
    'Multi-Family', 'Multi-Family', 'Multi-Family', 'Multi-Family', 'Multi-Family', // 5 occurrences (25%)
    'Office', 'Office', 'Office', // 3 occurrences (15%)
    'Retail', 'Retail', 'Retail', // 3 occurrences (15%)
    'Industrial', 'Industrial', // 2 occurrences (10%)
    'Mixed-Use', 'Mixed-Use', // 2 occurrences (10%)
    'Hospitality', // 1 occurrence (5%) - reduced from before
    'Senior Living', 
    'Student Housing', 
    'Self-Storage', 
    'Data Center'
  ];
  
  const databases = ['PRODA Engineering Team', 'Development DB', 'Main Database', 'Analytics Database', 'Legacy System'];
  const statuses: Project['status'][] = ['New', 'Active', 'Closed', 'Sold', 'Lost'];
  const projects: Project[] = [];
  
  // Generate more projects (20 instead of 10)
  for (let i = 1; i <= 20; i++) {
    const assetType = projectTypes[Math.floor(Math.random() * projectTypes.length)];
    const createdAt = new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString();
    const propertyCount = Math.floor(Math.random() * 5) + 1; // 1-5 properties
    const id = Math.floor(Math.random() * 1000).toString();
    const portfolioName = PORTFOLIOS[Math.floor(Math.random() * PORTFOLIOS.length)];
    const projectOwner = DATABASE_USERS[Math.floor(Math.random() * DATABASE_USERS.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)] as Project['status'];
    
    // Create more descriptive project names
    const projectNames = [
      `${assetType} Portfolio ${i}`,
      `${['Riverside', 'Downtown', 'Uptown', 'Lakeside', 'Highland'][Math.floor(Math.random() * 5)]} ${assetType}`,
      `${['Pacific', 'Atlantic', 'Mountain', 'Coastal', 'Central'][Math.floor(Math.random() * 5)]} ${assetType} Fund`,
      `${['Premier', 'Elite', 'Select', 'Prime', 'Core'][Math.floor(Math.random() * 5)]} ${assetType} Properties`,
      `${['Alpha', 'Beta', 'Gamma', 'Delta', 'Omega'][Math.floor(Math.random() * 5)]} ${assetType} Acquisition`
    ];
    const projectName = projectNames[Math.floor(Math.random() * projectNames.length)];
    
    // Calculate total number of units across all properties
    const properties = generateProperties(propertyCount, projectName);
    const numberOfUnits = properties.reduce((sum, property) => sum + property.units, 0);
    
    projects.push({
      id,
      name: projectName,
      description: `${assetType} project with ${propertyCount} properties and ${numberOfUnits} units`,
      assetType,
      database: databases[Math.floor(Math.random() * databases.length)],
      address: `${Math.floor(Math.random() * 1000) + 1} ${['Southwark St', 'Main St', 'Oak Ave', 'Broadway', 'Park Ave'][Math.floor(Math.random() * 5)]}, ${['London SE1 0SW', 'New York', 'Chicago', 'Los Angeles', 'San Francisco'][Math.floor(Math.random() * 5)]}`,
      createdAt,
      createdBy: DATABASE_USERS[Math.floor(Math.random() * DATABASE_USERS.length)],
      modifiedAt: Math.random() > 0.3 ? new Date(Date.now() - Math.floor(Math.random() * 5000000000)).toISOString() : null,
      modifiedBy: Math.random() > 0.3 ? DATABASE_USERS[Math.floor(Math.random() * DATABASE_USERS.length)] : null,
      properties,
      status,
      numberOfUnits,
      portfolioName,
      projectOwner
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
      properties: [],
      status: 'New',
      numberOfUnits: 0,
      portfolioName: '',
      projectOwner: 'current.user@proda.ai'
    };
    
    setProjects(prevProjects => [...prevProjects, newProject]);
    
    toast({
      title: "Project Created",
      description: `Project "${name}" has been created.`,
    });

    return newProject;
  };

  // Function to update project fields
  const updateProject = (projectId: string, fields: Partial<Project>) => {
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === projectId ? { ...project, ...fields } : project
      )
    );
    
    toast({
      title: "Project Updated",
      description: `Project has been updated successfully.`,
    });
  };

  // Get all users from the database
  const getDatabaseUsers = () => {
    return DATABASE_USERS;
  };

  return {
    projects,
    createProject: handleCreateProject,
    updateProject,
    getDatabaseUsers,
  };
}
