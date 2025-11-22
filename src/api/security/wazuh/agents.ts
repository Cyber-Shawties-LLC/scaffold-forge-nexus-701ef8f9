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
      body: { path: '/api/agents' },
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (error) {
      if (error.message.includes('401')) {
        throw new Error('UNAUTHORIZED');
      }
      throw new Error(`API error: ${error.message}`);
    }
    
    return {
      success: true,
      data: data.data?.items || [],
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      throw error;
    }
    throw new Error(`Failed to fetch Wazuh agents: ${error.message}`);
  }
};

