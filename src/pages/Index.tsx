import { Hero } from "@/components/Hero";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { ContactButtons } from "@/components/ContactButtons";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturedProperties />
        <ContactButtons />
      </main>
      <Footer />
    </div>
  );
};

export default Index;