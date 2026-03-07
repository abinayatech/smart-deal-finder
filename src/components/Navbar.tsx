import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, ShoppingCart, TrendingUp, LayoutDashboard, Menu, X, Zap, Users } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const navItems = [
  { path: "/home", label: "Home", icon: Zap },
  { path: "/search", label: "Search", icon: Search },
  { path: "/deals-map", label: "Deal Map", icon: MapPin },
  { path: "/trending", label: "Trending", icon: TrendingUp },
  { path: "/planner", label: "Planner", icon: ShoppingCart },
  { path: "/community", label: "Community", icon: Users },
  { path: "/retailer", label: "Retailer", icon: LayoutDashboard },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">
              SMART<span className="text-gradient">DEAL</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path} className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                  {active && <motion.div layoutId="navbar-indicator" className="absolute inset-0 rounded-lg bg-primary/10" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                  <span className="relative flex items-center gap-1.5"><item.icon className="w-4 h-4" />{item.label}</span>
                </Link>
              );
            })}
            <Link to="/cart" className="relative px-4 py-2 rounded-lg text-sm font-medium transition-colors text-muted-foreground hover:text-foreground">
              <span className="relative flex items-center gap-1.5">
                <ShoppingCart className="w-4 h-4" /> Cart
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center font-bold">{totalItems}</span>
                )}
              </span>
            </Link>
          </div>

          <button className="md:hidden p-2 rounded-lg text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden glass-strong border-t border-border">
            <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                    <item.icon className="w-4 h-4" />{item.label}
                  </Link>
                );
              })}
              <Link to="/cart" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground">
                <ShoppingCart className="w-4 h-4" /> Cart {totalItems > 0 && `(${totalItems})`}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
