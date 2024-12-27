import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import { useState, useMemo } from "react";
import { SAMPLE_PROPERTIES } from "@/data/properties";
import { Property } from "@/types/property";

const getIconUrl = (type: Property["type"]) => {
  switch (type) {
    case "factory":
      return "/icons/factory.png";
    case "office":
      return "/icons/office.png";
    case "hotel":
      return "/icons/hotel.png";
    case "land":
      return "/icons/land.png";
    default:
      return "/icons/default.png";
  }
};

export const MapSection = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const center = useMemo(() => ({ lat: 33.5731, lng: -7.5898 }), []); // Centré sur Casablanca

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBpyx3FTnDuj6a2XEKerIKFt87wxQYRov8",
  });

  if (!isLoaded) {
    return <div className="h-[500px] flex items-center justify-center bg-gray-100">Chargement de la carte...</div>;
  }

  return (
    <section className="py-12 bg-white">
      <div className="container">
        <h2 className="font-display text-3xl font-bold text-center mb-8">
          Découvrez Nos Biens sur la Carte
        </h2>
        <div className="h-[500px] rounded-xl overflow-hidden shadow-xl">
          <GoogleMap
            zoom={7}
            center={center}
            mapContainerClassName="w-full h-full"
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: true,
            }}
          >
            {SAMPLE_PROPERTIES.map((property) => (
              <MarkerF
                key={property.id}
                position={property.coordinates}
                onClick={() => setSelectedProperty(property)}
                icon={{
                  url: getIconUrl(property.type),
                  scaledSize: new window.google.maps.Size(32, 32),
                }}
              />
            ))}
          </GoogleMap>
        </div>
        {selectedProperty && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
            <h3 className="font-semibold text-lg">{selectedProperty.title}</h3>
            <p className="text-gray-600">
              {selectedProperty.price.toLocaleString()} MAD | {selectedProperty.size} m²
            </p>
          </div>
        )}
      </div>
    </section>
  );
};