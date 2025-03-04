/*
  # Create page_view_analytics and event_analytics tables
  
  1. New Table
    - `page_view_analytics`: Armazena informações sobre visualizações de páginas
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users, nullable)
      - `page` (text)
      - `referrer` (text, nullable)
      - `entry_time` (timestamptz)
      - `exit_time` (timestamptz, nullable)
      - `time_on_page` (integer, nullable) - tempo em segundos
      - `session_id` (text)
      - `device_info` (jsonb)
      - `metadata` (jsonb)
      - `created_at` (timestamptz)

  2. New Table
    - `event_analytics`: Armazena informações sobre eventos personalizados
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users, nullable)
      - `event_name` (text)
      - `category` (text)
      - `page` (text)
      - `session_id` (text)
      - `device_info` (jsonb)
      - `metadata` (jsonb)
      - `created_at` (timestamptz)
*/

-- Create page_view_analytics table
CREATE TABLE IF NOT EXISTS page_view_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users,
  page text NOT NULL,
  referrer text,
  entry_time timestamptz NOT NULL,
  exit_time timestamptz,
  time_on_page integer,
  session_id text,
  device_info jsonb DEFAULT '{}'::jsonb,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create event_analytics table
CREATE TABLE IF NOT EXISTS event_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users,
  event_name text NOT NULL,
  category text NOT NULL,
  page text NOT NULL,
  session_id text,
  device_info jsonb DEFAULT '{}'::jsonb,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for faster queries on page_view_analytics
CREATE INDEX IF NOT EXISTS page_view_analytics_user_id_idx ON page_view_analytics(user_id);
CREATE INDEX IF NOT EXISTS page_view_analytics_page_idx ON page_view_analytics(page);
CREATE INDEX IF NOT EXISTS page_view_analytics_entry_time_idx ON page_view_analytics(entry_time);
CREATE INDEX IF NOT EXISTS page_view_analytics_session_id_idx ON page_view_analytics(session_id);

-- Create indexes for faster queries on event_analytics
CREATE INDEX IF NOT EXISTS event_analytics_user_id_idx ON event_analytics(user_id);
CREATE INDEX IF NOT EXISTS event_analytics_event_name_idx ON event_analytics(event_name);
CREATE INDEX IF NOT EXISTS event_analytics_category_idx ON event_analytics(category);
CREATE INDEX IF NOT EXISTS event_analytics_created_at_idx ON event_analytics(created_at);
CREATE INDEX IF NOT EXISTS event_analytics_session_id_idx ON event_analytics(session_id);

-- Enable RLS but allow inserts from authenticated and anonymous users
ALTER TABLE page_view_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_analytics ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting page view analytics data
CREATE POLICY "Anyone can insert page view analytics"
  ON page_view_analytics
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Create policy for viewing page view analytics data
CREATE POLICY "Users can view their own page view analytics"
  ON page_view_analytics
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policy for updating page view analytics data
CREATE POLICY "Users can update their own page view analytics"
  ON page_view_analytics
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policy for inserting event analytics data
CREATE POLICY "Anyone can insert event analytics"
  ON event_analytics
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Create policy for viewing event analytics data
CREATE POLICY "Users can view their own event analytics"
  ON event_analytics
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id); 