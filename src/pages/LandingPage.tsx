import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, TrendingUp, ArrowRight, Sparkles, ShoppingBag, Zap, Bell } from "lucide-react";
import { categories, trendingDeals, bundleDeals, notifications, products } from "@/data/mockData";

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  // Personalized recommendations
  const recommendations = products
    .filter(p => p.stores.some(s => s.discountPercent >= 20))
    .slice(0, 3)
    .map(p => {
      const best = [...p.stores].sort((a, b) => b.discountPercent - a.discountPercent)[0];
      return `${p.name} ${best.discountPercent}% off at ${best.storeName} near you.`;
    });

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative gradient-hero text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-primary-foreground" style={{ width: Math.random() * 4 + 2 + "px", height: Math.random() * 4 + 2 + "px", left: Math.random() * 100 + "%", top: Math.random() * 100 + "%", opacity: Math.random() * 0.5 }} />
          ))}
        </div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-sm mb-6">
              <Sparkles className="w-4 h-4" /> AI-Powered Shopping Intelligence
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">Find the Best <span className="text-deal-yellow">Deals</span> Near You</h1>
            <p className="text-lg md:text-xl opacity-80 mb-10 font-body">Compare prices, discover hidden discounts, and save money with smart shopping routes.</p>

            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
              <div className="flex items-center bg-primary-foreground/10 backdrop-blur-xl border border-primary-foreground/20 rounded-2xl p-2">
                <Search className="w-5 h-5 ml-4 opacity-60" />
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Search "Oreo biscuit", "Coffee beans", "Laptop"...' className="flex-1 bg-transparent px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/50 outline-none font-body" />
                <button type="submit" className="gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity">
                  Search <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-sm opacity-70">
              <span>Popular:</span>
              {["Oreo Biscuit", "Coffee Beans", "Wireless Earbuds", "Crochet Thread"].map((term) => (
                <button key={term} onClick={() => { setSearchQuery(term); navigate(`/search?q=${encodeURIComponent(term)}`); }} className="px-3 py-1 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
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
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="glass rounded-2xl p-5 text-center">
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-display font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Personalized Recommendations */}
      <section className="container mx-auto px-4 py-8">
        <div className="glass rounded-2xl p-6 border-l-4 border-l-accent">
          <h3 className="font-display font-semibold text-foreground flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-accent" /> Personalized for You
          </h3>
          <div className="space-y-2">
            {recommendations.map((rec, i) => (
              <p key={i} className="text-sm text-muted-foreground">💡 {rec}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="container mx-auto px-4 pb-8">
        <button onClick={() => setShowNotifications(!showNotifications)} className="flex items-center gap-2 text-foreground font-display font-semibold mb-4">
          <Bell className="w-5 h-5 text-primary" /> Notifications
          <span className="px-2 py-0.5 rounded-full bg-destructive text-destructive-foreground text-xs font-bold">
            {notifications.filter(n => !n.read).length}
          </span>
        </button>
        {showNotifications && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-2">
            {notifications.map(n => (
              <div key={n.id} className={`glass rounded-xl p-4 flex items-center justify-between ${!n.read ? "border-l-4 border-l-primary" : ""}`}>
                <p className={`text-sm ${!n.read ? "text-foreground font-medium" : "text-muted-foreground"}`}>{n.message}</p>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{n.time}</span>
              </div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <motion.button key={cat.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 * i }} onClick={() => navigate(`/search?q=${encodeURIComponent(cat.name)}`)} className="glass rounded-2xl p-6 text-left hover:shadow-glow transition-shadow group">
              <span className="text-3xl mb-3 block">{cat.icon}</span>
              <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">{cat.name}</h3>
              <p className="text-sm text-muted-foreground">{cat.count} products</p>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Trending Deals */}
      <section className="container mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">🔥 Trending Deals</h2>
          <button onClick={() => navigate("/trending")} className="text-sm text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
            View all <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingDeals.slice(0, 6).map((deal, i) => (
            <motion.div key={deal.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }} className="glass rounded-2xl overflow-hidden group hover:shadow-glow transition-shadow">
              <div className="relative h-40 overflow-hidden">
                <img src={deal.image} alt={deal.productName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3 gradient-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">{deal.discountPercent}% OFF</div>
              </div>
              <div className="p-4">
                <h3 className="font-display font-semibold text-foreground">{deal.productName}</h3>
                <p className="text-sm text-muted-foreground">{deal.storeName}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-bold text-primary">₹{deal.finalPrice}</span>
                  <span className="text-sm text-muted-foreground line-through">₹{deal.originalPrice}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Hidden Deals */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8">🎁 Hidden Deal Detector</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bundleDeals.map((deal, i) => (
            <motion.div key={deal.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }} className="glass rounded-2xl p-6 border-l-4 border-l-primary">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">{deal.title}</div>
              <h3 className="font-display font-semibold text-foreground text-lg">{deal.product}</h3>
              <p className="text-sm text-muted-foreground mb-3">{deal.store}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-muted-foreground">Effective price:</span>
                <span className="text-xl font-bold text-primary">₹{deal.effectivePrice}</span>
                <span className="text-sm text-muted-foreground line-through">₹{deal.originalPrice}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI Prediction Banner */}
      <section className="container mx-auto px-4 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="gradient-primary rounded-3xl p-8 md:p-12 text-primary-foreground relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative max-w-xl">
            <Sparkles className="w-8 h-8 mb-4 opacity-80" />
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">AI Price Predictions</h2>
            <p className="opacity-80 mb-6">Our AI analyzes historical price patterns to predict future discounts. Get personalized alerts for the best time to buy.</p>
            <button onClick={() => navigate("/search")} className="bg-primary-foreground text-foreground px-6 py-3 rounded-xl font-semibold hover:bg-primary-foreground/90 transition-colors">
              Explore Predictions
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
