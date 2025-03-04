/*
  # Add address fields to profiles table
  
  1. Alter Table
    - Add `cep` (text)
    - Add `street` (text)
    - Add `number` (text)
    - Add `complement` (text)
    - Add `neighborhood` (text)
    - Add `city` (text)
    - Add `state` (text)
*/

-- Add address fields to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS cep text,
ADD COLUMN IF NOT EXISTS street text,
ADD COLUMN IF NOT EXISTS number text,
ADD COLUMN IF NOT EXISTS complement text,
ADD COLUMN IF NOT EXISTS neighborhood text,
ADD COLUMN IF NOT EXISTS city text,
ADD COLUMN IF NOT EXISTS state text;
