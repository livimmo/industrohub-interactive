import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  onChange: (values: [number, number]) => void;
  listingType: "sale" | "rent" | "all";
}

export const PriceFilter = ({ minPrice, maxPrice, onChange, listingType }: PriceFilterProps) => {
  return (
    <div className="space-y-4">
      <Label>
        {listingType === "rent" ? "Loyer (MAD/mois)" : "Prix (MAD)"}
      </Label>
      <div className="px-3">
        <Slider
          defaultValue={[minPrice, maxPrice]}
          max={10000000}
          step={100000}
          onValueChange={(value) => onChange(value as [number, number])}
        />
      </div>
      <div className="flex justify-between text-sm text-gray-500">
        <span>{minPrice.toLocaleString()} MAD{listingType === "rent" && "/mois"}</span>
        <span>{maxPrice.toLocaleString()} MAD{listingType === "rent" && "/mois"}</span>
      </div>
    </div>
  );
};