import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "./DashboardLayout";
import { Map, Building2, Calendar, Phone, FileText, Users, Clock, MapPin } from "lucide-react";

interface VisitorDashboardProps {
  onBack: () => void;
}

export function VisitorDashboard({ onBack }: VisitorDashboardProps) {
  const campusLocations = [
    { name: "Main Building", description: "Admissions & Administration", icon: Building2 },
    { name: "Library", description: "Central Library & Study Areas", icon: FileText },
    { name: "Engineering Block", description: "Computer Science & Engineering", icon: Building2 },
    { name: "Student Center", description: "Cafeteria & Recreation", icon: Users },
    { name: "Sports Complex", description: "Gymnasium & Sports Facilities", icon: Users },
    { name: "Parking Area", description: "Visitor & Student Parking", icon: MapPin },
  ];

  const upcomingEvents = [
    { name: "Open House", date: "March 15, 2024", time: "10:00 AM", type: "campus-tour" },
    { name: "Tech Fair", date: "March 20, 2024", time: "2:00 PM", type: "exhibition" },
    { name: "Admission Info Session", date: "March 25, 2024", time: "11:00 AM", type: "information" },
  ];

  const departments = [
    { name: "Computer Science", students: "500+", programs: "3 Programs" },
    { name: "Engineering", students: "800+", programs: "5 Programs" },
    { name: "Business Administration", students: "400+", programs: "4 Programs" },
    { name: "Liberal Arts", students: "300+", programs: "6 Programs" },
  ];

  return (
    <DashboardLayout
      title="Visitor Center"
      subtitle="Welcome to our campus! Explore our facilities and programs"
      userRole="visitor"
      onBack={onBack}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Campus Navigation */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-6 text-foreground">Campus Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {campusLocations.map((location, index) => (
              <Card key={index} className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-gradient-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-gradient-primary">
                      <location.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{location.name}</h3>
                      <p className="text-sm text-muted-foreground">{location.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Departments */}
          <h2 className="text-xl font-semibold mb-6 text-foreground">Academic Departments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {departments.map((dept, index) => (
              <Card key={index} className="bg-gradient-card hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{dept.name}</CardTitle>
                  <CardDescription>Explore our {dept.name.toLowerCase()} programs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm mb-4">
                    <span>{dept.students} Students</span>
                    <span>{dept.programs}</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Campus Map */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5 text-primary" />
                Interactive Campus Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-muted/30 rounded-lg mb-4 flex items-center justify-center">
                <MapPin className="h-12 w-12 text-muted-foreground" />
              </div>
              <Button variant="academic" className="w-full">
                View Full Map
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Contact Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium text-foreground">Admissions Office</p>
                <p className="text-sm text-muted-foreground">(555) 123-4567</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Visitor Center</p>
                <p className="text-sm text-muted-foreground">(555) 123-4568</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Emergency</p>
                <p className="text-sm text-muted-foreground">(555) 911-HELP</p>
              </div>
              <Button variant="outline" className="w-full">
                Get Directions
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted/50">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-sm text-foreground">{event.name}</p>
                      <Badge variant="secondary">{event.type}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{event.date}</span>
                      <Clock className="h-3 w-3 ml-2" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}