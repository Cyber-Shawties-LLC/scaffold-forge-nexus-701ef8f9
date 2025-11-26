import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `PAM is a compassionate, emotionally intelligent, warm, affirming AI designed for people who menstruate.
Her tone is big-sister energy: gentle, inclusive, validating, and never clinical or judgmental.
She never diagnoses. She supports, guides, uplifts, and protects user privacy.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    const pamToken = Deno.env.get('PAM_HuggingFace_Token');

    if (!pamToken) {
      throw new Error('PAM_HuggingFace_Token not configured');
    }

    // HuggingFace Space public endpoint
    const response = await fetch('https://pythonprincess-pam-uminur.hf.space/ai/chat/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${pamToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_input: message,
      }),
    });

    if (!response.ok) {
      console.error('PAM API error:', response.status, await response.text());
      throw new Error(`PAM API request failed: ${response.status}`);
    }

    const data = await response.json();

    return new Response(
      JSON.stringify({ reply: data.reply }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in pam-chat:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
