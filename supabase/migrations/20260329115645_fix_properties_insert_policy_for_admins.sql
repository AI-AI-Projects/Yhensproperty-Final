/*
  # Fix Properties INSERT Policy for Admin Users

  ## Problem
  Admin users cannot insert properties because the current policy only allows:
  - (auth.uid() = owner_id) OR (owner_id IS NULL)
  
  This means admins can only create properties for themselves or with NULL owner_id.

  ## Solution
  Update the INSERT policy to allow admins to insert properties with any owner_id:
  - Regular users: can only set owner_id to their own ID or NULL
  - Admin users: can insert properties with any owner_id

  ## Changes
  - Drop existing INSERT policy
  - Create new INSERT policy that checks for admin role
*/

-- Drop the existing restrictive INSERT policy
DROP POLICY IF EXISTS "Authenticated users can insert properties" ON properties;

-- Create new INSERT policy that allows admins to insert with any owner_id
CREATE POLICY "Authenticated users can insert properties"
  ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (
    -- Allow if user is setting themselves as owner or leaving it NULL
    (auth.uid() = owner_id OR owner_id IS NULL)
    OR
    -- Allow if user is an admin (they can set any owner_id)
    (EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    ))
  );
