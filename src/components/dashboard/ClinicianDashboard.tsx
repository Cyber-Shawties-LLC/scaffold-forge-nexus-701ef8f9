import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Shield, Activity, FileText } from "lucide-react";

const ClinicianDashboard = () => {
  // Simulated data - will be replaced with real data from database
  const alerts = [
    { id: 1, type: "access", message: "Unusual access pattern detected - Patient ID #1247", severity: "high", time: "2 mins ago" },
    { id: 2, type: "encryption", message: "KMS key rotation completed successfully", severity: "low", time: "1 hour ago" },
    { id: 3, type: "audit", message: "New audit trail entry for Patient ID #1582", severity: "medium", time: "3 hours ago" },
  ];

  const recentPatients = [
    { id: 1, name: "Patient #1247", lastAccess: "2 mins ago", status: "active" },
    { id: 2, name: "Patient #1582", lastAccess: "1 hour ago", status: "active" },
    { id: 3, name: "Patient #0934", lastAccess: "2 hours ago", status: "encrypted" },
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
          Clinician Dashboard
        </h2>
        <p className="text-muted-foreground">
          Monitor patient data security and access patterns
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">1 high priority</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Encrypted Records</CardTitle>
            <Shield className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">847</div>
            <p className="text-xs text-muted-foreground">100% compliance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Audit Trails</CardTitle>
            <FileText className="h-4 w-4 text-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,249</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Security Alerts</CardTitle>
            <CardDescription>Real-time monitoring and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                  <Activity className="h-5 w-5 text-accent mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={alert.severity === "high" ? "destructive" : alert.severity === "medium" ? "default" : "secondary"}>
                        {alert.severity}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </div>
                    <p className="text-sm text-foreground">{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Recent Patient Access</CardTitle>
            <CardDescription>KMS-encrypted summaries with audit trails</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPatients.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{patient.name}</p>
                      <p className="text-xs text-muted-foreground">{patient.lastAccess}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {patient.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClinicianDashboard;