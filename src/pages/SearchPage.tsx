import { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Star, MapPin, ArrowUpDown, Sparkles, ShoppingCart, Eye, Truck } from "lucide-react";
import { products } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [sortBy, setSortBy] = useState<"price" | "discount" | "distance">("price");
  const { addToCart } = useCart();
  const { toast } = useToast();

  const results = useMemo(() => {
    if (!query.trim()) return products;
    const q = query.toLowerCase();
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  const handleAddToCart = (product: typeof products[0], store: typeof products[0]["stores"][0]) => {
    addToCart({ productId: product.id, productName: product.name, productImage: product.image, store });
    toast({ title: "Added to cart!", description: `${product.name} from ${store.storeName}` });
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-10">
          <div className="flex items-center glass rounded-2xl p-2">
            <Search className="w-5 h-5 ml-4 text-muted-foreground" />
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products..." className="flex-1 bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none font-body" />
            <button type="submit" className="gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold">Search</button>
          </div>
        </form>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Sort by:</span>
            {(["price", "discount", "distance"] as const).map((s) => (
              <button key={s} onClick={() => setSortBy(s)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${sortBy === s ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">{results.length} products found</span>
        </div>

        <div className="space-y-6">
          {results.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No products found. Try a different search.</p>
            </div>
          ) : (
            results.map((product, i) => {
              const availableStores = product.stores.filter(s => s.available);
              const sortedStores = [...availableStores].sort((a, b) => {
                if (sortBy === "price") return a.finalPrice - b.finalPrice;
                if (sortBy === "discount") return b.discountPercent - a.discountPercent;
                return parseFloat(a.distance) - parseFloat(b.distance);
              });

              return (
                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 * Math.min(i, 10) }} className="glass rounded-2xl overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-48 h-48 md:h-auto overflow-hidden cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-display font-bold text-foreground cursor-pointer hover:text-primary transition-colors" onClick={() => navigate(`/product/${product.id}`)}>{product.name}</h3>
                          <span className="text-sm text-muted-foreground">{product.category}</span>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => navigate(`/product/${product.id}`)} className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium flex items-center gap-1 hover:bg-muted transition-colors">
                            <Eye className="w-3 h-3" /> Details
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {sortedStores.map((store, si) => (
                          <div key={store.storeName} className={`flex items-center justify-between p-3 rounded-xl transition-colors ${si === 0 ? "bg-primary/5 border border-primary/20" : "bg-secondary/50"}`}>
                            <div className="flex items-center gap-3">
                              {si === 0 && <span className="px-2 py-0.5 rounded-md bg-primary text-primary-foreground text-xs font-bold">BEST</span>}
                              <div>
                                <span className="font-semibold text-foreground">{store.storeName}</span>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <MapPin className="w-3 h-3" />{store.distance}
                                  <Star className="w-3 h-3 text-deal-yellow fill-deal-yellow" />{store.rating}
                                  <Truck className="w-3 h-3" />₹{store.deliveryCharge}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <div className="flex items-center gap-2">
                                  <span className="text-lg font-bold text-primary">₹{store.finalPrice}</span>
                                  <span className="text-sm text-muted-foreground line-through">₹{store.originalPrice}</span>
                                </div>
                                <span className="text-xs font-semibold text-deal-green">{store.discountPercent}% off</span>
                              </div>
                              <button onClick={() => handleAddToCart(product, store)} className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                                <ShoppingCart className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {product.aiPrediction && (
                        <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-accent/10 border border-accent/20">
                          <Sparkles className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                          <p className="text-sm text-foreground">{product.aiPrediction}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
