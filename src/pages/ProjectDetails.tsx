
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Pencil, Trash2, Building2, MapPin, Calendar, User, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProjects } from '@/hooks/useProjects';
import { Project } from '@/components/upload/models';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import ProjectPropertyList from '@/components/projects/ProjectPropertyList';
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

  const totalArea = project.properties.reduce((sum, property) => sum + property.sqft, 0);
  const formattedTotalArea = new Intl.NumberFormat('en-US').format(totalArea);

  return (
    <div className="container py-8 max-w-7xl">
      {/* Header with back button and project name */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/projects')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">{project.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" className="flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
        </TabsList>

        {/* Overview Tab Content */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Project Details */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Asset Type</h3>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <Badge variant="secondary" className="font-normal">
                        {project.assetType || 'Not specified'}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Portfolio</h3>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {project.portfolioName ? (
                        <span>{project.portfolioName}</span>
                      ) : (
                        <span className="text-muted-foreground italic">Not assigned</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Address</h3>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {project.address ? (
                        <span>{project.address}</span>
                      ) : (
                        <span className="text-muted-foreground italic">No address provided</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Created</h3>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {project.createdAt ? (
                        <span>{format(new Date(project.createdAt), 'dd/MM/yyyy')}</span>
                      ) : (
                        <span className="text-muted-foreground italic">Unknown</span>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Created By</h3>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{project.createdBy}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                  <p className="text-sm">{project.description || 'No description provided'}</p>
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Properties</span>
                  <span className="text-lg font-semibold">{project.properties.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Area</span>
                  <span className="text-lg font-semibold">{formattedTotalArea} sqft</span>
                </div>

                <div className="pt-4 mt-4 border-t">
                  <h3 className="text-lg font-medium mb-2">Activity</h3>
                  <p className="text-sm text-muted-foreground italic">
                    Activity tracking will be available in a future update.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Properties List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Properties</h2>
              <Button variant="outline" size="sm">
                Manage Properties
              </Button>
            </div>
            <ProjectPropertyList properties={project.properties} />
          </div>
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
