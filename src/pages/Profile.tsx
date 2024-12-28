import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { User, Settings, Bell, Shield, History, HelpCircle } from "lucide-react";

export default function Profile() {
  const { toast } = useToast();
  const [userInfo, setUserInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+212 6XX-XXXXXX",
    role: "Investisseur",
    address: "123 Rue Example, Casablanca",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    visits: true,
  });

  const handleUpdateProfile = () => {
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été mises à jour avec succès.",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Hero Section */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold">{`${userInfo.firstName} ${userInfo.lastName}`}</h1>
              <p className="text-muted-foreground">{userInfo.role}</p>
              <p className="text-sm text-muted-foreground">{userInfo.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <TabsTrigger value="personal" className="flex gap-2">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">Informations</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden md:inline">Paramètres</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline">Sécurité</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex gap-2">
            <History className="h-4 w-4" />
            <span className="hidden md:inline">Historique</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Informations Personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    value={userInfo.firstName}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    value={userInfo.lastName}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, lastName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={userInfo.email} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={userInfo.phone}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, phone: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                    value={userInfo.address}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, address: e.target.value })
                    }
                  />
                </div>
              </div>
              <Button onClick={handleUpdateProfile}>Sauvegarder</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
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
        </TabsContent>

        {/* Les autres TabsContent seront ajoutés progressivement */}
      </Tabs>
    </div>
  );
}