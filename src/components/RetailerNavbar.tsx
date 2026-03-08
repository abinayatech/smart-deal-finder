import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Package, Plus, TrendingUp, BarChart3, User, Bell, LogOut, Zap, Search, Store
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const retailerNav = [
  { path: "/retailer", label: "Dashboard", icon: LayoutDashboard },
  { path: "/retailer/products", label: "Products", icon: Package },
  { path: "/retailer/add-product", label: "Add Product", icon: Plus },
  { path: "/retailer/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/retailer/trending", label: "Trending", icon: TrendingUp },
];

const mobileRetailerNav = [
  { path: "/retailer", label: "Dashboard", icon: LayoutDashboard },
  { path: "/retailer/products", label: "Products", icon: Package },
  { path: "/retailer/add-product", label: "Add", icon: Plus },
  { path: "/retailer/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/retailer/trending", label: "Trends", icon: TrendingUp },
];

export default function RetailerNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Desktop Top Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/retailer" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-foreground">
                Smart<span className="text-gradient">Deal</span>
              </span>
              <span className="hidden sm:inline-flex ml-2 px-2 py-0.5 rounded-md bg-accent/10 text-accent text-xs font-semibold">
                Retailer
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {retailerNav.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      active ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="retailer-nav-active"
                        className="absolute inset-0 rounded-lg bg-primary/10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative flex items-center gap-1.5">
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-2">
              <Link to="/retailer" className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                <Bell className="w-5 h-5" />
              </Link>
              <Link to="/retailer" className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
                <User className="w-4 h-4" />
              </Link>
              <button onClick={handleLogout} className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-muted/50 transition-colors" title="Logout">
                <LogOut className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile logout */}
            <div className="flex md:hidden items-center gap-2">
              <button onClick={handleLogout} className="p-2 rounded-lg text-muted-foreground hover:text-destructive">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
        <div className="flex items-center justify-around py-2">
          {mobileRetailerNav.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <item.icon className={`w-5 h-5 ${active ? "text-primary" : ""}`} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
