import { SearchBar } from "./SearchBar";

export const Hero = () => {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/lovable-uploads/397310e3-d5ef-420f-81b6-5f2fd7f9fa75.png')",
        }}
      >
        <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" />
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
          Trouvez Votre Espace Industriel Idéal
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in">
          Découvrez des biens industriels et commerciaux premium adaptés aux besoins de votre entreprise
        </p>
        <div className="animate-fade-in-up">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};