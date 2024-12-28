export type Property = {
  id: number;
  title: string;
  price: number;
  size: number;
  type: "factory" | "warehouse" | "office" | "hotel" | "clinic" | "land";
  zoning: string;
  location: string;
  imageUrl: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  listingType: "sale" | "rent";
};