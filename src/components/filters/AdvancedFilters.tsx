import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Filter, Search } from "lucide-react";
import { toast } from "sonner";
import { NEIGHBORHOODS } from "@/data/neighborhoods";

interface AdvancedFiltersProps {
  filters: {
    city: string;
    location: string;
    propertyType: string;
    minPrice: number;
    maxPrice: number;
    listingType: "sale" | "rent" | "all";
  };
  setFilters: (filters: AdvancedFiltersProps['filters']) => void;
}

const moroccanCities = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Fès",
  "Tanger",
  "Agadir",
  "Meknès",
  "Oujda",
  "Kénitra",
  "Tétouan",
  "El Jadida",
  "Safi",
  "Mohammedia",
  "Khouribga",
  "Béni Mellal",
  "Nador",
  "Taza",
  "Settat"
];

export const AdvancedFilters = ({ filters, setFilters }: AdvancedFiltersProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleSearch = () => {
    toast.success("Recherche lancée");
  };

  const availableNeighborhoods = filters.city && filters.city !== "all" 
    ? NEIGHBORHOODS[filters.city.toLowerCase()] || []
    : [];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filtres Avancés</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-500"
        >
          {isOpen ? "Masquer" : "Afficher"}
        </Button>
      </div>

      {isOpen && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <Label>Type d'annonce</Label>
              <Select
                value={filters.listingType}
                onValueChange={(value) => setFilters({ ...filters, listingType: value as "sale" | "rent" | "all" })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Type d'annonce" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="sale">Vente</SelectItem>
                  <SelectItem value="rent">Location</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Ville</Label>
              <Select
                value={filters.city}
                onValueChange={(value) => {
                  setFilters({ 
                    ...filters, 
                    city: value,
                    location: "all" // Reset location when city changes
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une ville" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les villes</SelectItem>
                  {moroccanCities.map((city) => (
                    <SelectItem key={city} value={city.toLowerCase()}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Quartier</Label>
              <Select
                value={filters.location}
                onValueChange={(value) => setFilters({ ...filters, location: value })}
                disabled={!filters.city || filters.city === "all"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un quartier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les quartiers</SelectItem>
                  {availableNeighborhoods.map((neighborhood) => (
                    <SelectItem key={neighborhood} value={neighborhood.toLowerCase()}>
                      {neighborhood}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Type de bien</Label>
              <Select
                value={filters.propertyType}
                onValueChange={(value) => setFilters({ ...filters, propertyType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="industrial">Industriel</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="office">Bureau</SelectItem>
                  <SelectItem value="warehouse">Entrepôt</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <Label>
              {filters.listingType === "rent" ? "Loyer (MAD/mois)" : "Prix (MAD)"}
            </Label>
            <div className="px-3">
              <Slider
                defaultValue={[filters.minPrice, filters.maxPrice]}
                max={10000000}
                step={100000}
                onValueChange={(value) => {
                  setFilters({
                    ...filters,
                    minPrice: value[0],
                    maxPrice: value[1],
                  });
                }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{filters.minPrice.toLocaleString()} MAD{filters.listingType === "rent" && "/mois"}</span>
              <span>{filters.maxPrice.toLocaleString()} MAD{filters.listingType === "rent" && "/mois"}</span>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => {
                setFilters({
                  city: "all",
                  location: "all",
                  propertyType: "all",
                  minPrice: 0,
                  maxPrice: 10000000,
                  listingType: "all",
                });
                toast.info("Filtres réinitialisés");
              }}
            >
              Réinitialiser
            </Button>
            <Button 
              onClick={handleSearch}
              className="gap-2"
            >
              <Search className="w-4 h-4" />
              Rechercher
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
