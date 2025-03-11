
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, CheckCircle, Bell, Lock } from 'lucide-react';

const DataGovernance: React.FC = () => {
  return (
    <div className="container py-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Data Governance</h1>
        <p className="text-muted-foreground mt-2">
          Streamline your data validation and approval processes
        </p>
      </div>

      <div className="grid gap-8">
        {/* Challenges Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">The Challenges</CardTitle>
            <CardDescription>Common pain points in data management</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="bg-red-100 p-2 rounded-full text-red-600 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </div>
                <div>
                  <h3 className="font-medium">Increased workload and extended reporting cycles</h3>
                  <p className="text-muted-foreground mt-1">Due to back-and-forth corrections, manual checks and errors</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-red-100 p-2 rounded-full text-red-600 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </div>
                <div>
                  <h3 className="font-medium">Harder to trust the data and make confident decisions</h3>
                  <p className="text-muted-foreground mt-1">Due to data inaccuracy or inconsistency</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-red-100 p-2 rounded-full text-red-600 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </div>
                <div>
                  <h3 className="font-medium">Slow reporting/analysis</h3>
                  <p className="text-muted-foreground mt-1">Due to missing data and chasing information</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Solution Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">The Solution</CardTitle>
            <CardDescription>Our comprehensive data governance approach</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-l-4 border-l-primary">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Automated validation and approval</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Checking and validating data completeness and accuracy before approval: Data only gets to you once validated - no more time wasted manually reviewing
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-primary">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Stakeholder notifications</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Notifies stakeholders to streamline reviews and approvals
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-primary">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Locking</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Once approved, data can be locked automatically to prevent unauthorised edits
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center text-center p-6">
              <ShieldCheck className="h-12 w-12 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Ready to improve your data governance?</h2>
              <p className="max-w-md mb-6">
                Start streamlining your data validation processes today and make more confident decisions with trusted data.
              </p>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-primary-foreground bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Get Started
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataGovernance;
