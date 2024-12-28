import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PropertyTypeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const PropertyTypeFilter = ({ value, onChange }: PropertyTypeFilterProps) => {
  return (
    <div className="space-y-4">
      <Label>Type de bien</Label>
      <Select value={value} onValueChange={onChange}>
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
  );
};