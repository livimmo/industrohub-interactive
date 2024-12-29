import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Logo } from "./Logo";
import { AuthDialog } from "./auth/AuthDialog";
import { UserMenu } from "./user-menu";
import { NotificationBell } from "./notifications/NotificationBell";
import { GlobalSearch } from "./GlobalSearch";
import { SidebarProvider } from "./ui/sidebar";

export const Header = () => {
  const isMobile = useIsMobile();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const storedRole = localStorage.getItem('userRole');
  const userRole = (storedRole === 'owner' || storedRole === 'investor') ? storedRole : 'investor';
  const userName = localStorage.getItem('userName') || "John Doe";

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Déconnexion réussie");
    window.location.reload();
  };

  const menuItems = [
    { label: "Accueil", href: "/" },
    { label: "Biens", href: "#properties" },
    { label: "Programmes Neufs", href: "/developer-sales" },
    { label: "À propos", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const renderDesktopMenu = () => (
    <nav className="hidden md:flex items-center gap-6">
      <GlobalSearch />
      {menuItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          {item.label}
        </a>
      ))}
      {isLoggedIn && <NotificationBell />}
      {!isLoggedIn ? (
        <AuthDialog />
      ) : (
        <SidebarProvider>
          <UserMenu userRole={userRole} userName={userName} onLogout={handleLogout} />
        </SidebarProvider>
      )}
    </nav>
  );

  const renderMobileMenu = () => (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-6">
          <GlobalSearch />
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {item.label}
            </a>
          ))}
          {!isLoggedIn ? (
            <AuthDialog />
          ) : (
            <SidebarProvider>
              <UserMenu userRole={userRole} userName={userName} onLogout={handleLogout} />
            </SidebarProvider>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <Logo />
        </a>
        {renderDesktopMenu()}
        {renderMobileMenu()}
      </div>
    </header>
  );
};
