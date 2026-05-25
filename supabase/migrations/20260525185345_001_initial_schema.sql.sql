/*
  # Initial Database Schema for Naitei AI

  1. New Tables
    - `users`: User profiles with JLPT level and preferences
    - `interviews`: Interview sessions records
    - `messages`: Chat messages within interviews
    - `feedbacks`: AI-generated feedback for interviews
    - `user_stats`: Aggregated user statistics and streaks

  2. Security
    - Enable RLS on all tables
    - Users can only access their own data
    - Proper ownership checks on all policies

  3. Notes
    - All tables have UUID primary keys
    - Timestamps for created_at and updated_at
    - Foreign key relationships for data integrity
*/

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  name text DEFAULT '',
  jlpt_level text CHECK (jlpt_level IN ('N5', 'N4', 'N3', 'N2', 'N1')),
  preferred_language text DEFAULT 'en' CHECK (preferred_language IN ('en', 'ja', 'uz', 'ru')),
  target_industry text,
  avatar_url text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- User statistics table
CREATE TABLE IF NOT EXISTS public.user_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
  total_interviews integer DEFAULT 0,
  total_duration_seconds integer DEFAULT 0,
  average_grammar_score decimal DEFAULT 0,
  average_keigo_score decimal DEFAULT 0,
  average_confidence_score decimal DEFAULT 0,
  average_naturalness_score decimal DEFAULT 0,
  average_hr_impression_score decimal DEFAULT 0,
  current_streak integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  last_practice_date date,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Interviews table
CREATE TABLE IF NOT EXISTS public.interviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  interview_type text NOT NULL,
  overall_score decimal CHECK (overall_score >= 0 AND overall_score <= 100),
  duration_seconds integer DEFAULT 0,
  status text DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
  created_at timestamptz DEFAULT now() NOT NULL,
  completed_at timestamptz
);

-- Messages table (chat within interviews)
CREATE TABLE IF NOT EXISTS public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  interview_id uuid NOT NULL REFERENCES public.interviews(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  message text NOT NULL,
  message_ja text,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Feedbacks table (AI-generated feedback)
CREATE TABLE IF NOT EXISTS public.feedbacks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  interview_id uuid NOT NULL REFERENCES public.interviews(id) ON DELETE CASCADE UNIQUE,
  grammar_score decimal DEFAULT 0 CHECK (grammar_score >= 0 AND grammar_score <= 100),
  keigo_score decimal DEFAULT 0 CHECK (keigo_score >= 0 AND keigo_score <= 100),
  confidence_score decimal DEFAULT 0 CHECK (confidence_score >= 0 AND confidence_score <= 100),
  naturalness_score decimal DEFAULT 0 CHECK (naturalness_score >= 0 AND naturalness_score <= 100),
  hr_impression_score decimal DEFAULT 0 CHECK (hr_impression_score >= 0 AND hr_impression_score <= 100),
  overall_feedback text DEFAULT '',
  corrected_answers jsonb DEFAULT '[]',
  improvement_suggestions jsonb DEFAULT '[]',
  strengths jsonb DEFAULT '[]',
  weak_points jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedbacks ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- User stats policies
CREATE POLICY "Users can view own stats"
  ON public.user_stats FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own stats"
  ON public.user_stats FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own stats"
  ON public.user_stats FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Interviews policies
CREATE POLICY "Users can view own interviews"
  ON public.interviews FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own interviews"
  ON public.interviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own interviews"
  ON public.interviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own interviews"
  ON public.interviews FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Messages policies
CREATE POLICY "Users can view own interview messages"
  ON public.messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.interviews
      WHERE interviews.id = messages.interview_id
      AND interviews.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own interview messages"
  ON public.messages FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.interviews
      WHERE interviews.id = messages.interview_id
      AND interviews.user_id = auth.uid()
    )
  );

-- Feedbacks policies
CREATE POLICY "Users can view own interview feedback"
  ON public.feedbacks FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.interviews
      WHERE interviews.id = feedbacks.interview_id
      AND interviews.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own interview feedback"
  ON public.feedbacks FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.interviews
      WHERE interviews.id = feedbacks.interview_id
      AND interviews.user_id = auth.uid()
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_interviews_user_id ON public.interviews(user_id);
CREATE INDEX IF NOT EXISTS idx_interviews_created_at ON public.interviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_interview_id ON public.messages(interview_id);
CREATE INDEX IF NOT EXISTS idx_feedbacks_interview_id ON public.feedbacks(interview_id);
CREATE INDEX IF NOT EXISTS idx_user_stats_user_id ON public.user_stats(user_id);

-- Function to automatically create user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', ''));
  
  INSERT INTO public.user_stats (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  END IF;
END $$;
