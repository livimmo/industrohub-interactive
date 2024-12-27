import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Share2, MapPin, FileText, Calendar } from "lucide-react";
import { SAMPLE_PROPERTIES } from "@/data/properties";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useMemo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  // Images supplémentaires pour la galerie (simulation)
  const additionalImages = [
    property?.imageUrl,
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80",
  ];

  if (!property) {
    return <div className="container py-8">Bien non trouvé</div>;
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 gap-8">
        {/* Galerie d'images */}
        <Carousel className="w-full">
          <CarouselContent>
            {additionalImages.map((image, index) => (
              <CarouselItem key={index}>
                <img
                  src={image}
                  alt={`Vue ${index + 1} de ${property.title}`}
                  className="w-full h-[500px] object-cover rounded-lg"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{property.title}</h1>
            <p className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              {property.location}
            </p>
            <div className="flex gap-4">
              <div>
                <p className="text-sm text-gray-500">Prix</p>
                <p className="font-semibold">
                  {property.price.toLocaleString()} MAD
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Surface</p>
                <p className="font-semibold">{property.size} m²</p>
              </div>
            </div>
            <p className="text-gray-600">{property.description}</p>
            <div className="flex gap-4">
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Section des documents */}
          <Card>
            <CardHeader>
              <CardTitle>Documents disponibles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2" />
                  Note de renseignement
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2" />
                  Plan cadastral
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2" />
                  Plan de contenance
                </Button>
              </div>
              <div className="space-y-4 pt-4 border-t">
                <Button className="w-full">
                  <FileText className="mr-2" />
                  Demander d'autres documents
                </Button>
                <Button variant="secondary" className="w-full">
                  <Calendar className="mr-2" />
                  Réserver une visite
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

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
  );
};

export default PropertyDetail;