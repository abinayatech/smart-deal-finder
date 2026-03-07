import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Truck } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function CartPage() {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, totalPrice, totalDelivery, totalSavings, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Start shopping to add items</p>
          <button onClick={() => navigate("/search")} className="gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold">
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-display font-bold text-foreground mb-8 flex items-center gap-3">
          <ShoppingCart className="w-8 h-8 text-primary" /> Shopping Cart ({totalItems})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, i) => (
              <motion.div key={`${item.productId}-${item.store.storeName}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }} className="glass rounded-2xl p-4 flex gap-4">
                <img src={item.productImage} alt={item.productName} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-foreground">{item.productName}</h3>
                  <p className="text-sm text-muted-foreground">{item.store.storeName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg font-bold text-primary">₹{item.store.finalPrice}</span>
                    <span className="text-sm text-muted-foreground line-through">₹{item.store.originalPrice}</span>
                    <span className="text-xs text-deal-green font-semibold">{item.store.discountPercent}% off</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Truck className="w-3 h-3" /> Delivery: ₹{item.store.deliveryCharge}
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeFromCart(item.productId, item.store.storeName)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.productId, item.store.storeName, item.quantity - 1)} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-muted transition-colors">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-semibold text-foreground w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.store.storeName, item.quantity + 1)} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-muted transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="glass rounded-2xl p-6 h-fit sticky top-24">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal ({totalItems} items)</span><span className="text-foreground">₹{totalPrice}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery Charges</span><span className="text-foreground">₹{totalDelivery}</span></div>
              <div className="flex justify-between text-deal-green font-semibold"><span>You Save</span><span>₹{totalSavings}</span></div>
              <hr className="border-border" />
              <div className="flex justify-between text-lg font-bold"><span className="text-foreground">Total</span><span className="text-primary">₹{totalPrice + totalDelivery}</span></div>
            </div>
            <button onClick={() => navigate("/checkout")} className="w-full mt-6 gradient-primary text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-lg hover:opacity-90 transition-opacity">
              Proceed to Checkout <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
