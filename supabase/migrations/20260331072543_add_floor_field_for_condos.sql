/*
  # Add Floor Field for Condo Listings

  1. Changes
    - Add `floor` column to `properties` table
    - Optional integer field for storing the floor number of condo units
    - Used specifically for Condo/Apartment property types
  
  2. Notes
    - Field is nullable since it only applies to condos/apartments
    - No default value as not all properties need this field
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'floor'
  ) THEN
    ALTER TABLE properties ADD COLUMN floor integer;
  END IF;
END $$;