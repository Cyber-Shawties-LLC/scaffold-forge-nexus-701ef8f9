import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, BookOpen, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const PatientPortal = () => {
  // Simulated data - will be replaced with real data from database
  const accessLogs = [
    { id: 1, viewer: "Dr. Sarah Johnson", department: "Women's Health", time: "2 hours ago", type: "view" },
    { id: 2, viewer: "Dr. Michael Chen", department: "Mental Health", time: "1 day ago", type: "view" },
    { id: 3, viewer: "System Backup", department: "IT Security", time: "2 days ago", type: "backup" },
  ];

  const privacyEducation = [
    { title: "Understanding Your Rights", description: "Learn about HIPAA and your healthcare privacy rights" },
    { title: "Data Encryption Explained", description: "How we protect your sensitive health information" },
    { title: "Access Control", description: "Managing who can see your medical records" },
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
          Patient Portal
        </h2>
        <p className="text-muted-foreground">
          Your health data, your control
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Access Events</CardTitle>
            <Eye className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Privacy Score</CardTitle>
            <Shield className="h-4 w-4 text-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">Excellent protection</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Last Review</CardTitle>
            <Clock className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2h</div>
            <p className="text-xs text-muted-foreground">ago</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Access Log</CardTitle>
            <CardDescription>Who viewed your medical records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {accessLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Eye className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-sm">{log.viewer}</p>
                      <Badge variant="outline" className="text-xs">
                        {log.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{log.department}</p>
                    <p className="text-xs text-muted-foreground mt-1">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif">AI-Generated Summary</CardTitle>
            <CardDescription>Plain-language incident summaries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20">
                <div className="flex items-start gap-3 mb-3">
                  <Shield className="h-5 w-5 text-secondary mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm mb-1">Recent Activity Summary</h4>
                    <p className="text-xs text-muted-foreground">Last 7 days</p>
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  Your health records were accessed 3 times this week by authorized healthcare providers. 
                  All access was routine and within normal parameters. Your data remains encrypted and secure 
                  with AWS KMS encryption. No unusual activity detected.
                </p>
              </div>
              <Button variant="outline" className="w-full">
                View Full Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-gold" />
            <CardTitle className="font-serif">Privacy Education</CardTitle>
          </div>
          <CardDescription>Learn how we protect your healthcare data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {privacyEducation.map((item, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors cursor-pointer">
                <h4 className="font-medium text-sm mb-2">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientPortal;