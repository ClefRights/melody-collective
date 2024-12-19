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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/pro-selection" element={<PROSelection />} />
          <Route path="/publishing-company" element={<PublishingCompanyForm />} />
          <Route path="/rights-clearance" element={<RightsClearance />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;