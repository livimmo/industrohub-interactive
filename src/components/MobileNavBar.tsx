import { Home, Search, Bell, User, Building2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export const MobileNavBar = () => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const navItems = [
    {
      icon: Home,
      label: "Accueil",
      href: "/",
    },
    {
      icon: Building2,
      label: "Biens",
      href: "/properties",
    },
    {
      icon: Search,
      label: "Rechercher",
      href: "/search",
    },
    {
      icon: Bell,
      label: "Notifications",
      href: "/notifications",
      requiresAuth: true,
    },
    {
      icon: User,
      label: "Profil",
      href: "/profile",
      requiresAuth: true,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          if (item.requiresAuth && !isLoggedIn) return null;
          
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full px-2 text-xs",
                isActive
                  ? "text-primary font-semibold"
                  : "text-gray-500 hover:text-gray-900"
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};