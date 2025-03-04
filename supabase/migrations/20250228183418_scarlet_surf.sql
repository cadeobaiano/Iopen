/*
  # Create page_visits table

  1. New Tables
    - `page_visits`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `page_name` (text)
      - `entry_timestamp` (timestamp)
      - `exit_timestamp` (timestamp)
      - `duration` (integer)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `page_visits` table
    - Add policies for anonymous and authenticated users
*/

-- Create page_visits table
CREATE TABLE IF NOT EXISTS page_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users,
  page_name text NOT NULL,
  entry_timestamp timestamptz NOT NULL,
  exit_timestamp timestamptz NOT NULL,
  duration int4 NOT NULL,
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
CREATE INDEX IF NOT EXISTS page_visits_page_name_idx ON page_visits(page_name);
CREATE INDEX IF NOT EXISTS page_visits_entry_timestamp_idx ON page_visits(entry_timestamp);