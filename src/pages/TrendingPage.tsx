import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TrendingUp, Clock, Star, Store, ShoppingCart } from "lucide-react";
import { trendingDeals, products } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

export default function TrendingPage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (deal: typeof trendingDeals[0]) => {
    const product = products.find(p => p.name === deal.productName);
    if (!product) return;
    const store = product.stores.find(s => s.storeName === deal.storeName);
    if (!store) return;
    addToCart({ productId: product.id, productName: product.name, productImage: product.image, store });
    toast({ title: "Added to cart!", description: `${product.name} from ${store.storeName}` });
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-1">🔥 Trending Deals Today</h1>
          <p className="text-muted-foreground text-sm">Top discounted products updated in real-time</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {trendingDeals.map((deal, i) => {
            const product = products.find(p => p.name === deal.productName);
            return (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.03 * i }}
                className="bg-card rounded-2xl overflow-hidden group hover:shadow-card-hover transition-all border border-border/50"
              >
                <div className="relative h-44 overflow-hidden cursor-pointer" onClick={() => product && navigate(`/product/${product.id}`)}>
                  <img src={deal.image} alt={deal.productName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-2.5 py-1 rounded-full text-xs font-bold shadow-lg">
                    {deal.discountPercent}% OFF
                  </div>
                  <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-medium text-foreground">
                    {deal.category}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground text-sm cursor-pointer hover:text-primary transition-colors" onClick={() => product && navigate(`/product/${product.id}`)}>{deal.productName}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Store className="w-3 h-3" /> {deal.storeName}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">₹{deal.finalPrice}</span>
                      <span className="text-xs text-muted-foreground line-through">₹{deal.originalPrice}</span>
                    </div>
                    <button onClick={() => handleAddToCart(deal)} className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[11px] text-success font-medium mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Save ₹{deal.originalPrice - deal.finalPrice}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
