import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DashboardLayout } from "./DashboardLayout";
import { BookOpen, Calendar, CreditCard, FileText, GraduationCap, Library, Users } from "lucide-react";

interface StudentDashboardProps {
  onBack: () => void;
}

export function StudentDashboard({ onBack }: StudentDashboardProps) {
  const quickActions = [
    { icon: BookOpen, label: "View Courses", description: "Access your enrolled courses" },
    { icon: Calendar, label: "Class Schedule", description: "Check today's classes" },
    { icon: FileText, label: "Assignments", description: "View pending assignments" },
    { icon: CreditCard, label: "Fee Payment", description: "Pay semester fees" },
    { icon: Library, label: "Library", description: "Browse library resources" },
    { icon: Users, label: "Study Groups", description: "Join study sessions" },
  ];

  const recentActivities = [
    { type: "assignment", title: "Data Structures Assignment", due: "Due in 2 days", status: "pending" },
    { type: "exam", title: "Database Systems Midterm", due: "Next week", status: "upcoming" },
    { type: "payment", title: "Semester Fee Payment", due: "Completed", status: "completed" },
    { type: "grade", title: "Web Development Project", due: "Grade: A-", status: "graded" },
  ];

  return (
    <DashboardLayout
      title="Student Portal"
      subtitle="Welcome back! Here's your academic overview"
      userRole="student"
      onBack={onBack}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-6 text-foreground">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-gradient-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-gradient-primary">
                      <action.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{action.label}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Academic Progress */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Academic Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Semester Progress</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>GPA</span>
                  <span className="font-semibold">3.7/4.0</span>
                </div>
                <Progress value={92.5} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Credits Completed</span>
                  <span>90/120</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium text-sm text-foreground">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.due}</p>
                    </div>
                    <Badge variant={activity.status === 'completed' ? 'default' : activity.status === 'pending' ? 'destructive' : 'secondary'}>
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Current Courses */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Current Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "Data Structures & Algorithms", code: "CS 301", instructor: "Dr. Smith", progress: 80 },
            { name: "Database Systems", code: "CS 302", instructor: "Prof. Johnson", progress: 65 },
            { name: "Web Development", code: "CS 303", instructor: "Dr. Brown", progress: 90 },
          ].map((course, index) => (
            <Card key={index} className="bg-gradient-card hover:shadow-card transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg">{course.name}</CardTitle>
                <CardDescription>{course.code} • {course.instructor}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  <Button variant="outline" className="w-full">
                    View Course
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}