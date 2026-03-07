export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  stores: StoreOffer[];
  aiPrediction?: string;
}

export interface StoreOffer {
  storeName: string;
  originalPrice: number;
  discountPercent: number;
  finalPrice: number;
  distance: string;
  rating: number;
  lat: number;
  lng: number;
  deliveryCharge: number;
  available: boolean;
}

export interface TrendingDeal {
  id: string;
  productName: string;
  storeName: string;
  discountPercent: number;
  originalPrice: number;
  finalPrice: number;
  category: string;
  image: string;
}

export interface Category {
  name: string;
  icon: string;
  count: number;
}

export interface CommunityDeal {
  id: string;
  storeName: string;
  productName: string;
  discount: string;
  location: string;
  reportedBy: string;
  timestamp: string;
}

export const categories: Category[] = [
  { name: "Groceries", icon: "🛒", count: 0 },
  { name: "Electronics", icon: "💻", count: 0 },
  { name: "Fashion", icon: "👗", count: 0 },
  { name: "Home & Kitchen", icon: "🏠", count: 0 },
  { name: "Beauty", icon: "💄", count: 0 },
  { name: "Sports", icon: "⚽", count: 0 },
  { name: "Books", icon: "📚", count: 0 },
  { name: "Toys", icon: "🧸", count: 0 },
  { name: "Art & Craft", icon: "🎨", count: 0 },
  { name: "Pet Supplies", icon: "🐾", count: 0 },
];

const storeTemplates = {
  dmart: { name: "DMart", lat: 19.076, lng: 72.877, rating: 4.5, deliveryCharge: 30 },
  reliance: { name: "Reliance Smart", lat: 19.082, lng: 72.885, rating: 4.2, deliveryCharge: 35 },
  spencers: { name: "Spencer's", lat: 19.088, lng: 72.870, rating: 4.3, deliveryCharge: 40 },
  bigbazaar: { name: "Big Bazaar", lat: 19.090, lng: 72.890, rating: 4.3, deliveryCharge: 25 },
  localGrocery: { name: "Local Grocery Store", lat: 19.074, lng: 72.873, rating: 4.0, deliveryCharge: 20 },
  naturesBasket: { name: "Nature's Basket", lat: 19.085, lng: 72.895, rating: 4.6, deliveryCharge: 45 },
  croma: { name: "Croma", lat: 19.100, lng: 72.880, rating: 4.4, deliveryCharge: 50 },
  relianceDigital: { name: "Reliance Digital", lat: 19.088, lng: 72.882, rating: 4.3, deliveryCharge: 0 },
  electroWorld: { name: "ElectroWorld", lat: 19.095, lng: 72.875, rating: 4.1, deliveryCharge: 60 },
  craftCorner: { name: "Craft Corner", lat: 19.080, lng: 72.875, rating: 4.1, deliveryCharge: 30 },
  hobbyLand: { name: "HobbyLand", lat: 19.078, lng: 72.868, rating: 4.0, deliveryCharge: 25 },
  fashionHub: { name: "Fashion Hub", lat: 19.083, lng: 72.878, rating: 4.2, deliveryCharge: 40 },
  trendyStore: { name: "Trendy Store", lat: 19.079, lng: 72.892, rating: 4.4, deliveryCharge: 35 },
  bookworm: { name: "Bookworm Store", lat: 19.081, lng: 72.884, rating: 4.7, deliveryCharge: 20 },
  crossword: { name: "Crossword", lat: 19.092, lng: 72.886, rating: 4.5, deliveryCharge: 30 },
  decathlon: { name: "Decathlon", lat: 19.097, lng: 72.878, rating: 4.6, deliveryCharge: 0 },
  sportsZone: { name: "Sports Zone", lat: 19.084, lng: 72.890, rating: 4.2, deliveryCharge: 45 },
  toyWorld: { name: "Toy World", lat: 19.086, lng: 72.872, rating: 4.3, deliveryCharge: 35 },
  petShop: { name: "Pet Paradise", lat: 19.077, lng: 72.888, rating: 4.4, deliveryCharge: 30 },
  petZone: { name: "Pet Zone", lat: 19.093, lng: 72.882, rating: 4.1, deliveryCharge: 40 },
  beautyBarn: { name: "Beauty Barn", lat: 19.081, lng: 72.879, rating: 4.5, deliveryCharge: 30 },
  nykaa: { name: "Nykaa Store", lat: 19.089, lng: 72.876, rating: 4.6, deliveryCharge: 0 },
};

function makeStore(template: typeof storeTemplates.dmart, origPrice: number, discPct: number, dist: string): StoreOffer {
  return {
    storeName: template.name,
    originalPrice: origPrice,
    discountPercent: discPct,
    finalPrice: Math.round(origPrice * (1 - discPct / 100)),
    distance: dist,
    rating: template.rating,
    lat: template.lat,
    lng: template.lng,
    deliveryCharge: template.deliveryCharge,
    available: true,
  };
}

const s = storeTemplates;

