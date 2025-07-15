-- Enable UUID extension first
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (clean slate)
DROP TABLE IF EXISTS public.signup_challenges;
DROP TABLE IF EXISTS public.challenges;
DROP TABLE IF EXISTS public.signups;

-- Create signups table with individual challenge columns for better analytics
CREATE TABLE public.signups (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  -- Basic user information
  name TEXT NOT NULL,
  country_code TEXT,
  phone TEXT,
  email TEXT NOT NULL UNIQUE,
  stay_in_loop BOOLEAN DEFAULT false,
  subject TEXT NOT NULL,
  
  -- Individual challenge columns (each challenge gets its own boolean column)
  -- This allows for easy analytics and reporting on challenge distribution
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
  challenge_other_description TEXT, -- Only filled when challenge_other is true
  
  -- Timestamps
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

-- Create individual indexes on each challenge column for fast analytics queries
CREATE INDEX signups_challenge_info_overload_idx ON public.signups(challenge_information_overload) WHERE challenge_information_overload = true;
CREATE INDEX signups_challenge_finding_content_idx ON public.signups(challenge_difficulty_finding_content) WHERE challenge_difficulty_finding_content = true;
CREATE INDEX signups_challenge_personalized_idx ON public.signups(challenge_personalized_learning) WHERE challenge_personalized_learning = true;
CREATE INDEX signups_challenge_slow_absorption_idx ON public.signups(challenge_slow_knowledge_absorption) WHERE challenge_slow_knowledge_absorption = true;
CREATE INDEX signups_challenge_inconsistent_dev_idx ON public.signups(challenge_inconsistent_skill_development) WHERE challenge_inconsistent_skill_development = true;
CREATE INDEX signups_challenge_realtime_feedback_idx ON public.signups(challenge_lack_realtime_feedback) WHERE challenge_lack_realtime_feedback = true;
CREATE INDEX signups_challenge_knowledge_gaps_idx ON public.signups(challenge_gaps_existing_knowledge) WHERE challenge_gaps_existing_knowledge = true;
CREATE INDEX signups_challenge_limited_time_idx ON public.signups(challenge_limited_time_learning) WHERE challenge_limited_time_learning = true;
CREATE INDEX signups_challenge_overwhelmed_idx ON public.signups(challenge_overwhelmed_complex_topics) WHERE challenge_overwhelmed_complex_topics = true;
CREATE INDEX signups_challenge_fragmented_idx ON public.signups(challenge_fragmented_resources) WHERE challenge_fragmented_resources = true;
CREATE INDEX signups_challenge_other_idx ON public.signups(challenge_other) WHERE challenge_other = true;

-- Create a view for easy challenge analytics
CREATE OR REPLACE VIEW public.challenge_analytics AS
SELECT 
  'Information Overload' as challenge_name,
  COUNT(*) FILTER (WHERE challenge_information_overload = true) as count,
  ROUND(COUNT(*) FILTER (WHERE challenge_information_overload = true) * 100.0 / COUNT(*), 2) as percentage
FROM public.signups
UNION ALL
SELECT 
  'Difficulty Finding Content' as challenge_name,
  COUNT(*) FILTER (WHERE challenge_difficulty_finding_content = true) as count,
  ROUND(COUNT(*) FILTER (WHERE challenge_difficulty_finding_content = true) * 100.0 / COUNT(*), 2) as percentage
FROM public.signups
UNION ALL
SELECT 
  'Personalized Learning' as challenge_name,
  COUNT(*) FILTER (WHERE challenge_personalized_learning = true) as count,
  ROUND(COUNT(*) FILTER (WHERE challenge_personalized_learning = true) * 100.0 / COUNT(*), 2) as percentage
FROM public.signups
UNION ALL
SELECT 
  'Slow Knowledge Absorption' as challenge_name,
  COUNT(*) FILTER (WHERE challenge_slow_knowledge_absorption = true) as count,
  ROUND(COUNT(*) FILTER (WHERE challenge_slow_knowledge_absorption = true) * 100.0 / COUNT(*), 2) as percentage
FROM public.signups
UNION ALL
SELECT 
  'Inconsistent Skill Development' as challenge_name,
  COUNT(*) FILTER (WHERE challenge_inconsistent_skill_development = true) as count,
  ROUND(COUNT(*) FILTER (WHERE challenge_inconsistent_skill_development = true) * 100.0 / COUNT(*), 2) as percentage
FROM public.signups
UNION ALL
SELECT 
  'Lack of Real-Time Feedback' as challenge_name,
  COUNT(*) FILTER (WHERE challenge_lack_realtime_feedback = true) as count,
  ROUND(COUNT(*) FILTER (WHERE challenge_lack_realtime_feedback = true) * 100.0 / COUNT(*), 2) as percentage
FROM public.signups
UNION ALL
SELECT 
  'Gaps in Existing Knowledge' as challenge_name,
  COUNT(*) FILTER (WHERE challenge_gaps_existing_knowledge = true) as count,
  ROUND(COUNT(*) FILTER (WHERE challenge_gaps_existing_knowledge = true) * 100.0 / COUNT(*), 2) as percentage
FROM public.signups
UNION ALL
SELECT 
  'Limited Time for Learning' as challenge_name,
  COUNT(*) FILTER (WHERE challenge_limited_time_learning = true) as count,
  ROUND(COUNT(*) FILTER (WHERE challenge_limited_time_learning = true) * 100.0 / COUNT(*), 2) as percentage
FROM public.signups
UNION ALL
SELECT 
  'Overwhelmed by Complex Topics' as challenge_name,
  COUNT(*) FILTER (WHERE challenge_overwhelmed_complex_topics = true) as count,
  ROUND(COUNT(*) FILTER (WHERE challenge_overwhelmed_complex_topics = true) * 100.0 / COUNT(*), 2) as percentage
FROM public.signups
UNION ALL
SELECT 
  'Fragmented Learning Resources' as challenge_name,
  COUNT(*) FILTER (WHERE challenge_fragmented_resources = true) as count,
  ROUND(COUNT(*) FILTER (WHERE challenge_fragmented_resources = true) * 100.0 / COUNT(*), 2) as percentage
FROM public.signups
UNION ALL
SELECT 
  'Other' as challenge_name,
  COUNT(*) FILTER (WHERE challenge_other = true) as count,
  ROUND(COUNT(*) FILTER (WHERE challenge_other = true) * 100.0 / COUNT(*), 2) as percentage
FROM public.signups
ORDER BY count DESC;

-- Grant access to the view
GRANT SELECT ON public.challenge_analytics TO authenticated;
GRANT SELECT ON public.challenge_analytics TO anon;
