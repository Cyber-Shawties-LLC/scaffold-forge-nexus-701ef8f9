const WAZUH_API_URL = import.meta.env.VITE_WAZUH_API_URL || 'https://api.uminur.app/wazuh';

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
    const response = await fetch(`${WAZUH_API_URL}/api/alerts?limit=${limit}`, {
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
    throw new Error(`Failed to fetch Wazuh alerts: ${error.message}`);
  }
};

