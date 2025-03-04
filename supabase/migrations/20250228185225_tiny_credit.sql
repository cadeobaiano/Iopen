-- Alter the click_events table to make user_id nullable
ALTER TABLE click_events 
ALTER COLUMN user_id DROP NOT NULL;