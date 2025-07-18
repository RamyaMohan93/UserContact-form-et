-- Create the signups table
CREATE TABLE IF NOT EXISTS signups (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50),
  subject VARCHAR(255) NOT NULL,
  challenges TEXT[] NOT NULL,
  stay_in_loop BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_signups_email ON signups(email);

-- Create an index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_signups_created_at ON signups(created_at);
