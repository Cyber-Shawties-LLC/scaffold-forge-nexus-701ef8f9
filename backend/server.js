/**
 * Wazuh API Backend Server
 * 
 * HIPAA-Compliant API layer that sanitizes Wazuh data before
 * returning it to the frontend Security Admin Portal.
 * 
 * SECURITY REQUIREMENTS:
 * - NO raw logs exposed
 * - NO IP addresses
 * - NO usernames
 * - NO file paths
 * - NO event bodies
 * - Only aggregated, summarized data
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fetchWazuhData, sanitizeWazuhResponse } from './wazuh-client.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/api/wazuh/health', (req, res) => {
  res.json({ status: 'ok', service: 'wazuh-api' });
});

/**
 * GET /api/wazuh/dashboard
 * 
 * Returns sanitized Wazuh dashboard data:
 * - System health (manager, indexer, dashboard)
 * - Alert counts and severity (no alert bodies)
 * - Agent counts (no agent details)
 * - Log ingestion status (no log content)
 * - Threat level aggregation (no identifying info)
 * 
 * All sensitive data is removed before response.
 */
app.get('/api/wazuh/dashboard', async (req, res) => {
  try {
    // Fetch data from Wazuh Manager API
    const rawData = await fetchWazuhData();
    
    // Sanitize the response - remove all sensitive information
    const sanitizedData = sanitizeWazuhResponse(rawData);
    
    res.json(sanitizedData);
  } catch (error) {
    console.error('Error fetching Wazuh data:', error);
    res.status(500).json({ 
      error: 'Failed to fetch Wazuh data',
      message: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Wazuh API Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/wazuh/health`);
  console.log(`Dashboard endpoint: http://localhost:${PORT}/api/wazuh/dashboard`);
});

