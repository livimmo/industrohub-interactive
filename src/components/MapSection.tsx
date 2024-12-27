import { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { SAMPLE_PROPERTIES } from "@/data/properties";
import { Property } from "@/types/property";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, Filter, X } from "lucide-react";
import { Slider } from "./ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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

interface Filters {
  priceRange: [number, number];
  sizeRange: [number, number];
  type: string;
}

export const MapSection = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 10000000],
    sizeRange: [0, 10000],
    type: "all",
  });

  // Fonction pour filtrer les propriétés
  const filteredProperties = SAMPLE_PROPERTIES.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPrice = property.price >= filters.priceRange[0] && 
      property.price <= filters.priceRange[1];
    
    const matchesSize = property.size >= filters.sizeRange[0] && 
      property.size <= filters.sizeRange[1];
    
    const matchesType = filters.type === "all" || property.type === filters.type;

    return matchesSearch && matchesPrice && matchesSize && matchesType;
  });

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = "pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHNxOXBtYmowMGRqMmpxdDZ5ZWV2OW5nIn0.qHvQhxzr7MrYxqXkuQB9EA";
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-7.5898, 33.5731],
      zoom: 7,
      pitch: 45,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Chargement des marqueurs
    map.current.on("load", () => {
      filteredProperties.forEach((property) => {
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

        marker.getElement().addEventListener("mouseenter", () => {
          popup.addTo(map.current!);
          setSelectedProperty(property);
        });

        marker.getElement().addEventListener("mouseleave", () => {
          setTimeout(() => {
            if (!popup.isOpen()) {
              popup.remove();
              setSelectedProperty(null);
            }
          }, 300);
        });
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [filteredProperties]);

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
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Rechercher par localisation, type de bien..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setSearchQuery("")}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filtres
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full md:max-w-md">
              <SheetHeader>
                <SheetTitle>Filtres Avancés</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="space-y-4">
                  <Label>Prix (MAD)</Label>
                  <Slider
                    defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
                    max={10000000}
                    step={100000}
                    onValueChange={(value) => setFilters({ ...filters, priceRange: value as [number, number] })}
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{filters.priceRange[0].toLocaleString()} MAD</span>
                    <span>{filters.priceRange[1].toLocaleString()} MAD</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Superficie (m²)</Label>
                  <Slider
                    defaultValue={[filters.sizeRange[0], filters.sizeRange[1]]}
                    max={10000}
                    step={100}
                    onValueChange={(value) => setFilters({ ...filters, sizeRange: value as [number, number] })}
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{filters.sizeRange[0]} m²</span>
                    <span>{filters.sizeRange[1]} m²</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Type de bien</Label>
                  <Select
                    value={filters.type}
                    onValueChange={(value) => setFilters({ ...filters, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      <SelectItem value="factory">Usine</SelectItem>
                      <SelectItem value="office">Bureau</SelectItem>
                      <SelectItem value="hotel">Hôtel</SelectItem>
                      <SelectItem value="land">Terrain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </SheetContent>
          </Sheet>
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

        {/* Résultats de recherche */}
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-4">
            {filteredProperties.length} bien(s) trouvé(s)
          </p>
        </div>
      </div>
    </section>
  );
};