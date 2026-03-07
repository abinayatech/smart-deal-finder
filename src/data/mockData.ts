export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  stores: StoreOffer[];
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

export const categories: Category[] = [
  { name: "Groceries", icon: "🛒", count: 245 },
  { name: "Electronics", icon: "💻", count: 128 },
  { name: "Fashion", icon: "👗", count: 312 },
  { name: "Home & Kitchen", icon: "🏠", count: 189 },
  { name: "Beauty", icon: "💄", count: 156 },
  { name: "Sports", icon: "⚽", count: 87 },
  { name: "Books", icon: "📚", count: 203 },
  { name: "Toys", icon: "🧸", count: 94 },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Oreo Biscuit",
    category: "Groceries",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop",
    stores: [
      { storeName: "DMart", originalPrice: 40, discountPercent: 25, finalPrice: 30, distance: "1.2 km", rating: 4.5, lat: 19.076, lng: 72.877 },
      { storeName: "Reliance Smart", originalPrice: 40, discountPercent: 20, finalPrice: 32, distance: "2.1 km", rating: 4.2, lat: 19.082, lng: 72.885 },
      { storeName: "Local Grocery", originalPrice: 40, discountPercent: 10, finalPrice: 36, distance: "0.5 km", rating: 4.0, lat: 19.074, lng: 72.873 },
    ],
  },
  {
    id: "2",
    name: "Dairy Milk Silk",
    category: "Groceries",
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=300&h=300&fit=crop",
    stores: [
      { storeName: "Big Bazaar", originalPrice: 80, discountPercent: 25, finalPrice: 60, distance: "3.0 km", rating: 4.3, lat: 19.090, lng: 72.890 },
      { storeName: "DMart", originalPrice: 80, discountPercent: 20, finalPrice: 64, distance: "1.2 km", rating: 4.5, lat: 19.076, lng: 72.877 },
      { storeName: "Star Bazaar", originalPrice: 80, discountPercent: 15, finalPrice: 68, distance: "4.5 km", rating: 4.1, lat: 19.095, lng: 72.870 },
    ],
  },
  {
    id: "3",
    name: "Coffee Beans Premium",
    category: "Groceries",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop",
    stores: [
      { storeName: "Nature's Basket", originalPrice: 450, discountPercent: 20, finalPrice: 360, distance: "2.8 km", rating: 4.6, lat: 19.085, lng: 72.895 },
      { storeName: "DMart", originalPrice: 450, discountPercent: 15, finalPrice: 382, distance: "1.2 km", rating: 4.5, lat: 19.076, lng: 72.877 },
    ],
  },
  {
    id: "4",
    name: "Wireless Earbuds Pro",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=300&h=300&fit=crop",
    stores: [
      { storeName: "Croma", originalPrice: 2999, discountPercent: 30, finalPrice: 2099, distance: "5.0 km", rating: 4.4, lat: 19.100, lng: 72.880 },
      { storeName: "Reliance Digital", originalPrice: 2999, discountPercent: 25, finalPrice: 2249, distance: "3.5 km", rating: 4.3, lat: 19.088, lng: 72.882 },
    ],
  },
  {
    id: "5",
    name: "Laptop Stand Adjustable",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
    stores: [
      { storeName: "Croma", originalPrice: 1500, discountPercent: 20, finalPrice: 1200, distance: "5.0 km", rating: 4.4, lat: 19.100, lng: 72.880 },
      { storeName: "Amazon Go", originalPrice: 1500, discountPercent: 35, finalPrice: 975, distance: "1.8 km", rating: 4.7, lat: 19.078, lng: 72.880 },
    ],
  },
  {
    id: "6",
    name: "Crochet Thread Set",
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop",
    stores: [
      { storeName: "Craft Corner", originalPrice: 350, discountPercent: 15, finalPrice: 297, distance: "2.0 km", rating: 4.1, lat: 19.080, lng: 72.875 },
      { storeName: "DMart", originalPrice: 350, discountPercent: 10, finalPrice: 315, distance: "1.2 km", rating: 4.5, lat: 19.076, lng: 72.877 },
    ],
  },
];

export const trendingDeals: TrendingDeal[] = [
  { id: "t1", productName: "Oreo Biscuit", storeName: "DMart", discountPercent: 30, originalPrice: 40, finalPrice: 28, category: "Groceries", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop" },
  { id: "t2", productName: "Dairy Milk", storeName: "Big Bazaar", discountPercent: 25, originalPrice: 80, finalPrice: 60, category: "Groceries", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=300&h=300&fit=crop" },
  { id: "t3", productName: "Coffee Beans", storeName: "Nature's Basket", discountPercent: 20, originalPrice: 450, finalPrice: 360, category: "Groceries", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop" },
  { id: "t4", productName: "Wireless Earbuds", storeName: "Croma", discountPercent: 30, originalPrice: 2999, finalPrice: 2099, category: "Electronics", image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=300&h=300&fit=crop" },
  { id: "t5", productName: "Laptop Stand", storeName: "Amazon Go", discountPercent: 35, originalPrice: 1500, finalPrice: 975, category: "Electronics", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop" },
  { id: "t6", productName: "Running Shoes", storeName: "Decathlon", discountPercent: 40, originalPrice: 3500, finalPrice: 2100, category: "Sports", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop" },
];

export const bundleDeals = [
  { id: "b1", title: "Buy 2 Get 1 Free", product: "Oreo Biscuit", store: "DMart", effectivePrice: 20, originalPrice: 40 },
  { id: "b2", title: "Combo Pack", product: "Coffee + Mug Set", store: "Nature's Basket", effectivePrice: 380, originalPrice: 550 },
  { id: "b3", title: "Buy 3 Get 1 Free", product: "Dairy Milk", store: "Big Bazaar", effectivePrice: 60, originalPrice: 80 },
];

export const storeLocations = [
  { name: "DMart", lat: 19.076, lng: 72.877, maxDiscount: 25, products: ["Oreo", "Dairy Milk", "Coffee"] },
  { name: "Reliance Smart", lat: 19.082, lng: 72.885, maxDiscount: 20, products: ["Oreo", "Electronics"] },
  { name: "Big Bazaar", lat: 19.090, lng: 72.890, maxDiscount: 30, products: ["Dairy Milk", "Groceries"] },
  { name: "Nature's Basket", lat: 19.085, lng: 72.895, maxDiscount: 20, products: ["Coffee", "Organic"] },
  { name: "Croma", lat: 19.100, lng: 72.880, maxDiscount: 35, products: ["Earbuds", "Laptop Stand"] },
  { name: "Local Grocery", lat: 19.074, lng: 72.873, maxDiscount: 10, products: ["Oreo", "Snacks"] },
  { name: "Amazon Go", lat: 19.078, lng: 72.880, maxDiscount: 35, products: ["Laptop Stand", "Gadgets"] },
];
