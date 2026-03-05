-- Fix RLS policies for admin_users to allow initial setup
DROP POLICY IF EXISTS "Admin users can manage admin_users" ON admin_users;

-- Allow anyone to insert (for initial setup)
CREATE POLICY "Allow admin user creation" ON admin_users 
  FOR INSERT WITH CHECK (true);

-- Allow anyone to select (needed for login check)
CREATE POLICY "Admin users can view" ON admin_users 
  FOR SELECT USING (true);

-- Allow updates
CREATE POLICY "Admin users can update" ON admin_users 
  FOR UPDATE USING (true);

-- Allow deletes  
CREATE POLICY "Admin users can delete" ON admin_users 
  FOR DELETE USING (true);