export const products: Product[] = [
  // ===== GROCERIES =====
  { id: "g1", name: "Oreo Biscuit", category: "Groceries", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop", aiPrediction: "Oreo prices drop 10-15% on weekends. Best time to buy is Saturday.", stores: [makeStore(s.dmart, 40, 25, "1.2 km"), makeStore(s.reliance, 40, 20, "2.1 km"), makeStore(s.localGrocery, 40, 10, "0.5 km"), makeStore(s.bigbazaar, 40, 22, "3.0 km")] },
  { id: "g2", name: "Dairy Milk Silk", category: "Groceries", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=300&h=300&fit=crop", aiPrediction: "Chocolate prices tend to increase before festivals. Buy now to save.", stores: [makeStore(s.bigbazaar, 80, 25, "3.0 km"), makeStore(s.dmart, 80, 20, "1.2 km"), makeStore(s.spencers, 80, 15, "2.5 km")] },
  { id: "g3", name: "Coffee Beans Premium", category: "Groceries", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop", aiPrediction: "Coffee beans get 20-25% discounts during monsoon season.", stores: [makeStore(s.naturesBasket, 450, 20, "2.8 km"), makeStore(s.dmart, 450, 15, "1.2 km"), makeStore(s.reliance, 450, 12, "2.1 km")] },
  { id: "g4", name: "Maggi Noodles", category: "Groceries", image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=300&h=300&fit=crop", aiPrediction: "Maggi prices are stable. Look for combo pack deals.", stores: [makeStore(s.dmart, 14, 15, "1.2 km"), makeStore(s.reliance, 14, 10, "2.1 km"), makeStore(s.localGrocery, 14, 5, "0.5 km"), makeStore(s.bigbazaar, 14, 20, "3.0 km")] },
  { id: "g5", name: "Tea Powder (Tata)", category: "Groceries", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=300&fit=crop", aiPrediction: "Tea prices rise in winter. Stock up during summer sales.", stores: [makeStore(s.dmart, 250, 18, "1.2 km"), makeStore(s.reliance, 250, 15, "2.1 km"), makeStore(s.bigbazaar, 250, 20, "3.0 km")] },
  { id: "g6", name: "Basmati Rice 5kg", category: "Groceries", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop", aiPrediction: "Rice prices are seasonal. Best deals during harvest season (Oct-Nov).", stores: [makeStore(s.dmart, 450, 15, "1.2 km"), makeStore(s.bigbazaar, 450, 20, "3.0 km"), makeStore(s.reliance, 450, 12, "2.1 km")] },
  { id: "g7", name: "Cooking Oil 1L", category: "Groceries", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop", aiPrediction: "Oil prices fluctuate monthly. Current prices are at a low.", stores: [makeStore(s.dmart, 180, 12, "1.2 km"), makeStore(s.localGrocery, 180, 8, "0.5 km"), makeStore(s.bigbazaar, 180, 15, "3.0 km")] },
  { id: "g8", name: "Bread (Whole Wheat)", category: "Groceries", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop", aiPrediction: "Bread prices remain stable year-round.", stores: [makeStore(s.localGrocery, 45, 10, "0.5 km"), makeStore(s.dmart, 45, 15, "1.2 km"), makeStore(s.reliance, 45, 8, "2.1 km")] },
  { id: "g9", name: "Amul Butter 500g", category: "Groceries", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&h=300&fit=crop", aiPrediction: "Dairy prices stable. Combo deals available on weekends.", stores: [makeStore(s.dmart, 270, 10, "1.2 km"), makeStore(s.reliance, 270, 12, "2.1 km"), makeStore(s.bigbazaar, 270, 15, "3.0 km")] },
  { id: "g10", name: "Milk (Amul Taaza 1L)", category: "Groceries", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop", aiPrediction: "Milk prices are regulated. Minimal discounts expected.", stores: [makeStore(s.localGrocery, 54, 5, "0.5 km"), makeStore(s.dmart, 54, 8, "1.2 km")] },
  { id: "g11", name: "Sugar 1kg", category: "Groceries", image: "https://images.unsplash.com/photo-1550411294-875e67b1193d?w=300&h=300&fit=crop", stores: [makeStore(s.dmart, 45, 12, "1.2 km"), makeStore(s.localGrocery, 45, 8, "0.5 km"), makeStore(s.bigbazaar, 45, 15, "3.0 km")] },
  { id: "g12", name: "Atta (Wheat Flour 5kg)", category: "Groceries", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=300&fit=crop", stores: [makeStore(s.dmart, 280, 18, "1.2 km"), makeStore(s.reliance, 280, 15, "2.1 km"), makeStore(s.bigbazaar, 280, 20, "3.0 km")] },
  { id: "g13", name: "Tomato Ketchup (Kissan)", category: "Groceries", image: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=300&h=300&fit=crop", stores: [makeStore(s.dmart, 110, 15, "1.2 km"), makeStore(s.localGrocery, 110, 10, "0.5 km")] },
  { id: "g14", name: "Lays Chips", category: "Groceries", image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop", stores: [makeStore(s.localGrocery, 20, 10, "0.5 km"), makeStore(s.dmart, 20, 15, "1.2 km"), makeStore(s.reliance, 20, 12, "2.1 km")] },
  { id: "g15", name: "Parle-G Biscuit", category: "Groceries", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop", stores: [makeStore(s.localGrocery, 10, 5, "0.5 km"), makeStore(s.dmart, 10, 10, "1.2 km"), makeStore(s.bigbazaar, 10, 12, "3.0 km")] },
  { id: "g16", name: "Coca Cola 2L", category: "Groceries", image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=300&h=300&fit=crop", stores: [makeStore(s.dmart, 95, 15, "1.2 km"), makeStore(s.reliance, 95, 10, "2.1 km")] },
  { id: "g17", name: "Nescafe Coffee 200g", category: "Groceries", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop", stores: [makeStore(s.dmart, 420, 12, "1.2 km"), makeStore(s.reliance, 420, 15, "2.1 km"), makeStore(s.naturesBasket, 420, 18, "2.8 km")] },
  { id: "g18", name: "Peanut Butter 1kg", category: "Groceries", image: "https://images.unsplash.com/photo-1612187309357-f2a79314be26?w=300&h=300&fit=crop", stores: [makeStore(s.naturesBasket, 350, 20, "2.8 km"), makeStore(s.reliance, 350, 15, "2.1 km")] },
  { id: "g19", name: "Honey (Dabur) 500g", category: "Groceries", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&h=300&fit=crop", stores: [makeStore(s.dmart, 280, 15, "1.2 km"), makeStore(s.naturesBasket, 280, 20, "2.8 km")] },
  { id: "g20", name: "Oats (Quaker) 1kg", category: "Groceries", image: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=300&h=300&fit=crop", stores: [makeStore(s.dmart, 190, 18, "1.2 km"), makeStore(s.reliance, 190, 12, "2.1 km"), makeStore(s.bigbazaar, 190, 20, "3.0 km")] },

  // ===== ELECTRONICS =====
  { id: "e1", name: "Wireless Earbuds Pro", category: "Electronics", image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=300&h=300&fit=crop", aiPrediction: "Earbuds get major discounts during sale seasons (Diwali, Republic Day).", stores: [makeStore(s.croma, 2999, 30, "5.0 km"), makeStore(s.relianceDigital, 2999, 25, "3.5 km"), makeStore(s.electroWorld, 2999, 20, "4.2 km")] },
  { id: "e2", name: "Laptop Stand Adjustable", category: "Electronics", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop", aiPrediction: "Laptop accessories see price drops in back-to-school season.", stores: [makeStore(s.croma, 1500, 20, "5.0 km"), makeStore(s.relianceDigital, 1500, 35, "3.5 km")] },
  { id: "e3", name: "Smartphone (Budget)", category: "Electronics", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop", aiPrediction: "New models launch quarterly — older models get 15-25% discounts.", stores: [makeStore(s.croma, 12999, 15, "5.0 km"), makeStore(s.relianceDigital, 12999, 18, "3.5 km"), makeStore(s.electroWorld, 12999, 12, "4.2 km")] },
  { id: "e4", name: "Bluetooth Speaker", category: "Electronics", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop", stores: [makeStore(s.croma, 1999, 25, "5.0 km"), makeStore(s.relianceDigital, 1999, 20, "3.5 km")] },
  { id: "e5", name: "Smart Watch", category: "Electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop", aiPrediction: "Smartwatches see maximum discounts during end-of-year sales.", stores: [makeStore(s.croma, 3499, 22, "5.0 km"), makeStore(s.relianceDigital, 3499, 18, "3.5 km"), makeStore(s.electroWorld, 3499, 25, "4.2 km")] },
  { id: "e6", name: "Headphones Over-Ear", category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", stores: [makeStore(s.croma, 2499, 20, "5.0 km"), makeStore(s.relianceDigital, 2499, 15, "3.5 km")] },
  { id: "e7", name: "Mechanical Keyboard", category: "Electronics", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop", stores: [makeStore(s.croma, 3999, 18, "5.0 km"), makeStore(s.electroWorld, 3999, 22, "4.2 km")] },
  { id: "e8", name: "Gaming Mouse", category: "Electronics", image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop", stores: [makeStore(s.croma, 1299, 15, "5.0 km"), makeStore(s.electroWorld, 1299, 20, "4.2 km"), makeStore(s.relianceDigital, 1299, 12, "3.5 km")] },
  { id: "e9", name: "Monitor 24 inch", category: "Electronics", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=300&fit=crop", stores: [makeStore(s.croma, 12999, 15, "5.0 km"), makeStore(s.relianceDigital, 12999, 20, "3.5 km")] },
  { id: "e10", name: "USB-C Hub", category: "Electronics", image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=300&h=300&fit=crop", stores: [makeStore(s.croma, 1599, 18, "5.0 km"), makeStore(s.electroWorld, 1599, 22, "4.2 km")] },
  { id: "e11", name: "Power Bank 20000mAh", category: "Electronics", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop", stores: [makeStore(s.croma, 1499, 20, "5.0 km"), makeStore(s.relianceDigital, 1499, 15, "3.5 km"), makeStore(s.electroWorld, 1499, 25, "4.2 km")] },
  { id: "e12", name: "Webcam HD 1080p", category: "Electronics", image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=300&h=300&fit=crop", stores: [makeStore(s.croma, 2999, 18, "5.0 km"), makeStore(s.relianceDigital, 2999, 22, "3.5 km")] },
  { id: "e13", name: "Tablet 10 inch", category: "Electronics", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop", stores: [makeStore(s.croma, 15999, 12, "5.0 km"), makeStore(s.relianceDigital, 15999, 15, "3.5 km")] },
  { id: "e14", name: "Wireless Charger", category: "Electronics", image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=300&h=300&fit=crop", stores: [makeStore(s.croma, 999, 25, "5.0 km"), makeStore(s.electroWorld, 999, 20, "4.2 km")] },
  { id: "e15", name: "Smart Plug WiFi", category: "Electronics", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=300&fit=crop", stores: [makeStore(s.croma, 799, 15, "5.0 km"), makeStore(s.relianceDigital, 799, 20, "3.5 km")] },
  { id: "e16", name: "LED Desk Lamp", category: "Electronics", image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=300&h=300&fit=crop", stores: [makeStore(s.croma, 1299, 22, "5.0 km"), makeStore(s.electroWorld, 1299, 18, "4.2 km")] },
  { id: "e17", name: "External SSD 500GB", category: "Electronics", image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&h=300&fit=crop", stores: [makeStore(s.croma, 4999, 15, "5.0 km"), makeStore(s.relianceDigital, 4999, 20, "3.5 km")] },
  { id: "e18", name: "Laptop Bag", category: "Electronics", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop", stores: [makeStore(s.croma, 1299, 25, "5.0 km"), makeStore(s.electroWorld, 1299, 20, "4.2 km")] },
  { id: "e19", name: "HDMI Cable 2m", category: "Electronics", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=300&fit=crop", stores: [makeStore(s.croma, 399, 15, "5.0 km"), makeStore(s.relianceDigital, 399, 10, "3.5 km")] },
  { id: "e20", name: "Pen Drive 64GB", category: "Electronics", image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&h=300&fit=crop", stores: [makeStore(s.croma, 499, 20, "5.0 km"), makeStore(s.electroWorld, 499, 15, "4.2 km")] },

  // ===== FASHION =====
  { id: "f1", name: "Cotton T-Shirt", category: "Fashion", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop", stores: [makeStore(s.fashionHub, 599, 30, "2.5 km"), makeStore(s.trendyStore, 599, 25, "3.0 km")] },
  { id: "f2", name: "Denim Jeans", category: "Fashion", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop", stores: [makeStore(s.fashionHub, 1499, 25, "2.5 km"), makeStore(s.trendyStore, 1499, 20, "3.0 km")] },
  { id: "f3", name: "Running Shoes", category: "Fashion", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop", aiPrediction: "Sports shoes get 30-40% off during clearance sales.", stores: [makeStore(s.decathlon, 3500, 40, "4.0 km"), makeStore(s.fashionHub, 3500, 25, "2.5 km")] },
  { id: "f4", name: "Formal Shirt", category: "Fashion", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=300&fit=crop", stores: [makeStore(s.fashionHub, 1299, 20, "2.5 km"), makeStore(s.trendyStore, 1299, 25, "3.0 km")] },
  { id: "f5", name: "Summer Dress", category: "Fashion", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=300&fit=crop", stores: [makeStore(s.fashionHub, 1799, 35, "2.5 km"), makeStore(s.trendyStore, 1799, 30, "3.0 km")] },
  { id: "f6", name: "Leather Belt", category: "Fashion", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop", stores: [makeStore(s.fashionHub, 699, 20, "2.5 km"), makeStore(s.trendyStore, 699, 15, "3.0 km")] },
  { id: "f7", name: "Sunglasses", category: "Fashion", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop", stores: [makeStore(s.fashionHub, 999, 25, "2.5 km"), makeStore(s.trendyStore, 999, 30, "3.0 km")] },
  { id: "f8", name: "Backpack", category: "Fashion", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop", stores: [makeStore(s.fashionHub, 1499, 22, "2.5 km"), makeStore(s.trendyStore, 1499, 18, "3.0 km")] },
  { id: "f9", name: "Wrist Watch", category: "Fashion", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop", stores: [makeStore(s.fashionHub, 2999, 20, "2.5 km"), makeStore(s.trendyStore, 2999, 25, "3.0 km")] },
  { id: "f10", name: "Sneakers", category: "Fashion", image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=300&h=300&fit=crop", stores: [makeStore(s.decathlon, 2499, 30, "4.0 km"), makeStore(s.fashionHub, 2499, 20, "2.5 km")] },
  { id: "f11", name: "Hoodie", category: "Fashion", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop", stores: [makeStore(s.fashionHub, 1299, 25, "2.5 km"), makeStore(s.trendyStore, 1299, 20, "3.0 km")] },
  { id: "f12", name: "Polo Shirt", category: "Fashion", image: "https://images.unsplash.com/photo-1625910513413-5fc45e80fd70?w=300&h=300&fit=crop", stores: [makeStore(s.fashionHub, 899, 20, "2.5 km"), makeStore(s.trendyStore, 899, 15, "3.0 km")] },
  { id: "f13", name: "Kurta (Men's)", category: "Fashion", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=300&fit=crop", stores: [makeStore(s.fashionHub, 999, 30, "2.5 km"), makeStore(s.trendyStore, 999, 25, "3.0 km")] },
  { id: "f14", name: "Saree (Silk)", category: "Fashion", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=300&fit=crop", stores: [makeStore(s.fashionHub, 4999, 15, "2.5 km"), makeStore(s.trendyStore, 4999, 20, "3.0 km")] },
  { id: "f15", name: "Scarf", category: "Fashion", image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=300&h=300&fit=crop", stores: [makeStore(s.fashionHub, 399, 25, "2.5 km"), makeStore(s.trendyStore, 399, 20, "3.0 km")] },
  { id: "f16", name: "Palazzo Pants", category: "Fashion", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=300&fit=crop", stores: [makeStore(s.fashionHub, 799, 20, "2.5 km"), makeStore(s.trendyStore, 799, 25, "3.0 km")] },
  { id: "f17", name: "Winter Jacket", category: "Fashion", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop", stores: [makeStore(s.fashionHub, 2999, 30, "2.5 km"), makeStore(s.trendyStore, 2999, 25, "3.0 km"), makeStore(s.decathlon, 2999, 35, "4.0 km")] },
  { id: "f18", name: "Formal Trousers", category: "Fashion", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=300&fit=crop", stores: [makeStore(s.fashionHub, 1499, 18, "2.5 km"), makeStore(s.trendyStore, 1499, 22, "3.0 km")] },
  { id: "f19", name: "Flip Flops", category: "Fashion", image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=300&h=300&fit=crop", stores: [makeStore(s.fashionHub, 299, 20, "2.5 km"), makeStore(s.decathlon, 299, 15, "4.0 km")] },
  { id: "f20", name: "Cap/Hat", category: "Fashion", image: "https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=300&h=300&fit=crop", stores: [makeStore(s.fashionHub, 399, 25, "2.5 km"), makeStore(s.trendyStore, 399, 20, "3.0 km")] },

  // ===== HOME & KITCHEN =====
  { id: "h1", name: "Non-Stick Pan", category: "Home & Kitchen", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop", stores: [makeStore(s.dmart, 899, 20, "1.2 km"), makeStore(s.reliance, 899, 15, "2.1 km"), makeStore(s.bigbazaar, 899, 25, "3.0 km")] },
  { id: "h2", name: "Mixer Grinder", category: "Home & Kitchen", image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=300&h=300&fit=crop", stores: [makeStore(s.croma, 3499, 18, "5.0 km"), makeStore(s.reliance, 3499, 22, "2.1 km")] },
  { id: "h3", name: "Bed Sheet Set", category: "Home & Kitchen", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&h=300&fit=crop", stores: [makeStore(s.dmart, 799, 25, "1.2 km"), makeStore(s.bigbazaar, 799, 30, "3.0 km")] },
  { id: "h4", name: "Cushion Covers Set", category: "Home & Kitchen", image: "https://images.unsplash.com/photo-1584100936595-c0c9f403a438?w=300&h=300&fit=crop", stores: [makeStore(s.dmart, 499, 20, "1.2 km"), makeStore(s.bigbazaar, 499, 15, "3.0 km")] },
  { id: "h5", name: "Water Bottle Steel", category: "Home & Kitchen", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop", stores: [makeStore(s.dmart, 499, 15, "1.2 km"), makeStore(s.reliance, 499, 20, "2.1 km")] },
  { id: "h6", name: "Dinner Set 18pc", category: "Home & Kitchen", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=300&h=300&fit=crop", stores: [makeStore(s.dmart, 1999, 20, "1.2 km"), makeStore(s.bigbazaar, 1999, 25, "3.0 km")] },
  { id: "h7", name: "Curtains (Pair)", category: "Home & Kitchen", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300&h=300&fit=crop", stores: [makeStore(s.dmart, 899, 18, "1.2 km"), makeStore(s.bigbazaar, 899, 22, "3.0 km")] },
  { id: "h8", name: "Storage Containers Set", category: "Home & Kitchen", image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=300&h=300&fit=crop", stores: [makeStore(s.dmart, 599, 20, "1.2 km"), makeStore(s.reliance, 599, 15, "2.1 km")] },
  { id: "h9", name: "Electric Kettle", category: "Home & Kitchen", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop", stores: [makeStore(s.croma, 1299, 22, "5.0 km"), makeStore(s.reliance, 1299, 18, "2.1 km")] },
  { id: "h10", name: "Pressure Cooker 5L", category: "Home & Kitchen", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop", stores: [makeStore(s.dmart, 2499, 15, "1.2 km"), makeStore(s.bigbazaar, 2499, 20, "3.0 km")] },
  { id: "h11", name: "Vacuum Cleaner", category: "Home & Kitchen", image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=300&h=300&fit=crop", stores: [makeStore(s.croma, 5999, 20, "5.0 km"), makeStore(s.relianceDigital, 5999, 25, "3.5 km")] },
  { id: "h12", name: "Iron Box", category: "Home & Kitchen", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&h=300&fit=crop", stores: [makeStore(s.croma, 1499, 18, "5.0 km"), makeStore(s.dmart, 1499, 15, "1.2 km")] },
  { id: "h13", name: "Bathroom Mat", category: "Home & Kitchen", image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=300&h=300&fit=crop", stores: [makeStore(s.dmart, 299, 15, "1.2 km"), makeStore(s.bigbazaar, 299, 20, "3.0 km")] },
  { id: "h14", name: "Kitchen Knife Set", category: "Home & Kitchen", image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=300&h=300&fit=crop", stores: [makeStore(s.dmart, 799, 22, "1.2 km"), makeStore(s.reliance, 799, 18, "2.1 km")] },
  { id: "h15", name: "Table Lamp", category: "Home & Kitchen", image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=300&h=300&fit=crop", stores: [makeStore(s.dmart, 599, 20, "1.2 km"), makeStore(s.bigbazaar, 599, 15, "3.0 km")] },
  { id: "h16", name: "Door Mat", category: "Home & Kitchen", image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=300&h=300&fit=crop", stores: [makeStore(s.dmart, 199, 15, "1.2 km"), makeStore(s.localGrocery, 199, 10, "0.5 km")] },
  { id: "h17", name: "Towel Set (4pc)", category: "Home & Kitchen", image: "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=300&h=300&fit=crop", stores: [makeStore(s.dmart, 699, 20, "1.2 km"), makeStore(s.bigbazaar, 699, 25, "3.0 km")] },
  { id: "h18", name: "Mop & Bucket Set", category: "Home & Kitchen", image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=300&h=300&fit=crop", stores: [makeStore(s.dmart, 499, 15, "1.2 km"), makeStore(s.reliance, 499, 20, "2.1 km")] },
  { id: "h19", name: "Spice Rack", category: "Home & Kitchen", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", stores: [makeStore(s.dmart, 399, 18, "1.2 km"), makeStore(s.bigbazaar, 399, 22, "3.0 km")] },
  { id: "h20", name: "Wall Clock", category: "Home & Kitchen", image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=300&h=300&fit=crop", stores: [makeStore(s.dmart, 599, 20, "1.2 km"), makeStore(s.bigbazaar, 599, 25, "3.0 km")] },

  // ===== BEAUTY =====
  { id: "b1", name: "Face Wash (Himalaya)", category: "Beauty", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop", stores: [makeStore(s.beautyBarn, 180, 20, "1.5 km"), makeStore(s.nykaa, 180, 25, "3.0 km"), makeStore(s.dmart, 180, 15, "1.2 km")] },
  { id: "b2", name: "Moisturizer (Nivea)", category: "Beauty", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop", stores: [makeStore(s.beautyBarn, 350, 18, "1.5 km"), makeStore(s.nykaa, 350, 22, "3.0 km")] },
  { id: "b3", name: "Sunscreen SPF 50", category: "Beauty", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop", stores: [makeStore(s.beautyBarn, 499, 15, "1.5 km"), makeStore(s.nykaa, 499, 20, "3.0 km")] },
  { id: "b4", name: "Hair Oil (Parachute)", category: "Beauty", image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=300&h=300&fit=crop", stores: [makeStore(s.dmart, 120, 12, "1.2 km"), makeStore(s.localGrocery, 120, 8, "0.5 km")] },
  { id: "b5", name: "Shampoo (Dove)", category: "Beauty", image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=300&h=300&fit=crop", stores: [makeStore(s.dmart, 299, 18, "1.2 km"), makeStore(s.beautyBarn, 299, 22, "1.5 km"), makeStore(s.nykaa, 299, 25, "3.0 km")] },
  { id: "b6", name: "Lipstick (Maybelline)", category: "Beauty", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=300&fit=crop", stores: [makeStore(s.beautyBarn, 599, 20, "1.5 km"), makeStore(s.nykaa, 599, 25, "3.0 km")] },
  { id: "b7", name: "Perfume (Men)", category: "Beauty", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=300&h=300&fit=crop", stores: [makeStore(s.beautyBarn, 999, 15, "1.5 km"), makeStore(s.nykaa, 999, 20, "3.0 km")] },
  { id: "b8", name: "Face Cream (Olay)", category: "Beauty", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop", stores: [makeStore(s.beautyBarn, 799, 20, "1.5 km"), makeStore(s.nykaa, 799, 25, "3.0 km")] },
  { id: "b9", name: "Deodorant (Wild Stone)", category: "Beauty", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=300&h=300&fit=crop", stores: [makeStore(s.dmart, 199, 15, "1.2 km"), makeStore(s.beautyBarn, 199, 20, "1.5 km")] },
  { id: "b10", name: "Nail Polish Set", category: "Beauty", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=300&h=300&fit=crop", stores: [makeStore(s.beautyBarn, 299, 25, "1.5 km"), makeStore(s.nykaa, 299, 30, "3.0 km")] },
  { id: "b11", name: "Body Lotion (Vaseline)", category: "Beauty", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop", stores: [makeStore(s.dmart, 250, 15, "1.2 km"), makeStore(s.beautyBarn, 250, 20, "1.5 km")] },
  { id: "b12", name: "Makeup Kit", category: "Beauty", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=300&fit=crop", stores: [makeStore(s.beautyBarn, 1999, 20, "1.5 km"), makeStore(s.nykaa, 1999, 25, "3.0 km")] },
  { id: "b13", name: "Eye Liner", category: "Beauty", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=300&fit=crop", stores: [makeStore(s.beautyBarn, 299, 18, "1.5 km"), makeStore(s.nykaa, 299, 22, "3.0 km")] },
  { id: "b14", name: "Hair Dryer", category: "Beauty", image: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=300&h=300&fit=crop", stores: [makeStore(s.croma, 1499, 18, "5.0 km"), makeStore(s.beautyBarn, 1499, 22, "1.5 km")] },
  { id: "b15", name: "Razor (Gillette)", category: "Beauty", image: "https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=300&h=300&fit=crop", stores: [makeStore(s.dmart, 399, 15, "1.2 km"), makeStore(s.reliance, 399, 20, "2.1 km")] },

  // ===== SPORTS =====
  { id: "s1", name: "Yoga Mat", category: "Sports", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&h=300&fit=crop", stores: [makeStore(s.decathlon, 799, 25, "4.0 km"), makeStore(s.sportsZone, 799, 20, "3.5 km")] },
  { id: "s2", name: "Football", category: "Sports", image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=300&h=300&fit=crop", stores: [makeStore(s.decathlon, 999, 20, "4.0 km"), makeStore(s.sportsZone, 999, 15, "3.5 km")] },
  { id: "s3", name: "Cricket Bat", category: "Sports", image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=300&h=300&fit=crop", stores: [makeStore(s.decathlon, 2499, 18, "4.0 km"), makeStore(s.sportsZone, 2499, 22, "3.5 km")] },
  { id: "s4", name: "Badminton Racket", category: "Sports", image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=300&h=300&fit=crop", stores: [makeStore(s.decathlon, 999, 22, "4.0 km"), makeStore(s.sportsZone, 999, 18, "3.5 km")] },
  { id: "s5", name: "Dumbbells Set (5kg)", category: "Sports", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop", stores: [makeStore(s.decathlon, 1499, 15, "4.0 km"), makeStore(s.sportsZone, 1499, 20, "3.5 km")] },
  { id: "s6", name: "Swimming Goggles", category: "Sports", image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=300&h=300&fit=crop", stores: [makeStore(s.decathlon, 499, 20, "4.0 km"), makeStore(s.sportsZone, 499, 15, "3.5 km")] },
  { id: "s7", name: "Resistance Bands", category: "Sports", image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=300&h=300&fit=crop", stores: [makeStore(s.decathlon, 399, 25, "4.0 km"), makeStore(s.sportsZone, 399, 20, "3.5 km")] },
  { id: "s8", name: "Skipping Rope", category: "Sports", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&h=300&fit=crop", stores: [makeStore(s.decathlon, 199, 15, "4.0 km"), makeStore(s.sportsZone, 199, 20, "3.5 km")] },
  { id: "s9", name: "Table Tennis Set", category: "Sports", image: "https://images.unsplash.com/photo-1611251135345-18c56206b863?w=300&h=300&fit=crop", stores: [makeStore(s.decathlon, 1999, 20, "4.0 km"), makeStore(s.sportsZone, 1999, 25, "3.5 km")] },
  { id: "s10", name: "Gym Bag", category: "Sports", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop", stores: [makeStore(s.decathlon, 899, 22, "4.0 km"), makeStore(s.sportsZone, 899, 18, "3.5 km")] },

  // ===== BOOKS =====
  { id: "bk1", name: "Atomic Habits", category: "Books", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop", stores: [makeStore(s.bookworm, 399, 25, "2.0 km"), makeStore(s.crossword, 399, 20, "3.5 km")] },
  { id: "bk2", name: "Rich Dad Poor Dad", category: "Books", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=300&fit=crop", stores: [makeStore(s.bookworm, 299, 20, "2.0 km"), makeStore(s.crossword, 299, 15, "3.5 km")] },
  { id: "bk3", name: "The Alchemist", category: "Books", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop", stores: [makeStore(s.bookworm, 250, 22, "2.0 km"), makeStore(s.crossword, 250, 18, "3.5 km")] },
  { id: "bk4", name: "Harry Potter Box Set", category: "Books", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=300&fit=crop", stores: [makeStore(s.bookworm, 2999, 30, "2.0 km"), makeStore(s.crossword, 2999, 25, "3.5 km")] },
  { id: "bk5", name: "NCERT Textbooks Set", category: "Books", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&h=300&fit=crop", stores: [makeStore(s.bookworm, 1200, 15, "2.0 km"), makeStore(s.crossword, 1200, 10, "3.5 km")] },
  { id: "bk6", name: "Sapiens", category: "Books", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop", stores: [makeStore(s.bookworm, 499, 20, "2.0 km"), makeStore(s.crossword, 499, 18, "3.5 km")] },
  { id: "bk7", name: "Think and Grow Rich", category: "Books", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=300&fit=crop", stores: [makeStore(s.bookworm, 199, 15, "2.0 km"), makeStore(s.crossword, 199, 20, "3.5 km")] },
  { id: "bk8", name: "Ikigai", category: "Books", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop", stores: [makeStore(s.bookworm, 350, 22, "2.0 km"), makeStore(s.crossword, 350, 18, "3.5 km")] },
  { id: "bk9", name: "The Psychology of Money", category: "Books", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=300&fit=crop", stores: [makeStore(s.bookworm, 299, 18, "2.0 km"), makeStore(s.crossword, 299, 22, "3.5 km")] },
  { id: "bk10", name: "Wings of Fire", category: "Books", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop", stores: [makeStore(s.bookworm, 250, 20, "2.0 km"), makeStore(s.crossword, 250, 15, "3.5 km")] },

  // ===== ART & CRAFT =====
  { id: "ac1", name: "Crochet Thread Set", category: "Art & Craft", image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=300&h=300&fit=crop", aiPrediction: "Craft supplies see 15-20% discounts during summer holidays.", stores: [makeStore(s.craftCorner, 350, 15, "2.0 km"), makeStore(s.hobbyLand, 350, 20, "2.5 km"), makeStore(s.dmart, 350, 10, "1.2 km")] },
  { id: "ac2", name: "Yarn Ball (Cotton)", category: "Art & Craft", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=300&fit=crop", stores: [makeStore(s.craftCorner, 150, 18, "2.0 km"), makeStore(s.hobbyLand, 150, 22, "2.5 km")] },
  { id: "ac3", name: "Embroidery Kit", category: "Art & Craft", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&h=300&fit=crop", stores: [makeStore(s.craftCorner, 499, 20, "2.0 km"), makeStore(s.hobbyLand, 499, 25, "2.5 km")] },
  { id: "ac4", name: "Acrylic Paint Set", category: "Art & Craft", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&h=300&fit=crop", stores: [makeStore(s.craftCorner, 699, 15, "2.0 km"), makeStore(s.hobbyLand, 699, 20, "2.5 km")] },
  { id: "ac5", name: "Paint Brush Set", category: "Art & Craft", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&h=300&fit=crop", stores: [makeStore(s.craftCorner, 299, 18, "2.0 km"), makeStore(s.hobbyLand, 299, 22, "2.5 km")] },
  { id: "ac6", name: "Sketchbook A4", category: "Art & Craft", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&h=300&fit=crop", stores: [makeStore(s.craftCorner, 199, 15, "2.0 km"), makeStore(s.hobbyLand, 199, 20, "2.5 km"), makeStore(s.bookworm, 199, 12, "2.0 km")] },
  { id: "ac7", name: "Clay Modelling Kit", category: "Art & Craft", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&h=300&fit=crop", stores: [makeStore(s.craftCorner, 399, 20, "2.0 km"), makeStore(s.hobbyLand, 399, 15, "2.5 km")] },
  { id: "ac8", name: "Origami Paper Set", category: "Art & Craft", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&h=300&fit=crop", stores: [makeStore(s.craftCorner, 149, 15, "2.0 km"), makeStore(s.hobbyLand, 149, 20, "2.5 km")] },
  { id: "ac9", name: "Calligraphy Pen Set", category: "Art & Craft", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&h=300&fit=crop", stores: [makeStore(s.craftCorner, 599, 18, "2.0 km"), makeStore(s.hobbyLand, 599, 22, "2.5 km")] },
  { id: "ac10", name: "Watercolor Set", category: "Art & Craft", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&h=300&fit=crop", stores: [makeStore(s.craftCorner, 499, 20, "2.0 km"), makeStore(s.hobbyLand, 499, 25, "2.5 km")] },

  // ===== TOYS =====
  { id: "t1", name: "LEGO Classic Set", category: "Toys", image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=300&h=300&fit=crop", stores: [makeStore(s.toyWorld, 2499, 20, "3.0 km"), makeStore(s.bigbazaar, 2499, 15, "3.0 km")] },
  { id: "t2", name: "Board Game (Monopoly)", category: "Toys", image: "https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=300&h=300&fit=crop", stores: [makeStore(s.toyWorld, 999, 18, "3.0 km"), makeStore(s.bigbazaar, 999, 22, "3.0 km")] },
  { id: "t3", name: "Rubik's Cube", category: "Toys", image: "https://images.unsplash.com/photo-1591991731833-b4807cf7ef94?w=300&h=300&fit=crop", stores: [makeStore(s.toyWorld, 299, 15, "3.0 km"), makeStore(s.dmart, 299, 10, "1.2 km")] },
  { id: "t4", name: "Remote Control Car", category: "Toys", image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=300&h=300&fit=crop", stores: [makeStore(s.toyWorld, 1499, 25, "3.0 km"), makeStore(s.bigbazaar, 1499, 20, "3.0 km")] },
  { id: "t5", name: "Puzzle Set (1000pc)", category: "Toys", image: "https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=300&h=300&fit=crop", stores: [makeStore(s.toyWorld, 599, 20, "3.0 km"), makeStore(s.hobbyLand, 599, 15, "2.5 km")] },
  { id: "t6", name: "Soft Toy Bear", category: "Toys", image: "https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=300&h=300&fit=crop", stores: [makeStore(s.toyWorld, 499, 22, "3.0 km"), makeStore(s.bigbazaar, 499, 18, "3.0 km")] },
  { id: "t7", name: "Play-Doh Set", category: "Toys", image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=300&h=300&fit=crop", stores: [makeStore(s.toyWorld, 399, 15, "3.0 km"), makeStore(s.dmart, 399, 20, "1.2 km")] },
  { id: "t8", name: "Action Figure", category: "Toys", image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=300&h=300&fit=crop", stores: [makeStore(s.toyWorld, 799, 20, "3.0 km"), makeStore(s.bigbazaar, 799, 15, "3.0 km")] },
  { id: "t9", name: "Doll House", category: "Toys", image: "https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=300&h=300&fit=crop", stores: [makeStore(s.toyWorld, 1999, 18, "3.0 km"), makeStore(s.bigbazaar, 1999, 22, "3.0 km")] },
  { id: "t10", name: "Building Blocks", category: "Toys", image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=300&h=300&fit=crop", stores: [makeStore(s.toyWorld, 699, 20, "3.0 km"), makeStore(s.dmart, 699, 15, "1.2 km")] },

  // ===== PET SUPPLIES =====
  { id: "p1", name: "Dog Food (Pedigree 3kg)", category: "Pet Supplies", image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=300&h=300&fit=crop", stores: [makeStore(s.petShop, 899, 18, "2.0 km"), makeStore(s.petZone, 899, 22, "3.5 km")] },
  { id: "p2", name: "Cat Food (Whiskas)", category: "Pet Supplies", image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=300&h=300&fit=crop", stores: [makeStore(s.petShop, 499, 15, "2.0 km"), makeStore(s.petZone, 499, 20, "3.5 km")] },
  { id: "p3", name: "Pet Collar", category: "Pet Supplies", image: "https://images.unsplash.com/photo-1583337130417-13571c7ee57a?w=300&h=300&fit=crop", stores: [makeStore(s.petShop, 299, 20, "2.0 km"), makeStore(s.petZone, 299, 15, "3.5 km")] },
  { id: "p4", name: "Pet Shampoo", category: "Pet Supplies", image: "https://images.unsplash.com/photo-1583337130417-13571c7ee57a?w=300&h=300&fit=crop", stores: [makeStore(s.petShop, 350, 18, "2.0 km"), makeStore(s.petZone, 350, 22, "3.5 km")] },
  { id: "p5", name: "Dog Leash", category: "Pet Supplies", image: "https://images.unsplash.com/photo-1583337130417-13571c7ee57a?w=300&h=300&fit=crop", stores: [makeStore(s.petShop, 399, 15, "2.0 km"), makeStore(s.petZone, 399, 20, "3.5 km")] },
  { id: "p6", name: "Cat Litter (5kg)", category: "Pet Supplies", image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=300&h=300&fit=crop", stores: [makeStore(s.petShop, 599, 20, "2.0 km"), makeStore(s.petZone, 599, 25, "3.5 km")] },
  { id: "p7", name: "Pet Toy Ball", category: "Pet Supplies", image: "https://images.unsplash.com/photo-1583337130417-13571c7ee57a?w=300&h=300&fit=crop", stores: [makeStore(s.petShop, 149, 18, "2.0 km"), makeStore(s.petZone, 149, 22, "3.5 km")] },
  { id: "p8", name: "Fish Tank (Small)", category: "Pet Supplies", image: "https://images.unsplash.com/photo-1583337130417-13571c7ee57a?w=300&h=300&fit=crop", stores: [makeStore(s.petShop, 1499, 15, "2.0 km"), makeStore(s.petZone, 1499, 20, "3.5 km")] },
  { id: "p9", name: "Bird Cage", category: "Pet Supplies", image: "https://images.unsplash.com/photo-1583337130417-13571c7ee57a?w=300&h=300&fit=crop", stores: [makeStore(s.petShop, 999, 20, "2.0 km"), makeStore(s.petZone, 999, 15, "3.5 km")] },
  { id: "p10", name: "Pet Bed", category: "Pet Supplies", image: "https://images.unsplash.com/photo-1583337130417-13571c7ee57a?w=300&h=300&fit=crop", stores: [makeStore(s.petShop, 1299, 18, "2.0 km"), makeStore(s.petZone, 1299, 22, "3.5 km")] },
];

// Update category counts dynamically
categories.forEach(cat => {
  cat.count = products.filter(p => p.category === cat.name).length;
});

// Generate trending deals from products with highest discounts
export const trendingDeals: TrendingDeal[] = products
  .flatMap(p => p.stores.filter(s => s.available).map(s => ({
    id: `td-${p.id}-${s.storeName}`,
    productName: p.name,
    storeName: s.storeName,
    discountPercent: s.discountPercent,
    originalPrice: s.originalPrice,
    finalPrice: s.finalPrice,
    category: p.category,
    image: p.image,
  })))
  .sort((a, b) => b.discountPercent - a.discountPercent)
  .slice(0, 20);

export const bundleDeals = [
  { id: "b1", title: "Buy 2 Get 1 Free", product: "Oreo Biscuit", store: "DMart", effectivePrice: 20, originalPrice: 40 },
  { id: "b2", title: "Combo Pack", product: "Coffee + Mug Set", store: "Nature's Basket", effectivePrice: 380, originalPrice: 550 },
  { id: "b3", title: "Buy 3 Get 1 Free", product: "Dairy Milk", store: "Big Bazaar", effectivePrice: 60, originalPrice: 80 },
  { id: "b4", title: "Buy 1 Get 1", product: "Face Wash", store: "Nykaa Store", effectivePrice: 90, originalPrice: 180 },
  { id: "b5", title: "Combo Offer", product: "Shampoo + Conditioner", store: "Beauty Barn", effectivePrice: 350, originalPrice: 550 },
];

export const storeLocations = [
  { name: "DMart", lat: 19.076, lng: 72.877, maxDiscount: 25, products: ["Oreo", "Dairy Milk", "Coffee", "Rice", "Oil"] },
  { name: "Reliance Smart", lat: 19.082, lng: 72.885, maxDiscount: 20, products: ["Oreo", "Tea", "Electronics", "Groceries"] },
  { name: "Spencer's", lat: 19.088, lng: 72.870, maxDiscount: 15, products: ["Dairy Milk", "Bread", "Snacks"] },
  { name: "Big Bazaar", lat: 19.090, lng: 72.890, maxDiscount: 30, products: ["Dairy Milk", "Groceries", "Home & Kitchen"] },
  { name: "Nature's Basket", lat: 19.085, lng: 72.895, maxDiscount: 20, products: ["Coffee", "Organic", "Peanut Butter"] },
  { name: "Croma", lat: 19.100, lng: 72.880, maxDiscount: 35, products: ["Earbuds", "Laptop Stand", "Monitors"] },
  { name: "Reliance Digital", lat: 19.088, lng: 72.882, maxDiscount: 35, products: ["Electronics", "Gadgets"] },
  { name: "ElectroWorld", lat: 19.095, lng: 72.875, maxDiscount: 25, products: ["Keyboards", "Mouse", "Accessories"] },
  { name: "Local Grocery Store", lat: 19.074, lng: 72.873, maxDiscount: 10, products: ["Oreo", "Snacks", "Daily Needs"] },
  { name: "Craft Corner", lat: 19.080, lng: 72.875, maxDiscount: 20, products: ["Crochet Thread", "Yarn", "Paints"] },
  { name: "HobbyLand", lat: 19.078, lng: 72.868, maxDiscount: 25, products: ["Art Supplies", "Embroidery", "Clay"] },
  { name: "Fashion Hub", lat: 19.083, lng: 72.878, maxDiscount: 35, products: ["T-Shirts", "Jeans", "Dresses"] },
  { name: "Trendy Store", lat: 19.079, lng: 72.892, maxDiscount: 30, products: ["Fashion", "Accessories", "Sunglasses"] },
  { name: "Bookworm Store", lat: 19.081, lng: 72.884, maxDiscount: 30, products: ["Books", "Stationery"] },
  { name: "Crossword", lat: 19.092, lng: 72.886, maxDiscount: 25, products: ["Books", "Gifts"] },
  { name: "Decathlon", lat: 19.097, lng: 72.878, maxDiscount: 40, products: ["Sports", "Fitness", "Shoes"] },
  { name: "Sports Zone", lat: 19.084, lng: 72.890, maxDiscount: 25, products: ["Cricket", "Football", "Gym"] },
  { name: "Toy World", lat: 19.086, lng: 72.872, maxDiscount: 25, products: ["LEGO", "Board Games", "Dolls"] },
  { name: "Pet Paradise", lat: 19.077, lng: 72.888, maxDiscount: 20, products: ["Dog Food", "Cat Food", "Accessories"] },
  { name: "Pet Zone", lat: 19.093, lng: 72.882, maxDiscount: 25, products: ["Pet Food", "Litter", "Toys"] },
  { name: "Beauty Barn", lat: 19.081, lng: 72.879, maxDiscount: 22, products: ["Skincare", "Haircare", "Makeup"] },
  { name: "Nykaa Store", lat: 19.089, lng: 72.876, maxDiscount: 30, products: ["Lipstick", "Perfume", "Skincare"] },
];

export const communityDeals: CommunityDeal[] = [
  { id: "cd1", storeName: "Local Grocery Store", productName: "Oreo Biscuit", discount: "20% off", location: "Andheri West", reportedBy: "Rahul", timestamp: "2 hours ago" },
  { id: "cd2", storeName: "DMart", productName: "Maggi Noodles", discount: "Buy 2 Get 1 Free", location: "Bandra", reportedBy: "Priya", timestamp: "3 hours ago" },
  { id: "cd3", storeName: "Croma", productName: "Power Bank", discount: "30% off", location: "Juhu", reportedBy: "Amit", timestamp: "5 hours ago" },
];

export const notifications = [
  { id: "n1", message: "Flash deal: Oreo Biscuit 25% off at DMart near you!", time: "Just now", read: false },
  { id: "n2", message: "Wireless Earbuds Pro dropped to ₹2,099 at Croma!", time: "10 min ago", read: false },
  { id: "n3", message: "New community deal reported near your location", time: "30 min ago", read: true },
  { id: "n4", message: "Your budget planner saved you ₹340 this week!", time: "1 hour ago", read: true },
  { id: "n5", message: "Weekend sale: Up to 40% off at Decathlon!", time: "2 hours ago", read: true },
];
