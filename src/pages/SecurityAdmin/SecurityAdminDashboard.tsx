import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Activity, Eye, AlertTriangle, Key, Database, Network, LogOut } from 'lucide-react';
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
      description: 'Real-time threat detection and monitoring',
      gradient: 'from-primary to-secondary',
    },
    {
      name: 'Audit Logs',
      icon: Activity,
      route: '/security-admin/audit-logs',
      status: 'active',
      description: 'Comprehensive security audit trail',
      gradient: 'from-secondary to-accent',
    },
    {
      name: 'AWS CloudTrail Logs',
      icon: Activity,
      route: '/security-admin/cloudtrail',
      status: 'coming-soon',
      description: 'AWS API activity logging',
      gradient: 'from-secondary to-plum',
    },
    {
      name: 'AWS GuardDuty Findings',
      icon: Eye,
      route: '/security-admin/guardduty',
      status: 'coming-soon',
      description: 'Intelligent threat detection',
      gradient: 'from-plum to-accent',
    },
    {
      name: 'AWS Security Hub Score',
      icon: AlertTriangle,
      route: '/security-admin/securityhub',
      status: 'coming-soon',
      description: 'Centralized security findings',
      gradient: 'from-accent to-gold',
    },
    {
      name: 'IAM Activity Monitor',
      icon: Key,
      route: '/security-admin/iam',
      status: 'coming-soon',
      description: 'Identity and access management',
      gradient: 'from-gold to-primary',
    },
    {
      name: 'S3 Bucket Monitoring',
      icon: Database,
      route: '/security-admin/s3',
      status: 'coming-soon',
      description: 'Storage security and compliance',
      gradient: 'from-primary to-plum',
    },
    {
      name: 'VPC Flow Logs',
      icon: Network,
      route: '/security-admin/vpc',
      status: 'coming-soon',
      description: 'Network traffic analysis',
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
            <p className="text-primary-foreground/80 text-lg">Central Security Command Center</p>
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

        {/* Module Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

