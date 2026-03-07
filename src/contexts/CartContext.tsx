import React, { createContext, useContext, useState, ReactNode } from "react";
import { StoreOffer } from "@/data/mockData";

export interface CartItem {
  productId: string;
  productName: string;
  productImage: string;
  store: StoreOffer;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (productId: string, storeName: string) => void;
  updateQuantity: (productId: string, storeName: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  totalDelivery: number;
  totalSavings: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setItems(prev => {
      const existing = prev.find(i => i.productId === item.productId && i.store.storeName === item.store.storeName);
      if (existing) {
        return prev.map(i =>
          i.productId === item.productId && i.store.storeName === item.store.storeName
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string, storeName: string) => {
    setItems(prev => prev.filter(i => !(i.productId === productId && i.store.storeName === storeName)));
  };

  const updateQuantity = (productId: string, storeName: string, qty: number) => {
    if (qty <= 0) return removeFromCart(productId, storeName);
    setItems(prev => prev.map(i =>
      i.productId === productId && i.store.storeName === storeName ? { ...i, quantity: qty } : i
    ));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.store.finalPrice * i.quantity, 0);
  const totalDelivery = items.reduce((s, i) => s + i.store.deliveryCharge, 0);
  const totalSavings = items.reduce((s, i) => s + (i.store.originalPrice - i.store.finalPrice) * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, totalDelivery, totalSavings }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
