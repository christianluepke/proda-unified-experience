
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart, Shield, Zap } from 'lucide-react';

const DataGovernance: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-16 font-['Inter']">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left column: Main content */}
        <div>
          <h1 className="text-5xl font-bold mb-6 tracking-tight text-[#030734]">
            Put <span className="relative inline-block after:content-[''] after:absolute after:w-full after:h-1 after:bg-[#0018ea] after:bottom-0 after:left-0">data</span> first
          </h1>
          
          <p className="text-lg mb-8 text-gray-700">
            Fast, user-friendly and engaging - transform your data collection process 
            and streamline your operations with automated data governance.
          </p>
          
          <div className="mb-12">
            <div className="flex items-center gap-4">
              <Button className="px-6 py-3 h-auto bg-[#0018ea] hover:bg-[#0018ea]/90 text-white rounded-md text-base">
                Book a demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Stats section */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div>
              <h3 className="text-3xl font-bold">97%</h3>
              <p className="text-gray-500 text-sm">Data accuracy improvement</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">65%</h3>
              <p className="text-gray-500 text-sm">Faster reporting cycles</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">4.8</h3>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < 4 ? "text-yellow-400" : "text-yellow-200"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-gray-500 text-sm ml-1">Average rating</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column: Image */}
        <div className="relative">
          <img 
            src="/lovable-uploads/a8c9ab11-1004-48a0-88f7-cb8c6de22972.png" 
            alt="Data Governance Dashboard" 
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
      
      {/* Features section */}
      <div className="grid md:grid-cols-3 gap-8 mt-16">
        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
            <Zap className="h-6 w-6 text-[#0018ea]" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Automated Collection</h3>
          <p className="text-gray-600">Streamline third-party data submission with automated collection and validation processes.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-[#0018ea]" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Data Security</h3>
          <p className="text-gray-600">Lock approved data to prevent unauthorized changes and maintain compliance standards.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
            <BarChart className="h-6 w-6 text-[#0018ea]" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Better Analysis</h3>
          <p className="text-gray-600">Make confident decisions based on complete, accurate data from all your sources.</p>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="mt-16 bg-[#f5f7ff] rounded-lg p-8 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-[#030734] mb-2">Ready to improve your data governance?</h3>
          <p className="text-[#030734] text-sm">Schedule a demo today and see how we can help streamline your data operations.</p>
        </div>
        <Button size="lg" className="bg-[#0018ea] hover:bg-[#0018ea]/90 text-white mt-4 md:mt-0">
          Book a demo
        </Button>
      </div>
    </div>
  );
};

export default DataGovernance;
