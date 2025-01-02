import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const PersonalInfoTab = () => {
  const userInfo = {
    name: localStorage.getItem("userName") || "",
    email: localStorage.getItem("userEmail") || "",
    role: localStorage.getItem("userRole") || "",
  };

  const handleUpdateProfile = () => {
    toast.success("Vos informations ont été mises à jour avec succès.");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nom complet</Label>
          <Input
            id="name"
            placeholder="Votre nom"
            defaultValue={userInfo.name}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Votre email"
            defaultValue={userInfo.email}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Rôle</Label>
          <Input
            id="role"
            placeholder="Votre rôle"
            defaultValue={userInfo.role}
            disabled
          />
        </div>
      </div>
      <Button onClick={handleUpdateProfile}>Mettre à jour</Button>
    </div>
  );
};