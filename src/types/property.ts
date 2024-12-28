export type Property = {
  id: number;
  title: string;
  description: string;
  price: number;
  size: number;
  type: "factory" | "office" | "hotel" | "clinic" | "land" | "warehouse" | "retail";
  location: string;
  imageUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  listingType: "sale" | "rent";
  zoning?: string;
  developer?: string;
};