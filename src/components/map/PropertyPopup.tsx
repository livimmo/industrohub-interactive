import { Property } from "@/types/property";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Eye, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PropertyPopupProps {
  property: Property;
}

export const PropertyPopup = ({ property }: PropertyPopupProps) => {
  const propertyUrl = `${window.location.origin}/property/${property.id}`;

  const shareOptions = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(propertyUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${property.title} - ${propertyUrl}`)}`,
    email: `mailto:?subject=${encodeURIComponent(`Découvrez ce bien sur Indupros : ${property.title}`)}&body=${encodeURIComponent(`Découvrez ce bien immobilier : ${propertyUrl}`)}`,
    instagram: `https://www.instagram.com/share?url=${encodeURIComponent(propertyUrl)}`,
  };

  const handleShare = (platform: keyof typeof shareOptions) => {
    if (platform === 'clipboard') {
      navigator.clipboard.writeText(propertyUrl);
      toast.success("Lien copié dans le presse-papier");
      return;
    }

    window.open(shareOptions[platform], '_blank', 'width=600,height=400');
    toast.success(`Partage sur ${platform} ouvert`);
  };

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Share2 className="w-4 h-4" />
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
    </Card>
  );
};