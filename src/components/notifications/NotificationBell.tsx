import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NotificationList } from "./NotificationList";
import { Badge } from "@/components/ui/badge";

export const NotificationBell = () => {
  // TODO: Replace with real data from backend
  const unreadCount = 3;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex justify-between items-center">
            <span>Notifications</span>
            <Button variant="ghost" size="sm">
              Tout marquer comme lu
            </Button>
          </SheetTitle>
        </SheetHeader>
        <NotificationList />
      </SheetContent>
    </Sheet>
  );
};