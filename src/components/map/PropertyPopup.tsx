import { Property } from "@/types/property";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Eye, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

interface PropertyPopupProps {
  property: Property;
  onShare: () => void;
}

export const PropertyPopup = ({ property, onShare }: PropertyPopupProps) => {
  return (
    <Card className="w-[300px] p-4">
      <img 
        src={property.imageUrl} 
        alt={property.title} 
        className="w-full h-32 object-cover rounded-lg mb-2"
      />
      <h3 className="font-semibold text-lg mb-1">{property.title}</h3>
      <p className="text-gray-600 text-sm mb-1">{property.location}</p>
      <div className="flex justify-between items-center text-sm mb-2">
        <span className="font-medium">{property.price.toLocaleString()} MAD</span>
        <span>{property.size} m²</span>
      </div>
      <div className="flex gap-2">
        <Link to={`/property/${property.id}`} className="flex-1">
          <Button className="w-full gap-2">
            <Eye className="w-4 h-4" />
            Voir le bien
          </Button>
        </Link>
        <Button variant="outline" size="icon" onClick={onShare}>
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};