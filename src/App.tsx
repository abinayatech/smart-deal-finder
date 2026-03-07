import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import LandingPage from "@/pages/LandingPage";
import SearchPage from "@/pages/SearchPage";
import DealMapPage from "@/pages/DealMapPage";
import TrendingPage from "@/pages/TrendingPage";
import PlannerPage from "@/pages/PlannerPage";
import RetailerPage from "@/pages/RetailerPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/deals-map" element={<DealMapPage />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/retailer" element={<RetailerPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
