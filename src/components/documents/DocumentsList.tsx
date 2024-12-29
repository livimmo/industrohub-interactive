import { useState } from "react";
import { DocumentItem } from "./DocumentItem";
import { DocumentPreview } from "./DocumentPreview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EnhancedRegisterDialog } from "@/components/auth/EnhancedRegisterDialog";

interface DocumentsListProps {
  onRequestMore: () => void;
}

export function DocumentsList({ onRequestMore }: DocumentsListProps) {
  const [previewDoc, setPreviewDoc] = useState<string | null>(null);
  const [showRegister, setShowRegister] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const documents = [
    "Note de renseignement",
    "Plan cadastral",
    "Plan de contenance",
  ];

  const handleDocumentAction = (doc: string) => {
    if (!isLoggedIn) {
      setShowRegister(true);
      return;
    }
    setPreviewDoc(doc);
  };

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
            onPreview={() => handleDocumentAction(doc)}
          />
        ))}
      </CardContent>

      <DocumentPreview
        open={!!previewDoc}
        onOpenChange={(open) => !open && setPreviewDoc(null)}
        title={previewDoc || ""}
        onRequestMore={onRequestMore}
      />

      <EnhancedRegisterDialog
        open={showRegister}
        onOpenChange={setShowRegister}
        onSuccess={() => {
          if (previewDoc) {
            setPreviewDoc(null);
            setTimeout(() => setPreviewDoc(previewDoc), 100);
          }
        }}
      />
    </Card>
  );
}