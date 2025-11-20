import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Activity,
  Server,
  Database,
  LayoutDashboard,
  Users,
  FileText,
  TrendingUp,
  LogOut,
  RefreshCw
} from "lucide-react";
import { 
  fetchWazuhDashboardData, 
  type WazuhDashboardData 
} from "@/lib/wazuh-api";

const SecurityAdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<WazuhDashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check authentication
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("security-admin-authenticated");
    if (!isAuthenticated) {
      navigate("/security-admin/login");
    }
  }, [navigate]);

  const loadDashboardData = async () => {
    try {
      setError(null);
      const dashboardData = await fetchWazuhDashboardData();
      setData(dashboardData);
    } catch (err: any) {
      setError(err.message || "Failed to load Wazuh data");
      toast.error("Failed to fetch security data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadDashboardData();
  };

  const handleSignOut = () => {
    sessionStorage.removeItem("security-admin-authenticated");
    sessionStorage.removeItem("security-admin-username");
    navigate("/security-admin/login");
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'offline':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  const getHealthStatusIcon = (status: string) => {
    return status === 'online' ? (
      <CheckCircle2 className="h-5 w-5 text-green-500" />
    ) : (
      <XCircle className="h-5 w-5 text-red-500" />
    );
  };

  const getSeverityColor = (severity: string | null) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-600';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getLogIngestionStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600';
      case 'degraded':
        return 'text-yellow-600';
      case 'stopped':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-plum flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-primary-foreground">Loading security dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-plum">
      {/* Header */}
      <header className="bg-card/95 backdrop-blur-md border-b border-primary/20 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-gold" />
              <div>
                <h1 className="font-serif text-2xl font-bold text-foreground">
                  Security Admin Portal
                </h1>
                <p className="text-sm text-muted-foreground">
                  Wazuh Security Monitoring Dashboard
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={refreshing}
                className="bg-card/50"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="bg-card/50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="container mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-600 font-medium">Error: {error}</p>
            <p className="text-sm text-red-500/80 mt-1">
              Please ensure the Wazuh API backend is running and accessible.
            </p>
          </div>
        )}

        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* System Health Card */}
            <Card className="bg-card/95 backdrop-blur-md border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  System Health
                </CardTitle>
                <CardDescription>Wazuh service status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Manager</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getHealthStatusIcon(data.managerHealth)}
                    <Badge 
                      variant="outline" 
                      className={data.managerHealth === 'online' ? 'border-green-500 text-green-600' : 'border-red-500 text-red-600'}
                    >
                      {data.managerHealth}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Indexer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getHealthStatusIcon(data.indexerHealth)}
                    <Badge 
                      variant="outline" 
                      className={data.indexerHealth === 'online' ? 'border-green-500 text-green-600' : 'border-red-500 text-red-600'}
                    >
                      {data.indexerHealth}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Dashboard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getHealthStatusIcon(data.dashboardHealth)}
                    <Badge 
                      variant="outline" 
                      className={data.dashboardHealth === 'online' ? 'border-green-500 text-green-600' : 'border-red-500 text-red-600'}
                    >
                      {data.dashboardHealth}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alerts Overview Card */}
            <Card className="bg-card/95 backdrop-blur-md border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-accent" />
                  Alerts Overview
                </CardTitle>
                <CardDescription>Last 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {data.alerts24h}
                  </div>
                  <p className="text-sm text-muted-foreground">Total alerts</p>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Highest Severity</p>
                  {data.highestSeverity ? (
                    <Badge 
                      className={`${getSeverityColor(data.highestSeverity)} text-white`}
                    >
                      {data.highestSeverity.toUpperCase()}
                    </Badge>
                  ) : (
                    <Badge variant="outline">None</Badge>
                  )}
                </div>
                {data.lastAlert && (
                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground">
                      Last alert: {new Date(data.lastAlert).toLocaleString()}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Agent Status Card */}
            <Card className="bg-card/95 backdrop-blur-md border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-secondary" />
                  Agent Status
                </CardTitle>
                <CardDescription>Wazuh agents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {data.agentsTotal}
                  </div>
                  <p className="text-sm text-muted-foreground">Total agents</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-2xl font-bold text-green-600">
                        {data.agentsOnline}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Online</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="text-2xl font-bold text-red-600">
                        {data.agentsOffline}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Offline</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Log Ingestion Card */}
            <Card className="bg-card/95 backdrop-blur-md border-primary/20 md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-plum" />
                  Log Ingestion Status
                </CardTitle>
                <CardDescription>S3 bucket log ingestion monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">phase3-cloudtrail-logs</span>
                      <Badge 
                        variant="outline"
                        className={getLogIngestionStatusColor(data.logIngestion['phase3-cloudtrail-logs'].status)}
                      >
                        {data.logIngestion['phase3-cloudtrail-logs'].status}
                      </Badge>
                    </div>
                    {data.logIngestion['phase3-cloudtrail-logs'].lastIngestion && (
                      <p className="text-xs text-muted-foreground">
                        Last: {new Date(data.logIngestion['phase3-cloudtrail-logs'].lastIngestion).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">mindbodysecure-logs</span>
                      <Badge 
                        variant="outline"
                        className={getLogIngestionStatusColor(data.logIngestion['mindbodysecure-logs'].status)}
                      >
                        {data.logIngestion['mindbodysecure-logs'].status}
                      </Badge>
                    </div>
                    {data.logIngestion['mindbodysecure-logs'].lastIngestion && (
                      <p className="text-xs text-muted-foreground">
                        Last: {new Date(data.logIngestion['mindbodysecure-logs'].lastIngestion).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">aws-cloudtrail-logs</span>
                      <Badge 
                        variant="outline"
                        className={getLogIngestionStatusColor(data.logIngestion['aws-cloudtrail-logs'].status)}
                      >
                        {data.logIngestion['aws-cloudtrail-logs'].status}
                      </Badge>
                    </div>
                    {data.logIngestion['aws-cloudtrail-logs'].lastIngestion && (
                      <p className="text-xs text-muted-foreground">
                        Last: {new Date(data.logIngestion['aws-cloudtrail-logs'].lastIngestion).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Threat Level Summary Card */}
            <Card className="bg-card/95 backdrop-blur-md border-primary/20 md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-gold" />
                  Threat Level Summary
                </CardTitle>
                <CardDescription>Aggregated threat levels (last 24 hours)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {data.threatSummary.low}
                    </div>
                    <Badge className="bg-blue-500 text-white">Low</Badge>
                  </div>
                  <div className="p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-center">
                    <div className="text-4xl font-bold text-yellow-600 mb-2">
                      {data.threatSummary.medium}
                    </div>
                    <Badge className="bg-yellow-500 text-white">Medium</Badge>
                  </div>
                  <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
                    <div className="text-4xl font-bold text-red-600 mb-2">
                      {data.threatSummary.high}
                    </div>
                    <Badge className="bg-red-500 text-white">High</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityAdminDashboard;

