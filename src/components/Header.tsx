import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { UserMenu } from "./user-menu";
import { NotificationBell } from "./notifications/NotificationBell";
import { GlobalSearch } from "./GlobalSearch";
import { SidebarProvider } from "./ui/sidebar";
import { toast } from "sonner";

export const Header = () => {
  const isMobile = useIsMobile();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Déconnexion réussie");
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          {!isMobile && (
            <nav className="flex items-center gap-6">
              <Link
                to="/properties"
                className="text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                Biens
              </Link>
              <Link
                to="/developer-sales"
                className="text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                Ventes Promoteur
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                À propos
              </Link>
              <Link
                to="/contact"
                className="text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                Contact
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          <GlobalSearch />
          {isLoggedIn ? (
            <>
              <NotificationBell />
              <UserMenu onLogout={handleLogout} />
            </>
          ) : (
            <Link to="/profile">
              <Button>Se connecter</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};