/*
  # Fix Page Visits Schema

  1. Changes
     - Recreate the page_visits table with the correct column names
     - Ensure all required columns exist with proper types
  
  2. Security
     - Maintain existing RLS policies
*/

-- Drop and recreate the page_visits table with the correct schema
DROP TABLE IF EXISTS page_visits CASCADE;

-- Create page_visits table with correct schema
CREATE TABLE IF NOT EXISTS page_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users,
  page_path text NOT NULL,
  entry_time timestamptz NOT NULL,
  exit_time timestamptz NOT NULL,
  duration_seconds integer NOT NULL,
  referrer text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE page_visits ENABLE ROW LEVEL SECURITY;

-- Create policies for page_visits
CREATE POLICY "Anyone can insert page visits"
  ON page_visits
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view their own page visits"
  ON page_visits
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR user_id IS NULL);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS page_visits_user_id_idx ON page_visits(user_id);
CREATE INDEX IF NOT EXISTS page_visits_page_path_idx ON page_visits(page_path);
CREATE INDEX IF NOT EXISTS page_visits_entry_time_idx ON page_visits(entry_time);