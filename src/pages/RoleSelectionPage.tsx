import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Store, Zap, ArrowRight, TrendingUp, MapPin, Shield } from "lucide-react";

export default function RoleSelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
              <Zap className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary-foreground tracking-tight mb-4">
            Smart<span className="text-accent">Deal</span>
          </h1>
          <p className="text-primary-foreground/60 text-lg max-w-md mx-auto">
            AI-Powered Retail Deal Discovery & Hybrid Shopping Platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => navigate("/login", { state: { role: "customer" } })}
            className="group relative bg-card/10 backdrop-blur-xl border border-primary-foreground/10 rounded-2xl p-8 text-left hover:bg-card/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-glow"
          >
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg">
              <ShoppingBag className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-primary-foreground mb-2">Customer Portal</h2>
            <p className="text-primary-foreground/50 text-sm mb-4">Find deals, compare prices, and save money with AI-powered shopping intelligence</p>
            <div className="flex items-center gap-1 text-sm text-accent font-medium">
              Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => navigate("/login", { state: { role: "retailer" } })}
            className="group relative bg-card/10 backdrop-blur-xl border border-primary-foreground/10 rounded-2xl p-8 text-left hover:bg-card/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-glow"
          >
            <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg">
              <Store className="w-8 h-8 text-accent-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-primary-foreground mb-2">Retailer Portal</h2>
            <p className="text-primary-foreground/50 text-sm mb-4">Manage products, upload discounts, and view demand analytics & trends</p>
            <div className="flex items-center gap-1 text-sm text-accent font-medium">
              Open Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 text-primary-foreground/40 text-sm"
        >
          {[
            { icon: TrendingUp, text: "AI Price Predictions" },
            { icon: MapPin, text: "Deal Map" },
            { icon: Shield, text: "Smart Savings" },
          ].map((f) => (
            <div key={f.text} className="flex items-center gap-2">
              <f.icon className="w-4 h-4" />
              <span>{f.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
