import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Eye, EyeOff, Facebook, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnhancedRegisterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function EnhancedRegisterDialog({
  open,
  onOpenChange,
  onSuccess,
}: EnhancedRegisterDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("investor");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!acceptTerms) {
      toast.error("Veuillez accepter les termes et conditions");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const firstName = formData.get("firstName") as string;
      const lastName = formData.get("lastName") as string;
      const email = formData.get("email") as string;

      // Simuler une inscription réussie
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", `${firstName} ${lastName}`);
      localStorage.setItem("userRole", selectedRole);
      localStorage.setItem("userEmail", email);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Inscription réussie ! Vous pouvez maintenant accéder aux documents.");
      onSuccess?.();
      onOpenChange(false);
      window.location.reload();
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
      localStorage.clear();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0">
        <div className="relative flex flex-col space-y-6 p-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold tracking-tight">
              📄 Accédez aux documents détaillés du bien !
            </h2>
            <p className="text-sm text-muted-foreground">
              🔒 Inscrivez-vous gratuitement pour télécharger les plans, notes et autres
              documents essentiels.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="size-6 flex items-center justify-center rounded-full bg-primary/10 text-primary">✓</span>
              <span>Accès immédiat aux documents importants</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-6 flex items-center justify-center rounded-full bg-primary/10 text-primary">✓</span>
              <span>Gérez vos biens favoris facilement</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-6 flex items-center justify-center rounded-full bg-primary/10 text-primary">✓</span>
              <span>Recevez des notifications personnalisées</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-6 flex items-center justify-center rounded-full bg-primary/10 text-primary">✓</span>
              <span>Réservez vos visites en quelques clics</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" name="firstName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" name="lastName" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="exemple@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Type de compte</Label>
              <Select
                value={selectedRole}
                onValueChange={setSelectedRole}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="investor">Investisseur</SelectItem>
                  <SelectItem value="owner">Propriétaire</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                J'accepte les termes et conditions d'utilisation
              </label>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !acceptTerms}
            >
              {isLoading ? "Inscription..." : "Créer un compte"}
            </Button>

            <div className="relative">
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

            <p className="text-center text-sm text-muted-foreground">
              Déjà inscrit ?{" "}
              <Button
                variant="link"
                className="p-0 h-auto font-semibold"
                onClick={() => {
                  onOpenChange(false);
                  // Here you would typically open the login dialog
                }}
              >
                Se connecter
              </Button>
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}