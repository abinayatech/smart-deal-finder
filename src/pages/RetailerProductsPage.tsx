import { useState } from "react";
import { Package, Trash2, Edit, Search } from "lucide-react";

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
  { id: "4", name: "Yoga Mat", storeName: "My Store", originalPrice: 899, discountPercent: 20, offerDuration: "10 days" },
  { id: "5", name: "Running Shoes", storeName: "My Store", originalPrice: 3499, discountPercent: 35, offerDuration: "5 days" },
];

export default function RetailerProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  const removeProduct = (id: string) => setProducts(products.filter(p => p.id !== id));

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Package className="w-7 h-7 text-primary" /> My Products
          </h1>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-3 bg-card rounded-xl text-foreground placeholder:text-muted-foreground border border-border/50 focus:ring-2 focus:ring-primary/20 outline-none text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(p => (
            <div key={p.id} className="bg-card rounded-2xl p-5 border border-border/50 shadow-card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-foreground">{p.name}</h3>
                <span className="px-2 py-0.5 rounded-lg bg-success/10 text-success text-xs font-bold">{p.discountPercent}% OFF</span>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground mb-4">
                <p>Store: {p.storeName}</p>
                <p>Price: <span className="text-foreground font-semibold">₹{p.originalPrice}</span></p>
                <p>Discounted: <span className="text-success font-semibold">₹{Math.round(p.originalPrice * (1 - p.discountPercent / 100))}</span></p>
                <p>Duration: {p.offerDuration}</p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
                  <Edit className="w-3.5 h-3.5" /> Edit
                </button>
                <button onClick={() => removeProduct(p.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-destructive/10 text-destructive text-xs font-medium hover:bg-destructive/20 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
