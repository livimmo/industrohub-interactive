import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { ListingTypeFilter } from "./ListingTypeFilter";
import { LocationFilter } from "./LocationFilter";
import { PropertyTypeFilter } from "./PropertyTypeFilter";
import { PriceFilter } from "./PriceFilter";
import { SizeFilter } from "./SizeFilter";

interface AdvancedFiltersProps {
  filters: {
    city: string;
    location: string;
    propertyType: string;
    minPrice: number;
    maxPrice: number;
    listingType: "sale" | "rent" | "all";
    minSize: number;
    maxSize: number;
  };
  setFilters: (filters: AdvancedFiltersProps['filters']) => void;
}

export const AdvancedFilters = ({ filters, setFilters }: AdvancedFiltersProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleSearch = () => {
    toast.success("Recherche lancée");
  };

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
            <ListingTypeFilter
              value={filters.listingType}
              onChange={(value) => setFilters({ ...filters, listingType: value })}
            />

            <LocationFilter
              city={filters.city}
              location={filters.location}
              onCityChange={(value) => {
                setFilters({ 
                  ...filters, 
                  city: value,
                  location: "all"
                });
              }}
              onLocationChange={(value) => setFilters({ ...filters, location: value })}
            />

            <PropertyTypeFilter
              value={filters.propertyType}
              onChange={(value) => setFilters({ ...filters, propertyType: value })}
            />
          </div>

          <PriceFilter
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            listingType={filters.listingType}
            onChange={(values) => {
              setFilters({
                ...filters,
                minPrice: values[0],
                maxPrice: values[1],
              });
            }}
          />

          <SizeFilter
            minSize={filters.minSize}
            maxSize={filters.maxSize}
            onChange={(values) => {
              setFilters({
                ...filters,
                minSize: values[0],
                maxSize: values[1],
              });
            }}
          />

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
                  minSize: 0,
                  maxSize: 10000,
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