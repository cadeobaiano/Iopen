/*
  # Create click_analytics table
  
  1. New Table
    - `click_analytics`: Armazena informações sobre cliques em botões e interações
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users, nullable)
      - `button_id` (text)
      - `page` (text)
      - `component` (text)
      - `action` (text)
      - `metadata` (jsonb)
      - `created_at` (timestamptz)
      - `session_id` (text)
      - `device_info` (jsonb)
*/

-- Create click_analytics table
CREATE TABLE IF NOT EXISTS click_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users,
  button_id text NOT NULL,
  page text NOT NULL,
  component text,
  action text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  session_id text,
  device_info jsonb DEFAULT '{}'::jsonb
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS click_analytics_user_id_idx ON click_analytics(user_id);
CREATE INDEX IF NOT EXISTS click_analytics_button_id_idx ON click_analytics(button_id);
CREATE INDEX IF NOT EXISTS click_analytics_page_idx ON click_analytics(page);
CREATE INDEX IF NOT EXISTS click_analytics_created_at_idx ON click_analytics(created_at);

-- Enable RLS but allow inserts from authenticated and anonymous users
ALTER TABLE click_analytics ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting analytics data
CREATE POLICY "Anyone can insert click analytics"
  ON click_analytics
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Create policy for viewing analytics data (admin only)
CREATE POLICY "Only authenticated users can view their own analytics"
  ON click_analytics
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
