
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, CheckCircle, Bell, Lock, Send, FileText, AlertTriangle, Timer } from 'lucide-react';

const DataGovernance: React.FC = () => {
  return (
    <div className="container py-8 max-w-7xl mx-auto overflow-y-auto">
      {/* Header Section without Image */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[#030734]">Take Control of Your Data with Automated Governance</h1>
        <p className="text-[#030734] mt-2 font-medium">
          Streamline Data Collection, Ensure Accuracy, and Accelerate Decision-Making
        </p>
        <p className="text-muted-foreground mt-4 text-sm">
          Stop struggling with inconsistent, incomplete, or error-prone data. Our data governance solution automates data collection from third-party submitters, ensuring validation, approval, and stakeholder communication—so you can trust your data and make confident business decisions.
        </p>
      </div>

      {/* Main Content - Three Columns */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Column 1 - The Challenges */}
        <Card className="border-l-4 border-l-[#0018ea] bg-gradient-to-br from-white to-[#cadefc]/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2 text-[#030734]">
              <FileText className="h-5 w-5 text-[#0018ea]" />
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
                  <h3 className="font-medium text-sm text-[#030734]">Increased workload and extended reporting cycles</h3>
                  <p className="text-xs text-muted-foreground">Frequent back-and-forth corrections with third-party data submitters, manual checks, and errors slow down reporting.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-amber-100 p-1.5 rounded-full text-amber-600 mt-0.5 flex-shrink-0">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-sm text-[#030734]">Harder to trust the data and make confident decisions</h3>
                  <p className="text-xs text-muted-foreground">Data inaccuracies and inconsistencies from third-party sources create uncertainty in financial reporting and analysis.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-orange-100 p-1.5 rounded-full text-orange-600 mt-0.5 flex-shrink-0">
                  <Timer className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-sm text-[#030734]">Slow reporting and analysis</h3>
                  <p className="text-xs text-muted-foreground">Missing or incomplete data from third-party submitters leads to delays as teams chase down information.</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Column 2 - The Solution */}
        <Card className="border-l-4 border-l-[#0018ea] bg-gradient-to-br from-white to-[#cadefc]/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2 text-[#030734]">
              <CheckCircle className="h-5 w-5 text-[#0018ea]" />
              The Solution: A Smarter Approach
            </CardTitle>
            <CardDescription>Our comprehensive data governance approach</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-[#cadefc] p-1.5 rounded-full text-[#0018ea] mt-0.5 flex-shrink-0">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-sm text-[#030734]">Automated data collection, validation, and approval</h3>
                  <p className="text-xs text-muted-foreground">
                    Automatically collect and validate third-party data before it reaches you—eliminating manual reviews and reducing errors.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-[#cadefc] p-1.5 rounded-full text-[#0018ea] mt-0.5 flex-shrink-0">
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-sm text-[#030734]">Stakeholder notifications</h3>
                  <p className="text-xs text-muted-foreground">
                    Keep third-party submitters and internal stakeholders informed to ensure timely and accurate data submissions and approvals.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-[#cadefc] p-1.5 rounded-full text-[#0018ea] mt-0.5 flex-shrink-0">
                  <Lock className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-sm text-[#030734]">Data locking for security</h3>
                  <p className="text-xs text-muted-foreground">
                    Once third-party data is approved, it is automatically locked—preventing unauthorized edits and ensuring compliance.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Column 3 - The Benefits */}
        <Card className="border-l-4 border-l-[#0018ea] bg-gradient-to-br from-white to-[#cadefc]/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2 text-[#030734]">
              <ShieldCheck className="h-5 w-5 text-[#0018ea]" />
              The Benefits of Better Data Governance
            </CardTitle>
            <CardDescription>How data governance improves your business</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-[#cadefc] p-1.5 rounded-full text-[#0018ea] mt-0.5 flex-shrink-0">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-sm text-[#030734]">Better data quality from third-party sources</h3>
                  <p className="text-xs text-muted-foreground">
                    Ensure incoming data meets compliance and accuracy standards, reducing risks in financial and operational reporting.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-[#cadefc] p-1.5 rounded-full text-[#0018ea] mt-0.5 flex-shrink-0">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-sm text-[#030734]">Improved data completeness</h3>
                  <p className="text-xs text-muted-foreground">
                    Automatically collect the right data from third-party sources—eliminating gaps that impact financial valuations and reporting.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-[#cadefc] p-1.5 rounded-full text-[#0018ea] mt-0.5 flex-shrink-0">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-sm text-[#030734]">Faster reporting with less manual effort</h3>
                  <p className="text-xs text-muted-foreground">
                    Automate third-party data submissions, approvals, and validations to reduce reporting cycle times and free up your team for higher-value work.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section at Bottom */}
      <div className="mt-8 bg-[#cadefc] rounded-lg p-6 flex flex-col md:flex-row items-center justify-between">
        <div className="md:max-w-[70%] mb-4 md:mb-0">
          <h3 className="text-xl font-bold text-[#030734] mb-2">Ready to improve your data governance?</h3>
          <p className="text-[#030734]">
            Upgrade your data governance today and eliminate the friction of third-party data management!
          </p>
        </div>
        <Button size="lg" className="bg-[#0018ea] hover:bg-[#0018ea]/90 text-white px-8 gap-2">
          <Send className="h-4 w-4" />
          Contact Sales
        </Button>
      </div>
    </div>
  );
};

export default DataGovernance;
