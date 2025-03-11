import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, CheckCircle, Bell, Lock, Send, FileText, AlertTriangle, Timer } from 'lucide-react';

const DataGovernance: React.FC = () => {
  return (
    <div className="container py-8 max-w-7xl mx-auto overflow-y-auto">
      {/* Header Section without Image */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Take Control of Your Data with Automated Governance</h1>
        <p className="text-muted-foreground mt-2">
          Ensure Accuracy, Reduce Workload, and Improve Decision-Making
        </p>
        <p className="text-muted-foreground mt-4 text-sm">
          Stop struggling with inconsistent, incomplete, or error-prone data. Our data governance solution automates validation, approval, and stakeholder communication—so you can trust your data and make confident business decisions.
        </p>
      </div>

      {/* Main Content - Three Columns */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Column 1 - The Challenges */}
        <Card className="border-l-4 border-l-blue-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              The Challenges of Data Management
            </CardTitle>
            <CardDescription>Common pain points in data management</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-red-100 p-1.5 rounded-full text-red-600 mt-0.5 flex-shrink-0">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Increased workload and extended reporting cycles</h3>
                  <p className="text-xs text-muted-foreground">Frequent back-and-forth corrections, manual checks, and errors slow down reporting.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-amber-100 p-1.5 rounded-full text-amber-600 mt-0.5 flex-shrink-0">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Harder to trust the data and make confident decisions</h3>
                  <p className="text-xs text-muted-foreground">Inaccurate or inconsistent data creates uncertainty in financial reporting and analysis.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-orange-100 p-1.5 rounded-full text-orange-600 mt-0.5 flex-shrink-0">
                  <Timer className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Slow reporting and analysis</h3>
                  <p className="text-xs text-muted-foreground">Missing data leads to delays as teams chase down information.</p>
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
              The Solution: A Smarter Approach
            </CardTitle>
            <CardDescription>Our comprehensive data governance approach</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-1.5 rounded-full text-green-600 mt-0.5 flex-shrink-0">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Automated validation and approval</h3>
                  <p className="text-xs text-muted-foreground">
                    Ensure data completeness and accuracy before it reaches you—eliminating manual reviews and reducing errors.
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
                    Streamline collaboration by keeping key stakeholders informed and aligned throughout the approval process.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-1.5 rounded-full text-green-600 mt-0.5 flex-shrink-0">
                  <Lock className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Data locking for security</h3>
                  <p className="text-xs text-muted-foreground">
                    Prevent unauthorized edits once data is approved—ensuring accuracy and compliance with regulatory standards.
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
              The Benefits of Better Data Governance
            </CardTitle>
            <CardDescription>How data governance improves your business</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-1.5 rounded-full text-green-600 mt-0.5 flex-shrink-0">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Better data quality</h3>
                  <p className="text-xs text-muted-foreground">
                    Ensure data meets compliance standards, reducing risks in financial and operational reporting.
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
                    Receive the right data every time—eliminating gaps that impact financial valuations and reporting.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-1.5 rounded-full text-green-600 mt-0.5 flex-shrink-0">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Faster reporting with less manual effort</h3>
                  <p className="text-xs text-muted-foreground">
                    Automate approvals and validations to reduce reporting cycle times and free up your team for higher-value work.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section at Bottom */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between">
        <div className="md:max-w-[70%] mb-4 md:mb-0">
          <h3 className="text-xl font-bold text-blue-700 mb-2">Ready to improve your data governance?</h3>
          <p className="text-blue-600">
            Upgrade your data governance today and start making faster, more confident business decisions.
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
