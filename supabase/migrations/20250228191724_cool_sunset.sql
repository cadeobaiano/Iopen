/*
  # Add missing columns to user_data table

  1. Changes
    - Add missing columns to the user_data table:
      - `referrer` (text, nullable)
      - `user_agent` (text, nullable)
      - `duration_seconds` (integer, nullable)
    - These columns will help track additional user information
  
  2. Security
    - No changes to RLS policies
*/

-- Add missing columns to user_data table if they don't exist
DO $$ 
BEGIN
  -- Add referrer column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_data' AND column_name = 'referrer'
  ) THEN
    ALTER TABLE user_data ADD COLUMN referrer text;
  END IF;

  -- Add user_agent column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_data' AND column_name = 'user_agent'
  ) THEN
    ALTER TABLE user_data ADD COLUMN user_agent text;
  END IF;

  -- Add duration_seconds column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_data' AND column_name = 'duration_seconds'
  ) THEN
    ALTER TABLE user_data ADD COLUMN duration_seconds integer;
  END IF;
END $$;