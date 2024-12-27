import { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { SAMPLE_PROPERTIES } from "@/data/properties";
import { Property } from "@/types/property";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, Filter } from "lucide-react";

// Composant pour l'infobulle personnalisée
const createCustomPopup = (property: Property) => {
  const el = document.createElement("div");
  el.className = "custom-popup bg-white p-3 rounded-lg shadow-lg max-w-[300px]";
  el.innerHTML = `
    <img src="${property.imageUrl}" alt="${property.title}" class="w-full h-32 object-cover rounded-lg mb-2"/>
    <h3 class="font-semibold text-lg mb-1">${property.title}</h3>
    <p class="text-gray-600 text-sm mb-1">${property.location}</p>
    <div class="flex justify-between items-center text-sm">
      <span class="font-medium">${property.price.toLocaleString()} MAD</span>
      <span>${property.size} m²</span>
    </div>
  `;
  return el;
};

export const MapSection = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialisation de la carte
    mapboxgl.accessToken = "pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHNxOXBtYmowMGRqMmpxdDZ5ZWV2OW5nIn0.qHvQhxzr7MrYxqXkuQB9EA";
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-7.5898, 33.5731], // Centré sur Casablanca
      zoom: 7,
      pitch: 45,
    });

    // Ajout des contrôles de navigation
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Chargement des marqueurs
    map.current.on("load", () => {
      SAMPLE_PROPERTIES.forEach((property) => {
        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false,
          maxWidth: "300px",
        }).setDOMContent(createCustomPopup(property));

        const marker = new mapboxgl.Marker({
          color: getMarkerColor(property.type),
        })
          .setLngLat([property.coordinates.lng, property.coordinates.lat])
          .setPopup(popup)
          .addTo(map.current!);

        // Événements de survol
        marker.getElement().addEventListener("mouseenter", () => {
          popup.addTo(map.current!);
        });

        marker.getElement().addEventListener("mouseleave", () => {
          setTimeout(() => {
            if (!popup.isOpen()) {
              popup.remove();
            }
          }, 300);
        });
      });
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  // Fonction utilitaire pour obtenir la couleur du marqueur selon le type
  const getMarkerColor = (type: Property["type"]) => {
    switch (type) {
      case "factory":
        return "#FF4B4B";
      case "office":
        return "#4B70FF";
      case "hotel":
        return "#FFB74B";
      case "land":
        return "#4BFF4B";
      default:
        return "#666666";
    }
  };

  return (
    <section className="relative py-12 bg-white">
      <div className="container">
        <h2 className="font-display text-3xl font-bold text-center mb-8">
          Découvrez Nos Biens sur la Carte
        </h2>
        
        {/* Barre de recherche et filtres */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Rechercher par localisation, type de bien..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filtres
          </Button>
        </div>

        {/* Conteneur de la carte */}
        <div className="relative h-[600px] rounded-xl overflow-hidden shadow-xl">
          <div ref={mapContainer} className="absolute inset-0" />
        </div>

        {/* Infobulle sélectionnée */}
        {selectedProperty && (
          <Card className="absolute bottom-4 left-4 p-4 max-w-sm bg-white/90 backdrop-blur-sm">
            <h3 className="font-semibold text-lg">{selectedProperty.title}</h3>
            <p className="text-gray-600">
              {selectedProperty.price.toLocaleString()} MAD | {selectedProperty.size} m²
            </p>
          </Card>
        )}
      </div>
    </section>
  );
};