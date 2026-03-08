import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, Banknote, Smartphone, CheckCircle, ArrowLeft, Landmark, Truck, Store } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useShoppingMode } from "@/contexts/ShoppingModeContext";
import { useToast } from "@/hooks/use-toast";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalPrice, totalDelivery, totalSavings, clearCart } = useCart();
  const { mode, addOrder, deliveryAddress } = useShoppingMode();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  if (items.length === 0 && !orderPlaced) {
    navigate("/cart");
    return null;
  }

  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      toast({ title: "Select payment method", description: "Please choose how you'd like to pay", variant: "destructive" });
      return;
    }

    const id = `ORD${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderId(id);

    addOrder({
      id,
      items: items.map(i => ({
        productId: i.productId,
        productName: i.productName,
        productImage: i.productImage,
        storeName: i.store.storeName,
        price: i.store.finalPrice,
        quantity: i.quantity,
      })),
      mode,
      status: "placed",
      total: totalPrice,
      deliveryTotal: totalDelivery,
      savings: totalSavings,
      deliveryAddress: mode === "delivery" ? deliveryAddress : undefined,
      placedAt: new Date().toISOString(),
      estimatedTime: mode === "delivery" ? "30-45 mins" : "Ready in 20 mins",
    });

    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen pt-20 pb-24 md:pb-12 flex items-center justify-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center bg-card rounded-2xl p-12 max-w-md border border-border/50 shadow-card">
          <CheckCircle className="w-20 h-20 text-success mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-foreground mb-2">Order Placed!</h2>
          <p className="text-muted-foreground mb-1">Order ID: <span className="font-bold text-foreground">{orderId}</span></p>
          <p className="text-sm text-muted-foreground mb-2">Payment: {paymentMethod}</p>
          <p className="text-sm text-muted-foreground mb-4">
            {mode === "delivery" ? "🚚 Delivering to your address" : "🛍 Ready for pickup"}
          </p>
          <p className="text-success font-semibold mb-8">You saved ₹{totalSavings}!</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => navigate("/orders")} className="gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow-lg">
              Track Order
            </button>
            <button onClick={() => navigate("/home")} className="bg-muted text-foreground px-6 py-3 rounded-xl font-medium">
              Continue Shopping
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const methods = [
    { id: "upi", label: "UPI Payment", desc: "Google Pay, PhonePe, Paytm", icon: Smartphone },
    { id: "card", label: "Credit/Debit Card", desc: "Visa, Mastercard, RuPay", icon: CreditCard },
    { id: "netbanking", label: "Net Banking", desc: "All major banks", icon: Landmark },
    { id: "cod", label: "Cash on Delivery", desc: "Pay when your order arrives", icon: Banknote },
  ];

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <button onClick={() => navigate("/cart")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </button>

        <h1 className="text-2xl font-bold text-foreground mb-6">Checkout</h1>

        {/* Mode indicator */}
        <div className="bg-card rounded-xl p-4 mb-4 border border-border/50 shadow-card flex items-center gap-3">
          {mode === "delivery" ? <Truck className="w-5 h-5 text-primary" /> : <Store className="w-5 h-5 text-accent" />}
          <div>
            <p className="text-sm font-medium text-foreground">{mode === "delivery" ? "Home Delivery" : "Store Pickup"}</p>
            {mode === "delivery" && <p className="text-xs text-muted-foreground">{deliveryAddress}</p>}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-card rounded-2xl p-6 mb-4 border border-border/50 shadow-card">
          <h2 className="font-bold text-foreground text-sm mb-4">Order Summary</h2>
          <div className="space-y-2">
            {items.map(item => (
              <div key={`${item.productId}-${item.store.storeName}`} className="flex justify-between text-sm">
                <span className="text-foreground">{item.productName} × {item.quantity} <span className="text-muted-foreground">({item.store.storeName})</span></span>
                <span className="text-foreground font-medium">₹{item.store.finalPrice * item.quantity}</span>
              </div>
            ))}
            <hr className="border-border my-2" />
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">₹{totalPrice}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Delivery</span><span className="text-foreground">₹{totalDelivery}</span></div>
            <div className="flex justify-between text-sm text-success font-semibold"><span>Savings</span><span>-₹{totalSavings}</span></div>
            <hr className="border-border my-2" />
            <div className="flex justify-between text-xl font-bold"><span className="text-foreground">Total</span><span className="text-primary">₹{totalPrice + totalDelivery}</span></div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-card rounded-2xl p-6 mb-6 border border-border/50 shadow-card">
          <h2 className="font-bold text-foreground text-sm mb-4">Payment Method</h2>
          <div className="space-y-2">
            {methods.map(m => (
              <button
                key={m.id}
                onClick={() => setPaymentMethod(m.label)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left border-2 ${
                  paymentMethod === m.label ? "border-primary bg-primary/5" : "border-transparent bg-muted/30 hover:bg-muted/50"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === m.label ? "bg-primary/10" : "bg-muted"}`}>
                  <m.icon className={`w-5 h-5 ${paymentMethod === m.label ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{m.label}</p>
                  <p className="text-xs text-muted-foreground">{m.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full gradient-primary text-primary-foreground py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg"
        >
          Place Order — ₹{totalPrice + totalDelivery}
        </button>
      </div>
    </div>
  );
}
