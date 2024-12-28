import { ScrollArea } from "@/components/ui/scroll-area";
import { NotificationItem } from "./NotificationItem";
import { Button } from "@/components/ui/button";

// TODO: Move to types file
type NotificationType = 
  | "property"
  | "visit"
  | "document"
  | "favorite"
  | "account"
  | "message";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  read: boolean;
  link: string;
}

export const NotificationList = () => {
  // TODO: Replace with real data from backend
  const notifications: Notification[] = [
    {
      id: "1",
      type: "property",
      title: "Nouveau bien disponible",
      message: "Un nouveau bien industriel est disponible à Casablanca",
      date: "2024-02-20T10:00:00",
      read: false,
      link: "/property/1"
    },
    {
      id: "2",
      type: "visit",
      title: "Rappel de visite",
      message: "Votre visite est prévue demain à 14h",
      date: "2024-02-19T15:30:00",
      read: false,
      link: "/visits"
    },
    {
      id: "3",
      type: "document",
      title: "Nouveaux documents",
      message: "De nouveaux documents sont disponibles",
      date: "2024-02-19T09:15:00",
      read: false,
      link: "/documents"
    }
  ];

  return (
    <div className="mt-6">
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="flex flex-col gap-2 pr-4">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      </ScrollArea>
      <div className="mt-4 text-center">
        <Button variant="outline" className="w-full">
          Voir toutes les notifications
        </Button>
      </div>
    </div>
  );
};