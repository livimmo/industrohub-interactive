import { Home, Building2, Search, Bell, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { AuthDialog } from "./auth/AuthDialog";
import { SidebarProvider } from "./ui/sidebar";
import { UserMenu } from "./user-menu";

export const MobileNavBar = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userRole = localStorage.getItem('userRole') || 'investor';
  const userName = localStorage.getItem('userName') || "John Doe";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden z-50">
      <nav className="flex items-center justify-around p-3">
        <Link 
          to="/" 
          className={cn(
            "flex flex-col items-center text-gray-500 hover:text-primary",
            window.location.pathname === "/" && "text-primary"
          )}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Accueil</span>
        </Link>

        <Link 
          to="/properties" 
          className={cn(
            "flex flex-col items-center text-gray-500 hover:text-primary",
            window.location.pathname === "/properties" && "text-primary"
          )}
        >
          <Building2 className="h-6 w-6" />
          <span className="text-xs mt-1">Biens</span>
        </Link>

        <Link 
          to="/search" 
          className={cn(
            "flex flex-col items-center text-gray-500 hover:text-primary",
            window.location.pathname === "/search" && "text-primary"
          )}
        >
          <Search className="h-6 w-6" />
          <span className="text-xs mt-1">Recherche</span>
        </Link>

        {isLoggedIn && (
          <Link 
            to="/notifications" 
            className={cn(
              "flex flex-col items-center text-gray-500 hover:text-primary",
              window.location.pathname === "/notifications" && "text-primary"
            )}
          >
            <Bell className="h-6 w-6" />
            <span className="text-xs mt-1">Alertes</span>
          </Link>
        )}

        <div className="flex flex-col items-center">
          {!isLoggedIn ? (
            <AuthDialog>
              <div className="flex flex-col items-center text-gray-500 hover:text-primary">
                <UserCircle className="h-6 w-6" />
                <span className="text-xs mt-1">Compte</span>
              </div>
            </AuthDialog>
          ) : (
            <SidebarProvider>
              <UserMenu userRole={userRole} userName={userName} />
            </SidebarProvider>
          )}
        </div>
      </nav>
    </div>
  );
};