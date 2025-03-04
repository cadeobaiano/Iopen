/*
  # Create User Data Table

  1. New Tables
     - `user_data`: Stores additional user information
       - `id` (uuid, primary key)
       - `user_id` (uuid, references auth.users)
       - `nome` (text)
       - `email` (text)
       - `created_at` (timestamp with time zone)
  
  2. Security
     - Enable RLS on `user_data` table
     - Add policies for authenticated users to manage their own data
*/

-- Create user_data table
CREATE TABLE IF NOT EXISTS user_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users,
  nome text,
  email text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE user_data ENABLE ROW LEVEL SECURITY;

-- Create policies for user_data
CREATE POLICY "Users can insert their own data"
  ON user_data
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own data"
  ON user_data
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own data"
  ON user_data
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own data"
  ON user_data
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS user_data_user_id_idx ON user_data(user_id);