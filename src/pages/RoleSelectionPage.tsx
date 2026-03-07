import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Store, Zap } from "lucide-react";

export default function RoleSelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary-foreground"
            style={{
              width: Math.random() * 6 + 2 + "px",
              height: Math.random() * 6 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative text-center px-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <Zap className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground">
              SMART<span className="text-deal-yellow">DEAL</span>
            </h1>
          </div>
          <p className="text-primary-foreground/70 text-lg mb-12">Smart Retail Discount Intelligence Platform</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => navigate("/home")}
            className="glass rounded-3xl p-10 text-center group hover:shadow-glow transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-10 h-10 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">Customer Portal</h2>
            <p className="text-muted-foreground">Find deals, compare prices, and save money on your shopping</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => navigate("/retailer")}
            className="glass rounded-3xl p-10 text-center group hover:shadow-glow transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="w-20 h-20 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Store className="w-10 h-10 text-accent-foreground" />
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">Retailer Portal</h2>
            <p className="text-muted-foreground">Manage products, upload discounts, and view demand trends</p>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
