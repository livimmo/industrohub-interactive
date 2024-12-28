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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="relative overflow-hidden bg-primary/5 py-24">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10"></div>
        <div className="container relative mx-auto px-4">
          <div className="text-center">
            <h1 className="font-display text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Ventes Promoteur
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Découvrez nos projets immobiliers commerciaux et industriels d'exception
            </p>
          </div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Partenaires Promoteurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DEVELOPERS.map((developer) => (
              <div
                key={developer.id}
                className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative">
                  <img
                    src={developer.logo}
                    alt={developer.name}
                    className="mx-auto h-32 w-32 object-contain mb-6"
                  />
                  <h3 className="text-2xl font-semibold text-center mb-3">{developer.name}</h3>
                  <p className="text-gray-600 text-center">{developer.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12">
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

          <div className="flex justify-end gap-2 mb-8">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="shadow-sm"
            >
              <Grid className="w-4 h-4 mr-2" />
              Grille
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("map")}
              className="shadow-sm"
            >
              <Map className="w-4 h-4 mr-2" />
              Carte
            </Button>
          </div>

          {viewMode === "grid" ? (
            <div className="space-y-24">
              {projectsByDeveloper.map((developer) => (
                <div key={developer.id} className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-6 mb-8 border-b pb-6">
                    <img
                      src={developer.logo}
                      alt={developer.name}
                      className="w-20 h-20 object-contain"
                    />
                    <div>
                      <h2 className="text-3xl font-display font-bold">{developer.name}</h2>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-sm">
                          {developer.projects.length} projet{developer.projects.length > 1 ? "s" : ""}
                        </Badge>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-500">{developer.description}</span>
                      </div>
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
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <MapSection />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DeveloperSales;