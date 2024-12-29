import { useState, useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { SAMPLE_PROPERTIES } from "@/data/properties";
import { Property } from "@/types/property";
import { PropertyPopup } from "./map/PropertyPopup";
import { Factory, Building2, Hotel, Hospital, LandPlot, Store, Warehouse } from "lucide-react";
import { toast } from "sonner";
import { AdvancedFilters } from "./filters/AdvancedFilters";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

type Filters = {
  priceRange: [number, number];
  sizeRange: [number, number];
  type: string;
  zoning: string;
  city: string;
  location: string;
  listingType: "sale" | "rent" | "all";
};

export const MapSection = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 10000000],
    sizeRange: [0, 10000],
    type: "all",
    zoning: "all",
    city: "",
    location: "all",
    listingType: "all",
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

    const matchesCity = !filters.city || filters.city === "all" || 
      property.location.toLowerCase().includes(filters.city.toLowerCase());

    const matchesLocation = !filters.location || filters.location === "all" || 
      property.location.toLowerCase().includes(filters.location.toLowerCase());

    const matchesListingType = filters.listingType === "all" || 
      property.listingType === filters.listingType;

    return matchesPrice && matchesSize && matchesType && matchesZoning && 
           matchesCity && matchesLocation && matchesListingType;
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
          <AdvancedFilters 
            filters={{
              city: filters.city,
              location: filters.location,
              propertyType: filters.type,
              minPrice: filters.priceRange[0],
              maxPrice: filters.priceRange[1],
              minSize: filters.sizeRange[0],
              maxSize: filters.sizeRange[1],
              listingType: filters.listingType,
            }} 
            setFilters={(newFilters) => {
              setFilters(prev => ({
                ...prev,
                city: newFilters.city,
                location: newFilters.location,
                type: newFilters.propertyType,
                priceRange: [newFilters.minPrice, newFilters.maxPrice],
                sizeRange: [newFilters.minSize, newFilters.maxSize],
                listingType: newFilters.listingType,
              }));
            }}
          />
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

          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg">
            <Accordion type="single" collapsible defaultValue="legend" className="w-64">
              <AccordionItem value="legend" className="border-none">
                <AccordionTrigger className="px-4 py-2 hover:no-underline">
                  Types de Biens
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
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
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
