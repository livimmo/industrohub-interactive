import { useState, useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { SAMPLE_PROPERTIES } from "@/data/properties";
import { Property } from "@/types/property";
import { Card } from "./ui/card";
import { SearchFilters } from "./map/SearchFilters";
import { PropertyMarkerIcon } from "./map/PropertyMarker";
import { PropertyPopup } from "./map/PropertyPopup";
import { Filters } from "./map/types";

const mapContainerStyle = {
  width: "100%",
  height: "600px",
};

const defaultCenter = {
  lat: 33.5731,
  lng: -7.5898,
};

export const MapSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 10000000],
    sizeRange: [0, 10000],
    type: "all",
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBpyx3FTnDuj6a2XEKerIKFt87wxQYRov8",
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
        
        <SearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filters={filters}
          setFilters={setFilters}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />

        <div className="relative h-[600px] rounded-xl overflow-hidden shadow-xl">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={7}
            center={defaultCenter}
            options={options}
          >
            {filteredProperties.map((property) => (
              <MarkerF
                key={property.id}
                position={{ lat: property.coordinates.lat, lng: property.coordinates.lng }}
                onClick={() => setSelectedProperty(property)}
                icon={{
                  url: `data:image/svg+xml,${encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${
                      property.type === "factory" ? "#FF4B4B" :
                      property.type === "office" ? "#4B70FF" :
                      property.type === "hotel" ? "#FFB74B" :
                      property.type === "clinic" ? "#4BFF4B" :
                      property.type === "land" ? "#8B4513" :
                      "#666666"
                    }" width="32" height="32">
                      <circle cx="12" cy="12" r="12"/>
                    </svg>
                  `)}`,
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
        </div>

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