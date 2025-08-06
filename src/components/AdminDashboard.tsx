import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DashboardLayout } from "./DashboardLayout";
import { BarChart3, Users, MessageSquare, Settings, Database, Activity, TrendingUp, Shield } from "lucide-react";

interface AdminDashboardProps {
  onBack: () => void;
}

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const systemStats = [
    { label: "Total Students", value: "2,450", trend: "+5.2%", icon: Users },
    { label: "Active Visitors", value: "89", trend: "+12%", icon: Activity },
    { label: "Chat Interactions", value: "1,234", trend: "+8.7%", icon: MessageSquare },
    { label: "System Uptime", value: "99.9%", trend: "Stable", icon: Shield },
  ];

  const adminActions = [
    { icon: MessageSquare, label: "Manage Chatbot", description: "Update responses and training data" },
    { icon: Users, label: "User Management", description: "Manage student and visitor accounts" },
    { icon: Database, label: "Content Management", description: "Update campus information" },
    { icon: BarChart3, label: "Analytics", description: "View system analytics and reports" },
    { icon: Settings, label: "System Settings", description: "Configure system parameters" },
    { icon: Shield, label: "Security", description: "Monitor security and access logs" },
  ];

  const recentActivities = [
    { type: "user", activity: "New student registration", time: "5 minutes ago", status: "success" },
    { type: "system", activity: "Chatbot response updated", time: "15 minutes ago", status: "info" },
    { type: "visitor", activity: "Campus tour request", time: "1 hour ago", status: "pending" },
    { type: "system", activity: "Database backup completed", time: "2 hours ago", status: "success" },
  ];

  const chatbotMetrics = [
    { metric: "Response Accuracy", value: 94, target: 95 },
    { metric: "User Satisfaction", value: 87, target: 90 },
    { metric: "Resolution Rate", value: 92, target: 90 },
  ];

  return (
    <DashboardLayout
      title="Admin Control Panel"
      subtitle="Manage your campus AI system and monitor performance"
      userRole="admin"
      onBack={onBack}
    >
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {systemStats.map((stat, index) => (
          <Card key={index} className="bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-accent flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {stat.trend}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-gradient-primary">
                  <stat.icon className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Admin Actions */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-6 text-foreground">Admin Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {adminActions.map((action, index) => (
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

          {/* Chatbot Performance */}
          <h2 className="text-xl font-semibold mb-6 text-foreground">Chatbot Performance</h2>
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle>AI Performance Metrics</CardTitle>
              <CardDescription>Monitor chatbot effectiveness and user satisfaction</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {chatbotMetrics.map((metric, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">{metric.metric}</span>
                    <span>{metric.value}% / {metric.target}%</span>
                  </div>
                  <Progress value={metric.value} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {metric.value >= metric.target ? "Target achieved" : `${metric.target - metric.value}% below target`}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Daily Active Users</span>
                <span className="font-semibold">456</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Chat Sessions Today</span>
                <span className="font-semibold">123</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Average Session Time</span>
                <span className="font-semibold">4:32</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">System Load</span>
                <Badge variant="secondary">Low</Badge>
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
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="mt-0.5">
                      <Badge 
                        variant={
                          activity.status === 'success' ? 'default' : 
                          activity.status === 'pending' ? 'destructive' : 'secondary'
                        }
                        className="h-2 w-2 p-0 rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{activity.activity}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Activities
              </Button>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>CPU Usage</span>
                  <span>34%</span>
                </div>
                <Progress value={34} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Memory Usage</span>
                  <span>67%</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Storage</span>
                  <span>45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}