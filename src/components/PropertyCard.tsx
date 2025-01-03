import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Heart, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Property } from "@/types/property";
import { useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type PropertyCardProps = Property;
type SharePlatform = "facebook" | "whatsapp" | "email" | "instagram" | "clipboard";

export const PropertyCard = ({
  id,
  title,
  price,
  size,
  type,
  location,
  imageUrl,
  description,
  listingType,
}: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const pricePerSqm = Math.round(price / size);

  const propertyUrl = `/properties/${id}`;

  const shareOptions: Record<Exclude<SharePlatform, "clipboard">, string> = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + propertyUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} - ${window.location.origin + propertyUrl}`)}`,
    email: `mailto:?subject=${encodeURIComponent(`Découvrez ce bien sur Indupros : ${title}`)}&body=${encodeURIComponent(`Découvrez ce bien immobilier : ${window.location.origin + propertyUrl}`)}`,
    instagram: `https://www.instagram.com/share?url=${encodeURIComponent(window.location.origin + propertyUrl)}`,
  };

  const handleShare = (platform: SharePlatform) => {
    if (platform === 'clipboard') {
      navigator.clipboard.writeText(propertyUrl);
      toast.success("Lien copié dans le presse-papier");
      return;
    }

    window.open(shareOptions[platform], '_blank', 'width=600,height=400');
    toast.success(`Partage sur ${platform} ouvert`);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Retiré des favoris" : "Ajouté aux favoris");
  };

  return (
    <Card className="group w-full h-full overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm">
            {type}
          </Badge>
          <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm">
            {listingType === "sale" ? "Vente" : "Location"}
          </Badge>
        </div>
      </div>
      <div className="p-4 space-y-2 flex-1 flex flex-col">
        <h3 className="font-display text-lg font-semibold line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-500">{location}</p>
        <div className="flex items-center justify-between pt-2 mt-auto">
          <div>
            <p className="font-semibold text-lg">
              {price.toLocaleString()} MAD
              {listingType === "rent" && "/mois"}
            </p>
            <p className="text-sm text-gray-500">
              {pricePerSqm} MAD/m²{listingType === "rent" && "/mois"}
            </p>
          </div>
          <p className="text-sm text-gray-500">{size} m²</p>
        </div>
        <div className="flex gap-2 pt-2">
          <Link to={propertyUrl} className="flex-1">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => handleShare('facebook')}>
                Partager sur Facebook
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare('whatsapp')}>
                Partager sur WhatsApp
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare('instagram')}>
                Partager sur Instagram
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare('email')}>
                Partager par email
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare('clipboard')}>
                Copier le lien
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
};
