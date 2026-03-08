import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Plus, MapPin, Clock, Award, Star } from "lucide-react";
import { communityDeals as initialDeals, type CommunityDeal } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const badges = [
  { icon: "🏆", name: "Deal Hunter", desc: "Report 5+ deals" },
  { icon: "💰", name: "Savings Master", desc: "Save ₹500+" },
  { icon: "🌟", name: "Community Star", desc: "10+ verified deals" },
];

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
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Users className="w-7 h-7 text-primary" /> Community Deals
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Deals reported by shoppers near you</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="gradient-primary text-primary-foreground px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 shadow-lg">
            <Plus className="w-4 h-4" /> Report Deal
          </button>
        </div>

        {/* Badges */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {badges.map((b) => (
            <div key={b.name} className="bg-card rounded-xl p-3 text-center border border-border/50 shadow-card">
              <span className="text-2xl">{b.icon}</span>
              <p className="text-xs font-semibold text-foreground mt-1">{b.name}</p>
              <p className="text-[10px] text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>

        {showForm && (
          <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 mb-6 space-y-4 border border-border/50 shadow-card">
            <h3 className="font-bold text-foreground text-sm">Report a Deal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { key: "storeName", label: "Store Name", placeholder: "e.g. Local Grocery" },
                { key: "productName", label: "Product Name", placeholder: "e.g. Oreo Biscuit" },
                { key: "discount", label: "Discount", placeholder: "e.g. 20% off" },
                { key: "location", label: "Location", placeholder: "e.g. Andheri West" },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-xs text-muted-foreground">{f.label}</label>
                  <input type="text" placeholder={f.placeholder} value={form[f.key as keyof typeof form]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} required className="w-full bg-muted/30 rounded-lg px-4 py-2 mt-1 text-foreground placeholder:text-muted-foreground outline-none border border-border/50 focus:ring-2 focus:ring-primary/20 text-sm" />
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button type="submit" className="gradient-primary text-primary-foreground px-5 py-2 rounded-xl font-medium text-sm shadow-lg">Submit</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2 rounded-xl text-muted-foreground hover:text-foreground text-sm">Cancel</button>
            </div>
          </motion.form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {deals.map((deal, i) => (
            <motion.div key={deal.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 * i }} className="bg-card rounded-xl p-4 border border-border/50 shadow-card hover:shadow-card-hover transition-all">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{deal.productName}</h3>
                  <p className="text-xs text-muted-foreground">{deal.storeName}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-bold">{deal.discount}</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{deal.location}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{deal.timestamp}</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">Reported by {deal.reportedBy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
