/*
  # Fix page_visits user_id constraint

  1. Changes
    - Modify the `page_visits` table to make `user_id` nullable
    - This allows tracking anonymous users without authentication
*/

-- Alter the page_visits table to make user_id nullable
ALTER TABLE page_visits 
ALTER COLUMN user_id DROP NOT NULL;