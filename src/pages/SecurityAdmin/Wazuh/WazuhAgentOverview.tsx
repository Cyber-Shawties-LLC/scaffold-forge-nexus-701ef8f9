import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSecurityAuth } from '@/contexts/SecurityAuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Users, Activity, AlertTriangle, RefreshCw, AlertCircle } from 'lucide-react';
import { fetchWazuhSummary } from '@/api/security/wazuh/summary';
import { fetchWazuhAgents } from '@/api/security/wazuh/agents';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const WazuhAgentOverview = () => {
  const navigate = useNavigate();
  const { authToken, setAuthToken, setIsAuthenticated } = useSecurityAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState<any>(null);
  const [agents, setAgents] = useState<any[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = async () => {
    if (!authToken) return;

    try {
      setError('');
      
      const [summaryResult, agentsResult] = await Promise.allSettled([
        fetchWazuhSummary(authToken),
        fetchWazuhAgents(authToken),
      ]);

      // Handle summary data
      if (summaryResult.status === 'fulfilled') {
        setSummary(summaryResult.value.data);
      } else {
        console.error('Failed to fetch summary:', summaryResult.reason);
        if (summaryResult.reason?.message !== 'UNAUTHORIZED') {
          setError('Unable to fetch agent summary. Showing cached data.');
        }
      }

      // Handle agents data
      if (agentsResult.status === 'fulfilled') {
        setAgents(agentsResult.value.data);
      } else {
        console.error('Failed to fetch agents:', agentsResult.reason);
      }

      // Check for unauthorized
      if (
        (summaryResult.status === 'rejected' && summaryResult.reason?.message === 'UNAUTHORIZED') ||
        (agentsResult.status === 'rejected' && agentsResult.reason?.message === 'UNAUTHORIZED')
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
          title: 'Agents Updated',
          description: 'Agent data refreshed successfully.',
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
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const totalAgents = summary?.agents?.total || 0;
  const activeAgents = summary?.agents?.active || 0;
  const disconnectedAgents = summary?.agents?.disconnected || 0;
  const activePercentage = totalAgents > 0 ? (activeAgents / totalAgents) * 100 : 0;

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
          <h2 className="font-serif text-2xl font-bold text-primary-foreground">Agent Overview</h2>
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

      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-card/95 backdrop-blur-md border-primary/20 shadow-luxury">
          <CardHeader>
            <CardTitle className="font-serif flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Active Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-600 mb-2">{activeAgents}</div>
            <p className="text-sm text-muted-foreground">of {totalAgents} total agents</p>
          </CardContent>
        </Card>

        <Card className="bg-card/95 backdrop-blur-md border-primary/20 shadow-luxury">
          <CardHeader>
            <CardTitle className="font-serif flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Disconnected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-destructive mb-2">{disconnectedAgents}</div>
            <p className="text-sm text-muted-foreground">agents offline</p>
          </CardContent>
        </Card>
      </div>

      {/* Agent Overview Card */}
      <Card className="bg-card/95 backdrop-blur-md border-primary/20 shadow-luxury">
        <CardHeader>
          <CardTitle className="font-serif flex items-center gap-2">
            <Users className="w-5 h-5" />
            Agent Overview
          </CardTitle>
          <CardDescription>Detailed agent status and statistics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status Bars */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="font-medium">Active Agents</span>
              </div>
              <span className="text-2xl font-bold text-green-600">{activeAgents}</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="font-medium">Disconnected</span>
              </div>
              <span className="text-2xl font-bold text-red-600">{disconnectedAgents}</span>
            </div>
          </div>

          {/* Progress Circle */}
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="transform -rotate-90 w-48 h-48">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - activePercentage / 100)}`}
                  className="text-green-500 transition-all duration-500"
                />
              </svg>
              <div className="absolute text-center">
                <div className="text-4xl font-bold">{Math.round(activePercentage)}%</div>
                <div className="text-sm text-muted-foreground">Active</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WazuhAgentOverview;

