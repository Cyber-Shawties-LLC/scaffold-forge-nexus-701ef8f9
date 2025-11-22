import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Activity, Eye, AlertTriangle, Key, Database, Network, LogOut, CheckCircle, Clock, TrendingUp, FileText, Users, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSecurityAuth } from '@/contexts/SecurityAuthContext';

interface SecurityModule {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  route: string;
  status: 'active' | 'coming-soon';
  description: string;
  gradient: string;
}

const SecurityAdminDashboard = () => {
  const navigate = useNavigate();
  const { logout, username } = useSecurityAuth();

  const modules: SecurityModule[] = [
    {
      name: 'Wazuh SIEM',
      icon: Shield,
      route: '/security-admin/wazuh',
      status: 'active',
      description: 'Unified threat detection and log analysis - AWS logs centralized here',
      gradient: 'from-primary to-secondary',
    },
    {
      name: 'Audit Logs',
      icon: Activity,
      route: '/security-admin/audit-logs',
      status: 'active',
      description: 'Security Admin Portal access and activity logs',
      gradient: 'from-secondary to-accent',
    },
  ];

  const handleModuleClick = (module: SecurityModule) => {
    if (module.status === 'active') {
      navigate(module.route);
    } else {
      navigate(module.route);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-plum p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-4xl font-bold text-primary-foreground mb-2 flex items-center gap-3">
              <Shield className="w-8 h-8" />
              Security Admin Portal
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Unified SIEM Platform — All AWS logs centralized in Wazuh
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-primary-foreground/70">Welcome, {username}</span>
            <Button
              variant="outline"
              onClick={logout}
              className="border-primary-foreground/30 text-primary-foreground hover:bg-card/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <Card className="bg-card/95 backdrop-blur-md border-primary/20 shadow-luxury mb-6">
          <CardHeader>
            <CardTitle className="font-serif text-2xl flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Fast access to critical Wazuh features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-auto flex-col items-start p-4 hover:bg-accent/20"
                onClick={() => navigate('/security-admin/wazuh')}
              >
                <AlertTriangle className="w-5 h-5 mb-2 text-accent" />
                <span className="font-semibold">Recent Alerts</span>
                <span className="text-xs text-muted-foreground">View latest security events</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex-col items-start p-4 hover:bg-accent/20"
                onClick={() => navigate('/security-admin/wazuh')}
              >
                <Users className="w-5 h-5 mb-2 text-secondary" />
                <span className="font-semibold">Agent Status</span>
                <span className="text-xs text-muted-foreground">Monitor active agents</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex-col items-start p-4 hover:bg-accent/20"
                onClick={() => navigate('/security-admin/wazuh')}
              >
                <FileText className="w-5 h-5 mb-2 text-primary" />
                <span className="font-semibold">Compliance Reports</span>
                <span className="text-xs text-muted-foreground">Generate compliance docs</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Wazuh Health Status Widget */}
        <Card className="bg-card/95 backdrop-blur-md border-primary/20 shadow-luxury mb-6">
          <CardHeader>
            <CardTitle className="font-serif text-2xl flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Wazuh Health Status
            </CardTitle>
            <CardDescription>Real-time system health and data ingestion metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">Connection Status</span>
                </div>
                <Badge className="bg-green-500 text-white">Online</Badge>
                <p className="text-xs text-muted-foreground">All services operational</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Last Sync</span>
                </div>
                <p className="text-sm font-semibold">{new Date().toLocaleTimeString()}</p>
                <p className="text-xs text-muted-foreground">Synced moments ago</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-secondary" />
                  <span className="text-sm font-medium">Data Ingestion Rate</span>
                </div>
                <p className="text-sm font-semibold">1,247 events/min</p>
                <p className="text-xs text-muted-foreground">AWS logs streaming</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About Wazuh Integration Info Card */}
        <Card className="bg-card/95 backdrop-blur-md border-primary/20 shadow-luxury mb-6">
          <CardHeader>
            <CardTitle className="font-serif text-2xl flex items-center gap-2">
              <Info className="w-5 h-5" />
              About Wazuh Integration
            </CardTitle>
            <CardDescription>Understanding your unified security architecture</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                How AWS Logs Flow into Wazuh
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your AWS infrastructure automatically forwards all security-relevant logs to Wazuh SIEM in real-time. 
                This includes CloudTrail API activity, GuardDuty threat intelligence, VPC flow logs, S3 access patterns, 
                and IAM authentication events. Wazuh acts as the central correlation engine, normalizing and analyzing 
                these diverse data sources into actionable security insights.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Eye className="w-4 h-4 text-secondary" />
                Unified Visibility & Detection
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Instead of managing separate AWS consoles for each service, Wazuh provides a single pane of glass for 
                all security monitoring. Advanced correlation rules detect complex attack patterns across multiple AWS 
                services, identify anomalies using machine learning, ensure compliance with HIPAA/PCI-DSS standards, 
                and generate automated incident response workflows.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                Key Capabilities
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Real-time threat detection across all AWS services</li>
                <li>Centralized log retention and searchability (90+ days)</li>
                <li>Automated compliance reporting and audit trails</li>
                <li>Integrated incident response and forensics tools</li>
                <li>Custom alerting rules for your specific security policies</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Module Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Card
                key={module.route}
                className={`bg-card/95 backdrop-blur-md border-primary/20 shadow-luxury hover:shadow-glow transition-all cursor-pointer ${
                  module.status === 'coming-soon' ? 'opacity-75' : 'hover:scale-105'
                }`}
                onClick={() => handleModuleClick(module)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${module.gradient} opacity-90`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    {module.status === 'coming-soon' && (
                      <Badge variant="secondary" className="bg-muted text-muted-foreground">
                        Coming Soon
                      </Badge>
                    )}
                    {module.status === 'active' && (
                      <Badge className="bg-green-500 text-white">Active</Badge>
                    )}
                  </div>
                  <CardTitle className="font-serif text-xl">{module.name}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground hover:text-foreground"
                    disabled={module.status === 'coming-soon'}
                  >
                    {module.status === 'active' ? 'Open Module →' : 'Coming Soon'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SecurityAdminDashboard;

