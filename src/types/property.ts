export type PropertyType = "factory" | "office" | "hotel" | "land" | "clinic";

export interface Property {
  id: number;
  title: string;
  price: number;
  size: number;
  type: PropertyType;
  location: string;
  imageUrl: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}