import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Plus, Trash2, Sparkles, IndianRupee, MapPin } from "lucide-react";
import { products } from "@/data/mockData";

interface PlannerItem {
  id: string;
  name: string;
  bestStore: string;
  bestPrice: number;
  originalPrice: number;
  savings: number;
}

export default function PlannerPage() {
  const [items, setItems] = useState<PlannerItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [budget, setBudget] = useState(3000);

  const addItem = () => {
    if (!inputValue.trim()) return;
    const found = products.find((p) => p.name.toLowerCase().includes(inputValue.toLowerCase()));
    if (found) {
      const best = [...found.stores].sort((a, b) => a.finalPrice - b.finalPrice)[0];
      setItems([
        ...items,
        {
          id: Date.now().toString(),
          name: found.name,
          bestStore: best.storeName,
          bestPrice: best.finalPrice,
          originalPrice: best.originalPrice,
          savings: best.originalPrice - best.finalPrice,
        },
      ]);
    } else {
      setItems([
        ...items,
        { id: Date.now().toString(), name: inputValue, bestStore: "Nearby Store", bestPrice: 100, originalPrice: 120, savings: 20 },
      ]);
    }
    setInputValue("");
  };

  const removeItem = (id: string) => setItems(items.filter((i) => i.id !== id));

  const totalCost = items.reduce((s, i) => s + i.bestPrice, 0);
  const totalSavings = items.reduce((s, i) => s + i.savings, 0);
  const uniqueStores = [...new Set(items.map((i) => i.bestStore))];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          <ShoppingCart className="w-8 h-8 inline-block text-primary mr-2" />
          Shopping Planner
        </h1>
        <p className="text-muted-foreground mb-8">Build your list. We find the best deals.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Add Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex gap-3">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addItem()}
                placeholder="Add item (e.g. Oreo Biscuit, Coffee Beans)..."
                className="flex-1 glass rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button onClick={addItem} className="gradient-primary text-primary-foreground px-5 py-3 rounded-xl font-semibold flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>

            {items.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center">
                <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Your shopping list is empty. Add items to get started!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="glass rounded-xl p-4 flex items-center justify-between"
                  >
                    <div>
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> Best at {item.bestStore}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-lg font-bold text-primary">₹{item.bestPrice}</span>
                        <span className="block text-xs text-deal-green">Save ₹{item.savings}</span>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Summary */}
          <div className="space-y-6">
            {/* Budget */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-primary" />
                Budget Planner
              </h3>
              <label className="text-sm text-muted-foreground">Monthly Budget</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full glass rounded-lg px-4 py-2 mt-1 text-foreground outline-none"
              />
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current List</span>
                  <span className="font-semibold text-foreground">₹{totalCost}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Remaining</span>
                  <span className={`font-semibold ${budget - totalCost >= 0 ? "text-deal-green" : "text-destructive"}`}>
                    ₹{budget - totalCost}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div
                    className="gradient-primary h-2 rounded-full transition-all"
                    style={{ width: `${Math.min((totalCost / budget) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Summary */}
            {items.length > 0 && (
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  Smart Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Items</span>
                    <span className="font-semibold text-foreground">{items.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Cost</span>
                    <span className="font-semibold text-foreground">₹{totalCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Savings</span>
                    <span className="font-bold text-deal-green">₹{totalSavings}</span>
                  </div>
                  <hr className="border-border" />
                  <div>
                    <span className="text-sm text-muted-foreground">Recommended Stores:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {uniqueStores.map((s) => (
                        <span key={s} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {s}
                        </span>
                      ))}
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
