import { Search, Filter, X, MapPin } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Filters } from "./types";
import { toast } from "sonner";

interface SearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  onGeolocate: (lat: number, lng: number) => void;
}

export const SearchFilters = ({
  searchQuery,
  setSearchQuery,
  filters,
  setFilters,
  isFilterOpen,
  setIsFilterOpen,
  onGeolocate,
}: SearchFiltersProps) => {
  const handleGeolocate = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onGeolocate(latitude, longitude);
          toast.success("Localisation réussie");
        },
        (error) => {
          console.error("Erreur de géolocalisation:", error);
          toast.error("Erreur lors de la géolocalisation");
        }
      );
    } else {
      toast.error("La géolocalisation n'est pas supportée par votre navigateur");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Rechercher par localisation, type de bien..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => setSearchQuery("")}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <Button
        variant="outline"
        className="gap-2"
        onClick={handleGeolocate}
      >
        <MapPin className="w-4 h-4" />
        Me localiser
      </Button>
      
      <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filtres
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full md:max-w-md">
          <SheetHeader>
            <SheetTitle>Filtres Avancés</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            <div className="space-y-4">
              <Label>Ville</Label>
              <Input
                placeholder="Entrez une ville"
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              />
            </div>

            <div className="space-y-4">
              <Label>Localisation</Label>
              <Input
                placeholder="Entrez une localisation précise"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              />
            </div>

            <div className="space-y-4">
              <Label>Prix (MAD)</Label>
              <Slider
                defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
                max={10000000}
                step={100000}
                onValueChange={(value) => setFilters({ ...filters, priceRange: value as [number, number] })}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>{filters.priceRange[0].toLocaleString()} MAD</span>
                <span>{filters.priceRange[1].toLocaleString()} MAD</span>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Superficie (m²)</Label>
              <Slider
                defaultValue={[filters.sizeRange[0], filters.sizeRange[1]]}
                max={10000}
                step={100}
                onValueChange={(value) => setFilters({ ...filters, sizeRange: value as [number, number] })}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>{filters.sizeRange[0]} m²</span>
                <span>{filters.sizeRange[1]} m²</span>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Type de bien</Label>
              <Select
                value={filters.type}
                onValueChange={(value) => setFilters({ ...filters, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="factory">Usine</SelectItem>
                  <SelectItem value="office">Bureau</SelectItem>
                  <SelectItem value="hotel">Hôtel</SelectItem>
                  <SelectItem value="clinic">Clinique</SelectItem>
                  <SelectItem value="land">Terrain</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};