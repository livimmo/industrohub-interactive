import {
  Building,
  Calendar,
  FileText,
  Heart,
  HelpCircle,
  Home,
  LogOut,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "./UserAvatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface UserMenuProps {
  userRole: "owner" | "investor";
  userName: string;
  userImage?: string;
}

export const UserMenu = ({ userRole, userName, userImage }: UserMenuProps) => {
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Déconnexion réussie");
    window.location.reload();
  };

  const menuItems = [
    {
      icon: Home,
      label: "Tableau de bord",
      href: "/dashboard",
      roles: ["owner", "investor"],
    },
    {
      icon: Heart,
      label: "Mes favoris",
      href: "/favorites",
      roles: ["owner", "investor"],
    },
    {
      icon: Building,
      label: "Mes biens",
      href: "/properties",
      roles: ["owner"],
    },
    {
      icon: Calendar,
      label: "Mes visites",
      href: "/visits",
      roles: ["owner", "investor"],
    },
    {
      icon: FileText,
      label: "Mes documents",
      href: "/documents",
      roles: ["owner", "investor"],
    },
    {
      icon: Settings,
      label: "Paramètres",
      href: "/settings",
      roles: ["owner", "investor"],
    },
    {
      icon: HelpCircle,
      label: "Support",
      href: "/support",
      roles: ["owner", "investor"],
    },
  ];

  return (
    <div className="flex w-full">
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-3">
            <UserAvatar name={userName} image={userImage} />
            <div className="flex flex-col">
              <span className="font-medium">{userName}</span>
              <span className="text-xs text-muted-foreground capitalize">
                {userRole === "owner" ? "Propriétaire" : "Investisseur"}
              </span>
            </div>
          </div>
        </SidebarHeader>
        <Separator />
        <SidebarContent>
          <SidebarMenu>
            {menuItems
              .filter((item) => item.roles.includes(userRole))
              .map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <a href={item.href} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <Button
            variant="destructive"
            className="w-full justify-start gap-3"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Se déconnecter
          </Button>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
};