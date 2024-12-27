import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  title: string;
  price: number;
  size: number;
  type: string;
  location: string;
  imageUrl: string;
}

export const PropertyCard = ({
  title,
  price,
  size,
  type,
  location,
  imageUrl,
}: PropertyCardProps) => {
  return (
    <Card className="group overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <Badge className="absolute top-4 left-4 bg-white/90 text-gray-900 backdrop-blur-sm">
          {type}
        </Badge>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-display text-xl font-semibold truncate">{title}</h3>
        <p className="text-sm text-gray-500">{location}</p>
        <div className="flex items-center justify-between pt-2">
          <p className="font-semibold text-lg">€{price.toLocaleString()}</p>
          <p className="text-sm text-gray-500">{size} m²</p>
        </div>
      </div>
    </Card>
  );
};