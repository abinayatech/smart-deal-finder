import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";

export default function RetailerAddProductPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", storeName: "", originalPrice: "", discountPercent: "", offerDuration: "", category: "", description: ""
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setForm({ name: "", storeName: "", originalPrice: "", discountPercent: "", offerDuration: "", category: "", description: "" });
    }, 2000);
  };

  const fields = [
    { key: "name", label: "Product Name", type: "text", placeholder: "e.g. Oreo Biscuit" },
    { key: "storeName", label: "Store Name", type: "text", placeholder: "e.g. My Store" },
    { key: "category", label: "Category", type: "text", placeholder: "e.g. Groceries" },
    { key: "originalPrice", label: "Original Price (₹)", type: "number", placeholder: "40" },
    { key: "discountPercent", label: "Discount %", type: "number", placeholder: "25" },
    { key: "offerDuration", label: "Offer Duration", type: "text", placeholder: "e.g. 7 days" },
  ];

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2 mb-6">
          <Plus className="w-7 h-7 text-primary" /> Add New Product
        </h1>

        {success && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 p-4 rounded-xl bg-success/10 border border-success/20 text-success text-sm font-medium">
            ✓ Product added successfully!
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 border border-border/50 shadow-card space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map(field => (
              <div key={field.key}>
                <label className="text-xs font-medium text-muted-foreground">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.key as keyof typeof form]}
                  onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                  required
                  className="w-full bg-muted/30 rounded-xl px-4 py-3 mt-1 text-foreground placeholder:text-muted-foreground border border-border/50 focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Describe the product..."
              rows={3}
              className="w-full bg-muted/30 rounded-xl px-4 py-3 mt-1 text-foreground placeholder:text-muted-foreground border border-border/50 focus:ring-2 focus:ring-primary/20 outline-none text-sm resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button type="submit" className="gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-lg">
              Add Product <ArrowRight className="w-4 h-4" />
            </button>
            <button type="button" onClick={() => navigate("/retailer/products")} className="px-6 py-3 rounded-xl text-muted-foreground hover:text-foreground text-sm border border-border/50">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
