import { Hero } from "@/components/Hero";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { ContactButtons } from "@/components/ContactButtons";
import { MapSection } from "@/components/MapSection";
import { PromoSlider } from "@/components/PromoSlider";

const Index = () => {
  return (
    <>
      <Hero />
      <PromoSlider />
      <MapSection />
      <FeaturedProperties />
      <ContactButtons />
    </>
  );
};

export default Index;