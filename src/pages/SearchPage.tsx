import { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Star, MapPin, ArrowUpDown, Sparkles, ShoppingCart, Eye, Truck, Store, Filter, ClipboardList } from "lucide-react";
import { products } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";
import { useShoppingMode } from "@/contexts/ShoppingModeContext";
import { useToast } from "@/hooks/use-toast";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [sortBy, setSortBy] = useState<"price" | "discount" | "distance">("discount");
  const [filterDelivery, setFilterDelivery] = useState(false);
  const { addToCart } = useCart();
  const { mode } = useShoppingMode();
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
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="container mx-auto px-4">
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center bg-card rounded-2xl p-2 border border-border/50 shadow-card">
            <Search className="w-5 h-5 ml-4 text-muted-foreground" />
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products, brands, or stores..." className="flex-1 bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none" />
            <button type="submit" className="gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold">Search</button>
          </div>
        </form>

        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
            {(["discount", "price", "distance"] as const).map((s) => (
              <button key={s} onClick={() => setSortBy(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${sortBy === s ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
                {s === "discount" ? "Best Discount" : s === "price" ? "Lowest Price" : "Nearest"}
              </button>
            ))}
            <button onClick={() => setFilterDelivery(!filterDelivery)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${filterDelivery ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              <Truck className="w-3 h-3" /> Delivery
            </button>
          </div>
          <span className="text-sm text-muted-foreground">{results.length} products</span>
        </div>

        <div className="space-y-4">
          {results.length === 0 ? (
            <div className="text-center py-20">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No products found</p>
              <p className="text-sm text-muted-foreground">Try a different search term</p>
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
                <motion.div key={product.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.02 * Math.min(i, 15) }} className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-card hover:shadow-card-hover transition-all">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-44 h-44 md:h-auto overflow-hidden cursor-pointer relative" onClick={() => navigate(`/product/${product.id}`)}>
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      {mode === "delivery" && (
                        <div className="absolute bottom-2 left-2 bg-primary/90 text-primary-foreground px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1">
                          <Truck className="w-3 h-3" /> Delivery
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-foreground cursor-pointer hover:text-primary transition-colors" onClick={() => navigate(`/product/${product.id}`)}>{product.name}</h3>
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{product.category}</span>
                        </div>
                        <div className="flex gap-1.5">
                          <button onClick={() => navigate(`/product/${product.id}`)} className="px-3 py-1.5 rounded-lg bg-muted text-foreground text-xs font-medium flex items-center gap-1 hover:bg-muted/80 transition-colors">
                            <Eye className="w-3 h-3" /> Details
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {sortedStores.slice(0, 3).map((store, si) => (
                          <div key={store.storeName} className={`flex items-center justify-between p-3 rounded-xl transition-colors ${si === 0 ? "bg-primary/5 border border-primary/10" : "bg-muted/30"}`}>
                            <div className="flex items-center gap-2">
                              {si === 0 && <span className="px-1.5 py-0.5 rounded bg-primary text-primary-foreground text-[10px] font-bold">BEST</span>}
                              <div>
                                <span className="font-medium text-foreground text-sm">{store.storeName}</span>
                                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                                  <MapPin className="w-3 h-3" />{store.distance}
                                  <Star className="w-3 h-3 text-accent fill-accent" />{store.rating}
                                  <Truck className="w-3 h-3" />₹{store.deliveryCharge}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-right">
                                <div className="flex items-center gap-1">
                                  <span className="text-base font-bold text-primary">₹{store.finalPrice}</span>
                                  <span className="text-xs text-muted-foreground line-through">₹{store.originalPrice}</span>
                                </div>
                                <span className="text-[10px] font-semibold text-success">{store.discountPercent}% off</span>
                              </div>
                              <button onClick={() => handleAddToCart(product, store)} className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                                <ShoppingCart className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {product.aiPrediction && (
                        <div className="mt-3 flex items-start gap-2 p-3 rounded-xl bg-accent/5 border border-accent/10">
                          <Sparkles className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                          <p className="text-xs text-foreground">{product.aiPrediction}</p>
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
