import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, Banknote, Smartphone, CheckCircle, ArrowLeft } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalPrice, totalDelivery, totalSavings, clearCart } = useCart();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (items.length === 0 && !orderPlaced) {
    navigate("/cart");
    return null;
  }

  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      toast({ title: "Select payment method", description: "Please choose a payment method to continue", variant: "destructive" });
      return;
    }
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center glass rounded-3xl p-12 max-w-md">
          <CheckCircle className="w-20 h-20 text-deal-green mx-auto mb-6" />
          <h2 className="text-3xl font-display font-bold text-foreground mb-2">Order Placed!</h2>
          <p className="text-muted-foreground mb-2">Your order has been confirmed.</p>
          <p className="text-sm text-muted-foreground mb-6">Payment: {paymentMethod}</p>
          <p className="text-deal-green font-semibold mb-8">You saved ₹{totalSavings}!</p>
          <button onClick={() => navigate("/home")} className="gradient-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold text-lg">
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  const methods = [
    { id: "cod", label: "Cash on Delivery", desc: "Pay when your order arrives", icon: Banknote },
    { id: "upi", label: "UPI Payment", desc: "Google Pay, PhonePe, Paytm", icon: Smartphone },
    { id: "card", label: "Credit/Debit Card", desc: "Visa, Mastercard, RuPay", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <button onClick={() => navigate("/cart")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </button>

        <h1 className="text-3xl font-display font-bold text-foreground mb-8">Checkout</h1>

        {/* Order Summary */}
        <div className="glass rounded-2xl p-6 mb-6">
          <h2 className="font-display font-semibold text-foreground mb-4">Order Summary</h2>
          <div className="space-y-2">
            {items.map(item => (
              <div key={`${item.productId}-${item.store.storeName}`} className="flex justify-between text-sm">
                <span className="text-foreground">{item.productName} × {item.quantity} <span className="text-muted-foreground">({item.store.storeName})</span></span>
                <span className="text-foreground">₹{item.store.finalPrice * item.quantity}</span>
              </div>
            ))}
            <hr className="border-border my-2" />
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>₹{totalPrice}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Delivery</span><span>₹{totalDelivery}</span></div>
            <div className="flex justify-between text-sm text-deal-green font-semibold"><span>Savings</span><span>-₹{totalSavings}</span></div>
            <hr className="border-border my-2" />
            <div className="flex justify-between text-xl font-bold"><span className="text-foreground">Total</span><span className="text-primary">₹{totalPrice + totalDelivery}</span></div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="glass rounded-2xl p-6 mb-6">
          <h2 className="font-display font-semibold text-foreground mb-4">Choose Payment Method</h2>
          <div className="space-y-3">
            {methods.map(m => (
              <button
                key={m.id}
                onClick={() => setPaymentMethod(m.label)}
                className={`w-full flex items-center gap-4 p-5 rounded-xl transition-all text-left ${
                  paymentMethod === m.label ? "bg-primary/10 border-2 border-primary" : "bg-secondary/50 border-2 border-transparent hover:border-border"
                }`}
              >
                <m.icon className={`w-8 h-8 ${paymentMethod === m.label ? "text-primary" : "text-muted-foreground"}`} />
                <div>
                  <p className="font-semibold text-foreground text-lg">{m.label}</p>
                  <p className="text-sm text-muted-foreground">{m.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full gradient-primary text-primary-foreground py-4 rounded-xl font-semibold text-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          Place Order — ₹{totalPrice + totalDelivery}
        </button>
      </div>
    </div>
  );
}
