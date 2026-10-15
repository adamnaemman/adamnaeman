-- ==============================================================================
-- SUPABASE SCHEMA FOR ADAM NAEMAN PORTFOLIO & SHOWCASE
-- Run this SQL in your Supabase Dashboard: SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. Create Guestbook Table
CREATE TABLE IF NOT EXISTS public.guestbook (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  email TEXT,
  avatar_url TEXT,
  reactions JSONB DEFAULT '{"heart": 0, "fire": 0, "rocket": 0}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. Create Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT DEFAULT 'Full Stack' NOT NULL,
  tags TEXT[] DEFAULT '{}' NOT NULL,
  demo_url TEXT,
  github_url TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 3. Create Contacts / Messages Table
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.guestbook ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Guestbook Policies: Anyone can view signatures; Anyone can add a signature
DROP POLICY IF EXISTS "Public can view guestbook entries" ON public.guestbook;
CREATE POLICY "Public can view guestbook entries" 
  ON public.guestbook FOR SELECT 
  TO anon, authenticated 
  USING (true);

DROP POLICY IF EXISTS "Public can insert guestbook entries" ON public.guestbook;
CREATE POLICY "Public can insert guestbook entries" 
  ON public.guestbook FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (true);

-- Projects Policies: Anyone can view projects
DROP POLICY IF EXISTS "Public can view projects" ON public.projects;
CREATE POLICY "Public can view projects" 
  ON public.projects FOR SELECT 
  TO anon, authenticated 
  USING (true);

-- Contacts Policies: Anyone can submit a contact form message
DROP POLICY IF EXISTS "Public can submit contact messages" ON public.contacts;
CREATE POLICY "Public can submit contact messages" 
  ON public.contacts FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (true);

-- ==============================================================================
-- SAMPLE INITIAL DATA (Optional Seed)
-- ==============================================================================

INSERT INTO public.projects (title, description, category, tags, demo_url, github_url, image_url, featured, sort_order)
VALUES
  (
    'CloudScale AI Analytics',
    'Real-time metrics dashboard with AI-driven anomaly detection and edge telemetry processing.',
    'Full Stack',
    ARRAY['Next.js', 'Supabase', 'PostgreSQL', 'Tailwind', 'Recharts'],
    'https://demo-analytics.vercel.app',
    'https://github.com/adamnaeman/cloudscale-analytics',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    true,
    1
  ),
  (
    'Nexus Decentralized Hub',
    'High-throughput distributed file and data exchange network with cryptographic proof verification.',
    'Web3 & Cloud',
    ARRAY['TypeScript', 'Rust', 'Supabase', 'WebSockets', 'GraphQL'],
    'https://nexus-hub.vercel.app',
    'https://github.com/adamnaeman/nexus-hub',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    true,
    2
  ),
  (
    'Aura Dynamic UI Studio',
    'Modern design system generator and component sandbox with live CSS tokens and dark mode themes.',
    'Frontend',
    ARRAY['React', 'Vite', 'CSS Architecture', 'Framer Motion'],
    'https://aura-ui.vercel.app',
    'https://github.com/adamnaeman/aura-ui-studio',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    true,
    3
  )
ON CONFLICT DO NOTHING;

INSERT INTO public.guestbook (name, message, avatar_url, created_at)
VALUES
  (
    'Sarah Chen',
    'Incredible portfolio design! The animations and Supabase real-time integration are super slick. 🚀',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    NOW() - INTERVAL '2 hours'
  ),
  (
    'Marcus Thorne',
    'Love the dark glassmorphic UI. Excited to see your next open-source projects, Adam! 🔥',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    NOW() - INTERVAL '1 day'
  )
ON CONFLICT DO NOTHING;
