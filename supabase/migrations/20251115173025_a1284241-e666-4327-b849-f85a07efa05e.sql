-- Create trigger function to automatically assign 'patient' role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'patient'::app_role);
  RETURN NEW;
END;
$$;

-- Create trigger to automatically assign role when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Remove the admin insert policy since we don't want client-side role assignment
DROP POLICY IF EXISTS "Admins can insert roles" ON public.user_roles;