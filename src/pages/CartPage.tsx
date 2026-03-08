import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Truck, Store } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useShoppingMode } from "@/contexts/ShoppingModeContext";

export default function CartPage() {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, totalPrice, totalDelivery, totalSavings, totalItems } = useCart();
  const { mode } = useShoppingMode();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-24 md:pb-12 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Start shopping to add items</p>
          <button onClick={() => navigate("/search")} className="gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow-lg">
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
          <ShoppingCart className="w-7 h-7 text-primary" /> Shopping Cart
          <span className="text-sm font-normal text-muted-foreground">({totalItems} items)</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {items.map((item, i) => (
              <motion.div key={`${item.productId}-${item.store.storeName}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }} className="bg-card rounded-2xl p-4 flex gap-4 border border-border/50 shadow-card">
                <img src={item.productImage} alt={item.productName} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm">{item.productName}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Store className="w-3 h-3" /> {item.store.storeName}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-base font-bold text-primary">₹{item.store.finalPrice}</span>
                    <span className="text-xs text-muted-foreground line-through">₹{item.store.originalPrice}</span>
                    <span className="text-[10px] text-success font-semibold">{item.store.discountPercent}% off</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-1">
                    <Truck className="w-3 h-3" /> Delivery: ₹{item.store.deliveryCharge}
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeFromCart(item.productId, item.store.storeName)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.productId, item.store.storeName, item.quantity - 1)} className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-semibold text-foreground w-5 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.store.storeName, item.quantity + 1)} className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-card rounded-2xl p-6 h-fit sticky top-24 border border-border/50 shadow-card">
            <h3 className="text-base font-bold text-foreground mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal ({totalItems} items)</span><span className="text-foreground font-medium">₹{totalPrice}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery Charges</span><span className="text-foreground font-medium">₹{totalDelivery}</span></div>
              <div className="flex justify-between text-success font-semibold"><span>You Save</span><span>-₹{totalSavings}</span></div>
              <hr className="border-border" />
              <div className="flex justify-between text-lg font-bold"><span className="text-foreground">Total</span><span className="text-primary">₹{totalPrice + totalDelivery}</span></div>
            </div>
            <button onClick={() => navigate("/checkout")} className="w-full mt-6 gradient-primary text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg">
              Proceed to Checkout <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-[11px] text-muted-foreground text-center mt-3">
              {mode === "delivery" ? "🚚 Home Delivery Mode" : "🛍 Store Pickup Mode"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
