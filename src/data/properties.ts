import { Property } from "@/types/property";

export const SAMPLE_PROPERTIES: Property[] = [
  {
    id: 1,
    title: "Entrepôt Moderne Lissasfa",
    description: "Grand entrepôt moderne avec quais de chargement",
    price: 2500000,
    size: 1200,
    type: "warehouse",
    location: "Lissasfa - Casablanca",
    imageUrl: "/placeholder.svg",
    coordinates: {
      lat: 33.5505,
      lng: -7.6589
    },
    listingType: "sale",
    developer: "Tanger Med Zones"
  },
  {
    id: 2,
    title: "Usine Ain Sebaa",
    description: "Usine moderne avec bureaux intégrés",
    price: 15000,
    size: 800,
    type: "factory",
    location: "Ain Sebaa - Casablanca",
    imageUrl: "/placeholder.svg",
    coordinates: {
      lat: 33.6139,
      lng: -7.5323
    },
    listingType: "rent",
    developer: "CFG Développement"
  },
  {
    id: 3,
    title: "Bureaux Premium Marina",
    description: "Espace de bureaux moderne avec vue sur mer",
    price: 35000,
    size: 450,
    type: "office",
    location: "Marina - Casablanca",
    imageUrl: "/placeholder.svg",
    coordinates: {
      lat: 33.6067,
      lng: -7.6319
    },
    listingType: "rent",
    developer: "MEDZ"
  },
  {
    id: 4,
    title: "Local Commercial Maarif",
    description: "Local commercial bien situé",
    price: 1800000,
    size: 120,
    type: "retail",
    location: "Maarif - Casablanca",
    imageUrl: "/placeholder.svg",
    coordinates: {
      lat: 33.5889,
      lng: -7.6362
    },
    listingType: "sale",
    developer: "Tanger Med Zones"
  },
  {
    id: 5,
    title: "Terrain Industriel Zenata",
    description: "Terrain viabilisé en zone industrielle",
    price: 4500000,
    size: 2000,
    type: "land",
    location: "Zenata - Casablanca",
    imageUrl: "/placeholder.svg",
    coordinates: {
      lat: 33.6500,
      lng: -7.5167
    },
    listingType: "sale",
    developer: "CFG Développement"
  },
  {
    id: 6,
    title: "Clinique Moderne Anfa",
    description: "Clinique équipée aux normes internationales",
    price: 45000,
    size: 600,
    type: "clinic",
    location: "Anfa - Casablanca",
    imageUrl: "/placeholder.svg",
    coordinates: {
      lat: 33.5731,
      lng: -7.6326
    },
    listingType: "rent",
    developer: "MEDZ"
  },
  {
    id: 7,
    title: "Hôtel Bord de Mer",
    description: "Hôtel 4 étoiles en bord de mer",
    price: 8500000,
    size: 1500,
    type: "hotel",
    location: "Ain Diab - Casablanca",
    imageUrl: "/placeholder.svg",
    coordinates: {
      lat: 33.5989,
      lng: -7.6706
    },
    listingType: "sale",
    developer: "Tanger Med Zones"
  },
  {
    id: 8,
    title: "Entrepôt Logistique Nouaceur",
    description: "Entrepôt logistique près de l'aéroport",
    price: 25000,
    size: 1800,
    type: "warehouse",
    location: "Nouaceur - Casablanca",
    imageUrl: "/placeholder.svg",
    coordinates: {
      lat: 33.3678,
      lng: -7.5892
    },
    listingType: "rent",
    developer: "CFG Développement"
  }
];