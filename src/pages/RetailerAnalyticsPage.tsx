import { BarChart3, ArrowUp, TrendingUp } from "lucide-react";

const categoryDemand = [
  { category: "Groceries", searches: 4500, growth: 12 },
  { category: "Electronics", searches: 3200, growth: 25 },
  { category: "Fashion", searches: 2800, growth: 18 },
  { category: "Art & Craft", searches: 1500, growth: 40 },
  { category: "Sports", searches: 1200, growth: 15 },
];

const stats = [
  { label: "Total Views", value: "12,450", growth: 18 },
  { label: "Total Orders", value: "342", growth: 12 },
  { label: "Revenue", value: "₹1.2L", growth: 22 },
  { label: "Conversion", value: "8.2%", growth: 5 },
];

export default function RetailerAnalyticsPage() {
  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2 mb-6">
          <BarChart3 className="w-7 h-7 text-primary" /> Analytics
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {stats.map(s => (
            <div key={s.label} className="bg-card rounded-xl p-4 text-center border border-border/50 shadow-card">
              <div className="text-xl font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
              <div className="text-[10px] text-success flex items-center justify-center gap-0.5 mt-1">
                <ArrowUp className="w-3 h-3" />{s.growth}%
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-5 border border-border/50 shadow-card">
          <h3 className="font-bold text-foreground text-sm mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" /> Category Demand
          </h3>
          <div className="space-y-3">
            {categoryDemand.map(cat => (
              <div key={cat.category}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-foreground">{cat.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{cat.searches.toLocaleString()}</span>
                    <span className="text-[10px] text-success flex items-center gap-0.5"><ArrowUp className="w-3 h-3" />{cat.growth}%</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div className="gradient-primary h-1.5 rounded-full transition-all" style={{ width: `${(cat.searches / 4500) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-accent/5 border border-accent/10">
            <p className="text-xs text-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              <strong>Insight:</strong> Crochet thread searches increased by 40% this week.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
