import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Heart, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Property } from "@/types/property";
import { useState } from "react";
import { toast } from "sonner";

type PropertyCardProps = Property;

export const PropertyCard = ({
  id,
  title,
  price,
  size,
  type,
  location,
  imageUrl,
  description,
}: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: `Découvrez ${title} sur Indupros`,
        url: `${window.location.origin}/property/${id}`,
      }).catch(() => {
        toast.error("Erreur lors du partage");
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/property/${id}`);
      toast.success("Lien copié dans le presse-papier");
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Retiré des favoris" : "Ajouté aux favoris");
  };

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
          <p className="font-semibold text-lg">{price.toLocaleString()} MAD</p>
          <p className="text-sm text-gray-500">{size} m²</p>
        </div>
        <div className="flex gap-2 pt-2">
          <Link to={`/property/${id}`} className="flex-1">
            <Button className="w-full gap-2">
              <Eye className="h-4 w-4" />
              Voir le bien
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="icon"
            onClick={toggleFavorite}
            className={isFavorite ? "text-red-500 hover:text-red-600" : ""}
          >
            <Heart className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
          </Button>
          <Button variant="outline" size="icon" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};