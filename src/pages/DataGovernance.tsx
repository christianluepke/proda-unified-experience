
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, CheckCircle, Bell, Lock, Send, FileSpreadsheet, FileText } from 'lucide-react';

const DataGovernance: React.FC = () => {
  return (
    <div className="container py-8 max-w-7xl mx-auto h-[calc(100vh-120px)] overflow-hidden flex flex-col">
      {/* Header Section with Image */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Governance</h1>
          <p className="text-muted-foreground mt-2">
            Streamline your data validation and approval processes
          </p>
        </div>
        <div className="hidden md:block">
          <img 
            src="/lovable-uploads/1917f7e6-50c1-43f6-9cd3-3667ac794952.png" 
            alt="PRODA Data Governance" 
            className="h-16 object-contain" 
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-2 gap-6 flex-1">
        {/* Left Column - Challenges and Solutions */}
        <div className="flex flex-col gap-6">
          {/* Challenges Section */}
          <Card className="border-l-4 border-l-blue-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                The Challenges
              </CardTitle>
              <CardDescription>Common pain points in data management</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="bg-red-100 p-1.5 rounded-full text-red-600 mt-0.5 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Increased workload and extended reporting cycles</h3>
                    <p className="text-xs text-muted-foreground">Due to back-and-forth corrections, manual checks and errors</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-red-100 p-1.5 rounded-full text-red-600 mt-0.5 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Harder to trust the data and make confident decisions</h3>
                    <p className="text-xs text-muted-foreground">Due to data inaccuracy or inconsistency</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-red-100 p-1.5 rounded-full text-red-600 mt-0.5 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Slow reporting/analysis</h3>
                    <p className="text-xs text-muted-foreground">Due to missing data and chasing information</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Solution Section */}
          <Card className="border-l-4 border-l-blue-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                The Solution
              </CardTitle>
              <CardDescription>Our comprehensive data governance approach</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-1.5 rounded-full text-green-600 mt-0.5 flex-shrink-0">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Automated validation and approval</h3>
                    <p className="text-xs text-muted-foreground">
                      Checking and validating data completeness and accuracy before approval: Data only gets to you once validated - no more time wasted manually reviewing
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-1.5 rounded-full text-green-600 mt-0.5 flex-shrink-0">
                    <Bell className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Stakeholder notifications</h3>
                    <p className="text-xs text-muted-foreground">
                      Notifies stakeholders to streamline reviews and approvals
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-1.5 rounded-full text-green-600 mt-0.5 flex-shrink-0">
                    <Lock className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Locking</h3>
                    <p className="text-xs text-muted-foreground">
                      Once approved, data can be locked automatically to prevent unauthorised edits
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Image and Process */}
        <div className="flex flex-col gap-6">
          {/* Image Section */}
          <Card className="overflow-hidden border-0 shadow-md">
            <CardContent className="p-0">
              <div className="relative h-[240px]">
                <img 
                  src="/lovable-uploads/282b5f82-8146-4451-999c-967499bc754d.png" 
                  alt="PRODA Data Platform" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-transparent flex items-center">
                  <div className="p-6 text-white max-w-[60%]">
                    <h2 className="text-2xl font-bold mb-2">Unlock your data potential</h2>
                    <p className="text-sm">Transform how you manage and trust your property data</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Process Section */}
          <Card className="border border-blue-100 bg-blue-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-blue-600" />
                Our Process
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-center px-2">
                  <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>
                  </div>
                  <p className="text-sm font-medium">Capture</p>
                </div>
                <div className="text-blue-600">•</div>
                <div className="text-center px-2">
                  <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 11v-4"/><path d="M11 11h4"/></svg>
                  </div>
                  <p className="text-sm font-medium">Extract</p>
                </div>
                <div className="text-blue-600">•</div>
                <div className="text-center px-2">
                  <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg>
                  </div>
                  <p className="text-sm font-medium">Standardize</p>
                </div>
                <div className="text-blue-600">•</div>
                <div className="text-center px-2">
                  <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                  </div>
                  <p className="text-sm font-medium">Analyze</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section at Bottom */}
      <div className="mt-6 bg-blue-50 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between">
        <div className="md:max-w-[70%] mb-4 md:mb-0">
          <h3 className="text-xl font-bold text-blue-700 mb-2">Ready to improve your data governance?</h3>
          <p className="text-blue-600">
            Start streamlining your data collection processes today and make more confident decisions with trusted data.
          </p>
        </div>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 gap-2">
          <Send className="h-4 w-4" />
          Contact Sales
        </Button>
      </div>
    </div>
  );
};

export default DataGovernance;
