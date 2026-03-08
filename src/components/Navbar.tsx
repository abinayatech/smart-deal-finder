import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, MapPin, ShoppingCart, TrendingUp, Menu, X,
  Home, User, Bell, Package, ClipboardList, Users, LayoutDashboard, Zap
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useShoppingMode } from "@/contexts/ShoppingModeContext";

const desktopNav = [
  { path: "/home", label: "Home", icon: Home },
  { path: "/search", label: "Search", icon: Search },
  { path: "/trending", label: "Trending", icon: TrendingUp },
  { path: "/deals-map", label: "Map", icon: MapPin },
  { path: "/planner", label: "Planner", icon: ClipboardList },
  { path: "/community", label: "Community", icon: Users },
];

const mobileNav = [
  { path: "/home", label: "Home", icon: Home },
  { path: "/search", label: "Search", icon: Search },
  { path: "/deals-map", label: "Map", icon: MapPin },
  { path: "/planner", label: "Planner", icon: ClipboardList },
  { path: "/profile", label: "Profile", icon: User },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const { mode, setMode } = useShoppingMode();

  return (
    <>
      {/* Desktop Top Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-foreground">
                Smart<span className="text-gradient">Deal</span>
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {desktopNav.map((item) => {
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
                        layoutId="nav-active"
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

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-2">
              {/* Mode Toggle */}
              <div className="flex items-center bg-muted rounded-lg p-0.5 text-xs font-medium">
                <button
                  onClick={() => setMode("pickup")}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    mode === "pickup" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  🛍 Pickup
                </button>
                <button
                  onClick={() => setMode("delivery")}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    mode === "delivery" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  🚚 Delivery
                </button>
              </div>

              <Link to="/notifications" className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" />
              </Link>

              <Link to="/orders" className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                <Package className="w-5 h-5" />
              </Link>

              <Link to="/cart" className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Link>

              <Link to="/profile" className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
                <User className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile: Cart + Hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <Link to="/cart" className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button className="p-2 rounded-lg text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border bg-card"
            >
              <div className="px-4 py-3 flex flex-col gap-1">
                {/* Mode Toggle */}
                <div className="flex items-center bg-muted rounded-lg p-0.5 text-xs font-medium mb-2">
                  <button
                    onClick={() => setMode("pickup")}
                    className={`flex-1 px-3 py-2 rounded-md transition-all ${
                      mode === "pickup" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"
                    }`}
                  >
                    🛍 Store Pickup
                  </button>
                  <button
                    onClick={() => setMode("delivery")}
                    className={`flex-1 px-3 py-2 rounded-md transition-all ${
                      mode === "delivery" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"
                    }`}
                  >
                    🚚 Home Delivery
                  </button>
                </div>
                {[...desktopNav,
                  { path: "/orders", label: "Orders", icon: Package },
                  { path: "/notifications", label: "Notifications", icon: Bell },
                  { path: "/retailer", label: "Retailer Portal", icon: LayoutDashboard },
                ].map((item) => {
                  const active = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
        <div className="flex items-center justify-around py-2">
          {mobileNav.map((item) => {
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
