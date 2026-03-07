import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/contexts/CartContext";
import RoleSelectionPage from "@/pages/RoleSelectionPage";
import LandingPage from "@/pages/LandingPage";
import SearchPage from "@/pages/SearchPage";
import DealMapPage from "@/pages/DealMapPage";
import TrendingPage from "@/pages/TrendingPage";
import PlannerPage from "@/pages/PlannerPage";
import RetailerPage from "@/pages/RetailerPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import CommunityDealsPage from "@/pages/CommunityDealsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppLayout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<RoleSelectionPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/deals-map" element={<DealMapPage />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/retailer" element={<RetailerPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/community" element={<CommunityDealsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
