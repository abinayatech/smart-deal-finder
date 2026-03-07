import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Locate } from "lucide-react";
import { storeLocations } from "@/data/mockData";
import "leaflet/dist/leaflet.css";

export default function DealMapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setUserLocation({ lat: 19.082, lng: 72.880 }) // fallback
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

      // User location blue dot
      const userIcon = L.divIcon({
        className: "user-location-marker",
        html: `<div style="width:18px;height:18px;border-radius:50%;background:#3b82f6;border:3px solid white;box-shadow:0 0 12px rgba(59,130,246,0.5);"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });
      L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
        .addTo(map)
        .bindPopup("<strong>You are here</strong>");

      storeLocations.forEach((store) => {
        const color = store.maxDiscount >= 25 ? "#ef4444" : store.maxDiscount >= 15 ? "#f59e0b" : "#22c55e";
        const icon = L.divIcon({
          className: "custom-marker",
          html: `<div style="width:32px;height:32px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;color:white;font-size:12px;font-weight:bold;">${store.maxDiscount}%</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        L.marker([store.lat, store.lng], { icon })
          .addTo(map)
          .bindPopup(
            `<div style="font-family:sans-serif;padding:4px;">
              <strong>${store.name}</strong><br/>
              <span style="color:#888;">Up to ${store.maxDiscount}% off</span><br/>
              <span style="font-size:12px;">${store.products.join(", ")}</span>
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
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
          <MapPin className="w-7 h-7 inline-block text-primary mr-2" />
          Deal Map
        </h1>
        <p className="text-muted-foreground mb-6">Find discounted stores near you</p>

        <div className="flex flex-wrap gap-4 mb-4">
          {[
            { color: "bg-deal-green", label: "10–15% off" },
            { color: "bg-deal-yellow", label: "15–25% off" },
            { color: "bg-deal-red", label: "25%+ off" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className={`w-3 h-3 rounded-full ${l.color}`} />
              {l.label}
            </div>
          ))}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            Your Location
          </div>
        </div>
      </div>

      <div ref={mapRef} className="w-full h-[60vh] rounded-none md:container md:mx-auto md:rounded-2xl overflow-hidden" />

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-display font-bold text-foreground mb-4">Nearby Stores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {storeLocations.map((store, i) => {
            const discountColor = store.maxDiscount >= 25 ? "text-deal-red" : store.maxDiscount >= 15 ? "text-deal-yellow" : "text-deal-green";
            return (
              <motion.div key={store.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }} className="glass rounded-2xl p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{store.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{store.products.join(", ")}</p>
                  </div>
                  <span className={`text-lg font-bold ${discountColor}`}>{store.maxDiscount}%</span>
                </div>
                <button className="mt-4 flex items-center gap-2 text-sm text-primary font-medium hover:underline">
                  <Navigation className="w-4 h-4" /> Navigate
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
