import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, TrendingUp, ArrowRight, Sparkles, ShoppingBag, Zap, Bell, Star, ShoppingCart, Truck, Store } from "lucide-react";
import { categories, trendingDeals, bundleDeals, notifications, products } from "@/data/mockData";
import { useShoppingMode } from "@/contexts/ShoppingModeContext";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const { mode } = useShoppingMode();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const recommendations = products
    .filter(p => p.stores.some(s => s.discountPercent >= 20))
    .slice(0, 3)
    .map(p => {
      const best = [...p.stores].sort((a, b) => b.discountPercent - a.discountPercent)[0];
      return { product: p, store: best, text: `${p.name} ${best.discountPercent}% off at ${best.storeName}` };
    });

  const handleQuickAdd = (product: typeof products[0]) => {
    const best = [...product.stores.filter(s => s.available)].sort((a, b) => a.finalPrice - b.finalPrice)[0];
    if (best) {
      addToCart({ productId: product.id, productName: product.name, productImage: product.image, store: best });
      toast({ title: "Added to cart!", description: `${product.name} from ${best.storeName}` });
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-20 md:pb-0">
      {/* Hero */}
      <section className="relative gradient-hero text-primary-foreground overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-72 h-72 bg-primary-foreground/3 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-16 md:py-28 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/10 text-sm mb-6">
              <Sparkles className="w-4 h-4 text-accent" /> AI-Powered Shopping Intelligence
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              Discover the Best <span className="text-accent">Deals</span> Near You
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/60 mb-10">
              Compare prices, discover hidden discounts, and save money with smart shopping routes.
            </p>

            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
              <div className="flex items-center bg-primary-foreground/10 backdrop-blur-xl border border-primary-foreground/10 rounded-2xl p-2">
                <Search className="w-5 h-5 ml-4 text-primary-foreground/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, brands, or stores..."
                  className="flex-1 bg-transparent px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/30 outline-none"
                />
                <button type="submit" className="gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg">
                  Search <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-2 mt-6 text-sm text-primary-foreground/40">
              <span>Popular:</span>
              {["Oreo Biscuit", "Coffee Beans", "Wireless Earbuds", "Crochet Thread"].map((term) => (
                <button key={term} onClick={() => navigate(`/search?q=${encodeURIComponent(term)}`)} className="px-3 py-1 rounded-full bg-primary-foreground/5 hover:bg-primary-foreground/10 transition-colors border border-primary-foreground/5">
                  {term}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: ShoppingBag, label: "Products Tracked", value: `${products.length}+` },
            { icon: MapPin, label: "Stores Covered", value: "22+" },
            { icon: TrendingUp, label: "Avg Savings", value: "23%" },
            { icon: Zap, label: "Deals Today", value: `${trendingDeals.length}+` },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="bg-card rounded-2xl p-5 text-center shadow-card border border-border/50">
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-extrabold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Personalized Recommendations */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-card border-l-4 border-l-primary">
          <h3 className="font-bold text-foreground flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-primary" /> Recommended for You
          </h3>
          <div className="space-y-2">
            {recommendations.map((rec, i) => (
              <p key={i} className="text-sm text-muted-foreground">💡 {rec.text}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Browse Categories</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.03 * i }}
              onClick={() => navigate(`/search?q=${encodeURIComponent(cat.name)}`)}
              className="bg-card rounded-2xl p-5 text-left hover:shadow-card-hover transition-all duration-200 group border border-border/50 hover:border-primary/20"
            >
              <span className="text-3xl mb-3 block">{cat.icon}</span>
              <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{cat.name}</h3>
              <p className="text-xs text-muted-foreground">{cat.count} items</p>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Trending Deals */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">🔥 Trending Deals</h2>
          <button onClick={() => navigate("/trending")} className="text-sm text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
            View all <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingDeals.slice(0, 6).map((deal, i) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="bg-card rounded-2xl overflow-hidden group hover:shadow-card-hover transition-all duration-200 border border-border/50 cursor-pointer"
              onClick={() => {
                const p = products.find(p => p.name === deal.productName);
                if (p) navigate(`/product/${p.id}`);
              }}
            >
              <div className="relative h-40 overflow-hidden">
                <img src={deal.image} alt={deal.productName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  {deal.discountPercent}% OFF
                </div>
                <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-medium text-foreground">
                  {deal.category}
                </div>
                {mode === "delivery" && (
                  <div className="absolute bottom-3 left-3 bg-primary/90 text-primary-foreground px-2 py-1 rounded-lg text-[10px] font-medium flex items-center gap-1">
                    <Truck className="w-3 h-3" /> Delivery
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground text-sm">{deal.productName}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <Store className="w-3 h-3" /> {deal.storeName}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">₹{deal.finalPrice}</span>
                    <span className="text-xs text-muted-foreground line-through">₹{deal.originalPrice}</span>
                  </div>
                  <span className="text-xs font-semibold text-success">Save ₹{deal.originalPrice - deal.finalPrice}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bundle Deals */}
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">🎁 Hidden Deal Detector</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bundleDeals.slice(0, 3).map((deal, i) => (
            <motion.div key={deal.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }} className="bg-card rounded-2xl p-6 border border-border/50 shadow-card border-l-4 border-l-success">
              <div className="inline-block px-3 py-1 rounded-full bg-success/10 text-success text-xs font-semibold mb-3">{deal.title}</div>
              <h3 className="font-bold text-foreground text-lg">{deal.product}</h3>
              <p className="text-sm text-muted-foreground mb-3">{deal.store}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-muted-foreground">Effective price:</span>
                <span className="text-xl font-bold text-success">₹{deal.effectivePrice}</span>
                <span className="text-sm text-muted-foreground line-through">₹{deal.originalPrice}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Map Preview */}
      <section className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-6 border border-border/50 shadow-card"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" /> Nearby Deals
              </h2>
              <p className="text-sm text-muted-foreground">22 stores with active deals near you</p>
            </div>
            <button onClick={() => navigate("/deals-map")} className="text-sm text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
              Open Map <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="h-48 rounded-xl bg-muted flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors" onClick={() => navigate("/deals-map")}>
            <div className="text-center text-muted-foreground">
              <MapPin className="w-10 h-10 mx-auto mb-2" />
              <p className="text-sm font-medium">Click to explore the interactive deal map</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* AI Prediction Banner */}
      <section className="container mx-auto px-4 py-6 pb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="gradient-primary rounded-2xl p-8 md:p-12 text-primary-foreground relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative max-w-xl">
            <Sparkles className="w-8 h-8 mb-4 text-accent" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">AI Price Predictions</h2>
            <p className="text-primary-foreground/60 mb-6">Our AI analyzes historical price patterns to predict future discounts. Get personalized alerts for the best time to buy.</p>
            <button onClick={() => navigate("/search")} className="bg-primary-foreground text-foreground px-6 py-3 rounded-xl font-semibold hover:bg-primary-foreground/90 transition-colors shadow-lg">
              Explore Predictions
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
