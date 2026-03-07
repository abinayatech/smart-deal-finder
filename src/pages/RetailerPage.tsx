import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Plus, TrendingUp, Package, Percent, Clock, Search, BarChart3, ArrowUp } from "lucide-react";

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
  { term: "Yoga Mat", count: 534, growth: 22 },
  { term: "Laptop Stand", count: 498, growth: 5 },
];

const categoryDemand = [
  { category: "Groceries", searches: 4500, growth: 12 },
  { category: "Electronics", searches: 3200, growth: 25 },
  { category: "Fashion", searches: 2800, growth: 18 },
  { category: "Art & Craft", searches: 1500, growth: 40 },
  { category: "Sports", searches: 1200, growth: 15 },
];

export default function RetailerPage() {
  const [myProducts, setMyProducts] = useState<RetailerProduct[]>(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", storeName: "", originalPrice: "", discountPercent: "", offerDuration: "" });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setMyProducts([...myProducts, { id: Date.now().toString(), name: form.name, storeName: form.storeName, originalPrice: Number(form.originalPrice), discountPercent: Number(form.discountPercent), offerDuration: form.offerDuration }]);
    setForm({ name: "", storeName: "", originalPrice: "", discountPercent: "", offerDuration: "" });
    setShowForm(false);
  };

  const removeProduct = (id: string) => setMyProducts(myProducts.filter((p) => p.id !== id));

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-2"><LayoutDashboard className="w-8 h-8 text-primary" /> Retailer Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your products, offers, and view analytics</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="gradient-primary text-primary-foreground px-5 py-3 rounded-xl font-semibold flex items-center gap-2"><Plus className="w-4 h-4" /> Add Product</button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Package, label: "Products", value: myProducts.length.toString() },
            { icon: Percent, label: "Avg Discount", value: myProducts.length ? Math.round(myProducts.reduce((s, p) => s + p.discountPercent, 0) / myProducts.length) + "%" : "0%" },
            { icon: TrendingUp, label: "Views Today", value: "1,234" },
            { icon: Clock, label: "Active Offers", value: myProducts.length.toString() },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-5 text-center">
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-display font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {showForm && (
              <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} onSubmit={handleAdd} className="glass rounded-2xl p-6 space-y-4">
                <h3 className="font-display font-semibold text-foreground">Add New Product</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: "name", label: "Product Name", type: "text", placeholder: "e.g. Oreo Biscuit" },
                    { key: "storeName", label: "Store Name", type: "text", placeholder: "e.g. My Store" },
                    { key: "originalPrice", label: "Original Price (₹)", type: "number", placeholder: "40" },
                    { key: "discountPercent", label: "Discount %", type: "number", placeholder: "25" },
                    { key: "offerDuration", label: "Offer Duration", type: "text", placeholder: "e.g. 7 days" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="text-sm text-muted-foreground">{field.label}</label>
                      <input type={field.type} placeholder={field.placeholder} value={form[field.key as keyof typeof form]} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} required className="w-full glass rounded-lg px-4 py-2 mt-1 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="gradient-primary text-primary-foreground px-6 py-2 rounded-xl font-semibold">Save Product</button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 rounded-xl text-muted-foreground hover:text-foreground">Cancel</button>
                </div>
              </motion.form>
            )}

            {/* Products Table */}
            <div className="glass rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-border"><h3 className="font-display font-semibold text-foreground">Your Products</h3></div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border text-sm text-muted-foreground">
                      <th className="text-left p-4">Product</th><th className="text-left p-4">Store</th><th className="text-right p-4">Price</th><th className="text-right p-4">Discount</th><th className="text-right p-4">Duration</th><th className="text-right p-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {myProducts.map((p) => (
                      <tr key={p.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="p-4 font-medium text-foreground">{p.name}</td>
                        <td className="p-4 text-muted-foreground">{p.storeName}</td>
                        <td className="p-4 text-right text-foreground">₹{p.originalPrice}</td>
                        <td className="p-4 text-right"><span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-sm font-semibold">{p.discountPercent}%</span></td>
                        <td className="p-4 text-right text-muted-foreground">{p.offerDuration}</td>
                        <td className="p-4 text-right"><button onClick={() => removeProduct(p.id)} className="text-sm text-destructive hover:underline">Remove</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Category Demand Analytics */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-primary" /> Category Demand Analytics</h3>
              <div className="space-y-4">
                {categoryDemand.map(cat => (
                  <div key={cat.category}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">{cat.category}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{cat.searches.toLocaleString()} searches</span>
                        <span className="text-xs text-deal-green flex items-center gap-0.5"><ArrowUp className="w-3 h-3" />{cat.growth}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="gradient-primary h-2 rounded-full transition-all" style={{ width: `${(cat.searches / 4500) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 rounded-xl bg-accent/10 border border-accent/20">
                <p className="text-sm text-foreground flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <strong>Insight:</strong> Crochet thread searches increased by 40% this week. Consider stocking craft supplies.
                </p>
              </div>
            </div>
          </div>

          {/* Trending Searches */}
          <div className="glass rounded-2xl p-6 h-fit">
            <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2"><Search className="w-5 h-5 text-primary" /> Trending Searches</h3>
            <p className="text-sm text-muted-foreground mb-4">What customers are looking for</p>
            <div className="space-y-3">
              {trendingSearches.map((ts, i) => (
                <div key={ts.term} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-muted-foreground w-5">{i + 1}</span>
                    <span className="font-medium text-foreground">{ts.term}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-muted-foreground">{ts.count}</span>
                    <span className="block text-xs text-deal-green flex items-center gap-0.5 justify-end"><ArrowUp className="w-3 h-3" />{ts.growth}%</span>
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
