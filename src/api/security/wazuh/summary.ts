import { supabase } from '@/integrations/supabase/client';

export interface WazuhSummaryResponse {
  success: boolean;
  data: {
    manager: {
      status: 'online' | 'offline';
    };
    agents: {
      total: number;
      active: number;
      disconnected: number;
    };
  };
  timestamp: string;
}

export const fetchWazuhSummary = async (authToken: string): Promise<WazuhSummaryResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke('wazuh-proxy', {
      body: { path: '/api/agents/summary/status' },
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
    
    // Transform the response to match our expected format
    return {
      success: true,
      data: {
        manager: {
          status: data.data?.manager?.status === 'online' ? 'online' : 'offline',
        },
        agents: {
          total: data.data?.agents?.total || 0,
          active: data.data?.agents?.active || 0,
          disconnected: data.data?.agents?.disconnected || 0,
        },
      },
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      throw error;
    }
    throw new Error(`Failed to fetch Wazuh summary: ${error.message}`);
  }
};

