import { PropertyCard } from "./PropertyCard";

const SAMPLE_PROPERTIES = [
  {
    id: 1,
    title: "Modern Industrial Complex",
    price: 1250000,
    size: 2500,
    type: "Industrial",
    location: "Brussels Business Park",
    imageUrl: "https://images.unsplash.com/photo-1565636291760-28d91a6c8f57?auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Premium Office Space",
    price: 890000,
    size: 1800,
    type: "Commercial",
    location: "Antwerp City Center",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Warehouse & Distribution Center",
    price: 2100000,
    size: 5000,
    type: "Industrial",
    location: "Ghent Port Area",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80",
  },
];

export const FeaturedProperties = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold mb-4">Featured Properties</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our handpicked selection of premium industrial and commercial properties
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