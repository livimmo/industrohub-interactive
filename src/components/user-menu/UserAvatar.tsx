import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  name: string;
  image?: string;
}

export const UserAvatar = ({ name, image }: UserAvatarProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Avatar>
      {image && <AvatarImage src={image} alt={name} />}
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
};