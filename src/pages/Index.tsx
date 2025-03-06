
import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, BarChart3, FileCheck, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header className="bg-transparent absolute top-0 left-0 right-0 z-10" />
      
      <section className="relative h-screen flex items-center">
        {/* Background with subtle gradient and pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/30 z-0" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00bTAtMTZjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00bS0xNiAwYzAtMi4yIDEuOC00IDQtNHM0IDEuOCA0IDQtMS44IDQtNCA0LTQtMS44LTQtNG0tMTYgMGMwLTIuMiAxLjgtNCA0LTRzNCAxLjggNCA0LTEuOCA0LTQgNC00LTEuOC00LTRtMCAxNmMwLTIuMiAxLjgtNCA0LTRzNCAxLjggNCA0LTEuOCA0LTQgNC00LTEuOC00LTRNNCAxOGMwLTIuMiAxLjgtNCA0LTRzNCAxLjggNCA0LTEuOCA0LTQgNC00LTEuOC00LTRtMCAxNmMwLTIuMiAxLjgtNCA0LTRzNCAxLjggNCA0LTEuOCA0LTQgNC00LTEuOC00LTQiLz48L2c+PC9nPjwvc3ZnPg==')]
          opacity-20 z-0" />
          
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 max-w-xl animate-slide-in">
              <div>
                <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4">
                  Streamline Your Data Processing
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 leading-tight">
                  Simplify your property data analysis
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Upload and process your rent rolls and operating statements with precision and ease.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="px-6 h-12 group">
                  <Link to="/upload">
                    Get Started
                    <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-6 h-12">
                  <Link to="/dashboard">
                    View Dashboard
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative lg:block animate-fade-in [animation-delay:400ms]">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 blur-xl rounded-2xl" />
                <Card className="border-none overflow-hidden shadow-xl glass">
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between pb-4 border-b border-muted/30">
                        <span className="font-medium">Recently Uploaded</span>
                        <span className="text-sm text-muted-foreground">View All</span>
                      </div>
                      
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center p-3 rounded-lg hover:bg-muted/20 transition-colors">
                          <div className="flex-shrink-0 w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                            <FileCheck size={20} />
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="font-medium text-sm">Document-{i}.pdf</div>
                            <div className="text-xs text-muted-foreground">Processed • 2 hours ago</div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="pt-4 border-t border-muted/30">
                        <Button variant="secondary" className="w-full">
                          <Upload size={16} className="mr-2" />
                          <span>Upload New Files</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16 animate-slide-in">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4">
              How It Works
            </span>
            <h2 className="text-3xl font-bold mb-4">
              Simple, Powerful Data Processing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our streamlined workflow makes it easy to upload and process property data files.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Upload size={24} className="text-primary" />,
                title: "Upload Files",
                description: "Drag and drop your rent rolls and operating statements for processing."
              },
              {
                icon: <BarChart3 size={24} className="text-primary" />,
                title: "Analyze Data",
                description: "Our system automatically extracts and analyzes key property metrics."
              },
              {
                icon: <FileCheck size={24} className="text-primary" />,
                title: "Access Insights",
                description: "View processed data and gain valuable insights to improve decision making."
              }
            ].map((feature, i) => (
              <Card key={i} className="border-none shadow-md overflow-hidden animate-slide-in [animation-delay:200ms]">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container px-4 mx-auto text-center">
          <div className="max-w-xl mx-auto space-y-4 animate-slide-in">
            <h2 className="text-2xl font-bold">
              Ready to streamline your workflow?
            </h2>
            <p className="text-muted-foreground mb-6">
              Start uploading and processing your files today.
            </p>
            <Button asChild size="lg" className="px-8">
              <Link to="/upload">
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
