import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const WAZUH_API_URL = (Deno.env.get('VITE_WAZUH_API_URL') || 'https://api.uminur.app/wazuh').replace(/\/$/, '');

// Whitelist of allowed API paths
const ALLOWED_PATHS = [
  '/api/login',
  '/api/agents/summary/status',
  '/api/agents',
  '/api/alerts',
  '/api/overview/agents',
] as const;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, osd-xsrf',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    let path = url.searchParams.get('path') || '/api/login';
    const method = req.method;

    // Get request body if present
    let requestBody: any = null;
    let bodyForWazuh = null;
    let wazuhHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (method !== 'GET' && method !== 'HEAD') {
      const bodyText = await req.text();
      if (bodyText) {
        requestBody = JSON.parse(bodyText);
        
        // If path is in body, use it
        if (requestBody.path) {
          path = requestBody.path;
          delete requestBody.path;
        }
        
        // Prepare body for Wazuh (everything except path)
        bodyForWazuh = JSON.stringify(requestBody);
      }
    }

    // Validate path is allowed
    if (!ALLOWED_PATHS.includes(path as any)) {
      console.error(`Blocked unauthorized path attempt: ${path}`);
      return new Response(
        JSON.stringify({ 
          error: 'Unauthorized path',
          message: 'This API endpoint is not available through the proxy'
        }),
        { 
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Additional path format validation
    if (path.includes('..') || !path.startsWith('/api/')) {
      console.error(`Blocked malicious path pattern: ${path}`);
      return new Response(
        JSON.stringify({ error: 'Invalid path format' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Log request for audit trail
    console.log({
      timestamp: new Date().toISOString(),
      method,
      path,
      hasAuth: !!req.headers.get('authorization')
    });

    // Special handling for Wazuh login endpoint
    let finalMethod = method;
    let finalBody = bodyForWazuh;
    
    if (path === '/api/login' && requestBody?.username && requestBody?.password) {
      // Wazuh API uses Basic Authentication for login
      const credentials = `${requestBody.username}:${requestBody.password}`;
      const base64Credentials = btoa(credentials);
      wazuhHeaders['Authorization'] = `Basic ${base64Credentials}`;
      
      // Wazuh login is typically a GET request with Basic Auth
      finalMethod = 'GET';
      finalBody = null;
      
      console.log(`Using Basic Auth for login with username: ${requestBody.username}`);
    } else if (req.headers.get('authorization')) {
      // For non-login requests, forward the authorization header from client
      wazuhHeaders['Authorization'] = req.headers.get('authorization')!;
    }

    const fullUrl = `${WAZUH_API_URL}${path}`;
    console.log(`Proxying ${finalMethod} request to: ${fullUrl}`);
    
    // Forward the request to Wazuh API
    const wazuhResponse = await fetch(fullUrl, {
      method: finalMethod,
      headers: wazuhHeaders,
      ...(finalBody ? { body: finalBody } : {}),
    });

    // Get response data
    const responseText = await wazuhResponse.text();
    let responseData;
    
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = responseText;
    }

    console.log(`Wazuh API responded with status: ${wazuhResponse.status}`);
    
    if (wazuhResponse.status === 401) {
      console.error('Authentication failed - 401 Unauthorized from Wazuh API');
      console.error('Response text:', responseText);

      // Always return 200 to the frontend, but include the 401 info in the body
      return new Response(
        JSON.stringify({
          success: false,
          status: 401,
          error: 'UNAUTHORIZED',
          message: typeof responseData === 'string' ? responseData : responseData?.message || 'Authentication Exception',
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Return the response with CORS headers
    return new Response(
      JSON.stringify({ success: true, data: responseData }),
      {
        status: wazuhResponse.status,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error in wazuh-proxy:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: 'Failed to connect to Wazuh API'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
