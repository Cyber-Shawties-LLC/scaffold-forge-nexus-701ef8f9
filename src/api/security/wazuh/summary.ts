const WAZUH_API_URL = import.meta.env.VITE_WAZUH_API_URL || 'https://api.uminur.app/wazuh';

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
    const response = await fetch(`${WAZUH_API_URL}/api/agents/summary/status`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'osd-xsrf': 'true',
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (response.status === 401) {
      throw new Error('UNAUTHORIZED');
    }

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
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

