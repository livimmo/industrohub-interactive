import { useState, useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { SAMPLE_PROPERTIES } from "@/data/properties";
import { Property } from "@/types/property";
import { PropertyPopup } from "./map/PropertyPopup";
import { Factory, Building2, Hotel, Hospital, LandPlot, Store, Warehouse } from "lucide-react";
import { toast } from "sonner";
import { AdvancedFilters } from "./filters/AdvancedFilters";

const mapContainerStyle = {
  width: "100%",
  height: "600px",
};

const defaultCenter = {
  lat: 31.7917,
  lng: -7.0926,
};

const typeColors = {
  factory: "#FF4B4B",
  office: "#4B70FF",
  hotel: "#FFB74B",
  clinic: "#4BFF4B",
  land: "#8B4513",
  warehouse: "#8B4513",
  retail: "#FF69B4",
};

const typeIcons = {
  factory: Factory,
  office: Building2,
  hotel: Hotel,
  clinic: Hospital,
  land: LandPlot,
  warehouse: Warehouse,
  retail: Store,
};

const typeLabels = {
  factory: "Usine",
  office: "Bureau",
  hotel: "Hôtel",
  clinic: "Clinique",
  land: "Terrain",
  warehouse: "Dépôt",
  retail: "Commerce",
};

export const MapSection = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [filters, setFilters] = useState({
    priceRange: [0, 10000000] as [number, number],
    sizeRange: [0, 10000] as [number, number],
    type: "all",
    zoning: "all",
    city: "",
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBpyx3FTnDuj6a2XEKerIKFt87wxQYRov8",
  });

  const filteredProperties = SAMPLE_PROPERTIES.filter((property) => {
    const matchesPrice = property.price >= filters.priceRange[0] && 
      property.price <= filters.priceRange[1];
    
    const matchesSize = property.size >= filters.sizeRange[0] && 
      property.size <= filters.sizeRange[1];
    
    const matchesType = filters.type === "all" || property.type === filters.type;
    
    const matchesZoning = filters.zoning === "all" || property.zoning === filters.zoning;

    const matchesCity = !filters.city || 
      property.location.toLowerCase().includes(filters.city.toLowerCase());

    return matchesPrice && matchesSize && matchesType && matchesZoning && matchesCity;
  });

  const options = useMemo(() => ({
    disableDefaultUI: false,
    clickableIcons: false,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
    ],
  }), []);

  if (!isLoaded) {
    return <div>Chargement de la carte...</div>;
  }

  return (
    <section className="relative py-12 bg-white">
      <div className="container">
        <h2 className="font-display text-3xl font-bold text-center mb-8">
          Découvrez Nos Biens sur la Carte
        </h2>
        
        <div className="mb-6">
          <AdvancedFilters filters={filters} setFilters={setFilters} />
        </div>

        <div className="relative h-[600px] rounded-xl overflow-hidden shadow-xl">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={7}
            center={mapCenter}
            options={options}
          >
            {filteredProperties.map((property) => (
              <MarkerF
                key={property.id}
                position={{ lat: property.coordinates.lat, lng: property.coordinates.lng }}
                onClick={() => setSelectedProperty(property)}
                icon={{
                  url: `data:image/svg+xml,${encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${typeColors[property.type]}" width="24" height="24">
                      <circle cx="12" cy="12" r="8"/>
                    </svg>
                  `)}`,
                  scaledSize: new window.google.maps.Size(24, 24),
                }}
              />
            ))}

            {selectedProperty && (
              <InfoWindowF
                position={{
                  lat: selectedProperty.coordinates.lat,
                  lng: selectedProperty.coordinates.lng,
                }}
                onCloseClick={() => setSelectedProperty(null)}
              >
                <PropertyPopup property={selectedProperty} />
              </InfoWindowF>
            )}
          </GoogleMap>

          <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg">
            <h3 className="font-semibold mb-2">Types de Biens</h3>
            <div className="space-y-2">
              {Object.entries(typeLabels).map(([type, label]) => {
                const Icon = typeIcons[type as keyof typeof typeIcons];
                return (
                  <div key={type} className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: typeColors[type as keyof typeof typeColors] }}
                    />
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-4">
            {filteredProperties.length} bien(s) trouvé(s)
          </p>
        </div>
      </div>
    </section>
  );
};