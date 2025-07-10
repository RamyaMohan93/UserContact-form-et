-- Enable UUID extension first
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (clean slate)
DROP TABLE IF EXISTS public.signup_challenges;
DROP TABLE IF EXISTS public.challenges;
DROP TABLE IF EXISTS public.signups;

-- Create a single signups table with individual challenge columns
CREATE TABLE public.signups (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  country_code TEXT,
  phone TEXT,
  email TEXT NOT NULL UNIQUE,
  stay_in_loop BOOLEAN DEFAULT false,
  subject TEXT NOT NULL,
  
  -- Individual challenge columns
  challenge_information_overload BOOLEAN DEFAULT false,
  challenge_difficulty_finding_content BOOLEAN DEFAULT false,
  challenge_personalized_learning BOOLEAN DEFAULT false,
  challenge_slow_knowledge_absorption BOOLEAN DEFAULT false,
  challenge_inconsistent_skill_development BOOLEAN DEFAULT false,
  challenge_lack_realtime_feedback BOOLEAN DEFAULT false,
  challenge_gaps_existing_knowledge BOOLEAN DEFAULT false,
  challenge_limited_time_learning BOOLEAN DEFAULT false,
  challenge_overwhelmed_complex_topics BOOLEAN DEFAULT false,
  challenge_fragmented_resources BOOLEAN DEFAULT false,
  challenge_other BOOLEAN DEFAULT false,
  challenge_other_description TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.signups ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous inserts (allows anyone to sign up)
CREATE POLICY "signups_anon_insert_policy" ON public.signups
  FOR INSERT TO anon WITH CHECK (true);

-- Create policy for authenticated reads (for admin access)
CREATE POLICY "signups_auth_read_policy" ON public.signups
  FOR SELECT TO authenticated USING (true);

-- Create indexes for better performance
CREATE INDEX signups_email_idx ON public.signups(email);
CREATE INDEX signups_created_at_idx ON public.signups(created_at DESC);

-- Create index on challenge columns for analytics
CREATE INDEX signups_challenges_idx ON public.signups(
  challenge_information_overload,
  challenge_difficulty_finding_content,
  challenge_personalized_learning,
  challenge_slow_knowledge_absorption,
  challenge_inconsistent_skill_development,
  challenge_lack_realtime_feedback,
  challenge_gaps_existing_knowledge,
  challenge_limited_time_learning,
  challenge_overwhelmed_complex_topics,
  challenge_fragmented_resources,
  challenge_other
);
