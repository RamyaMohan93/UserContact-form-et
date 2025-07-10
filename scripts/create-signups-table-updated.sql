-- Enable UUID extension first
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create signups table for CortexCatalyst (updated without challenges column)
CREATE TABLE IF NOT EXISTS public.signups (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  country_code TEXT,
  phone TEXT,
  email TEXT NOT NULL,
  stay_in_loop BOOLEAN DEFAULT false,
  subject TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.signups ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous inserts
CREATE POLICY "signups_anon_insert_policy" ON public.signups
  FOR INSERT TO anon WITH CHECK (true);

-- Create policy for authenticated reads (for admin)
CREATE POLICY "signups_auth_read_policy" ON public.signups
  FOR SELECT TO authenticated USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS signups_email_idx ON public.signups(email);
CREATE INDEX IF NOT EXISTS signups_created_at_idx ON public.signups(created_at DESC);
