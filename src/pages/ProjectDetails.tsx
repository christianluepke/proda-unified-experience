
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProjects } from '@/hooks/useProjects';
import { Project } from '@/components/upload/models';
import ProjectDetailsHeader from '@/components/projects/ProjectDetailsHeader';
import ProjectOverviewTab from '@/components/projects/ProjectOverviewTab';
import ProjectFilesTab from '@/components/projects/ProjectFilesTab';

const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { projects } = useProjects();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (projectId) {
      // Handle special case for demo purpose
      if (projectId === '313') {
        // Create a mock project for the SF Office Portfolio
        const mockProject: Project = {
          id: '313',
          name: 'SF Office Portfolio',
          description: 'Commercial real estate portfolio in San Francisco',
          createdAt: '2023-01-15T10:00:00Z',
          createdBy: 'John Smith',
          assetType: 'Office',
          portfolioName: 'West Coast Commercial',
          database: 'PRODA Engineering Team',
          modifiedAt: null,
          modifiedBy: null,
          status: 'Active',
          numberOfUnits: 77,
          projectOwner: 'john.smith@proda.ai',
          address: '123 Market St, San Francisco, CA 94105',
          properties: [
            {
              id: 'property-sf1',
              name: 'SF Financial District Tower',
              streetNo: '123',
              streetName: 'Market St',
              city: 'San Francisco',
              state: 'CA',
              country: 'USA',
              zip: '94105',
              sqft: 120000,
              units: 45,
              createdAt: '2023-01-15T10:00:00Z',
              assetType: 'Office'
            },
            {
              id: 'property-sf2',
              name: 'SOMA Office Building',
              streetNo: '456',
              streetName: 'Howard St',
              city: 'San Francisco',
              state: 'CA',
              country: 'USA',
              zip: '94103',
              sqft: 85000,
              units: 32,
              createdAt: '2023-01-15T10:00:00Z',
              assetType: 'Office'
            }
          ]
        };
        setProject(mockProject);
      } else if (projects.length > 0) {
        const foundProject = projects.find(p => p.id === projectId);
        if (foundProject) {
          setProject(foundProject);
        } else {
          // Project not found, redirect to projects list
          navigate('/projects');
        }
      }
    }
  }, [projectId, projects, navigate]);

  if (!project) {
    return <div className="p-10 text-center">Loading project details...</div>;
  }

  return (
    <div className="container py-8 max-w-7xl">
      <ProjectDetailsHeader project={project} />

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
        </TabsList>

        {/* Overview Tab Content */}
        <TabsContent value="overview">
          <ProjectOverviewTab project={project} />
        </TabsContent>

        {/* Files Tab Content */}
        <TabsContent value="files">
          <ProjectFilesTab projectId={project.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetails;
