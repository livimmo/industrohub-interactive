import { Property } from "@/types/property";

export const SAMPLE_PROPERTIES: Property[] = [
  {
    id: 1,
    title: "Centre Logistique Moderne Casablanca",
    price: 2850000,
    size: 8500,
    type: "factory",
    zoning: "i2s1",
    location: "Zone Industrielle Ain Sebaa",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80",
    description: "Centre logistique moderne situé dans la zone industrielle d'Ain Sebaa. Équipé des dernières technologies.",
    coordinates: { lat: 33.5731, lng: -7.5898 }
  },
  {
    id: 2,
    title: "Bureaux Premium Rabat",
    price: 4200000,
    size: 1200,
    type: "office",
    zoning: "i2",
    location: "Hay Riad, Rabat",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
    description: "Espace de bureaux premium au cœur de Hay Riad. Vue panoramique, parking souterrain et services haut de gamme.",
    coordinates: { lat: 34.0209, lng: -6.8416 }
  },
  {
    id: 3,
    title: "Hôtel Luxe Marrakech",
    price: 7500000,
    size: 5000,
    type: "hotel",
    location: "Marrakech",
    imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&q=80",
    description: "Hôtel de luxe avec vue sur l'Atlas, piscine, spa et restaurants gastronomiques.",
    coordinates: { lat: 31.6295, lng: -7.9811 }
  },
  {
    id: 4,
    title: "Terrain Industriel Tanger",
    price: 1500000,
    size: 10000,
    type: "land",
    location: "Zone Franche Tanger",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80",
    description: "Terrain industriel situé dans la zone franche de Tanger, idéal pour le développement d'activités industrielles.",
    coordinates: { lat: 35.7820, lng: -5.8340 }
  },
  {
    id: 5,
    title: "Clinique Moderne Agadir",
    price: 6800000,
    size: 3500,
    type: "clinic",
    location: "Agadir",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80",
    description: "Clinique moderne équipée des dernières technologies médicales.",
    coordinates: { lat: 30.4278, lng: -9.5981 }
  },
  {
    id: 6,
    title: "Usine Textile Fès",
    price: 3200000,
    size: 6000,
    type: "factory",
    location: "Zone Industrielle Fès",
    imageUrl: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80",
    description: "Usine moderne dédiée à l'industrie textile.",
    coordinates: { lat: 34.0331, lng: -5.0033 }
  }
];

// Fonction utilitaire pour générer des coordonnées aléatoires au Maroc
export const generateRandomMarocCoordinates = () => {
  // Limites plus précises du Maroc continental
  const minLat = 27.6666; // Sud (frontière Mauritanie)
  const maxLat = 35.9222; // Nord (Tanger)
  const minLng = -13.1683; // Ouest (côte Atlantique)
  const maxLng = -1.0083; // Est (frontière Algérie)
  
  // Fonction pour vérifier si un point est dans une zone maritime
  const isInSea = (lat: number, lng: number) => {
    // Coordonnées approximatives de la côte marocaine
    const coastLine = [
      { lat: 35.9, lng: -5.5 }, // Tanger
      { lat: 34.0, lng: -6.8 }, // Rabat
      { lat: 33.6, lng: -7.6 }, // Casablanca
      { lat: 32.3, lng: -9.2 }, // El Jadida
      { lat: 30.4, lng: -9.6 }, // Agadir
      { lat: 28.5, lng: -11.3 }, // Sud
    ];
    
    // Vérifie si le point est à l'ouest de la côte (dans l'océan)
    for (let i = 0; i < coastLine.length - 1; i++) {
      const point1 = coastLine[i];
      const point2 = coastLine[i + 1];
      
      if (lat >= point2.lat && lat <= point1.lat) {
        const slope = (point2.lng - point1.lng) / (point2.lat - point1.lat);
        const coastLng = point1.lng + slope * (lat - point1.lat);
        if (lng < coastLng) return true;
      }
    }
    return false;
  };
  
  let lat, lng;
  do {
    lat = minLat + Math.random() * (maxLat - minLat);
    lng = minLng + Math.random() * (maxLng - minLng);
  } while (isInSea(lat, lng));
  
  return { lat, lng };
};

// Générer le reste des propriétés aléatoirement
for (let i = 7; i < 30; i++) {
  const types: Property["type"][] = ["factory", "office", "hotel", "land", "warehouse", "retail"];
  const zonings: Property["zoning"][] = ["i2s1", "i2", "i8", "i7"];
  const randomType = types[Math.floor(Math.random() * types.length)];
  const randomZoning = zonings[Math.floor(Math.random() * zonings.length)];
  const coordinates = generateRandomMarocCoordinates();
  
  SAMPLE_PROPERTIES.push({
    id: i,
    title: `Propriété ${i}`,
    price: Math.floor(Math.random() * 9000000) + 1000000,
    size: Math.floor(Math.random() * 9000) + 1000,
    type: randomType,
    zoning: randomZoning,
    location: "Maroc",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
    description: `Description de la propriété ${i}`,
    coordinates
  });
}

export default SAMPLE_PROPERTIES;