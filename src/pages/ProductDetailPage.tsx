import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Star, ShoppingCart, Sparkles, Truck } from "lucide-react";
import { products } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  const availableStores = product.stores.filter(s => s.available);
  const sortedStores = [...availableStores].sort((a, b) => a.finalPrice - b.finalPrice);

  const handleAddToCart = (store: typeof sortedStores[0]) => {
    addToCart({
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      store,
    });
    toast({ title: "Added to cart!", description: `${product.name} from ${store.storeName}` });
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-3xl overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-[300px] md:h-[400px] object-cover" />
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <span className="text-sm text-muted-foreground">{product.category}</span>
              <h1 className="text-3xl font-display font-bold text-foreground mt-1">{product.name}</h1>
              {sortedStores.length > 0 && (
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-3xl font-bold text-primary">₹{sortedStores[0].finalPrice}</span>
                  <span className="text-lg text-muted-foreground line-through">₹{sortedStores[0].originalPrice}</span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">{sortedStores[0].discountPercent}% OFF</span>
                </div>
              )}
            </div>

            {/* AI Prediction */}
            {product.aiPrediction && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/10 border border-accent/20">
                <Sparkles className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">AI Price Prediction</p>
                  <p className="text-sm text-muted-foreground">{product.aiPrediction}</p>
                </div>
              </div>
            )}

            {/* Store Comparison */}
            <div>
              <h2 className="text-lg font-display font-semibold text-foreground mb-3">Available at {availableStores.length} stores</h2>
              <div className="space-y-3">
                {sortedStores.map((store, i) => (
                  <div key={store.storeName} className={`p-4 rounded-xl transition-colors ${i === 0 ? "bg-primary/5 border border-primary/20" : "bg-secondary/50"}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          {i === 0 && <span className="px-2 py-0.5 rounded-md bg-primary text-primary-foreground text-xs font-bold">BEST</span>}
                          <span className="font-semibold text-foreground">{store.storeName}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{store.distance}</span>
                          <span className="flex items-center gap-1"><Star className="w-3 h-3 text-deal-yellow fill-deal-yellow" />{store.rating}</span>
                          <span className="flex items-center gap-1"><Truck className="w-3 h-3" />Delivery ₹{store.deliveryCharge}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-primary">₹{store.finalPrice}</span>
                          <span className="text-sm text-muted-foreground line-through">₹{store.originalPrice}</span>
                        </div>
                        <span className="text-xs font-semibold text-deal-green">{store.discountPercent}% off</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddToCart(store)}
                      className="mt-3 w-full gradient-primary text-primary-foreground py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    >
                      <ShoppingCart className="w-4 h-4" /> Add to Cart from {store.storeName}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
