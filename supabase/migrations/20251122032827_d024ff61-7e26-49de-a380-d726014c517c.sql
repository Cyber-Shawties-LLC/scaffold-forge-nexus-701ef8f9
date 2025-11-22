-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create period_tracker table for patient menstrual cycle tracking
CREATE TABLE IF NOT EXISTS public.period_tracker (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  last_period DATE NOT NULL,
  cycle_length INTEGER DEFAULT 28,
  period_length INTEGER DEFAULT 5,
  next_period DATE,
  fertile_window_start DATE,
  fertile_window_end DATE,
  notifications_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.period_tracker ENABLE ROW LEVEL SECURITY;

-- Users can view their own period tracker data
CREATE POLICY "Users can view own period tracker"
ON public.period_tracker FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can insert their own period tracker data
CREATE POLICY "Users can insert own period tracker"
ON public.period_tracker FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can update their own period tracker data
CREATE POLICY "Users can update own period tracker"
ON public.period_tracker FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Users can delete their own period tracker data
CREATE POLICY "Users can delete own period tracker"
ON public.period_tracker FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Create index for faster user lookups
CREATE INDEX idx_period_tracker_user_id ON public.period_tracker(user_id);

-- Create updated_at trigger
CREATE TRIGGER update_period_tracker_updated_at
BEFORE UPDATE ON public.period_tracker
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();