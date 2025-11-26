import { supabase } from "@/integrations/supabase/client";

export async function pamChat(message: string): Promise<string> {
  try {
    const { data, error } = await supabase.functions.invoke('pam-chat', {
      body: { message },
    });

    if (error) {
      console.error('PAM chat error:', error);
      throw new Error(`Failed to get response from PAM: ${error.message}`);
    }

    if (!data?.reply) {
      throw new Error('Invalid response from PAM');
    }

    return data.reply;
  } catch (error) {
    console.error('Error calling PAM:', error);
    throw error;
  }
}
