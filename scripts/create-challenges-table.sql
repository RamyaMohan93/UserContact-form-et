-- Enable UUID extension first
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create challenges lookup table
CREATE TABLE IF NOT EXISTS public.challenges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert predefined challenges
INSERT INTO public.challenges (name, description) VALUES
  ('Information Overload', 'Difficulty managing and processing large amounts of information'),
  ('Difficulty Finding Relevant Content', 'Struggling to locate content that matches learning needs'),
  ('Struggling with Personalized Learning', 'Challenges in adapting learning to individual preferences'),
  ('Slow Knowledge Absorption', 'Taking longer than desired to understand and retain information'),
  ('Inconsistent Skill Development', 'Uneven progress in developing various skills'),
  ('Lack of Real-Time Feedback', 'Missing immediate responses to learning progress'),
  ('Gaps in Existing Knowledge', 'Missing foundational knowledge in certain areas'),
  ('Limited Time for Learning', 'Insufficient time allocation for educational activities'),
  ('Overwhelmed by Complex Topics', 'Difficulty understanding complicated subject matter'),
  ('Fragmented Learning Resources', 'Learning materials scattered across multiple sources')
ON CONFLICT (name) DO NOTHING;

-- Create junction table for many-to-many relationship
CREATE TABLE IF NOT EXISTS public.signup_challenges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  signup_id UUID NOT NULL REFERENCES public.signups(id) ON DELETE CASCADE,
  challenge_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  custom_description TEXT, -- For "Other" challenges
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(signup_id, challenge_id)
);

-- Enable Row Level Security
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.signup_challenges ENABLE ROW LEVEL SECURITY;

-- Create policies for challenges table
CREATE POLICY "challenges_public_read" ON public.challenges
  FOR SELECT USING (true);

-- Create policies for signup_challenges table
CREATE POLICY "signup_challenges_anon_insert" ON public.signup_challenges
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "signup_challenges_auth_read" ON public.signup_challenges
  FOR SELECT TO authenticated USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS signup_challenges_signup_id_idx ON public.signup_challenges(signup_id);
CREATE INDEX IF NOT EXISTS signup_challenges_challenge_id_idx ON public.signup_challenges(challenge_id);
CREATE INDEX IF NOT EXISTS challenges_name_idx ON public.challenges(name);
