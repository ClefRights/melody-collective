import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignupForm from "./pages/SignupForm";
import RightsClearance from "./pages/RightsClearance";
import PROSelection from "./pages/PROSelection";
import PublishingCompanyForm from "./pages/PublishingCompanyForm";
import CopyrightRegistration from "./pages/CopyrightRegistration";
import Congratulations from "./pages/Congratulations";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/pro-selection" element={<PROSelection />} />
            <Route path="/publishing-company" element={<PublishingCompanyForm />} />
            <Route path="/rights-clearance" element={<RightsClearance />} />
            <Route path="/copyright-registration" element={<CopyrightRegistration />} />
            <Route path="/congratulations" element={<Congratulations />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;