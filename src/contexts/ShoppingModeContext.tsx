import React, { createContext, useContext, useState, ReactNode } from "react";

export type ShoppingMode = "pickup" | "delivery";

export interface Order {
  id: string;
  items: OrderItem[];
  mode: ShoppingMode;
  status: "placed" | "preparing" | "out_for_delivery" | "delivered" | "ready_for_pickup" | "picked_up";
  total: number;
  deliveryTotal: number;
  savings: number;
  deliveryAddress?: string;
  placedAt: string;
  estimatedTime: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  storeName: string;
  price: number;
  quantity: number;
}

interface ShoppingModeContextType {
  mode: ShoppingMode;
  setMode: (m: ShoppingMode) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  deliveryAddress: string;
  setDeliveryAddress: (a: string) => void;
}

const ShoppingModeContext = createContext<ShoppingModeContextType | undefined>(undefined);

export function ShoppingModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ShoppingMode>("delivery");
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "demo-001",
      items: [
        { productId: "g1", productName: "Oreo Biscuit", productImage: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop", storeName: "DMart", price: 30, quantity: 2 },
        { productId: "g3", productName: "Coffee Beans Premium", productImage: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop", storeName: "Nature's Basket", price: 360, quantity: 1 },
      ],
      mode: "delivery",
      status: "out_for_delivery",
      total: 420,
      deliveryTotal: 75,
      savings: 130,
      deliveryAddress: "123 Main Street, Andheri West, Mumbai",
      placedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      estimatedTime: "30 mins",
    },
    {
      id: "demo-002",
      items: [
        { productId: "e1", productName: "Wireless Earbuds Pro", productImage: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=300&h=300&fit=crop", storeName: "Croma", price: 2099, quantity: 1 },
      ],
      mode: "pickup",
      status: "ready_for_pickup",
      total: 2099,
      deliveryTotal: 0,
      savings: 900,
      placedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      estimatedTime: "Ready",
    },
  ]);
  const [deliveryAddress, setDeliveryAddress] = useState("123 Main Street, Andheri West, Mumbai");

  const addOrder = (order: Order) => setOrders(prev => [order, ...prev]);

  return (
    <ShoppingModeContext.Provider value={{ mode, setMode, orders, addOrder, deliveryAddress, setDeliveryAddress }}>
      {children}
    </ShoppingModeContext.Provider>
  );
}

export function useShoppingMode() {
  const ctx = useContext(ShoppingModeContext);
  if (!ctx) throw new Error("useShoppingMode must be used within ShoppingModeProvider");
  return ctx;
}
