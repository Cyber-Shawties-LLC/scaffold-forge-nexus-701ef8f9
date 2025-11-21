/**
 * Wazuh API Client - FIXED VERSION
 * 
 * Connects to your production Wazuh instance at api.uminur.app
 * This version uses proper authentication and CORS handling.
 */

// Production Wazuh configuration
const WAZUH_BASE_URL = 'https://api.uminur.app/wazuh';
const WAZUH_API_URL = 'https://api.uminur.app/wazuh/api';

// Authentication credentials (replace with your actual Wazuh credentials)
const WAZUH_USER = 'admin'; // Default Wazuh user
const WAZUH_PASSWORD = 'your-wazuh-password'; // Replace with actual password

/**
 * Make authenticated request to Wazuh API
 */
async function makeWazuhRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${WAZUH_API_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    credentials: 'include', // Important for cookies
    headers: {
      'Content-Type': 'application/json',
      'osd-xsrf': 'true', // Required by Wazuh
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Wazuh API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Authenticate with Wazuh (using cookie-based auth)
 */
export async function authenticateWazuh(username: string, password: string) {
  try {
    const response = await fetch(`${WAZUH_BASE_URL}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Wazuh authentication failed:', error);
    throw error;
  }
}

/**
 * Check if user is authenticated
 */
export async function checkAuthentication() {
  try {
    const data = await makeWazuhRequest('/');
    return data;
  } catch (error) {
    console.error('Not authenticated:', error);
    return null;
  }
}

/**
 * Fetch Wazuh Manager health status
 */
async function fetchManagerHealth() {
  try {
    const data = await makeWazuhRequest('/manager/status');
    const status = data.data?.affected_items?.[0]?.status;
    return status === 'running' ? 'online' : 'offline';
  } catch (error) {
    console.error('Failed to fetch manager health:', error);
    return 'offline';
  }
}

/**
 * Fetch Wazuh cluster health
 */
async function fetchClusterHealth() {
  try {
    const data = await makeWazuhRequest('/cluster/status');
    return data.data?.enabled ? 'online' : 'offline';
  } catch (error) {
    console.error('Failed to fetch cluster health:', error);
    return 'offline';
  }
}

/**
 * Fetch alerts from last 24 hours
 */
async function fetchAlerts24h() {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const timestamp = yesterday.toISOString();

    // Query for recent alerts
    const data = await makeWazuhRequest(`/security/events?limit=1000&timestamp>${timestamp}`);
    
    const alerts = data.data?.affected_items || [];
    const alertsCount = data.data?.total_affected_items || 0;

    // Determine highest severity
    let highestSeverity = null;
    const levels = alerts.map((a: any) => a.rule?.level).filter(Boolean);
    
    if (levels.includes(15)) highestSeverity = 'critical';
    else if (levels.some((l: number) => l >= 12)) highestSeverity = 'high';
    else if (levels.some((l: number) => l >= 8)) highestSeverity = 'medium';
    else if (levels.some((l: number) => l >= 3)) highestSeverity = 'low';

    const lastAlert = alerts.length > 0 ? alerts[0].timestamp : null;

    return {
      count: alertsCount,
      highestSeverity,
      lastAlert,
    };
  } catch (error) {
    console.error('Failed to fetch alerts:', error);
    return {
      count: 0,
      highestSeverity: null,
      lastAlert: null,
    };
  }
}

/**
 * Fetch agent status summary
 */
async function fetchAgentStatus() {
  try {
    // Get agents summary
    const summaryData = await makeWazuhRequest('/agents/summary/status');
    
    const summary = summaryData.data || {};
    
    return {
      total: summary.total || 0,
      online: summary.active || 0,
      offline: summary.disconnected || 0,
    };
  } catch (error) {
    console.error('Failed to fetch agent status:', error);
    return {
      total: 0,
      online: 0,
      offline: 0,
    };
  }
}

/**
 * Fetch detailed agent list
 */
export async function fetchAgents() {
  try {
    const data = await makeWazuhRequest('/agents?limit=1000');
    return data.data?.affected_items || [];
  } catch (error) {
    console.error('Failed to fetch agents:', error);
    return [];
  }
}

/**
 * Fetch threat level aggregation
 */
async function fetchThreatSummary() {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const timestamp = yesterday.toISOString();

    const data = await makeWazuhRequest(`/security/events?limit=1000&timestamp>${timestamp}`);
    
    const alerts = data.data?.affected_items || [];

    let low = 0;
    let medium = 0;
    let high = 0;

    alerts.forEach((alert: any) => {
      const level = alert.rule?.level || 0;
      if (level >= 12) high++;
      else if (level >= 8) medium++;
      else if (level >= 3) low++;
    });

    return { low, medium, high };
  } catch (error) {
    console.error('Failed to fetch threat summary:', error);
    return { low: 0, medium: 0, high: 0 };
  }
}

/**
 * Fetch manager info
 */
export async function fetchManagerInfo() {
  try {
    const data = await makeWazuhRequest('/manager/info');
    return data.data?.affected_items?.[0] || null;
  } catch (error) {
    console.error('Failed to fetch manager info:', error);
    return null;
  }
}

/**
 * Fetch all Wazuh data (main function)
 */
export async function fetchWazuhData() {
  try {
    const [managerHealth, clusterHealth, alerts, agents, threatSummary] =
      await Promise.all([
        fetchManagerHealth(),
        fetchClusterHealth(),
        fetchAlerts24h(),
        fetchAgentStatus(),
        fetchThreatSummary(),
      ]);

    return {
      managerHealth,
      indexerHealth: clusterHealth,
      dashboardHealth: 'online', // Assume online if we can make requests
      alerts,
      agents,
      threatSummary,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Failed to fetch Wazuh data:', error);
    throw error;
  }
}

/**
 * Sanitize Wazuh response
 * Removes sensitive information
 */
export function sanitizeWazuhResponse(rawData: any) {
  return {
    managerHealth: rawData.managerHealth,
    indexerHealth: rawData.indexerHealth,
    dashboardHealth: rawData.dashboardHealth,
    alerts24h: rawData.alerts.count,
    highestSeverity: rawData.alerts.highestSeverity,
    lastAlert: rawData.alerts.lastAlert,
    agentsTotal: rawData.agents.total,
    agentsOnline: rawData.agents.online,
    agentsOffline: rawData.agents.offline,
    threatSummary: rawData.threatSummary,
    timestamp: rawData.timestamp,
  };
}

/**
 * Simple health check
 */
export async function checkWazuhHealth() {
  try {
    const response = await fetch(`${WAZUH_API_URL}/`, {
      credentials: 'include',
      headers: {
        'osd-xsrf': 'true',
      },
    });
    return response.ok;
  } catch (error) {
    console.error('Wazuh health check failed:', error);
    return false;
  }
}
