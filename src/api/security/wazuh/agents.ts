const WAZUH_API_URL = import.meta.env.VITE_WAZUH_API_URL || 'https://api.uminur.app/wazuh';

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
    const response = await fetch(`${WAZUH_API_URL}/api/agents`, {
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

