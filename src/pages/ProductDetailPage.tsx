import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Star, ShoppingCart, Sparkles, Truck, Store, ClipboardList, Eye } from "lucide-react";
import { products } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";
import { useShoppingMode } from "@/contexts/ShoppingModeContext";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { mode } = useShoppingMode();
  const { toast } = useToast();

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">Product not found.</p>
          <button onClick={() => navigate("/search")} className="mt-4 text-primary font-medium">Back to Search</button>
        </div>
      </div>
    );
  }

  const availableStores = product.stores.filter(s => s.available);
  const sortedStores = [...availableStores].sort((a, b) => a.finalPrice - b.finalPrice);

  const handleAddToCart = (store: typeof sortedStores[0]) => {
    addToCart({ productId: product.id, productName: product.name, productImage: product.image, store });
    toast({ title: "Added to cart!", description: `${product.name} from ${store.storeName}` });
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-card">
            <img src={product.image} alt={product.name} className="w-full h-[300px] md:h-[400px] object-cover" />
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            <div>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{product.category}</span>
              <h1 className="text-3xl font-bold text-foreground mt-2">{product.name}</h1>
              {sortedStores.length > 0 && (
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-3xl font-bold text-primary">₹{sortedStores[0].finalPrice}</span>
                  <span className="text-lg text-muted-foreground line-through">₹{sortedStores[0].originalPrice}</span>
                  <span className="px-3 py-1 rounded-full bg-success/10 text-success text-sm font-bold">{sortedStores[0].discountPercent}% OFF</span>
                </div>
              )}

              <div className="flex items-center gap-3 mt-3">
                {mode === "delivery" ? (
                  <span className="flex items-center gap-1 text-xs text-primary bg-primary/10 px-2 py-1 rounded"><Truck className="w-3 h-3" /> Available for Delivery</span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-accent bg-accent/10 px-2 py-1 rounded"><Store className="w-3 h-3" /> Available for Pickup</span>
                )}
              </div>
            </div>

            {/* AI Prediction */}
            {product.aiPrediction && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/5 border border-accent/10">
                <Sparkles className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">AI Price Prediction</p>
                  <p className="text-sm text-muted-foreground">{product.aiPrediction}</p>
                </div>
              </div>
            )}

            {/* Store Comparison */}
            <div>
              <h2 className="text-base font-bold text-foreground mb-3">
                Price Comparison — {availableStores.length} stores
              </h2>

              {/* Comparison Table */}
              <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left p-3 font-medium text-muted-foreground">Store</th>
                      <th className="text-right p-3 font-medium text-muted-foreground">Price</th>
                      <th className="text-right p-3 font-medium text-muted-foreground">Discount</th>
                      <th className="text-right p-3 font-medium text-muted-foreground"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedStores.map((store, i) => (
                      <tr key={store.storeName} className={`border-b border-border/30 last:border-b-0 ${i === 0 ? "bg-primary/[0.02]" : ""}`}>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            {i === 0 && <span className="px-1.5 py-0.5 rounded bg-primary text-primary-foreground text-[9px] font-bold">BEST</span>}
                            <div>
                              <p className="font-medium text-foreground">{store.storeName}</p>
                              <p className="text-[11px] text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{store.distance} • <Truck className="w-3 h-3" />₹{store.deliveryCharge}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <span className="font-bold text-foreground">₹{store.finalPrice}</span>
                          <span className="block text-[11px] text-muted-foreground line-through">₹{store.originalPrice}</span>
                        </td>
                        <td className="p-3 text-right">
                          <span className="text-xs font-bold text-success">{store.discountPercent}%</span>
                        </td>
                        <td className="p-3 text-right">
                          <button onClick={() => handleAddToCart(store)} className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors flex items-center gap-1">
                            <ShoppingCart className="w-3 h-3" /> Add
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button onClick={() => sortedStores[0] && handleAddToCart(sortedStores[0])} className="flex-1 gradient-primary text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg">
                <ShoppingCart className="w-5 h-5" /> Add Best Deal to Cart
              </button>
              <button onClick={() => navigate("/planner")} className="px-4 py-3 rounded-xl bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors">
                <ClipboardList className="w-5 h-5" />
              </button>
              <button onClick={() => navigate("/deals-map")} className="px-4 py-3 rounded-xl bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors">
                <MapPin className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
