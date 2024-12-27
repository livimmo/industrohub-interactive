import { useState } from "react";
import { DocumentItem } from "./DocumentItem";
import { DocumentPreview } from "./DocumentPreview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DocumentsListProps {
  onRequestMore: () => void;
}

export function DocumentsList({ onRequestMore }: DocumentsListProps) {
  const [previewDoc, setPreviewDoc] = useState<string | null>(null);

  const documents = [
    "Note de renseignement",
    "Plan cadastral",
    "Plan de contenance",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents disponibles</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {documents.map((doc) => (
          <DocumentItem
            key={doc}
            title={doc}
            onPreview={() => setPreviewDoc(doc)}
          />
        ))}
      </CardContent>

      <DocumentPreview
        open={!!previewDoc}
        onOpenChange={(open) => !open && setPreviewDoc(null)}
        title={previewDoc || ""}
        onRequestMore={onRequestMore}
      />
    </Card>
  );
}