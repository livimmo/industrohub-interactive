import { Factory, Building2, Hotel, Hospital, LandPlot } from "lucide-react";
import { Property } from "@/types/property";

interface PropertyMarkerIconProps {
  type: Property["type"];
  className?: string;
}

export const PropertyMarkerIcon = ({ type, className = "w-6 h-6" }: PropertyMarkerIconProps) => {
  switch (type) {
    case "factory":
      return <Factory className={className} />;
    case "office":
      return <Building2 className={className} />;
    case "hotel":
      return <Hotel className={className} />;
    case "clinic":
      return <Hospital className={className} />;
    case "land":
      return <LandPlot className={className} />;
    default:
      return <Building2 className={className} />;
  }
};