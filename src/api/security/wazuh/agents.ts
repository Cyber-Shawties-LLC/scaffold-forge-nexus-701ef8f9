import { supabase } from '@/integrations/supabase/client';

export interface WazuhAgent {
  id: string;
  name: string;
  status: 'active' | 'disconnected' | 'pending';
  ip: string;
  os: string;
  version: string;
  lastKeepAlive: string;
}

export interface WazuhAgentsResponse {
  success: boolean;
  data: WazuhAgent[];
  timestamp: string;
}

export const fetchWazuhAgents = async (authToken: string): Promise<WazuhAgentsResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke('wazuh-proxy', {
      body: { path: '/agents' },
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (error) {
      console.error('Wazuh agents error:', error);
      if (error.message?.includes('401') || error.status === 401) {
        throw new Error('UNAUTHORIZED');
      }
      throw new Error(`API error: ${error.message}`);
    }

    // Check if edge function returned an error response
    if (data?.success === false) {
      console.error('Wazuh API error:', data);
      if (data.status === 401) {
        throw new Error('UNAUTHORIZED');
      }
      throw new Error(data.message || 'Failed to fetch agents');
    }

    console.log('Wazuh agents response:', data);

    // Parse the Wazuh API response structure
    // Wazuh API returns: { data: { affected_items: [...], total_affected_items: N } }
    const wazuhData = data?.data?.data || data?.data || {};
    const agents = wazuhData.affected_items || wazuhData.items || [];
    
    return {
      success: true,
      data: agents,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    console.error('Failed to fetch Wazuh agents:', error);
    if (error.message === 'UNAUTHORIZED') {
      throw error;
    }
    throw new Error(`Failed to fetch Wazuh agents: ${error.message}`);
  }
};

