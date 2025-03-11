
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, CheckCircle, Bell, Lock, Send, FileText } from 'lucide-react';

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

      {/* Main Content - Three Columns */}
      <div className="grid md:grid-cols-3 gap-6 flex-1">
        {/* Column 1 - The Challenges */}
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

        {/* Column 2 - The Solution */}
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

        {/* Column 3 - The Benefits */}
        <Card className="border-l-4 border-l-blue-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
              The Benefits
            </CardTitle>
            <CardDescription>How data governance improves your business</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-1.5 rounded-full text-green-600 mt-0.5 flex-shrink-0">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Better data quality</h3>
                  <p className="text-xs text-muted-foreground">
                    Ensure data meets quality and regulatory standards. Reduce risks of edits to data used in financial reporting.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-1.5 rounded-full text-green-600 mt-0.5 flex-shrink-0">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Improved data completeness</h3>
                  <p className="text-xs text-muted-foreground">
                    Ensure you receive the right data for your reporting. Reduce risks in financial valuations and reporting.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-1.5 rounded-full text-green-600 mt-0.5 flex-shrink-0">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Reduce manual input and reporting cycles</h3>
                  <p className="text-xs text-muted-foreground">
                    Automate approvals to reduce manual effort and errors. Reduce reporting cycle times through automated validation.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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
