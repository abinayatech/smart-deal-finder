import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList, Plus, Trash2, Sparkles, IndianRupee, MapPin, Route, Clock, ShoppingCart, Truck, Store } from "lucide-react";
import { products } from "@/data/mockData";
import { useShoppingMode } from "@/contexts/ShoppingModeContext";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface PlannerItem {
  id: string;
  name: string;
  bestStore: string;
  bestPrice: number;
  originalPrice: number;
  savings: number;
  distance: string;
  deliveryCharge: number;
  productId: string;
  image: string;
}

export default function PlannerPage() {
  const [items, setItems] = useState<PlannerItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [budget, setBudget] = useState(3000);
  const { mode } = useShoppingMode();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const addItem = () => {
    if (!inputValue.trim()) return;
    const found = products.find((p) => p.name.toLowerCase().includes(inputValue.toLowerCase()));
    if (found) {
      const best = [...found.stores.filter(s => s.available)].sort((a, b) => a.finalPrice - b.finalPrice)[0];
      if (best) {
        setItems([...items, {
          id: Date.now().toString(), name: found.name, bestStore: best.storeName,
          bestPrice: best.finalPrice, originalPrice: best.originalPrice, savings: best.originalPrice - best.finalPrice,
          distance: best.distance, deliveryCharge: best.deliveryCharge, productId: found.id, image: found.image
        }]);
      }
    } else {
      setItems([...items, {
        id: Date.now().toString(), name: inputValue, bestStore: "Nearby Store",
        bestPrice: 100, originalPrice: 120, savings: 20, distance: "2.0 km",
        deliveryCharge: 30, productId: "", image: ""
      }]);
    }
    setInputValue("");
  };

  const removeItem = (id: string) => setItems(items.filter((i) => i.id !== id));

  const addAllToCart = () => {
    items.forEach(item => {
      const p = products.find(pr => pr.id === item.productId);
      if (p) {
        const store = p.stores.find(s => s.storeName === item.bestStore);
        if (store) addToCart({ productId: p.id, productName: p.name, productImage: p.image, store });
      }
    });
    toast({ title: "All items added to cart!", description: `${items.length} items added` });
  };

  const totalCost = items.reduce((s, i) => s + i.bestPrice, 0);
  const totalSavings = items.reduce((s, i) => s + i.savings, 0);
  const totalDelivery = items.reduce((s, i) => s + i.deliveryCharge, 0);
  const uniqueStores = [...new Set(items.map((i) => i.bestStore))];

  const optimizedRoute = uniqueStores.map(store => {
    const storeItems = items.filter(i => i.bestStore === store);
    return { store, items: storeItems, distance: storeItems[0]?.distance || "0 km" };
  }).sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

  const totalDistance = optimizedRoute.reduce((s, r) => s + parseFloat(r.distance), 0);
  const estimatedTime = Math.round(totalDistance * 5 + uniqueStores.length * 10);

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
          <ClipboardList className="w-7 h-7 text-primary" /> Shopping Planner
        </h1>
        <p className="text-sm text-muted-foreground mb-6">Build your list — we find the best deals and optimize your route.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex gap-2">
              <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addItem()} placeholder="Add item (e.g. Oreo Biscuit)..." className="flex-1 bg-card rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none border border-border/50 shadow-card focus:ring-2 focus:ring-primary/20" />
              <button onClick={addItem} className="gradient-primary text-primary-foreground px-5 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg">
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>

            {items.length === 0 ? (
              <div className="bg-card rounded-2xl p-12 text-center border border-border/50 shadow-card">
                <ClipboardList className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Your shopping list is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  {items.map((item, i) => (
                    <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }} className="bg-card rounded-xl p-4 flex items-center gap-3 border border-border/50 shadow-card">
                      {item.image && <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-sm">{item.name}</h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.bestStore} ({item.distance})</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-primary">₹{item.bestPrice}</span>
                        <span className="block text-[10px] text-success">Save ₹{item.savings}</span>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </motion.div>
                  ))}
                </div>

                {/* Add all to cart */}
                <button onClick={addAllToCart} className="w-full gradient-primary text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg">
                  <ShoppingCart className="w-5 h-5" /> Add All to Cart
                </button>
              </>
            )}

            {/* Route */}
            {items.length > 0 && mode === "pickup" && optimizedRoute.length > 0 && (
              <div className="bg-card rounded-2xl p-5 border border-border/50 shadow-card">
                <h3 className="font-bold text-foreground text-sm mb-4 flex items-center gap-2">
                  <Route className="w-5 h-5 text-primary" /> Optimized Shopping Route
                </h3>
                <div className="space-y-3">
                  {optimizedRoute.map((stop, i) => (
                    <div key={stop.store} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">{i + 1}</div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm">{stop.store}</p>
                        <p className="text-[11px] text-muted-foreground">{stop.items.map(it => it.name).join(", ")} • {stop.distance}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-border flex flex-wrap gap-4 text-xs">
                  <span className="flex items-center gap-1 text-muted-foreground"><Route className="w-3 h-3" /> {totalDistance.toFixed(1)} km</span>
                  <span className="flex items-center gap-1 text-muted-foreground"><Clock className="w-3 h-3" /> ~{estimatedTime} min</span>
                  <span className="flex items-center gap-1 text-success font-semibold">Save ₹{totalSavings}</span>
                </div>
              </div>
            )}

            {/* Delivery Plan */}
            {items.length > 0 && mode === "delivery" && (
              <div className="bg-card rounded-2xl p-5 border border-border/50 shadow-card">
                <h3 className="font-bold text-foreground text-sm mb-3 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" /> Delivery Plan
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Items Total</span><span className="font-medium text-foreground">₹{totalCost}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Delivery Charges</span><span className="font-medium text-foreground">₹{totalDelivery}</span></div>
                  <div className="flex justify-between text-success font-semibold"><span>You Save</span><span>₹{totalSavings}</span></div>
                  <hr className="border-border" />
                  <div className="flex justify-between text-base font-bold"><span className="text-foreground">Total</span><span className="text-primary">₹{totalCost + totalDelivery}</span></div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-card rounded-2xl p-5 border border-border/50 shadow-card">
              <h3 className="font-bold text-foreground text-sm mb-4 flex items-center gap-2"><IndianRupee className="w-5 h-5 text-primary" /> Budget Planner</h3>
              <label className="text-xs text-muted-foreground">Monthly Budget</label>
              <input type="number" value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="w-full bg-muted/30 rounded-lg px-4 py-2 mt-1 text-foreground outline-none border border-border/50 focus:ring-2 focus:ring-primary/20" />
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Current List</span><span className="font-medium text-foreground">₹{totalCost}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Remaining</span><span className={`font-medium ${budget - totalCost >= 0 ? "text-success" : "text-destructive"}`}>₹{budget - totalCost}</span></div>
                <div className="w-full bg-muted rounded-full h-2 mt-2"><div className="gradient-primary h-2 rounded-full transition-all" style={{ width: `${Math.min((totalCost / budget) * 100, 100)}%` }} /></div>
              </div>
            </div>

            {items.length > 0 && (
              <div className="bg-card rounded-2xl p-5 border border-border/50 shadow-card">
                <h3 className="font-bold text-foreground text-sm mb-4 flex items-center gap-2"><Sparkles className="w-5 h-5 text-accent" /> Smart Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Total Items</span><span className="font-medium text-foreground">{items.length}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Total Cost</span><span className="font-medium text-foreground">₹{totalCost}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Total Savings</span><span className="font-bold text-success">₹{totalSavings}</span></div>
                  <hr className="border-border" />
                  <div>
                    <span className="text-xs text-muted-foreground">Stores:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {uniqueStores.map((s) => (<span key={s} className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-medium">{s}</span>))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
