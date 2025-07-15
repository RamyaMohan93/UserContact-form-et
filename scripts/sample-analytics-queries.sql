-- Sample analytics queries for the separated challenge columns

-- 1. Get challenge distribution (count and percentage)
SELECT * FROM public.challenge_analytics;

-- 2. Get top 5 most common challenges
SELECT challenge_name, count, percentage 
FROM public.challenge_analytics 
ORDER BY count DESC 
LIMIT 5;

-- 3. Get users who selected multiple challenges (power users)
SELECT 
  name, 
  email,
  (
    CASE WHEN challenge_information_overload THEN 1 ELSE 0 END +
    CASE WHEN challenge_difficulty_finding_content THEN 1 ELSE 0 END +
    CASE WHEN challenge_personalized_learning THEN 1 ELSE 0 END +
    CASE WHEN challenge_slow_knowledge_absorption THEN 1 ELSE 0 END +
    CASE WHEN challenge_inconsistent_skill_development THEN 1 ELSE 0 END +
    CASE WHEN challenge_lack_realtime_feedback THEN 1 ELSE 0 END +
    CASE WHEN challenge_gaps_existing_knowledge THEN 1 ELSE 0 END +
    CASE WHEN challenge_limited_time_learning THEN 1 ELSE 0 END +
    CASE WHEN challenge_overwhelmed_complex_topics THEN 1 ELSE 0 END +
    CASE WHEN challenge_fragmented_resources THEN 1 ELSE 0 END +
    CASE WHEN challenge_other THEN 1 ELSE 0 END
  ) as total_challenges
FROM public.signups
WHERE (
  challenge_information_overload OR
  challenge_difficulty_finding_content OR
  challenge_personalized_learning OR
  challenge_slow_knowledge_absorption OR
  challenge_inconsistent_skill_development OR
  challenge_lack_realtime_feedback OR
  challenge_gaps_existing_knowledge OR
  challenge_limited_time_learning OR
  challenge_overwhelmed_complex_topics OR
  challenge_fragmented_resources OR
  challenge_other
)
ORDER BY total_challenges DESC;

-- 4. Get users with specific challenge combinations
SELECT name, email, created_at
FROM public.signups
WHERE challenge_information_overload = true 
  AND challenge_personalized_learning = true;

-- 5. Get all "Other" challenge descriptions
SELECT name, email, challenge_other_description, created_at
FROM public.signups
WHERE challenge_other = true 
  AND challenge_other_description IS NOT NULL
ORDER BY created_at DESC;

-- 6. Monthly challenge trends
SELECT 
  DATE_TRUNC('month', created_at) as month,
  COUNT(*) FILTER (WHERE challenge_information_overload = true) as info_overload,
  COUNT(*) FILTER (WHERE challenge_difficulty_finding_content = true) as finding_content,
  COUNT(*) FILTER (WHERE challenge_personalized_learning = true) as personalized_learning,
  COUNT(*) FILTER (WHERE challenge_slow_knowledge_absorption = true) as slow_absorption,
  COUNT(*) as total_signups
FROM public.signups
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month DESC;

-- 7. Challenge correlation matrix (which challenges are often selected together)
SELECT 
  'Info Overload + Personalized Learning' as combination,
  COUNT(*) as count
FROM public.signups
WHERE challenge_information_overload = true AND challenge_personalized_learning = true
UNION ALL
SELECT 
  'Info Overload + Slow Absorption' as combination,
  COUNT(*) as count
FROM public.signups
WHERE challenge_information_overload = true AND challenge_slow_knowledge_absorption = true
UNION ALL
SELECT 
  'Personalized Learning + Limited Time' as combination,
  COUNT(*) as count
FROM public.signups
WHERE challenge_personalized_learning = true AND challenge_limited_time_learning = true
ORDER BY count DESC;
