import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import RetailerNavbar from "@/components/RetailerNavbar";
import { CartProvider } from "@/contexts/CartContext";
import { ShoppingModeProvider } from "@/contexts/ShoppingModeContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import RoleSelectionPage from "@/pages/RoleSelectionPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import LandingPage from "@/pages/LandingPage";
import SearchPage from "@/pages/SearchPage";
import DealMapPage from "@/pages/DealMapPage";
import TrendingPage from "@/pages/TrendingPage";
import PlannerPage from "@/pages/PlannerPage";
import RetailerPage from "@/pages/RetailerPage";
import RetailerProductsPage from "@/pages/RetailerProductsPage";
import RetailerAddProductPage from "@/pages/RetailerAddProductPage";
import RetailerAnalyticsPage from "@/pages/RetailerAnalyticsPage";
import RetailerTrendingPage from "@/pages/RetailerTrendingPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import CommunityDealsPage from "@/pages/CommunityDealsPage";
import OrdersPage from "@/pages/OrdersPage";
import DashboardPage from "@/pages/DashboardPage";
import ProfilePage from "@/pages/ProfilePage";
import NotificationsPage from "@/pages/NotificationsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppLayout() {
  const location = useLocation();
  const { role } = useAuth();
  const isAuthPage = ["/", "/login", "/signup"].includes(location.pathname);
  const isRetailerRoute = location.pathname.startsWith("/retailer");

  return (
    <>
      {!isAuthPage && (isRetailerRoute ? <RetailerNavbar /> : <Navbar />)}
      <Routes>
        {/* Auth routes */}
        <Route path="/" element={<RoleSelectionPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Customer routes */}
        <Route path="/home" element={<LandingPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/deals-map" element={<DealMapPage />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/community" element={<CommunityDealsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />

        {/* Retailer routes */}
        <Route path="/retailer" element={<RetailerPage />} />
        <Route path="/retailer/products" element={<RetailerProductsPage />} />
        <Route path="/retailer/add-product" element={<RetailerAddProductPage />} />
        <Route path="/retailer/analytics" element={<RetailerAnalyticsPage />} />
        <Route path="/retailer/trending" element={<RetailerTrendingPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <ShoppingModeProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppLayout />
            </BrowserRouter>
          </CartProvider>
        </ShoppingModeProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
