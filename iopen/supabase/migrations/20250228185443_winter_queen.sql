/*
  # Fix Analytics Tables

  1. Changes
     - Drop and recreate page_visits table with correct schema
     - Drop and recreate click_events table with correct schema
     - Ensure both tables allow null user_id values
     - Add proper indexes for performance
  2. Security
     - Enable RLS on both tables
     - Add policies to allow anonymous and authenticated users to insert data
     - Add policies for data retrieval
*/

-- Drop existing tables if they exist to avoid conflicts
DROP TABLE IF EXISTS page_visits CASCADE;
DROP TABLE IF EXISTS click_events CASCADE;

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

-- Create click_events table with correct schema
CREATE TABLE IF NOT EXISTS click_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users,
  button_id text NOT NULL,
  timestamp timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE page_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;

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

-- Create policies for click_events
CREATE POLICY "Anyone can insert click events"
  ON click_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view their own click events"
  ON click_events
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR user_id IS NULL);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS page_visits_user_id_idx ON page_visits(user_id);
CREATE INDEX IF NOT EXISTS page_visits_page_path_idx ON page_visits(page_path);
CREATE INDEX IF NOT EXISTS page_visits_entry_time_idx ON page_visits(entry_time);

CREATE INDEX IF NOT EXISTS click_events_user_id_idx ON click_events(user_id);
CREATE INDEX IF NOT EXISTS click_events_button_id_idx ON click_events(button_id);
CREATE INDEX IF NOT EXISTS click_events_timestamp_idx ON click_events(timestamp);