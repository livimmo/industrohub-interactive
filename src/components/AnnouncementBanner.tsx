import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const announcements = [
  {
    id: 1,
    type: "Nouveau",
    message: "Découvrez notre nouvelle zone industrielle à Tanger",
  },
  {
    id: 2,
    type: "Promotion",
    message: "Offre spéciale sur les entrepôts à Casablanca",
  },
  {
    id: 3,
    type: "Info",
    message: "Ouverture prochaine d'un nouveau parc logistique",
  },
];

export const AnnouncementBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 py-2">
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full max-w-screen-xl mx-auto"
      >
        <CarouselContent>
          {announcements.map((announcement) => (
            <CarouselItem key={announcement.id} className="basis-full">
              <div className="flex items-center justify-center gap-3 text-center px-4">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                <Badge variant="secondary" className="bg-primary/10">
                  {announcement.type}
                </Badge>
                <p className="text-sm md:text-base font-medium">
                  {announcement.message}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};