import { Hero } from "@/components/Hero";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { ContactButtons } from "@/components/ContactButtons";
import { MapSection } from "@/components/MapSection";

const Index = () => {
  return (
    <>
      <Hero />
      <MapSection />
      <FeaturedProperties />
      <ContactButtons />
    </>
  );
};

export default Index;