import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, TrendingUp, MapPin, Package, Sparkles, Check } from "lucide-react";
import { notifications } from "@/data/mockData";

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(notifications);

  const markAllRead = () => {
    setNotifs(notifs.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifs.filter(n => !n.read).length;

  const getIcon = (msg: string) => {
    if (msg.includes("deal") || msg.includes("off")) return TrendingUp;
    if (msg.includes("near") || msg.includes("location")) return MapPin;
    if (msg.includes("order") || msg.includes("budget")) return Package;
    return Sparkles;
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Bell className="w-6 h-6 text-primary" /> Notifications
            </h1>
            {unreadCount > 0 && (
              <p className="text-sm text-muted-foreground mt-1">{unreadCount} unread</p>
            )}
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-sm text-primary font-medium flex items-center gap-1">
              <Check className="w-4 h-4" /> Mark all read
            </button>
          )}
        </div>

        <div className="space-y-2">
          {notifs.map((n, i) => {
            const Icon = getIcon(n.message);
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.03 * i }}
                className={`bg-card rounded-xl p-4 flex items-start gap-3 border shadow-card transition-colors ${
                  !n.read ? "border-primary/20 bg-primary/[0.02]" : "border-border/50"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  !n.read ? "bg-primary/10" : "bg-muted"
                }`}>
                  <Icon className={`w-5 h-5 ${!n.read ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${!n.read ? "text-foreground font-medium" : "text-muted-foreground"}`}>{n.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                </div>
                {!n.read && <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
