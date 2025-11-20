# Wazuh API Backend Server

HIPAA-compliant backend API layer for the Umi Nur Security Admin Portal.

## Overview

This server acts as a secure intermediary between the frontend Security Admin Portal and the Wazuh Manager API. It ensures that **NO sensitive data** is exposed to the frontend:

- ❌ NO raw logs
- ❌ NO IP addresses
- ❌ NO usernames
- ❌ NO file paths
- ❌ NO event bodies
- ✅ ONLY aggregated, summarized data

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

3. Update `.env` with your Wazuh Manager credentials:
```
WAZUH_MANAGER_URL=https://your-wazuh-manager.com
WAZUH_USER=wazuh-api-user
WAZUH_PASSWORD=your-secure-password
PORT=3001
FRONTEND_URL=http://localhost:5173
```

4. Start the server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

## API Endpoints

### `GET /api/wazuh/health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "service": "wazuh-api"
}
```

### `GET /api/wazuh/dashboard`
Returns sanitized Wazuh dashboard data.

**Response:**
```json
{
  "managerHealth": "online",
  "indexerHealth": "online",
  "dashboardHealth": "online",
  "alerts24h": 42,
  "highestSeverity": "high",
  "lastAlert": "2024-01-15T10:30:00Z",
  "agentsTotal": 150,
  "agentsOnline": 145,
  "agentsOffline": 5,
  "logIngestion": {
    "phase3-cloudtrail-logs": {
      "status": "healthy",
      "lastIngestion": "2024-01-15T10:25:00Z"
    },
    "mindbodysecure-logs": {
      "status": "healthy",
      "lastIngestion": "2024-01-15T10:25:00Z"
    },
    "aws-cloudtrail-logs": {
      "status": "healthy",
      "lastIngestion": "2024-01-15T10:25:00Z"
    }
  },
  "threatSummary": {
    "low": 20,
    "medium": 15,
    "high": 7
  }
}
```

## Security

- All responses are sanitized before being sent to the frontend
- No sensitive data is ever exposed
- CORS is configured to only allow requests from the frontend URL
- Authentication with Wazuh Manager is handled server-side only

## Deployment

This server should be deployed separately from the frontend, ideally:
- On the same network as your Wazuh Manager
- Behind a firewall
- With proper authentication/authorization middleware added
- Using HTTPS in production

## Environment Variables

- `WAZUH_MANAGER_URL`: URL of your Wazuh Manager API
- `WAZUH_USER`: Username for Wazuh API authentication
- `WAZUH_PASSWORD`: Password for Wazuh API authentication
- `PORT`: Server port (default: 3001)
- `FRONTEND_URL`: Frontend URL for CORS (default: http://localhost:5173)

