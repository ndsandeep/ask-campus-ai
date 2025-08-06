import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "./DashboardLayout";
import { Info, Calendar, FileText, Phone, HelpCircle, MapPin, Clock, Users } from "lucide-react";

interface OtherDashboardProps {
  onBack: () => void;
}

export function OtherDashboard({ onBack }: OtherDashboardProps) {
  const generalInfo = [
    { icon: Info, label: "About College", description: "Learn about our history and mission" },
    { icon: Calendar, label: "Events", description: "Upcoming events and activities" },
    { icon: FileText, label: "Announcements", description: "Latest news and updates" },
    { icon: Phone, label: "Contact", description: "Get in touch with us" },
    { icon: HelpCircle, label: "Help Center", description: "Frequently asked questions" },
    { icon: MapPin, label: "Directions", description: "How to reach our campus" },
  ];

  const publicEvents = [
    { 
      name: "Public Lecture: Future of AI", 
      date: "March 18, 2024", 
      time: "6:00 PM", 
      location: "Main Auditorium",
      type: "lecture" 
    },
    { 
      name: "Community Science Fair", 
      date: "March 22, 2024", 
      time: "10:00 AM", 
      location: "Campus Grounds",
      type: "fair" 
    },
    { 
      name: "Career Guidance Workshop", 
      date: "March 28, 2024", 
      time: "2:00 PM", 
      location: "Conference Hall",
      type: "workshop" 
    },
  ];

  const campusServices = [
    { name: "Visitor Parking", status: "Available", description: "Free 2-hour parking" },
    { name: "Campus WiFi", status: "Guest Network", description: "SSID: Campus-Guest" },
    { name: "Food Court", status: "Open", description: "Multiple dining options" },
    { name: "Information Desk", status: "Staffed", description: "Main building lobby" },
  ];

  const quickFacts = [
    { label: "Established", value: "1985" },
    { label: "Students", value: "2,500+" },
    { label: "Faculty", value: "150+" },
    { label: "Campus Size", value: "50 acres" },
  ];

  return (
    <DashboardLayout
      title="General Information"
      subtitle="Welcome! Find general information and public resources"
      userRole="other"
      onBack={onBack}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-6 text-foreground">General Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {generalInfo.map((info, index) => (
              <Card key={index} className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-gradient-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-gradient-primary">
                      <info.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{info.label}</h3>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Campus Services */}
          <h2 className="text-xl font-semibold mb-6 text-foreground">Campus Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campusServices.map((service, index) => (
              <Card key={index} className="bg-gradient-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <Badge variant="secondary">{service.status}</Badge>
                  </div>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Facts */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                Quick Facts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickFacts.map((fact, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm font-medium">{fact.label}</span>
                  <span className="font-semibold text-primary">{fact.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Public Events */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Public Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {publicEvents.map((event, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted/50">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-sm text-foreground">{event.name}</p>
                      <Badge variant="outline">{event.type}</Badge>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Important Contacts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium text-foreground">Emergency</p>
                <p className="text-sm text-destructive font-semibold">(555) 911-HELP</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Information Desk</p>
                <p className="text-sm text-muted-foreground">(555) 123-4567</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Security</p>
                <p className="text-sm text-muted-foreground">(555) 123-4569</p>
              </div>
              <Button variant="outline" className="w-full">
                More Contacts
              </Button>
            </CardContent>
          </Card>

          {/* Help Center */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                Need Help?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Our AI assistant is available 24/7 to help answer your questions about the campus.
              </p>
              <Button variant="academic" className="w-full">
                Chat with AI Assistant
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}