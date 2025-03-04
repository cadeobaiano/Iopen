/*
  # Create chat IOP tables for the interaction flow

  1. New Tables
    - `chat_interactions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `session_id` (text)
      - `investment_value` (text)
      - `investor_profile` (text)
      - `goals` (text) 
      - `recommended_rate` (decimal)
      - `estimated_savings` (decimal)
      - `accepted_proposal` (boolean)
      - `created_at` (timestamp)
    - `chat_messages`
      - `id` (uuid, primary key)
      - `interaction_id` (uuid, references chat_interactions)
      - `sender` (text) - 'user' or 'assistant'
      - `content` (text)
      - `stage` (text)
      - `timestamp` (timestamp)
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create chat_interactions table
CREATE TABLE IF NOT EXISTS public.chat_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  session_id text,
  investment_value text,
  investor_profile text,
  goals text,
  recommended_rate decimal(5,4),
  estimated_savings decimal(10,2),
  accepted_proposal boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  interaction_id text NOT NULL,
  sender text NOT NULL,
  content text NOT NULL,
  stage text NOT NULL,
  timestamp timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.chat_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for chat_interactions
CREATE POLICY "Users can create their own chat interactions"
  ON public.chat_interactions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own chat interactions"
  ON public.chat_interactions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own chat interactions"
  ON public.chat_interactions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for chat_messages
CREATE POLICY "Users can insert chat messages"
  ON public.chat_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view chat messages"
  ON public.chat_messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS chat_interactions_user_id_idx ON chat_interactions(user_id);
CREATE INDEX IF NOT EXISTS chat_interactions_created_at_idx ON chat_interactions(created_at);
CREATE INDEX IF NOT EXISTS chat_messages_interaction_id_idx ON chat_messages(interaction_id);
CREATE INDEX IF NOT EXISTS chat_messages_timestamp_idx ON chat_messages(timestamp); 