import { PropertyCard } from "./PropertyCard";
import { SAMPLE_PROPERTIES } from "@/data/properties";

interface FeaturedPropertiesProps {
  filters?: {
    priceRange: [number, number];
    sizeRange: [number, number];
    type: string;
    zoning: string;
    city: string;
  };
}

export const FeaturedProperties = ({ filters }: FeaturedPropertiesProps = {}) => {
  const filteredProperties = filters
    ? SAMPLE_PROPERTIES.filter((property) => {
        const matchesPrice =
          property.price >= filters.priceRange[0] &&
          property.price <= filters.priceRange[1];

        const matchesSize =
          property.size >= filters.sizeRange[0] &&
          property.size <= filters.sizeRange[1];

        const matchesType =
          filters.type === "all" || property.type === filters.type;

        const matchesZoning =
          filters.zoning === "all" || property.zoning === filters.zoning;

        const matchesCity =
          !filters.city ||
          property.location.toLowerCase().includes(filters.city.toLowerCase());

        return (
          matchesPrice && matchesSize && matchesType && matchesZoning && matchesCity
        );
      })
    : SAMPLE_PROPERTIES;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Biens Disponibles
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de biens industriels et logistiques premium au
            Maroc
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 animate-fade-in-up">
          {filteredProperties.map((property) => (
            <div key={property.id} className="flex">
              <PropertyCard {...property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};