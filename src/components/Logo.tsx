import { Building2 } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Building2 className="h-8 w-8 text-primary" />
      <span className="font-display text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
        Indupros
      </span>
    </div>
  );
};