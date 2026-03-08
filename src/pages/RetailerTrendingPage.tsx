import { Search, ArrowUp } from "lucide-react";

const trendingSearches = [
  { term: "Oreo Biscuit", count: 1240, growth: 15 },
  { term: "Wireless Earbuds", count: 980, growth: 28 },
  { term: "Coffee Beans", count: 856, growth: 12 },
  { term: "Crochet Thread", count: 743, growth: 40 },
  { term: "Running Shoes", count: 621, growth: 8 },
  { term: "Yoga Mat", count: 534, growth: 22 },
  { term: "Laptop Stand", count: 498, growth: 5 },
  { term: "Water Bottle", count: 412, growth: 10 },
  { term: "Backpack", count: 389, growth: 15 },
  { term: "Phone Case", count: 350, growth: 6 },
];

export default function RetailerTrendingPage() {
  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2 mb-6">
          <Search className="w-7 h-7 text-primary" /> Trending Searches
        </h1>

        <div className="bg-card rounded-2xl p-5 border border-border/50 shadow-card">
          <div className="space-y-2">
            {trendingSearches.map((ts, i) => (
              <div key={ts.term} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-muted-foreground w-6 text-center">{i + 1}</span>
                  <span className="font-medium text-foreground">{ts.term}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm text-muted-foreground">{ts.count.toLocaleString()}</span>
                  <span className="text-xs text-success flex items-center gap-0.5 justify-end">
                    <ArrowUp className="w-3 h-3" />{ts.growth}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
