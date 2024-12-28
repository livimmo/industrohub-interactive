export type PropertyType = "factory" | "office" | "hotel" | "land" | "clinic" | "warehouse" | "retail";
export type ZoningType = "i2s1" | "i2" | "i8" | "i7";

export interface Property {
  id: number;
  title: string;
  price: number;
  size: number;
  type: PropertyType;
  zoning: ZoningType;
  location: string;
  imageUrl: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}