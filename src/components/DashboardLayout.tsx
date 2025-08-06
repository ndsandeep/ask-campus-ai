import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bell, Settings, User } from "lucide-react";
import { ChatBot } from "./ChatBot";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  userRole: string;
  onBack: () => void;
}

export function DashboardLayout({ children, title, subtitle, userRole, onBack }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={onBack}
                className="h-10 w-10"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{title}</h1>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* ChatBot */}
      <ChatBot userRole={userRole} />
    </div>
  );
}