import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, ShoppingCart, Package, Heart, MapPin, ArrowRight, IndianRupee } from "lucide-react";
import { products, trendingDeals } from "@/data/mockData";
import { useShoppingMode } from "@/contexts/ShoppingModeContext";
import { useCart } from "@/contexts/CartContext";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { orders } = useShoppingMode();
  const { totalSavings } = useCart();

  const totalOrderSavings = orders.reduce((s, o) => s + o.savings, 0);
  const topDeals = trendingDeals.slice(0, 4);

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Welcome back! 👋</h1>
          <p className="text-muted-foreground mt-1">Here's your shopping intelligence summary</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: IndianRupee, label: "Total Saved", value: `₹${totalOrderSavings + totalSavings}`, color: "text-success" },
            { icon: Package, label: "Orders", value: orders.length.toString(), color: "text-primary" },
            { icon: ShoppingCart, label: "In Planner", value: "0", color: "text-accent" },
            { icon: Heart, label: "Saved Deals", value: "0", color: "text-destructive" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="bg-card rounded-2xl p-5 border border-border/50 shadow-card">
              <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recommended Deals */}
          <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border/50 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-foreground flex items-center gap-2"><Sparkles className="w-5 h-5 text-primary" /> Recommended Deals</h2>
              <button onClick={() => navigate("/trending")} className="text-sm text-primary font-medium flex items-center gap-1">View all <ArrowRight className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topDeals.map((deal) => (
                <div key={deal.id} className="flex gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => {
                  const p = products.find(p => p.name === deal.productName);
                  if (p) navigate(`/product/${p.id}`);
                }}>
                  <img src={deal.image} alt={deal.productName} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">{deal.productName}</p>
                    <p className="text-xs text-muted-foreground">{deal.storeName}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-bold text-primary">₹{deal.finalPrice}</span>
                      <span className="text-xs text-muted-foreground line-through">₹{deal.originalPrice}</span>
                      <span className="text-[10px] font-bold text-success bg-success/10 px-1.5 py-0.5 rounded">{deal.discountPercent}% OFF</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
              <h3 className="font-bold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { icon: MapPin, label: "Explore Nearby Deals", path: "/deals-map" },
                  { icon: TrendingUp, label: "View Trending", path: "/trending" },
                  { icon: ShoppingCart, label: "Shopping Planner", path: "/planner" },
                  { icon: Package, label: "My Orders", path: "/orders" },
                ].map((action) => (
                  <button key={action.label} onClick={() => navigate(action.path)} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors text-left">
                    <action.icon className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">{action.label}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto" />
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
              <h3 className="font-bold text-foreground mb-4">Recent Orders</h3>
              {orders.length === 0 ? (
                <p className="text-sm text-muted-foreground">No orders yet</p>
              ) : (
                <div className="space-y-3">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                      <div>
                        <p className="text-sm font-medium text-foreground">#{order.id}</p>
                        <p className="text-xs text-muted-foreground">{order.mode === "delivery" ? "🚚 Delivery" : "🛍 Pickup"}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-foreground">₹{order.total}</p>
                        <p className="text-[10px] text-success font-medium">Saved ₹{order.savings}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
