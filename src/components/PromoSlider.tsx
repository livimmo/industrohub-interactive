import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { AuthDialog } from "./auth/AuthDialog";
import { useState } from "react";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    title: "Flash Vente ! 🔥",
    description: "Profitez de -20% sur les espaces industriels premium",
    cta: "J'en profite",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    title: "Nouveau sur Indupros ?",
    description: "Inscrivez-vous et recevez des offres exclusives",
    cta: "S'inscrire",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1486328228599-85db4443971f",
    title: "Service Premium",
    description: "Accédez à notre catalogue VIP d'espaces industriels",
    cta: "Découvrir",
  },
];

export const PromoSlider = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  return (
    <>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-screen-2xl mx-auto mb-12"
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                  }}
                >
                  <div className="absolute inset-0 bg-black/40" />
                </div>
                <div className="relative h-full flex flex-col justify-center items-center text-center text-white p-6">
                  <h3 className="text-4xl font-bold mb-4 animate-fade-in">
                    {slide.title}
                  </h3>
                  <p className="text-xl mb-8 max-w-xl animate-fade-in">
                    {slide.description}
                  </p>
                  <Button
                    onClick={() => setShowAuthDialog(true)}
                    size="lg"
                    className="bg-white text-black hover:bg-gray-100 animate-fade-in-up"
                  >
                    {slide.cta}
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </>
  );
};