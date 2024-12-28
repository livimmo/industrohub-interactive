import { MapSection } from "@/components/MapSection";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { useState } from "react";

const Properties = () => {
  const [filters, setFilters] = useState({
    priceRange: [0, 10000000] as [number, number],
    sizeRange: [0, 10000] as [number, number],
    type: "all",
    zoning: "all",
    city: "",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Nos Biens Disponibles</h1>
        <div className="space-y-8">
          <MapSection />
          <FeaturedProperties />
        </div>
      </div>
    </div>
  );
};

export default Properties;