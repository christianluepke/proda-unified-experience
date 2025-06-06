
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Upload from "./pages/Upload";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Properties from "./pages/Properties";
import Dashboard from "./pages/Dashboard";
import DataGovernance from "./pages/DataGovernance";
import LeasingCRM from "./pages/LeasingCRM";
import ReviewMappings from "./pages/ReviewMappings";
import SelectTable from "./pages/SelectTable";
import Mappings from "./pages/Mappings";
import MapProperties from "./pages/MapProperties";
import RentRollReview from "./pages/RentRollReview";
import NotFound from "./pages/NotFound";
import Files from "./pages/Files";
import PreviousUploads from "./pages/PreviousUploads";
import { FeatureAccessProvider } from './context/FeatureAccessContext';

const queryClient = new QueryClient();

function App() {
  return (
    <FeatureAccessProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-right" />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/upload" replace />} />
              <Route path="/marketing" element={<Layout><Index /></Layout>} />
              <Route path="/upload" element={<Layout><Upload /></Layout>} />
              <Route path="/projects" element={<Layout><Projects /></Layout>} />
              <Route path="/projects/:projectId" element={<Layout><ProjectDetails /></Layout>} />
              <Route path="/properties" element={<Layout><Properties /></Layout>} />
              <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
              <Route path="/data-governance" element={<Layout><DataGovernance /></Layout>} />
              <Route path="/leasing-crm" element={<Layout><LeasingCRM /></Layout>} />
              <Route path="/files" element={<Layout><Files /></Layout>} />
              <Route path="/previous-uploads" element={<Layout><PreviousUploads /></Layout>} />
              <Route path="/review/:id" element={<ReviewMappings />} />
              <Route path="/rentroll-review/:id" element={<RentRollReview />} />
              <Route path="/select-table/:id" element={<SelectTable />} />
              <Route path="/mappings/:id" element={<Mappings />} />
              <Route path="/map-properties/:id" element={<MapProperties />} />
              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </FeatureAccessProvider>
  );
}

export default App;
