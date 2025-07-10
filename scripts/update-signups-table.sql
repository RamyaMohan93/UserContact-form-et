-- Remove the challenges column from signups table since we're normalizing it
-- First, let's add a migration to preserve existing data if needed

-- Add a temporary column to track migration
ALTER TABLE public.signups ADD COLUMN IF NOT EXISTS migrated BOOLEAN DEFAULT false;

-- You can run this to migrate existing data if you have any:
-- INSERT INTO public.signup_challenges (signup_id, challenge_id, custom_description)
-- SELECT 
--   s.id as signup_id,
--   c.id as challenge_id,
--   CASE 
--     WHEN s.challenges LIKE '%Other:%' THEN TRIM(SUBSTRING(s.challenges FROM 'Other: (.*)'))
--     ELSE NULL
--   END as custom_description
-- FROM public.signups s
-- CROSS JOIN public.challenges c
-- WHERE s.challenges LIKE '%' || c.name || '%' AND NOT s.migrated;

-- After migration is complete, you can drop the old challenges column:
-- ALTER TABLE public.signups DROP COLUMN IF EXISTS challenges;
-- ALTER TABLE public.signups DROP COLUMN IF EXISTS migrated;
