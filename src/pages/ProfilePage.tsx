import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, CreditCard, Heart, Settings, LogOut, ChevronRight, Shield, Bell } from "lucide-react";
import { useShoppingMode } from "@/contexts/ShoppingModeContext";

export default function ProfilePage() {
  const { deliveryAddress, setDeliveryAddress } = useShoppingMode();
  const [profile, setProfile] = useState({
    name: "Guest User",
    email: "guest@example.com",
    phone: "+91 98765 43210",
    budget: 5000,
  });

  const sections = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Edit Profile", desc: "Name, email, phone" },
        { icon: MapPin, label: "Saved Addresses", desc: deliveryAddress || "Add delivery address" },
        { icon: CreditCard, label: "Payment Methods", desc: "UPI, Cards" },
      ],
    },
    {
      title: "Preferences",
      items: [
        { icon: Heart, label: "Favorite Categories", desc: "Groceries, Electronics" },
        { icon: Shield, label: "Budget Limit", desc: `₹${profile.budget}/month` },
        { icon: Bell, label: "Notifications", desc: "Deal alerts, order updates" },
      ],
    },
    {
      title: "More",
      items: [
        { icon: Settings, label: "App Settings", desc: "Theme, language" },
        { icon: LogOut, label: "Sign Out", desc: "" },
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-6 border border-border/50 shadow-card mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{profile.name}</h1>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
              <p className="text-xs text-muted-foreground">{profile.phone}</p>
            </div>
          </div>
        </motion.div>

        {/* Sections */}
        {sections.map((section, si) => (
          <motion.div key={section.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * si }} className="bg-card rounded-2xl border border-border/50 shadow-card mb-4 overflow-hidden">
            <div className="px-6 py-3 border-b border-border/50">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{section.title}</h2>
            </div>
            {section.items.map((item, i) => (
              <button key={item.label} className="w-full flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-colors text-left border-b border-border/30 last:border-b-0">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  {item.desc && <p className="text-xs text-muted-foreground truncate">{item.desc}</p>}
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
