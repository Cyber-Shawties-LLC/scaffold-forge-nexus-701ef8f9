import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSecurityAuth } from '@/contexts/SecurityAuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Activity, AlertTriangle, RefreshCw, Server, Users, AlertCircle } from 'lucide-react';
import { fetchWazuhSummary } from '@/api/security/wazuh/summary';
import { fetchWazuhAlerts } from '@/api/security/wazuh/alerts';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const WazuhDashboard = () => {
  const navigate = useNavigate();
  const { authToken, setAuthToken, setIsAuthenticated } = useSecurityAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState<any>(null);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = async () => {
    if (!authToken) return;

    try {
      setError('');
      
      // Fetch data with better error handling
      const [summaryResult, alertsResult] = await Promise.allSettled([
        fetchWazuhSummary(authToken),
        fetchWazuhAlerts(authToken, 5),
      ]);

      // Handle summary data
      if (summaryResult.status === 'fulfilled') {
        setSummary(summaryResult.value.data);
      } else {
        console.error('Failed to fetch summary:', summaryResult.reason);
        if (summaryResult.reason?.message !== 'UNAUTHORIZED') {
          // Keep existing data if available, just show error
          setError('Unable to fetch manager status. Showing cached data.');
        }
      }

      // Handle alerts data
      if (alertsResult.status === 'fulfilled') {
        setAlerts(alertsResult.value.data);
      } else {
        console.error('Failed to fetch alerts:', alertsResult.reason);
        // Keep existing alerts data if available
      }

      // Check for unauthorized
      if (
        (summaryResult.status === 'rejected' && summaryResult.reason?.message === 'UNAUTHORIZED') ||
        (alertsResult.status === 'rejected' && alertsResult.reason?.message === 'UNAUTHORIZED')
      ) {
        toast({
          title: 'Session Expired',
          description: 'Please log in again.',
          variant: 'destructive',
        });
        localStorage.removeItem('securityAuthToken');
        setAuthToken(null);
        setIsAuthenticated(false);
        navigate('/security-admin/login');
        return;
      }

      setLastUpdated(new Date());
      
      if (refreshing) {
        toast({
          title: 'Dashboard Updated',
          description: 'Data refreshed successfully.',
        });
      }
    } catch (err: any) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [authToken]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full" />
        <div className="grid md:grid-cols-3 gap-6">
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Header with Refresh */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-primary-foreground">
            Wazuh Security Monitoring Dashboard
          </h2>
          {lastUpdated && (
            <p className="text-sm text-primary-foreground/70 mt-1">
              Last updated: {lastUpdated.toLocaleString()}
            </p>
          )}
        </div>
        <Button
          onClick={handleRefresh}
          disabled={refreshing}
          variant="outline"
          className="border-primary-foreground/30 text-primary-foreground hover:bg-card/20"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Status Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Wazuh Manager */}
        <Card className="bg-card/95 backdrop-blur-md border-primary/20 shadow-luxury">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-serif flex items-center gap-2">
                <Server className="w-5 h-5" />
                Wazuh Manager
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Badge
              variant={summary?.manager?.status === 'online' ? 'default' : 'destructive'}
              className={
                summary?.manager?.status === 'online'
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }
            >
              {summary?.manager?.status === 'online' ? 'ONLINE' : 'OFFLINE'}
            </Badge>
          </CardContent>
        </Card>

        {/* Active Agents */}
        <Card className="bg-card/95 backdrop-blur-md border-primary/20 shadow-luxury">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-serif flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Active Agents
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary-foreground mb-2">
              {summary?.agents?.active || 0}
            </div>
            <p className="text-sm text-muted-foreground">
              of {summary?.agents?.total || 0} total agents
            </p>
          </CardContent>
        </Card>

        {/* Disconnected Agents */}
        <Card className="bg-card/95 backdrop-blur-md border-primary/20 shadow-luxury">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-serif flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Disconnected
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-destructive mb-2">
              {summary?.agents?.disconnected || 0}
            </div>
            <p className="text-sm text-muted-foreground">agents offline</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card className="bg-card/95 backdrop-blur-md border-primary/20 shadow-luxury">
        <CardHeader>
          <CardTitle className="font-serif flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Recent Security Alerts
          </CardTitle>
          <CardDescription>Latest security events and alerts from Wazuh</CardDescription>
        </CardHeader>
        <CardContent>
          {alerts.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No alerts found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Your system is running smoothly with no recent security events
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div
                  key={alert.id || alert._id || index}
                  className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant={
                          alert.rule?.level >= 12 || alert.level >= 12
                            ? 'destructive'
                            : alert.rule?.level >= 8 || alert.level >= 8
                            ? 'default'
                            : 'secondary'
                        }
                      >
                        Level {alert.rule?.level || alert.level || 'N/A'}
                      </Badge>
                      <span className="text-sm font-medium">
                        {alert.rule?.description || alert.description || 'Security Event'}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Agent: {alert.agent?.name || alert.agent_name || 'Unknown'} •{' '}
                      {alert.timestamp
                        ? new Date(alert.timestamp).toLocaleString()
                        : 'Unknown time'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WazuhDashboard;

