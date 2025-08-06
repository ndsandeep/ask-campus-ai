import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface RoleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  onClick: () => void;
}

export function RoleCard({ title, description, icon: Icon, features, onClick }: RoleCardProps) {
  return (
    <Card className="group relative overflow-hidden bg-gradient-card border-border/50 hover:shadow-academic transition-all duration-300 hover:-translate-y-1 h-full">
      <div className="absolute inset-0 bg-gradient-subtle opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardHeader className="relative z-10 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
          <Icon className="h-8 w-8 text-primary-foreground" />
        </div>
        <CardTitle className="text-xl text-foreground">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-muted-foreground">
              <div className="h-1.5 w-1.5 rounded-full bg-accent mr-3" />
              {feature}
            </li>
          ))}
        </ul>
        <Button 
          onClick={onClick} 
          className="w-full"
          variant="academic"
        >
          Enter {title} Portal
        </Button>
      </CardContent>
    </Card>
  );
}