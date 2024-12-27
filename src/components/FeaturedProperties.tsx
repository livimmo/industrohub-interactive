import { PropertyCard } from "./PropertyCard";
import { SAMPLE_PROPERTIES } from "@/data/properties";

export const FeaturedProperties = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold mb-4">Biens Disponibles</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de biens industriels et logistiques premium au Maroc
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SAMPLE_PROPERTIES.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    </section>
  );
};