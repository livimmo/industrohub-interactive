import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface SizeFilterProps {
  minSize: number;
  maxSize: number;
  onChange: (values: [number, number]) => void;
}

export const SizeFilter = ({ minSize, maxSize, onChange }: SizeFilterProps) => {
  return (
    <div className="space-y-4">
      <Label>Superficie (m²)</Label>
      <div className="px-3">
        <Slider
          defaultValue={[minSize, maxSize]}
          max={10000}
          step={50}
          onValueChange={(value) => onChange(value as [number, number])}
        />
      </div>
      <div className="flex justify-between text-sm text-gray-500">
        <span>{minSize} m²</span>
        <span>{maxSize} m²</span>
      </div>
    </div>
  );
};