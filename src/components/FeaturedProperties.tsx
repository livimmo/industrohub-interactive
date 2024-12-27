import { PropertyCard } from "./PropertyCard";

const SAMPLE_PROPERTIES = [
  {
    id: 1,
    title: "Centre Logistique Moderne Liège",
    price: 2850000,
    size: 8500,
    type: "Logistique",
    location: "Liège - Zone Industrielle",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Entrepôt Premium Anvers",
    price: 4200000,
    size: 12000,
    type: "Logistique",
    location: "Port d'Anvers",
    imageUrl: "https://images.unsplash.com/photo-1565636291760-28d91a6c8f57?auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Plateforme Distribution Gand",
    price: 3100000,
    size: 9500,
    type: "Logistique",
    location: "Gand Port Area",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Hub Logistique Charleroi",
    price: 1950000,
    size: 6200,
    type: "Logistique",
    location: "Aéropole Charleroi",
    imageUrl: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    title: "Centre Distribution Namur",
    price: 2400000,
    size: 7800,
    type: "Logistique",
    location: "Namur Sud",
    imageUrl: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    title: "Complexe Industriel Hasselt",
    price: 3600000,
    size: 11000,
    type: "Industriel",
    location: "Hasselt Nord",
    imageUrl: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80",
  },
  {
    id: 7,
    title: "Parc Logistique Wavre",
    price: 2750000,
    size: 8200,
    type: "Logistique",
    location: "Wavre Business Park",
    imageUrl: "https://images.unsplash.com/photo-1586528116493-da5c7a2e0d1b?auto=format&fit=crop&q=80",
  },
  {
    id: 8,
    title: "Centre Cross-Dock Bruges",
    price: 3900000,
    size: 10500,
    type: "Logistique",
    location: "Port de Zeebrugge",
    imageUrl: "https://images.unsplash.com/photo-1542513217-0b0eedf7005d?auto=format&fit=crop&q=80",
  },
  {
    id: 9,
    title: "Entrepôt Moderne Mons",
    price: 1850000,
    size: 5800,
    type: "Logistique",
    location: "Mons Parc Initialis",
    imageUrl: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80",
  },
  {
    id: 10,
    title: "Hub Distribution Ostende",
    price: 2950000,
    size: 9000,
    type: "Logistique",
    location: "Zone Portuaire Ostende",
    imageUrl: "https://images.unsplash.com/photo-1580983218765-f663bec07b37?auto=format&fit=crop&q=80",
  },
  {
    id: 11,
    title: "Plateforme E-commerce Louvain",
    price: 4100000,
    size: 13000,
    type: "Logistique",
    location: "Louvain Tech Park",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80",
  },
  {
    id: 12,
    title: "Centre Logistique Courtrai",
    price: 2600000,
    size: 7500,
    type: "Logistique",
    location: "Courtrai Business Park",
    imageUrl: "https://images.unsplash.com/photo-1565636291760-28d91a6c8f57?auto=format&fit=crop&q=80",
  },
  {
    id: 13,
    title: "Entrepôt XXL Turnhout",
    price: 3800000,
    size: 11500,
    type: "Logistique",
    location: "Turnhout Industrial",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
  },
  {
    id: 14,
    title: "Hub Transport Malines",
    price: 2850000,
    size: 8800,
    type: "Logistique",
    location: "Malines Nord",
    imageUrl: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80",
  },
  {
    id: 15,
    title: "Centre Distribution Alost",
    price: 2100000,
    size: 6500,
    type: "Logistique",
    location: "Alost Est",
    imageUrl: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80",
  },
  {
    id: 16,
    title: "Plateforme Multi-modal Genk",
    price: 4500000,
    size: 14000,
    type: "Logistique",
    location: "Genk Logistics",
    imageUrl: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80",
  },
  {
    id: 17,
    title: "Entrepôt Frigorifique Nivelles",
    price: 3300000,
    size: 9200,
    type: "Logistique",
    location: "Nivelles Sud",
    imageUrl: "https://images.unsplash.com/photo-1586528116493-da5c7a2e0d1b?auto=format&fit=crop&q=80",
  },
  {
    id: 18,
    title: "Centre Cross-Dock Roulers",
    price: 2900000,
    size: 8700,
    type: "Logistique",
    location: "Roulers West",
    imageUrl: "https://images.unsplash.com/photo-1542513217-0b0eedf7005d?auto=format&fit=crop&q=80",
  },
  {
    id: 19,
    title: "Hub E-commerce Saint-Nicolas",
    price: 3700000,
    size: 10800,
    type: "Logistique",
    location: "Saint-Nicolas Port",
    imageUrl: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80",
  },
  {
    id: 20,
    title: "Plateforme Logistique Termonde",
    price: 2400000,
    size: 7300,
    type: "Logistique",
    location: "Termonde Industrial",
    imageUrl: "https://images.unsplash.com/photo-1580983218765-f663bec07b37?auto=format&fit=crop&q=80",
  },
];

export const FeaturedProperties = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold mb-4">Biens Disponibles</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de biens logistiques et industriels premium à travers la Belgique
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