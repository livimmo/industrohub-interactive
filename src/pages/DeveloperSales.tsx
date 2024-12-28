import { useState } from "react";
import { AdvancedFilters } from "@/components/filters/AdvancedFilters";
import { SAMPLE_PROPERTIES } from "@/data/properties";
import { Badge } from "@/components/ui/badge";
import { PropertyCard } from "@/components/PropertyCard";

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

  // Group properties by project
  const developerProperties = SAMPLE_PROPERTIES.filter(
    (property) => property.listingType === "sale"
  );

  const projectGroups = developerProperties.reduce((acc, property) => {
    const projectName = property.location.split(" - ")[1] || "Autres";
    if (!acc[projectName]) {
      acc[projectName] = [];
    }
    acc[projectName].push(property);
    return acc;
  }, {} as Record<string, typeof SAMPLE_PROPERTIES>);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Ventes Promoteur</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez nos projets immobiliers commerciaux et industriels
          </p>
        </div>

        <AdvancedFilters filters={filters} setFilters={setFilters} />

        <div className="mt-12 space-y-16">
          {Object.entries(projectGroups).map(([projectName, properties]) => (
            <div key={projectName} className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                {projectName}
                <Badge variant="secondary">
                  {properties.length} bien{properties.length > 1 ? "s" : ""}
                </Badge>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeveloperSales;