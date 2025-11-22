import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, CheckCircle, XCircle, Shield, Activity } from 'lucide-react';
import { format } from 'date-fns';

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

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const fetchAuditLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('security_audit_logs')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(100);

      if (error) throw error;

      setLogs(data || []);

      // Calculate stats
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
      }
    } catch (error) {
      console.error('Error fetching audit logs:', error);
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-bold">Security Audit Logs</h2>
        <p className="text-muted-foreground">
          Comprehensive audit trail of all Security Admin Portal access and actions
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

      {/* Audit Log Entries */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Recent Activity</CardTitle>
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
    </div>
  );
};

export default AuditLogs;
