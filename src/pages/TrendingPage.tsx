import { motion } from "framer-motion";
import { TrendingUp, Clock, Star } from "lucide-react";
import { trendingDeals } from "@/data/mockData";

export default function TrendingPage() {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            🔥 Trending Deals Today
          </h1>
          <p className="text-muted-foreground">Top discounted products updated in real-time</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingDeals.map((deal, i) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="glass rounded-2xl overflow-hidden group hover:shadow-glow transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.productName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 gradient-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
                  {deal.discountPercent}% OFF
                </div>
                <div className="absolute top-3 left-3 glass px-2 py-1 rounded-lg text-xs font-medium text-foreground">
                  {deal.category}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-foreground">{deal.productName}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 text-deal-yellow fill-deal-yellow" />
                  {deal.storeName}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-primary">₹{deal.finalPrice}</span>
                    <span className="text-sm text-muted-foreground line-through">₹{deal.originalPrice}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    Today
                  </div>
                </div>
                <div className="mt-3 text-xs text-deal-green font-medium flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Save ₹{deal.originalPrice - deal.finalPrice}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
