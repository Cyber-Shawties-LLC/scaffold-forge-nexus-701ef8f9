import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle, XCircle, Shield, Activity, TrendingUp, BarChart3 } from 'lucide-react';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

interface AuditLog {
  id: string;
  timestamp: string;
  username: string;
  action_type: string;
  resource_path: string | null;
  status: string;
  ip_address: string | null;
  user_agent: string | null;
  metadata: any;
}

const AuditLogs = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalActions: 0,
    successfulActions: 0,
    failedActions: 0,
    uniqueUsers: 0
  });
  const [recentFailures, setRecentFailures] = useState<Map<string, number>>(new Map());
  const [analyticsData, setAnalyticsData] = useState({
    loginTrends: [] as any[],
    apiUsage: [] as any[],
    actionTypes: [] as any[],
    hourlyActivity: [] as any[]
  });

  useEffect(() => {
    fetchAuditLogs();
    setupRealtimeSubscription();
  }, []);

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('audit-logs-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'security_audit_logs'
        },
        (payload) => {
          const newLog = payload.new as AuditLog;
          
          // Add to logs
          setLogs(prev => [newLog, ...prev.slice(0, 99)]);
          
          // Detect suspicious activity
          detectSuspiciousActivity(newLog);
          
          // Update stats
          setStats(prev => ({
            totalActions: prev.totalActions + 1,
            successfulActions: prev.successfulActions + (newLog.status === 'SUCCESS' ? 1 : 0),
            failedActions: prev.failedActions + (newLog.status === 'FAILURE' ? 1 : 0),
            uniqueUsers: prev.uniqueUsers
          }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const detectSuspiciousActivity = (log: AuditLog) => {
    // Track failed login attempts
    if (log.status === 'FAILURE' && log.action_type === 'LOGIN_ATTEMPT') {
      const key = `${log.username}_${log.ip_address}`;
      const currentCount = recentFailures.get(key) || 0;
      const newCount = currentCount + 1;
      
      setRecentFailures(prev => {
        const updated = new Map(prev);
        updated.set(key, newCount);
        return updated;
      });

      // Alert on multiple failures
      if (newCount >= 3) {
        toast.error('Security Alert', {
          description: `Multiple failed login attempts detected for ${log.username} from ${log.ip_address}`,
          duration: 10000,
        });
      }
    }

    // Alert on unauthorized access patterns
    if (log.status === 'FAILURE' && log.metadata?.statusCode === 403) {
      toast.warning('Unauthorized Access Attempt', {
        description: `User ${log.username} attempted to access ${log.resource_path}`,
        duration: 8000,
      });
    }
  };

  const fetchAuditLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('security_audit_logs')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(100);

      if (error) throw error;

      setLogs(data || []);

      // Calculate stats and analytics
      if (data) {
        const uniqueUsers = new Set(data.map(log => log.username)).size;
        const successful = data.filter(log => log.status === 'SUCCESS').length;
        const failed = data.filter(log => log.status === 'FAILURE').length;

        setStats({
          totalActions: data.length,
          successfulActions: successful,
          failedActions: failed,
          uniqueUsers
        });

        // Calculate analytics data
        calculateAnalytics(data);
      }
    } catch (error) {
      console.error('Error fetching audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateAnalytics = (data: AuditLog[]) => {
    // Login trends over last 7 days
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), 6 - i);
      const dayStart = startOfDay(date);
      const dayEnd = endOfDay(date);
      
      const dayLogs = data.filter(log => {
        const logDate = new Date(log.timestamp);
        return logDate >= dayStart && logDate <= dayEnd;
      });
      
      return {
        date: format(date, 'MMM dd'),
        successful: dayLogs.filter(l => l.status === 'SUCCESS' && l.action_type.includes('LOGIN')).length,
        failed: dayLogs.filter(l => l.status === 'FAILURE' && l.action_type.includes('LOGIN')).length,
      };
    });

    // API usage by endpoint
    const apiCounts: Record<string, number> = {};
    data.forEach(log => {
      if (log.action_type === 'API_ACCESS' && log.resource_path) {
        apiCounts[log.resource_path] = (apiCounts[log.resource_path] || 0) + 1;
      }
    });
    const apiUsageData = Object.entries(apiCounts)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Action types distribution
    const actionCounts: Record<string, number> = {};
    data.forEach(log => {
      actionCounts[log.action_type] = (actionCounts[log.action_type] || 0) + 1;
    });
    const actionTypesData = Object.entries(actionCounts).map(([name, value]) => ({
      name,
      value
    }));

    // Hourly activity pattern
    const hourlyCounts = Array.from({ length: 24 }, (_, hour) => {
      const count = data.filter(log => {
        const logHour = new Date(log.timestamp).getHours();
        return logHour === hour;
      }).length;
      return {
        hour: `${hour}:00`,
        activity: count
      };
    });

    setAnalyticsData({
      loginTrends: last7Days,
      apiUsage: apiUsageData,
      actionTypes: actionTypesData,
      hourlyActivity: hourlyCounts
    });
  };

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'LOGIN':
        return <Shield className="h-4 w-4" />;
      case 'LOGOUT':
        return <Activity className="h-4 w-4" />;
      case 'API_ACCESS':
        return <Activity className="h-4 w-4" />;
      case 'LOGIN_ATTEMPT':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'SUCCESS') {
      return (
        <Badge variant="secondary" className="gap-1">
          <CheckCircle className="h-3 w-3" />
          Success
        </Badge>
      );
    }
    return (
      <Badge variant="destructive" className="gap-1">
        <XCircle className="h-3 w-3" />
        Failed
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-serif font-bold">Audit Logs</h2>
          <p className="text-muted-foreground">Loading security audit trail...</p>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))', 'hsl(var(--destructive))'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-bold">Security Audit Logs</h2>
        <p className="text-muted-foreground">
          Real-time monitoring and analytics for Security Admin Portal
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalActions}</div>
            <p className="text-xs text-muted-foreground">Last 100 entries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Successful</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.successfulActions}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalActions > 0 ? Math.round((stats.successfulActions / stats.totalActions) * 100) : 0}% success rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Failed Attempts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.failedActions}</div>
            <p className="text-xs text-muted-foreground">Requires investigation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.uniqueUsers}</div>
            <p className="text-xs text-muted-foreground">Active administrators</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Logs and Analytics */}
      <Tabs defaultValue="logs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="logs">Audit Logs</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Real-time monitoring of all security-related actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {logs.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No audit logs found. Activity will appear here as actions occur.
                  </div>
                ) : (
                  logs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                    >
                      <div className="mt-1">{getActionIcon(log.action_type)}</div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <Badge variant="outline" className="font-mono text-xs">
                            {log.username}
                          </Badge>
                          {getStatusBadge(log.status)}
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(log.timestamp), 'MMM dd, yyyy HH:mm:ss')}
                          </span>
                        </div>
                        
                        <p className="text-sm font-medium mb-1">
                          {log.action_type.replace(/_/g, ' ')}
                        </p>
                        
                        <div className="text-xs text-muted-foreground space-y-1">
                          {log.resource_path && (
                            <div>Resource: <span className="font-mono">{log.resource_path}</span></div>
                          )}
                          <div className="flex gap-4 flex-wrap">
                            <span>IP: {log.ip_address}</span>
                            {log.metadata?.method && (
                              <span>Method: {log.metadata.method}</span>
                            )}
                            {log.metadata?.statusCode && (
                              <span>Status: {log.metadata.statusCode}</span>
                            )}
                          </div>
                          {log.metadata?.error && (
                            <div className="text-red-600">Error: {log.metadata.error}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          {/* Login Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Login Trends (Last 7 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData.loginTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="successful" stroke="hsl(var(--primary))" strokeWidth={2} name="Successful" />
                  <Line type="monotone" dataKey="failed" stroke="hsl(var(--destructive))" strokeWidth={2} name="Failed" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            {/* API Usage */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Top API Endpoints
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.apiUsage}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="path" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Action Types Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Action Types Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.actionTypes}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="hsl(var(--primary))"
                      dataKey="value"
                    >
                      {analyticsData.actionTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Hourly Activity Pattern */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">24-Hour Activity Pattern</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.hourlyActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="activity" fill="hsl(var(--secondary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuditLogs;
