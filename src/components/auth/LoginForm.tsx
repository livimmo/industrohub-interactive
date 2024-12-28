import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Facebook, Mail } from "lucide-react";

interface LoginFormProps {
  onSuccess: () => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simuler une connexion réussie
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      const userName = email.split('@')[0]; // Utiliser la partie avant @ comme nom d'utilisateur

      // Stocker les informations de connexion
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', userName);
      localStorage.setItem('userRole', 'investor'); // Par défaut, on met investor
      localStorage.setItem('userEmail', email);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Connexion réussie");
      onSuccess();
      window.location.reload();
    } catch (error) {
      toast.error("Erreur lors de la connexion");
      localStorage.clear(); // En cas d'erreur, on nettoie le localStorage
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="exemple@email.com" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input id="password" name="password" type="password" required />
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Connexion..." : "Se connecter"}
      </Button>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou continuer avec
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" type="button" disabled={isLoading}>
          <Mail className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button variant="outline" type="button" disabled={isLoading}>
          <Facebook className="mr-2 h-4 w-4" />
          Facebook
        </Button>
      </div>
      <Button
        variant="link"
        className="w-full text-sm text-muted-foreground"
        type="button"
      >
        Mot de passe oublié ?
      </Button>
    </form>
  );
};