-- Function to get all users with their roles and profiles (Admin only)
CREATE OR REPLACE FUNCTION public.get_admin_users_list()
RETURNS TABLE (
  id UUID,
  email VARCHAR,
  full_name TEXT,
  organization TEXT,
  role app_role,
  created_at TIMESTAMPTZ,
  last_sign_in_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if the requesting user is an admin
  IF NOT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Acesso negado. Apenas administradores podem visualizar esta lista.';
  END IF;

  RETURN QUERY
  SELECT
    au.id,
    au.email::VARCHAR,
    p.full_name,
    p.organization,
    COALESCE(ur.role, 'publico'::app_role) as role,
    au.created_at,
    au.last_sign_in_at
  FROM auth.users au
  LEFT JOIN public.profiles p ON p.user_id = au.id
  LEFT JOIN public.user_roles ur ON ur.user_id = au.id
  ORDER BY au.created_at DESC;
END;
$$;

-- Grant execute permission to authenticated users (logic inside checks for admin role)
GRANT EXECUTE ON FUNCTION public.get_admin_users_list() TO authenticated;
