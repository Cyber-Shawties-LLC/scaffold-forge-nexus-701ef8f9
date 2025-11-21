import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Shield } from 'lucide-react';

const WazuhAccessFullDashboard = () => {
  const handleOpenDashboard = () => {
    // Open the full Wazuh dashboard in a new tab
    window.open('https://api.uminur.app/wazuh', '_blank');
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card/95 backdrop-blur-md border-primary/20 shadow-luxury">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-secondary">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="font-serif text-2xl">Access Full Wazuh Dashboard</CardTitle>
              <CardDescription className="text-base mt-1">
                View detailed security analytics, logs, and alerts
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-primary via-secondary to-plum p-8 rounded-lg text-white">
            <h3 className="font-serif text-xl font-bold mb-2">Full Wazuh Dashboard</h3>
            <p className="text-white/90 mb-6">
              Access the complete Wazuh security monitoring interface with advanced features:
            </p>
            <ul className="space-y-2 mb-6 text-white/90">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                Real-time security event monitoring
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                Advanced threat detection and analysis
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                Comprehensive log management
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                Custom dashboards and reports
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                Agent configuration and management
              </li>
            </ul>
            <Button
              onClick={handleOpenDashboard}
              className="bg-white text-primary hover:bg-white/90"
              size="lg"
            >
              Open Dashboard
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="p-6 bg-muted/50 rounded-lg">
            <h4 className="font-semibold mb-2">Note</h4>
            <p className="text-sm text-muted-foreground">
              The full Wazuh dashboard will open in a new browser tab. Make sure you're
              authenticated and have the necessary permissions to access the dashboard.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WazuhAccessFullDashboard;

