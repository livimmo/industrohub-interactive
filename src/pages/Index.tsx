import { Hero } from "@/components/Hero";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { ContactButtons } from "@/components/ContactButtons";

const Index = () => {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <FeaturedProperties />
      <ContactButtons />
    </main>
  );
};

export default Index;