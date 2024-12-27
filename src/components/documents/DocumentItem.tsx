import { FileText, Download, Eye } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface DocumentItemProps {
  title: string;
  onPreview: () => void;
}

export function DocumentItem({ title, onPreview }: DocumentItemProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasDownloaded, setHasDownloaded] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Simuler un téléchargement
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setHasDownloaded(true);
      toast.success("Document téléchargé avec succès");
    } catch (error) {
      toast.error("Erreur lors du téléchargement");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="group flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-accent/50">
      <div className="flex items-center gap-3">
        <FileText className={cn(
          "h-5 w-5 transition-colors",
          hasDownloaded && "text-green-500"
        )} />
        <span className="font-medium">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onPreview}
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "opacity-0 group-hover:opacity-100 transition-opacity",
            isDownloading && "animate-pulse"
          )}
          onClick={handleDownload}
          disabled={isDownloading}
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}