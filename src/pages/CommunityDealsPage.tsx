import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Plus, MapPin, Clock } from "lucide-react";
import { communityDeals as initialDeals, type CommunityDeal } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function CommunityDealsPage() {
  const [deals, setDeals] = useState<CommunityDeal[]>(initialDeals);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ storeName: "", productName: "", discount: "", location: "" });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDeal: CommunityDeal = {
      id: `cd-${Date.now()}`,
      ...form,
      reportedBy: "You",
      timestamp: "Just now",
    };
    setDeals([newDeal, ...deals]);
    setForm({ storeName: "", productName: "", discount: "", location: "" });
    setShowForm(false);
    toast({ title: "Deal reported!", description: "Thanks for sharing with the community." });
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-2">
              <Users className="w-8 h-8 text-primary" /> Community Deals
            </h1>
            <p className="text-muted-foreground mt-1">Deals reported by shoppers near you</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="gradient-primary text-primary-foreground px-5 py-3 rounded-xl font-semibold flex items-center gap-2">
            <Plus className="w-4 h-4" /> Report Deal
          </button>
        </div>

        {showForm && (
          <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} onSubmit={handleSubmit} className="glass rounded-2xl p-6 mb-8 space-y-4">
            <h3 className="font-display font-semibold text-foreground">Report a Deal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: "storeName", label: "Store Name", placeholder: "e.g. Local Grocery" },
                { key: "productName", label: "Product Name", placeholder: "e.g. Oreo Biscuit" },
                { key: "discount", label: "Discount", placeholder: "e.g. 20% off" },
                { key: "location", label: "Location", placeholder: "e.g. Andheri West" },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-sm text-muted-foreground">{f.label}</label>
                  <input
                    type="text"
                    placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    required
                    className="w-full glass rounded-lg px-4 py-2 mt-1 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button type="submit" className="gradient-primary text-primary-foreground px-6 py-2 rounded-xl font-semibold">Submit</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 rounded-xl text-muted-foreground hover:text-foreground">Cancel</button>
            </div>
          </motion.form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {deals.map((deal, i) => (
            <motion.div key={deal.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }} className="glass rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-display font-semibold text-foreground">{deal.productName}</h3>
                  <p className="text-sm text-muted-foreground">{deal.storeName}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">{deal.discount}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{deal.location}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{deal.timestamp}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Reported by {deal.reportedBy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
