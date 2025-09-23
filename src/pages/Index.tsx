import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RoleCard } from "@/components/RoleCard";
import { StudentDashboard } from "@/components/StudentDashboard";
import { VisitorDashboard } from "@/components/VisitorDashboard";
import { AdminDashboard } from "@/components/AdminDashboard";
import { OtherDashboard } from "@/components/OtherDashboard";
import { ChatBot } from "@/components/ChatBot";
import { GraduationCap, Users, Shield, HelpCircle, Bot, Sparkles } from "lucide-react";
import heroImage from "@/assets/college-campus.jpg";
import vvituLogo from "@/assets/vvitu-logo.png";

type UserRole = "student" | "visitor" | "admin" | "other" | null;

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  const roles = [
    {
      title: "Student",
      description: "Access your academic portal, courses, and student services",
      icon: GraduationCap,
      features: [
        "View course enrollment & schedules",
        "Check grades & academic progress", 
        "Access library resources",
        "Pay fees & manage finances",
        "Join study groups"
      ]
    },
    {
      title: "Visitor",
      description: "Explore our campus, departments, and admission information",
      icon: Users,
      features: [
        "Interactive campus map",
        "Department information",
        "Admission requirements",
        "Campus tours & events",
        "Contact information"
      ]
    },
    {
      title: "Admin",
      description: "Manage the AI system, users, and campus information",
      icon: Shield,
      features: [
        "Chatbot management",
        "User analytics & reports",
        "Content management",
        "System monitoring",
        "Security controls"
      ]
    },
    {
      title: "Other",
      description: "General information and public resources",
      icon: HelpCircle,
      features: [
        "General college information",
        "Public events calendar",
        "Emergency contacts",
        "Visitor services",
        "Help center"
      ]
    }
  ];

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role.toLowerCase() as UserRole);
  };

  const handleBack = () => {
    setSelectedRole(null);
  };

  if (selectedRole === "student") {
    return <StudentDashboard onBack={handleBack} />;
  }

  if (selectedRole === "visitor") {
    return <VisitorDashboard onBack={handleBack} />;
  }

  if (selectedRole === "admin") {
    return <AdminDashboard onBack={handleBack} />;
  }

  if (selectedRole === "other") {
    return <OtherDashboard onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Campus" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <Sparkles className="h-8 w-8 animate-pulse text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              VVITU Campus AI
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              Your intelligent campus companion for students, visitors, and staff
            </p>
            <p className="text-lg mb-12 text-white/80 max-w-2xl mx-auto">
              Experience the future of campus navigation with our AI-powered assistant. 
              Get instant answers, explore facilities, and access personalized services based on your role.
            </p>
            <Button 
              size="lg" 
              variant="hero"
              className="text-lg px-8 py-6 h-auto"
              onClick={() => document.getElementById('role-selection')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section id="role-selection" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Choose Your Portal
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select your role to access personalized features and information tailored to your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {roles.map((role, index) => (
              <RoleCard
                key={index}
                title={role.title}
                description={role.description}
                icon={role.icon}
                features={role.features}
                onClick={() => handleRoleSelect(role.title)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Powered by AI Intelligence
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our smart campus assistant provides instant help and personalized experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary">
                <Bot className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">24/7 AI Assistant</h3>
              <p className="text-muted-foreground">
                Get instant answers to your questions about campus facilities, courses, and services anytime
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary">
                <Users className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Role-Based Access</h3>
              <p className="text-muted-foreground">
                Personalized dashboards and features tailored to students, visitors, admins, and guests
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary">
                <Sparkles className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Smart Navigation</h3>
              <p className="text-muted-foreground">
                Interactive campus maps, real-time information, and intelligent recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ChatBot for landing page */}
      <ChatBot />
    </div>
  );
};

export default Index;
