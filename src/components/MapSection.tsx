import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import { useState, useMemo } from "react";

const properties = [
  {
    id: 1,
    position: { lat: 33.5731, lng: -7.5898 }, // Casablanca
    title: "Entrepôt Moderne",
    price: 2500000,
    size: 500,
  },
  {
    id: 2,
    position: { lat: 34.0209, lng: -6.8416 }, // Rabat
    title: "Local Commercial",
    price: 1800000,
    size: 300,
  },
];

export const MapSection = () => {
  const [selectedProperty, setSelectedProperty] = useState<null | typeof properties[0]>(null);

  const center = useMemo(() => ({ lat: 33.5731, lng: -7.5898 }), []); // Centré sur Casablanca

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // À remplacer par votre clé API Google Maps
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
            {properties.map((property) => (
              <MarkerF
                key={property.id}
                position={property.position}
                onClick={() => setSelectedProperty(property)}
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