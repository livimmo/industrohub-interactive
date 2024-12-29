import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const NotificationsTab = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    visits: true,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Préférences de Notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Notifications par email</Label>
            <p className="text-sm text-muted-foreground">
              Recevoir des alertes par email
            </p>
          </div>
          <Switch
            checked={notifications.email}
            onCheckedChange={(checked) =>
              setNotifications({ ...notifications, email: checked })
            }
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Notifications push</Label>
            <p className="text-sm text-muted-foreground">
              Recevoir des notifications sur le navigateur
            </p>
          </div>
          <Switch
            checked={notifications.push}
            onCheckedChange={(checked) =>
              setNotifications({ ...notifications, push: checked })
            }
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Rappels de visites</Label>
            <p className="text-sm text-muted-foreground">
              Recevoir des rappels pour les visites programmées
            </p>
          </div>
          <Switch
            checked={notifications.visits}
            onCheckedChange={(checked) =>
              setNotifications({ ...notifications, visits: checked })
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};