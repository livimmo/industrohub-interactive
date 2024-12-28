import { useState } from "react";
import { AdvancedFilters } from "@/components/filters/AdvancedFilters";
import { SAMPLE_PROPERTIES } from "@/data/properties";
import { Badge } from "@/components/ui/badge";
import { PropertyCard } from "@/components/PropertyCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapSection } from "@/components/MapSection";
import { Button } from "@/components/ui/button";
import { Grid, Map } from "lucide-react";

// Mock data for developers - in real app, this would come from your backend
const DEVELOPERS = [
  {
    id: 1,
    name: "Tanger Med Zones",
    logo: "/placeholder.svg",
    description: "Leader des zones industrielles au Maroc",
  },
  {
    id: 2,
    name: "CFG Développement",
    logo: "/placeholder.svg",
    description: "Développeur immobilier de référence",
  },
  {
    id: 3,
    name: "MEDZ",
    logo: "/placeholder.svg",
    description: "Aménageur-développeur",
  },
];

const DeveloperSales = () => {
  const [filters, setFilters] = useState({
    city: "all",
    location: "all",
    propertyType: "all",
    minPrice: 0,
    maxPrice: 10000000,
    listingType: "sale" as const,
    minSize: 0,
    maxSize: 10000,
  });

  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  // Group properties by developer
  const developerProperties = SAMPLE_PROPERTIES.filter(
    (property) => property.listingType === "sale"
  );

  const projectsByDeveloper = DEVELOPERS.map(developer => ({
    ...developer,
    projects: developerProperties.filter(
      property => property.developer === developer.name
    ),
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Ventes Promoteur</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez nos projets immobiliers commerciaux et industriels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {DEVELOPERS.map((developer) => (
            <div
              key={developer.id}
              className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center"
            >
              <img
                src={developer.logo}
                alt={developer.name}
                className="w-32 h-32 object-contain mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{developer.name}</h3>
              <p className="text-gray-600">{developer.description}</p>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <AdvancedFilters 
            filters={{
              city: filters.city,
              location: filters.location,
              propertyType: filters.propertyType,
              minPrice: filters.minPrice,
              maxPrice: filters.maxPrice,
              listingType: filters.listingType,
              minSize: filters.minSize,
              maxSize: filters.maxSize,
            }} 
            setFilters={(newFilters) => {
              setFilters(prev => ({
                ...prev,
                ...newFilters,
                listingType: "sale",
              }));
            }}
          />
        </div>

        <div className="flex justify-end gap-2 mb-4">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="w-4 h-4 mr-2" />
            Grille
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("map")}
          >
            <Map className="w-4 h-4 mr-2" />
            Carte
          </Button>
        </div>

        {viewMode === "grid" ? (
          <div className="space-y-16">
            {projectsByDeveloper.map((developer) => (
              <div key={developer.id} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={developer.logo}
                    alt={developer.name}
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <h2 className="text-2xl font-semibold">{developer.name}</h2>
                    <Badge variant="secondary">
                      {developer.projects.length} projet{developer.projects.length > 1 ? "s" : ""}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {developer.projects.map((property) => (
                    <PropertyCard key={property.id} {...property} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <MapSection />
          </div>
        )}
      </div>
    </div>
  );
};

export default DeveloperSales;