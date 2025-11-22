-- Create audit logs table for Security Admin Portal
CREATE TABLE IF NOT EXISTS public.security_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  username TEXT NOT NULL,
  action_type TEXT NOT NULL,
  resource_path TEXT,
  status TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX idx_security_audit_logs_timestamp ON public.security_audit_logs(timestamp DESC);
CREATE INDEX idx_security_audit_logs_username ON public.security_audit_logs(username);
CREATE INDEX idx_security_audit_logs_action_type ON public.security_audit_logs(action_type);

-- Enable RLS
ALTER TABLE public.security_audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view all audit logs"
ON public.security_audit_logs
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- System can insert audit logs (via edge function with service role key)
CREATE POLICY "Allow service role to insert audit logs"
ON public.security_audit_logs
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create function to clean up old audit logs (optional, for retention policy)
CREATE OR REPLACE FUNCTION public.cleanup_old_audit_logs()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.security_audit_logs
  WHERE timestamp < now() - interval '90 days';
END;
$$;