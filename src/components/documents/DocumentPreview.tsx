import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, FileText, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";

interface DocumentPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  onRequestMore: () => void;
}

export function DocumentPreview({
  open,
  onOpenChange,
  title,
  onRequestMore,
}: DocumentPreviewProps) {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {title}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground w-12 text-center">
                {zoom}%
              </span>
              <Button variant="outline" size="icon" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-auto border rounded-md">
          <div
            style={{ transform: `scale(${zoom / 100})` }}
            className="min-h-full bg-white p-4 transition-transform origin-top-left"
          >
            {/* Simuler un aperçu de document */}
            <div className="w-full aspect-[1/1.4] bg-gray-100 rounded-lg animate-pulse" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onRequestMore}>
            Demander plus de documents similaires
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Télécharger ce document
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}