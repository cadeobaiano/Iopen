-- Create click_events table
CREATE TABLE IF NOT EXISTS click_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users,
  button_id text NOT NULL,
  timestamp timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;

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

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS click_events_user_id_idx ON click_events(user_id);
CREATE INDEX IF NOT EXISTS click_events_button_id_idx ON click_events(button_id);
CREATE INDEX IF NOT EXISTS click_events_timestamp_idx ON click_events(timestamp);