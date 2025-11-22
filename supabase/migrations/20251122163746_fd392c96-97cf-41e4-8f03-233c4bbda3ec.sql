-- Add INSERT policy to user_roles table to allow admins to assign roles
CREATE POLICY "Admins can insert roles" 
ON public.user_roles
FOR INSERT 
TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'admin'::app_role)
);

-- Also allow new users to self-assign patient role on first login
CREATE POLICY "Users can self-assign patient role once"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id 
  AND role = 'patient'::app_role
  AND NOT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid()
  )
);