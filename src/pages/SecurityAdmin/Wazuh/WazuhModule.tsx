import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSecurityAuth } from '@/contexts/SecurityAuthContext';
import WazuhDashboard from './WazuhDashboard';
import WazuhAgentOverview from './WazuhAgentOverview';
import WazuhAccessFullDashboard from './WazuhAccessFullDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield } from 'lucide-react';

const WazuhModule = () => {
  const navigate = useNavigate();
  const { isAuthenticated, authToken } = useSecurityAuth();

  useEffect(() => {
    if (!isAuthenticated || !authToken) {
      navigate('/security-admin/login');
    }
  }, [isAuthenticated, authToken, navigate]);

  if (!isAuthenticated || !authToken) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-plum">
      <div className="container mx-auto p-6">
        <div className="mb-6 flex items-center gap-3">
          <Shield className="w-8 h-8 text-primary-foreground" />
          <h1 className="font-serif text-3xl font-bold text-primary-foreground">Wazuh SIEM</h1>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="agents">Agent Overview</TabsTrigger>
            <TabsTrigger value="access">Full Dashboard</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <WazuhDashboard />
          </TabsContent>

          <TabsContent value="agents">
            <WazuhAgentOverview />
          </TabsContent>

          <TabsContent value="access">
            <WazuhAccessFullDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WazuhModule;

