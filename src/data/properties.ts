import { Property } from "@/types/property";

export const SAMPLE_PROPERTIES: Property[] = [
  {
    id: 1,
    title: "Centre Logistique Moderne Casablanca",
    price: 2850000,
    size: 8500,
    type: "factory",
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
    imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGhvdGVsfGVufDB8fHx8MTYyMjY5MjY5NQ&ixlib=rb-1.2.1&q=80&w=1080",
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
    imageUrl: "https://images.unsplash.com/photo-1568605111620-0c7c4c1c1c1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHRlcnJhaW58ZW58MHx8fHwxNjIyNjkyNzA0&ixlib=rb-1.2.1&q=80&w=1080",
    description: "Terrain industriel situé dans la zone franche de Tanger, idéal pour le développement d'activités industrielles.",
    coordinates: { lat: 35.7820, lng: -5.8340 }
  }
];