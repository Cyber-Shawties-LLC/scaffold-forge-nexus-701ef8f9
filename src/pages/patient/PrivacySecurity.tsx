import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Eye, Lock, AlertCircle, Download } from "lucide-react";

const PrivacySecurity = () => {
  const accessLogs = [
    { id: 1, viewer: "Dr. Sarah Johnson", role: "Primary Physician", time: "2 hours ago", dataAccessed: "Lab Results" },
    { id: 2, viewer: "Dr. Mike Brown", role: "Specialist", time: "1 day ago", dataAccessed: "X-Ray Images" },
    { id: 3, viewer: "Nurse Williams", role: "Care Team", time: "2 days ago", dataAccessed: "Vital Signs" },
    { id: 4, viewer: "Admin User", role: "System Admin", time: "3 days ago", dataAccessed: "Account Settings" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-bold">Privacy & Security</h2>
        <p className="text-muted-foreground">Control who accesses your health information</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Access Events</CardTitle>
            <Eye className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Privacy Score</CardTitle>
            <Shield className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">A+</div>
            <p className="text-xs text-muted-foreground">Excellent protection</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Encryption Status</CardTitle>
            <Lock className="h-4 w-4 text-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-xs text-muted-foreground">Military-grade AES-256</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-serif">Access Logs</CardTitle>
              <CardDescription>Who has viewed your health information</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Logs
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {accessLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Eye className="h-5 w-5 text-secondary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{log.viewer}</p>
                    <Badge variant="outline">{log.role}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Accessed: {log.dataAccessed}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Security Settings</CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Shield className="w-4 h-4 mr-2" />
              Enable Two-Factor Authentication
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Lock className="w-4 h-4 mr-2" />
              Change Password
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Privacy Preferences
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Security Tips</CardTitle>
            <CardDescription>Keep your health data safe</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <p className="font-medium text-sm">Use a Strong Password</p>
                <p className="text-xs text-muted-foreground">Mix letters, numbers, and symbols</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <p className="font-medium text-sm">Review Access Logs Regularly</p>
                <p className="text-xs text-muted-foreground">Check who's viewing your data</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <p className="font-medium text-sm">Report Suspicious Activity</p>
                <p className="text-xs text-muted-foreground">Contact support immediately</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacySecurity;
