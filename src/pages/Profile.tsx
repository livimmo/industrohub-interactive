import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileTabs } from "@/components/profile/ProfileTabs";

export default function Profile() {
  const userInfo = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: "Investisseur",
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>
                {userInfo.firstName[0]}
                {userInfo.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold">{`${userInfo.firstName} ${userInfo.lastName}`}</h1>
              <p className="text-muted-foreground">{userInfo.role}</p>
              <p className="text-sm text-muted-foreground">{userInfo.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <ProfileTabs />
    </div>
  );
}