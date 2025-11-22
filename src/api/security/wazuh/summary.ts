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
      console.error('Wazuh summary error:', error);
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
      throw new Error(data.message || 'Failed to fetch summary');
    }

    console.log('Wazuh summary response:', data);

    // Parse the Wazuh API response structure
    const wazuhData = data?.data?.data || data?.data || {};
    
    // Extract agent counts from the response
    const connection = wazuhData.connection || 'disconnected';
    const total = wazuhData.total || 0;
    const active = wazuhData.active || 0;
    const disconnected = wazuhData.disconnected || 0;
    const pending = wazuhData.pending || 0;
    const neverConnected = wazuhData.never_connected || 0;
    
    return {
      success: true,
      data: {
        manager: {
          status: connection === 'active' || active > 0 ? 'online' : 'offline',
        },
        agents: {
          total: total,
          active: active,
          disconnected: disconnected + pending + neverConnected,
        },
      },
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    console.error('Failed to fetch Wazuh summary:', error);
    if (error.message === 'UNAUTHORIZED') {
      throw error;
    }
    throw new Error(`Failed to fetch Wazuh summary: ${error.message}`);
  }
};

