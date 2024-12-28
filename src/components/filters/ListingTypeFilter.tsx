import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ListingTypeFilterProps {
  value: "sale" | "rent" | "all";
  onChange: (value: "sale" | "rent" | "all") => void;
}

export const ListingTypeFilter = ({ value, onChange }: ListingTypeFilterProps) => {
  return (
    <div className="space-y-4">
      <Label>Type d'annonce</Label>
      <Select value={value} onValueChange={onChange}>
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
  );
};