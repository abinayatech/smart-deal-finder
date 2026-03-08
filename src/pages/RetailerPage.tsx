import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Plus, TrendingUp, Package, Percent, Clock, Search, BarChart3, ArrowUp, Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface RetailerProduct {
  id: string;
  name: string;
  storeName: string;
  originalPrice: number;
  discountPercent: number;
  offerDuration: string;
}

const initialProducts: RetailerProduct[] = [
  { id: "1", name: "Oreo Biscuit", storeName: "My Store", originalPrice: 40, discountPercent: 25, offerDuration: "7 days" },
  { id: "2", name: "Coffee Beans", storeName: "My Store", originalPrice: 450, discountPercent: 15, offerDuration: "3 days" },
  { id: "3", name: "Wireless Earbuds", storeName: "My Store", originalPrice: 2999, discountPercent: 30, offerDuration: "5 days" },
];

const trendingSearches = [
  { term: "Oreo Biscuit", count: 1240, growth: 15 },
  { term: "Wireless Earbuds", count: 980, growth: 28 },
  { term: "Coffee Beans", count: 856, growth: 12 },
  { term: "Crochet Thread", count: 743, growth: 40 },
  { term: "Running Shoes", count: 621, growth: 8 },
];

const categoryDemand = [
  { category: "Groceries", searches: 4500, growth: 12 },
  { category: "Electronics", searches: 3200, growth: 25 },
  { category: "Fashion", searches: 2800, growth: 18 },
  { category: "Art & Craft", searches: 1500, growth: 40 },
  { category: "Sports", searches: 1200, growth: 15 },
];

export default function RetailerPage() {
  const [myProducts] = useState<RetailerProduct[]>(initialProducts);

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <LayoutDashboard className="w-7 h-7 text-primary" /> Retailer Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Overview of your store performance</p>
          </div>
          <Link to="/retailer/add-product" className="gradient-primary text-primary-foreground px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 shadow-lg">
            <Plus className="w-4 h-4" /> Add Product
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { icon: Package, label: "Products", value: myProducts.length.toString() },
            { icon: Percent, label: "Avg Discount", value: myProducts.length ? Math.round(myProducts.reduce((s, p) => s + p.discountPercent, 0) / myProducts.length) + "%" : "0%" },
            { icon: Eye, label: "Views Today", value: "1,234" },
            { icon: Clock, label: "Active Offers", value: myProducts.length.toString() },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl p-4 text-center border border-border/50 shadow-card">
              <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="text-xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { to: "/retailer/products", label: "All Products", icon: Package },
            { to: "/retailer/add-product", label: "Add Product", icon: Plus },
            { to: "/retailer/analytics", label: "Analytics", icon: BarChart3 },
            { to: "/retailer/trending", label: "Trending", icon: TrendingUp },
          ].map(link => (
            <Link key={link.to} to={link.to} className="bg-card rounded-xl p-4 border border-border/50 shadow-card hover:shadow-lg transition-shadow flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <link.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">{link.label}</span>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {/* Recent Products */}
            <div className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-card">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-bold text-foreground text-sm">Recent Products</h3>
                <Link to="/retailer/products" className="text-xs text-primary font-medium hover:underline">View All</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border text-xs text-muted-foreground">
                      <th className="text-left p-3">Product</th>
                      <th className="text-right p-3">Price</th>
                      <th className="text-right p-3">Discount</th>
                      <th className="text-right p-3">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myProducts.map((p) => (
                      <tr key={p.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors text-sm">
                        <td className="p-3 font-medium text-foreground">{p.name}</td>
                        <td className="p-3 text-right text-foreground">₹{p.originalPrice}</td>
                        <td className="p-3 text-right">
                          <span className="px-2 py-0.5 rounded bg-success/10 text-success text-xs font-semibold">{p.discountPercent}%</span>
                        </td>
                        <td className="p-3 text-right text-muted-foreground">{p.offerDuration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Demand Analytics */}
            <div className="bg-card rounded-2xl p-5 border border-border/50 shadow-card">
              <h3 className="font-bold text-foreground text-sm mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" /> Category Demand
              </h3>
              <div className="space-y-3">
                {categoryDemand.map(cat => (
                  <div key={cat.category}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-foreground">{cat.category}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{cat.searches.toLocaleString()}</span>
                        <span className="text-[10px] text-success flex items-center gap-0.5">
                          <ArrowUp className="w-3 h-3" />{cat.growth}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div className="gradient-primary h-1.5 rounded-full transition-all" style={{ width: `${(cat.searches / 4500) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-xl bg-accent/5 border border-accent/10">
                <p className="text-xs text-foreground flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <strong>Insight:</strong> Crochet thread searches increased by 40% this week.
                </p>
              </div>
            </div>
          </div>

          {/* Trending */}
          <div className="bg-card rounded-2xl p-5 h-fit border border-border/50 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" /> Trending
              </h3>
              <Link to="/retailer/trending" className="text-xs text-primary font-medium hover:underline">View All</Link>
            </div>
            <div className="space-y-2">
              {trendingSearches.map((ts, i) => (
                <div key={ts.term} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}</span>
                    <span className="font-medium text-foreground text-sm">{ts.term}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground">{ts.count}</span>
                    <span className="text-[10px] text-success flex items-center gap-0.5 justify-end">
                      <ArrowUp className="w-3 h-3" />{ts.growth}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
