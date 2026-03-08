import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, Truck, CheckCircle, Clock, Store, ArrowLeft, ShoppingBag } from "lucide-react";
import { useShoppingMode, Order } from "@/contexts/ShoppingModeContext";

const deliverySteps = [
  { key: "placed", label: "Order Placed", icon: ShoppingBag },
  { key: "preparing", label: "Preparing", icon: Package },
  { key: "out_for_delivery", label: "Out for Delivery", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle },
];

const pickupSteps = [
  { key: "placed", label: "Order Placed", icon: ShoppingBag },
  { key: "preparing", label: "Preparing", icon: Package },
  { key: "ready_for_pickup", label: "Ready for Pickup", icon: Store },
  { key: "picked_up", label: "Picked Up", icon: CheckCircle },
];

function getStepIndex(order: Order) {
  const steps = order.mode === "delivery" ? deliverySteps : pickupSteps;
  return steps.findIndex(s => s.key === order.status);
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function OrdersPage() {
  const navigate = useNavigate();
  const { orders } = useShoppingMode();

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <button onClick={() => navigate("/home")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        <h1 className="text-3xl font-display font-bold text-foreground mb-8 flex items-center gap-3">
          <Package className="w-8 h-8 text-primary" /> My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg mb-4">No orders yet</p>
            <button onClick={() => navigate("/search")} className="gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, i) => {
              const steps = order.mode === "delivery" ? deliverySteps : pickupSteps;
              const currentStep = getStepIndex(order);

              return (
                <motion.div key={order.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }} className="glass rounded-2xl p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-semibold text-foreground">Order #{order.id}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${order.mode === "delivery" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>
                          {order.mode === "delivery" ? "🚚 Delivery" : "🛍 Pickup"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{timeAgo(order.placedAt)} • Est. {order.estimatedTime}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-primary">₹{order.total + order.deliveryTotal}</span>
                      <p className="text-xs text-deal-green font-semibold">Saved ₹{order.savings}</p>
                    </div>
                  </div>

                  {/* Progress Steps */}
                  <div className="flex items-center justify-between mb-6 px-2">
                    {steps.map((step, si) => {
                      const done = si <= currentStep;
                      const active = si === currentStep;
                      return (
                        <div key={step.key} className="flex flex-col items-center flex-1 relative">
                          {si > 0 && (
                            <div className={`absolute top-4 right-1/2 w-full h-0.5 -translate-y-1/2 ${si <= currentStep ? "bg-primary" : "bg-border"}`} style={{ left: "-50%" }} />
                          )}
                          <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${active ? "bg-primary text-primary-foreground ring-4 ring-primary/20" : done ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                            <step.icon className="w-4 h-4" />
                          </div>
                          <span className={`text-xs mt-2 text-center ${done ? "text-foreground font-medium" : "text-muted-foreground"}`}>{step.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Delivery Address */}
                  {order.mode === "delivery" && order.deliveryAddress && (
                    <div className="bg-secondary/50 rounded-xl p-3 mb-4">
                      <p className="text-xs text-muted-foreground">Delivering to</p>
                      <p className="text-sm text-foreground font-medium">{order.deliveryAddress}</p>
                    </div>
                  )}

                  {/* Items */}
                  <div className="space-y-2">
                    {order.items.map(item => (
                      <div key={item.productId} className="flex items-center gap-3">
                        <img src={item.productImage} alt={item.productName} className="w-10 h-10 rounded-lg object-cover" />
                        <div className="flex-1">
                          <span className="text-sm text-foreground font-medium">{item.productName}</span>
                          <span className="text-xs text-muted-foreground block">{item.storeName} × {item.quantity}</span>
                        </div>
                        <span className="text-sm font-semibold text-foreground">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
