/**
 * Wazuh API Client - JavaScript Version
 *
 * Handles authentication and API calls to Wazuh
 */

// Production Wazuh configuration
const WAZUH_BASE_URL = "https://api.uminur.app/wazuh";
const WAZUH_API_URL = "https://api.uminur.app/wazuh/api";

// Store authentication token
let authToken = null;

/**
 * Login to Wazuh and get authentication token
 */
export async function loginToWazuh(username, password) {
  try {
    const response = await fetch(`${WAZUH_BASE_URL}/api/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.status}`);
    }

    const data = await response.json();

    // Store the token if provided
    if (data.data && data.data.token) {
      authToken = data.data.token;
    }

    return data;
  } catch (error) {
    console.error("Wazuh login error:", error);
    throw error;
  }
}

/**
 * Make authenticated request to Wazuh API
 */
async function makeWazuhRequest(endpoint, options = {}) {
  const url = `${WAZUH_API_URL}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    "osd-xsrf": "true",
    ...options.headers,
  };

  // Add authorization token if available
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: headers,
  });

  if (response.status === 401) {
    throw new Error("Unauthorized - Please login first");
  }

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Check API health
 */
export async function checkWazuhHealth() {
  try {
    const response = await fetch(`${WAZUH_API_URL}/`, {
      credentials: "include",
      headers: {
        "osd-xsrf": "true",
      },
    });
    return response.ok;
  } catch (error) {
    console.error("Health check failed:", error);
    return false;
  }
}

/**
 * Fetch agents summary
 */
export async function fetchAgentsSummary() {
  try {
    const data = await makeWazuhRequest("/agents/summary/status");
    return data.data || { total: 0, active: 0, disconnected: 0 };
  } catch (error) {
    console.error("Failed to fetch agents:", error);
    return { total: 0, active: 0, disconnected: 0 };
  }
}

/**
 * Fetch all agents
 */
export async function fetchAgents() {
  try {
    const data = await makeWazuhRequest("/agents?limit=1000");
    return data.data?.affected_items || [];
  } catch (error) {
    console.error("Failed to fetch agents:", error);
    return [];
  }
}

/**
 * Fetch manager status
 */
export async function fetchManagerStatus() {
  try {
    const data = await makeWazuhRequest("/manager/status");
    const status = data.data?.affected_items?.[0]?.status;
    return status === "running" ? "online" : "offline";
  } catch (error) {
    console.error("Failed to fetch manager status:", error);
    return "offline";
  }
}

/**
 * Fetch manager info
 */
export async function fetchManagerInfo() {
  try {
    const data = await makeWazuhRequest("/manager/info");
    return data.data?.affected_items?.[0] || null;
  } catch (error) {
    console.error("Failed to fetch manager info:", error);
    return null;
  }
}

/**
 * Fetch recent alerts (last 24 hours)
 */
export async function fetchRecentAlerts() {
  try {
    // Get timestamp for 24 hours ago
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const timestamp = Math.floor(yesterday.getTime() / 1000);

    const data = await makeWazuhRequest(`/security/events?limit=100&timestamp>${timestamp}`);
    return data.data?.affected_items || [];
  } catch (error) {
    console.error("Failed to fetch alerts:", error);
    return [];
  }
}

/**
 * Fetch all Wazuh data
 */
export async function fetchWazuhData() {
  try {
    const [managerStatus, agents, managerInfo] = await Promise.all([
      fetchManagerStatus(),
      fetchAgentsSummary(),
      fetchManagerInfo(),
    ]);

    return {
      managerStatus,
      agents,
      managerInfo,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Failed to fetch Wazuh data:", error);
    throw error;
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated() {
  return authToken !== null;
}

/**
 * Logout
 */
export function logout() {
  authToken = null;
}
