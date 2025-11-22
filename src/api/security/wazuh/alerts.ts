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
    throw new Error(`Failed to fetch Wazuh alerts: ${error.message}`);
  }
};

