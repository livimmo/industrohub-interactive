import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings, Bell, Shield, History } from "lucide-react";
import { PersonalInfoTab } from "./tabs/PersonalInfoTab";
import { NotificationsTab } from "./tabs/NotificationsTab";
import { SettingsTab } from "./tabs/SettingsTab";
import { SecurityTab } from "./tabs/SecurityTab";
import { HistoryTab } from "./tabs/HistoryTab";

export const ProfileTabs = () => {
  return (
    <Tabs defaultValue="personal" className="space-y-4">
      <TabsList className="w-full flex space-x-2 overflow-x-auto">
        <TabsTrigger value="personal" className="flex-1">
          <User className="h-4 w-4 mr-2" />
          <span>Informations</span>
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex-1">
          <Settings className="h-4 w-4 mr-2" />
          <span>Paramètres</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex-1">
          <Bell className="h-4 w-4 mr-2" />
          <span>Notifications</span>
        </TabsTrigger>
        <TabsTrigger value="security" className="flex-1">
          <Shield className="h-4 w-4 mr-2" />
          <span>Sécurité</span>
        </TabsTrigger>
        <TabsTrigger value="history" className="flex-1">
          <History className="h-4 w-4 mr-2" />
          <span>Historique</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="personal">
        <PersonalInfoTab />
      </TabsContent>

      <TabsContent value="notifications">
        <NotificationsTab />
      </TabsContent>

      <TabsContent value="settings">
        <SettingsTab />
      </TabsContent>

      <TabsContent value="security">
        <SecurityTab />
      </TabsContent>

      <TabsContent value="history">
        <HistoryTab />
      </TabsContent>
    </Tabs>
  );
};