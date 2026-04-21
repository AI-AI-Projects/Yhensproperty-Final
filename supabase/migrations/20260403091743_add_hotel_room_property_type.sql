/*
  # Add Hotel Room Property Type

  1. Changes
    - Add 'Hotel Room' to the type column check constraint (using proper casing)
    - Hotel rooms will require floor field (like condos)
    - This allows hotel rooms to be listed, searched, and filtered
  
  2. Security
    - No RLS changes needed (existing policies cover all property types)
*/

-- Drop the existing check constraint on type column
ALTER TABLE properties DROP CONSTRAINT IF EXISTS properties_type_check;

-- Add new constraint including Hotel Room (using title case like existing values)
ALTER TABLE properties ADD CONSTRAINT properties_type_check 
  CHECK (type IN ('House', 'Condo', 'Land', 'Warehouse', 'Commercial', 'Hotel Room'));