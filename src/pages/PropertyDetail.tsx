import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Share2, MapPin } from "lucide-react";
import { SAMPLE_PROPERTIES } from "@/data/properties";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useMemo } from "react";

const PropertyDetail = () => {
  const { id } = useParams();
  const property = SAMPLE_PROPERTIES.find((p) => p.id === Number(id));

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBpyx3FTnDuj6a2XEKerIKFt87wxQYRov8",
  });

  const center = useMemo(
    () => property?.coordinates || { lat: 33.5731, lng: -7.5898 },
    [property]
  );

  if (!property) {
    return <div className="container py-8">Bien non trouvé</div>;
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-[400px] object-cover rounded-lg"
          />
          <div className="flex gap-4 mt-4">
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{property.title}</h1>
          <p className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4" />
            {property.location}
          </p>
          <div className="flex gap-4">
            <div>
              <p className="text-sm text-gray-500">Prix</p>
              <p className="font-semibold">{property.price.toLocaleString()} MAD</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Surface</p>
              <p className="font-semibold">{property.size} m²</p>
            </div>
          </div>
          <p className="text-gray-600">{property.description}</p>
          {isLoaded && (
            <div className="h-[300px] rounded-lg overflow-hidden">
              <GoogleMap
                zoom={15}
                center={center}
                mapContainerClassName="w-full h-full"
              >
                <MarkerF position={center} />
              </GoogleMap>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;