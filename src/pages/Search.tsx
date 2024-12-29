import { useState } from "react";
import { MapSection } from "@/components/MapSection";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { Button } from "@/components/ui/button";
import { Grid, Map } from "lucide-react";

const Search = () => {
  const [view, setView] = useState<"grid" | "map">("grid");
  const [filters, setFilters] = useState({
    priceRange: [0, 10000000] as [number, number],
    sizeRange: [0, 10000] as [number, number],
    type: "all",
    zoning: "all",
    city: "",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Recherche de Biens</h1>
          <div className="flex gap-2">
            <Button
              variant={view === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setView("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "map" ? "default" : "outline"}
              size="icon"
              onClick={() => setView("map")}
            >
              <Map className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {view === "map" ? (
            <MapSection />
          ) : (
            <FeaturedProperties filters={filters} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;