import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface UserInfoCardProps {
  name?: string;
  email?: string;
  companyName?: string;
}

export default function UserInfoCard({ name, email, companyName }: UserInfoCardProps) {
  const initials = name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={`https://placehold.co/100x100.png?text=${initials}`} alt={name || 'User Avatar'} data-ai-hint="user avatar" />
          <AvatarFallback><User className="h-6 w-6" /></AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-xl font-headline">{name || "User"}</CardTitle>
          <p className="text-sm text-muted-foreground">{email || "No email provided"}</p>
        </div>
      </CardHeader>
      <CardContent>
        {companyName && (
          <p className="text-sm text-foreground">
            Company: <span className="font-medium">{companyName}</span>
          </p>
        )}
         <p className="text-xs text-muted-foreground mt-2">Welcome to your BizSetup dashboard!</p>
      </CardContent>
    </Card>
  );
}
