-- Enable pgcrypto if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Function to create user if not exists
CREATE OR REPLACE FUNCTION public.create_user_if_not_exists(
    _email TEXT,
    _password TEXT,
    _role public.app_role,
    _full_name TEXT
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    _user_id UUID;
    _encrypted_pw TEXT;
BEGIN
    -- Check if user exists
    SELECT id INTO _user_id FROM auth.users WHERE email = _email;

    IF _user_id IS NULL THEN
        -- Generate encrypted password
        _encrypted_pw := crypt(_password, gen_salt('bf'));
        
        -- Insert into auth.users
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            recovery_sent_at,
            last_sign_in_at,
            raw_app_meta_data,
            raw_user_meta_data,
            created_at,
            updated_at,
            confirmation_token,
            email_change,
            email_change_token_new,
            recovery_token
        ) VALUES (
            '00000000-0000-0000-0000-000000000000',
            gen_random_uuid(),
            'authenticated',
            'authenticated',
            _email,
            _encrypted_pw,
            now(),
            now(),
            now(),
            '{"provider":"email","providers":["email"]}',
            jsonb_build_object('full_name', _full_name),
            now(),
            now(),
            '',
            '',
            '',
            ''
        ) RETURNING id INTO _user_id;

        -- Identity (needed for some auth flows)
        INSERT INTO auth.identities (
            id,
            user_id,
            identity_data,
            provider,
            last_sign_in_at,
            created_at,
            updated_at
        ) VALUES (
            gen_random_uuid(),
            _user_id,
            jsonb_build_object('sub', _user_id, 'email', _email),
            'email',
            now(),
            now(),
            now()
        );
        
        -- Profile and Role are handled by triggers in previous migrations:
        -- handle_new_user() -> creates profile and assigns default 'publico' role
        
        -- We need to update the role manually to the desired one since default is 'publico'
        -- Wait a bit for triggers or just update directly
        -- Since triggers run AFTER INSERT on auth.users, we can update user_roles here
        
        -- NOTE: Trigger handle_new_user might overlap. We should use ON CONFLICT or UPDATE
        -- Update the role ensuring we target the right record
        UPDATE public.user_roles 
        SET role = _role 
        WHERE user_id = _user_id;

    ELSE
        -- Update existing user role just in case
        UPDATE public.user_roles 
        SET role = _role 
        WHERE user_id = _user_id;
    END IF;

    RETURN _user_id;
END;
$$;

-- Create Users
SELECT public.create_user_if_not_exists('admin@teste.com',   'Admin123!',    'admin',          'Administrador Flora');
SELECT public.create_user_if_not_exists('gestor@teste.com',  'Gestor123!',   'gestor_publico', 'Gestor Público');
SELECT public.create_user_if_not_exists('tecnico@teste.com', 'Tecnico123!',  'tecnico_sebrae', 'Técnico SEBRAE');
SELECT public.create_user_if_not_exists('analista@teste.com','Analista123!', 'analista',       'Analista de Dados');
SELECT public.create_user_if_not_exists('publico@teste.com', 'Publico123!',  'publico',        'Usuário Público');

-- Clean up helper function
DROP FUNCTION public.create_user_if_not_exists(TEXT, TEXT, public.app_role, TEXT);
