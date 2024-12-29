import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NEIGHBORHOODS } from "@/data/neighborhoods";

interface LocationFilterProps {
  city: string;
  location: string;
  onCityChange: (city: string) => void;
  onLocationChange: (location: string) => void;
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

export const LocationFilter = ({ city, location, onCityChange, onLocationChange }: LocationFilterProps) => {
  const availableNeighborhoods = city && city !== "all" 
    ? NEIGHBORHOODS[city.toLowerCase()] || []
    : [];

  const handleCityChange = (newCity: string) => {
    onCityChange(newCity);
    // Reset location when city changes
    onLocationChange("all");
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <Label>Ville</Label>
        <Select
          value={city}
          onValueChange={handleCityChange}
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
          value={location}
          onValueChange={onLocationChange}
          disabled={!city || city === "all"}
        >
          <SelectTrigger>
            <SelectValue placeholder={!city || city === "all" ? "Sélectionnez d'abord une ville" : "Sélectionner un quartier"} />
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
    </div>
  );
};