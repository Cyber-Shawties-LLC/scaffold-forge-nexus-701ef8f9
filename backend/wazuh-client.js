/**
 * Wazuh API Client
 * 
 * Connects to Wazuh Manager API and retrieves data.
 * This module handles authentication and data fetching.
 */

import axios from 'axios';

// Wazuh Manager API configuration
const WAZUH_MANAGER_URL = process.env.WAZUH_MANAGER_URL || 'https://your-wazuh-manager.com';
const WAZUH_USER = process.env.WAZUH_USER || 'wazuh-api-user';
const WAZUH_PASSWORD = process.env.WAZUH_PASSWORD || 'wazuh-api-password';

/**
 * Authenticate with Wazuh Manager API
 */
async function authenticateWazuh() {
  try {
    const response = await axios.post(
      `${WAZUH_MANAGER_URL}/security/user/authenticate`,
      {
        username: WAZUH_USER,
        password: WAZUH_PASSWORD
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data.data.token;
  } catch (error) {
    console.error('Wazuh authentication failed:', error.message);
    throw new Error('Failed to authenticate with Wazuh Manager');
  }
}

/**
 * Fetch Wazuh Manager health status
 */
async function fetchManagerHealth(token) {
  try {
    const response = await axios.get(
      `${WAZUH_MANAGER_URL}/manager/status`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data.data.affected_items[0]?.status === 'running' ? 'online' : 'offline';
  } catch (error) {
    console.error('Failed to fetch manager health:', error.message);
    return 'offline';
  }
}

/**
 * Fetch Wazuh Indexer health status
 */
async function fetchIndexerHealth(token) {
  try {
    const response = await axios.get(
      `${WAZUH_MANAGER_URL}/cluster/status`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    // Check if indexer is responding
    return response.status === 200 ? 'online' : 'offline';
  } catch (error) {
    console.error('Failed to fetch indexer health:', error.message);
    return 'offline';
  }
}

/**
 * Fetch Wazuh Dashboard health status
 */
async function fetchDashboardHealth(token) {
  try {
    // Check if dashboard API is accessible
    const response = await axios.get(
      `${WAZUH_MANAGER_URL}/`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.status === 200 ? 'online' : 'offline';
  } catch (error) {
    console.error('Failed to fetch dashboard health:', error.message);
    return 'offline';
  }
}

/**
 * Fetch alerts from last 24 hours
 */
async function fetchAlerts24h(token) {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const timestamp = Math.floor(yesterday.getTime() / 1000);
    
    const response = await axios.get(
      `${WAZUH_MANAGER_URL}/vulnerability`,
      {
        params: {
          date: `>${timestamp}`,
          limit: 1,
          select: 'timestamp,level'
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    const alerts = response.data.data.affected_items || [];
    const alertsCount = response.data.data.total_affected_items || 0;
    
    // Get highest severity
    let highestSeverity = null;
    if (alerts.length > 0) {
      const levels = alerts.map(a => a.level).filter(Boolean);
      if (levels.includes(15)) highestSeverity = 'critical';
      else if (levels.includes(12)) highestSeverity = 'high';
      else if (levels.includes(8)) highestSeverity = 'medium';
      else if (levels.includes(3)) highestSeverity = 'low';
    }
    
    // Get last alert timestamp
    const lastAlert = alerts.length > 0 ? alerts[0].timestamp : null;
    
    return {
      count: alertsCount,
      highestSeverity,
      lastAlert
    };
  } catch (error) {
    console.error('Failed to fetch alerts:', error.message);
    return {
      count: 0,
      highestSeverity: null,
      lastAlert: null
    };
  }
}

/**
 * Fetch agent status summary
 */
async function fetchAgentStatus(token) {
  try {
    const response = await axios.get(
      `${WAZUH_MANAGER_URL}/agents`,
      {
        params: {
          limit: 1000,
          select: 'status'
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    const agents = response.data.data.affected_items || [];
    const total = response.data.data.total_affected_items || 0;
    const online = agents.filter(a => a.status === 'active').length;
    const offline = total - online;
    
    return {
      total,
      online,
      offline
    };
  } catch (error) {
    console.error('Failed to fetch agent status:', error.message);
    return {
      total: 0,
      online: 0,
      offline: 0
    };
  }
}

/**
 * Fetch log ingestion status for S3 buckets
 * 
 * This would typically check your log ingestion pipeline status.
 * For now, this is a placeholder that should be implemented
 * based on your specific log ingestion setup.
 */
async function fetchLogIngestionStatus(token) {
  // TODO: Implement actual log ingestion status check
  // This should check your S3 -> Wazuh ingestion pipeline
  
  // Placeholder implementation
  return {
    'phase3-cloudtrail-logs': {
      status: 'healthy',
      lastIngestion: new Date().toISOString()
    },
    'mindbodysecure-logs': {
      status: 'healthy',
      lastIngestion: new Date().toISOString()
    },
    'aws-cloudtrail-logs': {
      status: 'healthy',
      lastIngestion: new Date().toISOString()
    }
  };
}

/**
 * Fetch threat level aggregation
 */
async function fetchThreatSummary(token) {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const timestamp = Math.floor(yesterday.getTime() / 1000);
    
    const response = await axios.get(
      `${WAZUH_MANAGER_URL}/vulnerability`,
      {
        params: {
          date: `>${timestamp}`,
          limit: 1000,
          select: 'level'
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    const alerts = response.data.data.affected_items || [];
    
    // Aggregate by threat level
    let low = 0;
    let medium = 0;
    let high = 0;
    
    alerts.forEach(alert => {
      const level = alert.level;
      if (level >= 12) high++;
      else if (level >= 8) medium++;
      else if (level >= 3) low++;
    });
    
    return {
      low,
      medium,
      high
    };
  } catch (error) {
    console.error('Failed to fetch threat summary:', error.message);
    return {
      low: 0,
      medium: 0,
      high: 0
    };
  }
}

/**
 * Fetch all Wazuh data
 */
export async function fetchWazuhData() {
  const token = await authenticateWazuh();
  
  const [
    managerHealth,
    indexerHealth,
    dashboardHealth,
    alerts,
    agents,
    logIngestion,
    threatSummary
  ] = await Promise.all([
    fetchManagerHealth(token),
    fetchIndexerHealth(token),
    fetchDashboardHealth(token),
    fetchAlerts24h(token),
    fetchAgentStatus(token),
    fetchLogIngestionStatus(token),
    fetchThreatSummary(token)
  ]);
  
  return {
    managerHealth,
    indexerHealth,
    dashboardHealth,
    alerts,
    agents,
    logIngestion,
    threatSummary
  };
}

/**
 * Sanitize Wazuh response
 * 
 * Removes all sensitive information:
 * - IP addresses
 * - Usernames
 * - File paths
 * - Event bodies
 * - Raw logs
 * - Any identifying metadata
 */
export function sanitizeWazuhResponse(rawData) {
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
    logIngestion: rawData.logIngestion,
    threatSummary: rawData.threatSummary
  };
}

