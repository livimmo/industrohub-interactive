import { Hero } from "@/components/Hero";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { ContactButtons } from "@/components/ContactButtons";
import { MapSection } from "@/components/MapSection";
import { PromoSlider } from "@/components/PromoSlider";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <>
      <Hero />
      <PromoSlider />
      <div className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Projets Commercialisés par Indupros
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Découvrez notre sélection exclusive de projets immobiliers commerciaux
            et industriels. Des opportunités uniques pour votre investissement.
          </p>
          <Link to="/developer-sales">
            <Button size="lg" className="gap-2">
              <Building2 className="w-5 h-5" />
              Voir nos projets promoteur
            </Button>
          </Link>
        </div>
      </div>
      <MapSection />
      <FeaturedProperties />
      <ContactButtons />
    </>
  );
};

export default Index;