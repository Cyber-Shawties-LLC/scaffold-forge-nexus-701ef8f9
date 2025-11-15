import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Shield, Activity } from "lucide-react";

const SecurityLogs = () => {
  const alerts = [
    { id: 1, type: "access", message: "Unusual access pattern detected - Patient ID #1247", severity: "high", time: "2 mins ago" },
    { id: 2, type: "encryption", message: "KMS key rotation completed successfully", severity: "low", time: "1 hour ago" },
    { id: 3, type: "audit", message: "New audit trail entry for Patient ID #1582", severity: "medium", time: "3 hours ago" },
    { id: 4, type: "login", message: "Failed login attempt from unknown IP", severity: "high", time: "4 hours ago" },
    { id: 5, type: "access", message: "Bulk data export requested by Admin User #42", severity: "medium", time: "5 hours ago" },
  ];

  const stats = [
    { label: "Active Alerts", value: "3", severity: "1 high priority", icon: AlertCircle, color: "text-accent" },
    { label: "Encrypted Records", value: "847", severity: "100% compliance", icon: Shield, color: "text-secondary" },
    { label: "Audit Trails", value: "1,249", severity: "Last 30 days", icon: Activity, color: "text-gold" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-bold">Security Logs</h2>
        <p className="text-muted-foreground">Real-time security monitoring and audit trails</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.severity}</p>
            </CardContent>
          </Card>
        ))}
      </div>

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
          <CardTitle className="font-serif">Recent Access Logs</CardTitle>
          <CardDescription>KMS-encrypted summaries with audit trails</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: 1, user: "Dr. Sarah Johnson", action: "Viewed patient record", patient: "Patient #1247", time: "5 mins ago" },
              { id: 2, user: "Admin User", action: "Updated system settings", patient: "System", time: "15 mins ago" },
              { id: 3, user: "Dr. Mike Brown", action: "Downloaded lab results", patient: "Patient #1582", time: "1 hour ago" },
            ].map((log) => (
              <div key={log.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{log.user}</p>
                    <p className="text-sm text-muted-foreground">{log.action} - {log.patient}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{log.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityLogs;
