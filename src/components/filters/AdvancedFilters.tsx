import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { PropertyType, ZoningType } from "@/types/property";
import { Building2, Factory, Hotel, LandPlot, Store, Warehouse, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface AdvancedFiltersProps {
  filters: {
    priceRange: [number, number];
    sizeRange: [number, number];
    type: string;
    zoning: string;
    city: string;
  };
  setFilters: (filters: any) => void;
}

const typeIcons = {
  factory: Factory,
  office: Building2,
  hotel: Hotel,
  land: LandPlot,
  warehouse: Warehouse,
  retail: Store,
};

const typeLabels = {
  factory: "Usine",
  office: "Bureau",
  hotel: "Hôtel",
  land: "Terrain",
  warehouse: "Dépôt",
  retail: "Commerce",
};

const zoningLabels = {
  i2s1: "I2S1",
  i2: "I2",
  i8: "I8",
  i7: "I7",
};

export const AdvancedFilters = ({ filters, setFilters }: AdvancedFiltersProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white rounded-lg shadow-lg animate-fade-in">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full"
      >
        <div className="p-4 flex items-center justify-between border-b">
          <h3 className="font-semibold text-lg">Filtres Avancés</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="hover:bg-gray-100">
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <Label>Ville</Label>
              <Input
                placeholder="Entrez une ville"
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="w-full"
              />
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
                  {Object.entries(typeLabels).map(([type, label]) => {
                    const Icon = typeIcons[type as keyof typeof typeIcons];
                    return (
                      <SelectItem key={type} value={type}>
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          {label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Zonage</Label>
              <Select
                value={filters.zoning}
                onValueChange={(value) => setFilters({ ...filters, zoning: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un zonage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les zonages</SelectItem>
                  {Object.entries(zoningLabels).map(([type, label]) => (
                    <SelectItem key={type} value={type}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4 col-span-1 md:col-span-2 lg:col-span-3">
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

            <div className="space-y-4 col-span-1 md:col-span-2 lg:col-span-3">
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
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};