import { SearchBar } from "./SearchBar";

export const Hero = () => {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/40 backdrop-blur-[2px]" />
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in drop-shadow-lg">
          Trouvez Votre Espace Industriel Idéal au Maroc
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in drop-shadow">
          Découvrez des biens industriels et commerciaux premium adaptés aux besoins de votre entreprise à travers le Royaume
        </p>
        <div className="animate-fade-in-up">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};