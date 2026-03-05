-- Disable email confirmation requirement for auth
-- Note: This needs to be done in Supabase Dashboard > Authentication > Providers > Email
-- Under "Confirm email" toggle it OFF

-- For now, let's make sure the admin_users table allows inserts
-- and also create a workaround by disabling RLS temporarily for setup

ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;
