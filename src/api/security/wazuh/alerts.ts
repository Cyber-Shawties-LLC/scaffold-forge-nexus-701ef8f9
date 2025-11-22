import { supabase } from '@/integrations/supabase/client';

export interface WazuhAlert {
  id: string;
  timestamp: string;
  level: number;
  rule: {
    id: number;
    description: string;
  };
  agent: {
    id: string;
    name: string;
  };
  location: string;
}

export interface WazuhAlertsResponse {
  success: boolean;
  data: WazuhAlert[];
  timestamp: string;
}

export const fetchWazuhAlerts = async (
  authToken: string,
  limit: number = 10
): Promise<WazuhAlertsResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke('wazuh-proxy', {
      body: { path: `/api/alerts?limit=${limit}` },
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (error) {
      console.error('Wazuh alerts error:', error);
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
      throw new Error(data.message || 'Failed to fetch alerts');
    }

    console.log('Wazuh alerts response:', data);

    // Parse the Wazuh API response structure
    // Wazuh API returns: { data: { affected_items: [...], total_affected_items: N } }
    const wazuhData = data?.data?.data || data?.data || {};
    const alerts = wazuhData.affected_items || wazuhData.items || [];
    
    return {
      success: true,
      data: alerts,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    console.error('Failed to fetch Wazuh alerts:', error);
    if (error.message === 'UNAUTHORIZED') {
      throw error;
    }
    throw new Error(`Failed to fetch Wazuh alerts: ${error.message}`);
  }
};

