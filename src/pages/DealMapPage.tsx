import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Navigation, Locate, Store, Truck } from "lucide-react";
import { storeLocations } from "@/data/mockData";
import { useShoppingMode } from "@/contexts/ShoppingModeContext";
import "leaflet/dist/leaflet.css";

export default function DealMapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const navigate = useNavigate();
  const { mode } = useShoppingMode();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setUserLocation({ lat: 19.082, lng: 72.880 })
      );
    } else {
      setUserLocation({ lat: 19.082, lng: 72.880 });
    }
  }, []);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current || !userLocation) return;

    import("leaflet").then((L) => {
      const map = L.map(mapRef.current!, { zoomControl: false }).setView([userLocation.lat, userLocation.lng], 14);
      mapInstance.current = map;

      L.control.zoom({ position: "bottomright" }).addTo(map);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap',
      }).addTo(map);

      // User location
      const userIcon = L.divIcon({
        className: "",
        html: `<div style="width:16px;height:16px;border-radius:50%;background:hsl(224, 76%, 48%);border:3px solid white;box-shadow:0 0 12px rgba(30,58,138,0.5);"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });
      L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
        .addTo(map)
        .bindPopup("<strong>You are here</strong>");

      storeLocations.forEach((store) => {
        const color = store.maxDiscount >= 25 ? "hsl(0, 84%, 60%)" : store.maxDiscount >= 15 ? "hsl(38, 92%, 50%)" : "hsl(160, 84%, 39%)";
        const icon = L.divIcon({
          className: "",
          html: `<div style="width:30px;height:30px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;color:white;font-size:10px;font-weight:800;">${store.maxDiscount}%</div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        });

        L.marker([store.lat, store.lng], { icon })
          .addTo(map)
          .bindPopup(
            `<div style="font-family:Inter,sans-serif;padding:4px;">
              <strong style="font-size:14px;">${store.name}</strong><br/>
              <span style="color:#888;font-size:12px;">Up to ${store.maxDiscount}% off</span><br/>
              <span style="font-size:11px;color:#666;">${store.products.join(", ")}</span>
            </div>`
          );
      });
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [userLocation]);

  return (
    <div className="min-h-screen pt-16 pb-20 md:pb-0">
      <div className="container mx-auto px-4 py-5">
        <h1 className="text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-primary" /> Deal Map
        </h1>
        <p className="text-sm text-muted-foreground mb-4">Find discounted stores near you</p>

        <div className="flex flex-wrap gap-3 mb-4">
          {[
            { color: "bg-success", label: "10–15% off" },
            { color: "bg-accent", label: "15–25% off" },
            { color: "bg-destructive", label: "25%+ off" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className={`w-3 h-3 rounded-full ${l.color}`} />
              {l.label}
            </div>
          ))}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-3 h-3 rounded-full bg-primary" />
            Your Location
          </div>
        </div>
      </div>

      <div ref={mapRef} className="w-full h-[50vh] md:container md:mx-auto md:rounded-2xl overflow-hidden border border-border/50" />

      <div className="container mx-auto px-4 py-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Nearby Stores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {storeLocations.map((store, i) => {
            const discountColor = store.maxDiscount >= 25 ? "text-destructive" : store.maxDiscount >= 15 ? "text-accent" : "text-success";
            return (
              <motion.div key={store.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 * i }} className="bg-card rounded-xl p-4 border border-border/50 shadow-card hover:shadow-card-hover transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{store.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{store.products.join(", ")}</p>
                  </div>
                  <span className={`text-base font-bold ${discountColor}`}>{store.maxDiscount}%</span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <button className="flex items-center gap-1 text-xs text-primary font-medium hover:underline">
                    <Navigation className="w-3 h-3" /> Navigate
                  </button>
                  <button onClick={() => navigate(`/search?q=${encodeURIComponent(store.name)}`)} className="flex items-center gap-1 text-xs text-primary font-medium hover:underline">
                    <Store className="w-3 h-3" /> View Deals
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
