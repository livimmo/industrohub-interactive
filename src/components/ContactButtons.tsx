import { useState } from "react";
import { Button } from "./ui/button";
import { MessageSquare, PhoneCall } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

export const ContactButtons = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    setIsLoading(true);
    // Simulate sending message
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast({
      title: "Message envoyé",
      description: "Un conseiller vous répondra dans les plus brefs délais.",
    });
    setMessage("");
    setIsLoading(false);
  };

  const handleCallRequest = () => {
    toast({
      title: "Demande d'appel envoyée",
      description: "Un conseiller va vous rappeler dans les plus brefs délais.",
    });
  };

  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <MessageSquare className="mr-2" />
            Chat
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Chat avec un conseiller</DialogTitle>
            <DialogDescription>
              Posez vos questions à notre équipe commerciale
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm">
                Bonjour ! Comment puis-je vous aider aujourd'hui ?
              </p>
            </div>
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Écrivez votre message..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={isLoading}>
                Envoyer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            size="lg"
            className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <PhoneCall className="mr-2" />
            Appeler
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Parler à un conseiller</DialogTitle>
            <DialogDescription>
              Notre équipe commerciale est disponible du lundi au vendredi de 9h à
              18h
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-4">
            <Button onClick={handleCallRequest} className="w-full">
              Demander à être rappelé
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              ou appelez directement le
              <br />
              <a href="tel:+32000000000" className="font-semibold">
                +32 0 000 00 00
              </a>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};