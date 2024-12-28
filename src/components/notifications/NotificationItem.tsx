import { Building, Calendar, FileText, Heart, Mail, Settings } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface NotificationItemProps {
  notification: {
    id: string;
    type: string;
    title: string;
    message: string;
    date: string;
    read: boolean;
    link: string;
  };
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "property":
      return Building;
    case "visit":
      return Calendar;
    case "document":
      return FileText;
    case "favorite":
      return Heart;
    case "account":
      return Settings;
    case "message":
      return Mail;
    default:
      return Building;
  }
};

export const NotificationItem = ({ notification }: NotificationItemProps) => {
  const Icon = getNotificationIcon(notification.type);
  const timeAgo = formatDistanceToNow(new Date(notification.date), {
    addSuffix: true,
    locale: fr
  });

  return (
    <a
      href={notification.link}
      className={cn(
        "flex items-start gap-4 p-4 rounded-lg transition-colors",
        notification.read
          ? "bg-background hover:bg-accent"
          : "bg-accent hover:bg-accent/80"
      )}
    >
      <Icon className="h-5 w-5 mt-1 text-muted-foreground" />
      <div className="flex-1 space-y-1">
        <p className={cn("text-sm", !notification.read && "font-medium")}>
          {notification.title}
        </p>
        <p className="text-sm text-muted-foreground">{notification.message}</p>
        <p className="text-xs text-muted-foreground">{timeAgo}</p>
      </div>
    </a>
  );
};