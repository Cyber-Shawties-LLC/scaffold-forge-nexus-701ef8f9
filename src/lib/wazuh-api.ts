/**
 * Wazuh API Client
 * 
 * This client connects to our backend API layer which sanitizes
 * Wazuh data before returning it to the frontend.
 * 
 * NO raw logs, IP addresses, usernames, or file paths are exposed.
 */

const API_BASE_URL = import.meta.env.VITE_WAZUH_API_URL || 'http://localhost:3001/api';

export interface WazuhSystemHealth {
  managerHealth: 'online' | 'offline';
  indexerHealth: 'online' | 'offline';
  dashboardHealth: 'online' | 'offline';
}

export interface WazuhAlerts {
  alerts24h: number;
  highestSeverity: 'low' | 'medium' | 'high' | 'critical' | null;
  lastAlert: string | null; // ISO timestamp
}

export interface WazuhAgents {
  total: number;
  online: number;
  offline: number;
}

export interface LogIngestionStatus {
  status: 'healthy' | 'degraded' | 'stopped';
  lastIngestion: string | null; // ISO timestamp
}

export interface WazuhLogIngestion {
  'phase3-cloudtrail-logs': LogIngestionStatus;
  'mindbodysecure-logs': LogIngestionStatus;
  'aws-cloudtrail-logs': LogIngestionStatus;
}

export interface WazuhThreatSummary {
  low: number;
  medium: number;
  high: number;
}

export interface WazuhDashboardData {
  managerHealth: WazuhSystemHealth['managerHealth'];
  indexerHealth: WazuhSystemHealth['indexerHealth'];
  dashboardHealth: WazuhSystemHealth['dashboardHealth'];
  alerts24h: number;
  highestSeverity: WazuhAlerts['highestSeverity'];
  lastAlert: string | null;
  agentsTotal: number;
  agentsOnline: number;
  agentsOffline: number;
  logIngestion: WazuhLogIngestion;
  threatSummary: WazuhThreatSummary;
}

/**
 * Fetch sanitized Wazuh dashboard data
 * 
 * This endpoint returns ONLY safe, summarized data:
 * - System health status
 * - Alert counts and severity (no alert bodies)
 * - Agent counts (no agent details)
 * - Log ingestion status (no log content)
 * - Threat level aggregation (no identifying info)
 * 
 * All IP addresses, usernames, file paths, and raw logs are removed.
 */
export async function fetchWazuhDashboardData(): Promise<WazuhDashboardData> {
  const response = await fetch(`${API_BASE_URL}/wazuh/dashboard`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Add authentication header if needed
      // 'Authorization': `Bearer ${getSecurityAdminToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Wazuh data: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Check if the Wazuh API is accessible
 */
export async function checkWazuhApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/wazuh/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

