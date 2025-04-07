
import React from 'react';
import { Building2, MapPin, Calendar, User, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'; // Added missing Button import
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { Project } from '@/components/upload/models';
import ProjectPropertyList from './ProjectPropertyList';
import PropertiesOverview from './PropertiesOverview';

interface ProjectOverviewTabProps {
  project: Project;
}

const ProjectOverviewTab: React.FC<ProjectOverviewTabProps> = ({ project }) => {
  const totalArea = project.properties.reduce((sum, property) => sum + property.sqft, 0);
  const formattedTotalArea = new Intl.NumberFormat('en-US').format(totalArea);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Project Details Card */}
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

        {/* Summary Card */}
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
    </div>
  );
};

export default ProjectOverviewTab;
