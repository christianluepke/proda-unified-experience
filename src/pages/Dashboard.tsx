
import React from 'react';
import { 
  FileText, 
  Home, 
  BarChart3, 
  Files,
  Calendar,
  RefreshCw,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';

const Dashboard: React.FC = () => {
  // Mock data for the dashboard
  const recentFiles = [
    { id: '1', name: 'NYC_RentRoll_Q2_2023.pdf', type: 'rent_roll', date: '2 hours ago', status: 'completed' },
    { id: '2', name: 'SF_OperatingStatement_2023.xlsx', type: 'operating_statement', project: 'San Francisco Office Park', date: '5 hours ago', status: 'completed' },
    { id: '3', name: 'Chicago_RentRoll_Jun2023.pdf', type: 'rent_roll', date: '1 day ago', status: 'processing' },
    { id: '4', name: 'NY_OperatingStatement_Q1_2023.pdf', type: 'operating_statement', project: 'New York High-Rise', date: '2 days ago', status: 'completed' },
  ];

  const projects = [
    { id: '1', name: 'New York High-Rise', files: 5, lastUpdated: '2 days ago' },
    { id: '2', name: 'San Francisco Office Park', files: 3, lastUpdated: '5 hours ago' },
    { id: '3', name: 'Chicago Retail Center', files: 2, lastUpdated: '1 week ago' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col animate-fade-in">
      <Header />
      
      <main className="flex-1 container max-w-6xl py-8 px-4 md:py-12">
        <div className="space-y-1 mb-8 animate-slide-in">
          <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
            Overview
          </span>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground max-w-3xl">
            View and manage your uploaded files and projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-none shadow-md overflow-hidden animate-slide-in [animation-delay:100ms]">
            <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-primary/10">
              <CardTitle className="text-sm font-medium flex items-center">
                <FileText size={16} className="mr-2 text-primary" />
                Files Processed
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-1">+3 in the last 7 days</p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md overflow-hidden animate-slide-in [animation-delay:200ms]">
            <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-primary/10">
              <CardTitle className="text-sm font-medium flex items-center">
                <Home size={16} className="mr-2 text-primary" />
                Active Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-1">+1 in the last 30 days</p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md overflow-hidden animate-slide-in [animation-delay:300ms]">
            <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-primary/10">
              <CardTitle className="text-sm font-medium flex items-center">
                <BarChart3 size={16} className="mr-2 text-primary" />
                Data Points Analyzed
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold">1,458</div>
              <p className="text-xs text-muted-foreground mt-1">+253 in the last 7 days</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium flex items-center">
                <Files size={18} className="mr-2 text-primary/80" />
                Recent Files
              </h2>
              <Button variant="ghost" size="sm" className="text-xs gap-1">
                <RefreshCw size={12} />
                <span>Refresh</span>
              </Button>
            </div>
            
            <Card className="border-none shadow-md overflow-hidden animate-slide-in [animation-delay:400ms]">
              <CardContent className="p-0">
                <div className="divide-y">
                  {recentFiles.map((file) => (
                    <div key={file.id} className="p-4 hover:bg-muted/20 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="mt-0.5">
                            <FileText size={16} className="text-muted-foreground" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-1">{file.name}</h4>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-[10px] h-5 px-1.5 font-normal">
                                {file.type === 'rent_roll' ? 'Rent Roll' : 'Operating Statement'}
                              </Badge>
                              
                              {file.project && (
                                <span className="text-xs text-muted-foreground">
                                  {file.project}
                                </span>
                              )}
                              
                              <span className="text-xs text-muted-foreground">
                                {file.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          {file.status === 'completed' ? (
                            <div className="flex items-center text-xs text-green-600">
                              <CheckCircle2 size={12} className="mr-1" />
                              <span>Complete</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-xs text-amber-600">
                              <Clock size={12} className="mr-1" />
                              <span>Processing</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 bg-muted/20 flex justify-center">
                  <Button variant="ghost" size="sm" className="text-xs gap-1">
                    View All Files
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-xl font-medium flex items-center">
              <Home size={18} className="mr-2 text-primary/80" />
              Projects
            </h2>
            
            <Card className="border-none shadow-md overflow-hidden animate-slide-in [animation-delay:500ms]">
              <CardContent className="p-0">
                <div className="divide-y">
                  {projects.map((project) => (
                    <div key={project.id} className="p-4 hover:bg-muted/20 transition-colors">
                      <h4 className="font-medium text-sm mb-1">{project.name}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {project.files} files
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Updated {project.lastUpdated}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 bg-muted/20 flex justify-center">
                  <Button variant="ghost" size="sm" className="text-xs gap-1">
                    View All Projects
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md overflow-hidden bg-gradient-to-br from-primary/80 to-primary text-white animate-slide-in [animation-delay:600ms]">
              <CardContent className="p-6">
                <Calendar size={24} className="mb-4 text-white/80" />
                <h3 className="text-lg font-medium mb-2">Schedule a Demo</h3>
                <p className="text-sm text-white/80 mb-4">
                  Learn how PRODA can streamline your data processing workflow.
                </p>
                <Button variant="secondary" className="w-full bg-white text-primary hover:bg-white/90">
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
