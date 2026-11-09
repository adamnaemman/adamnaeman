import { Project, SkillCategory, ExperienceItem } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'CloudScale AI Analytics',
    description: 'Enterprise metrics monitoring platform with real-time anomaly detection, edge telemetry ingestion, and interactive visualization charts.',
    category: 'Full Stack',
    tags: ['Next.js', 'Supabase', 'PostgreSQL', 'TypeScript', 'Tailwind'],
    demo_url: 'https://demo-analytics.vercel.app',
    github_url: 'https://github.com/adamnaeman/cloudscale-analytics',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    featured: true,
    sort_order: 1,
    created_at: '2025-01-15T08:00:00.000Z',
  },
  {
    id: '2',
    title: 'Nexus Decentralized Hub',
    description: 'High-throughput distributed file and data exchange network with cryptographic proof verification and low-latency synchronization.',
    category: 'Web3 & Cloud',
    tags: ['TypeScript', 'Rust', 'Supabase', 'WebSockets', 'GraphQL'],
    demo_url: 'https://nexus-hub.vercel.app',
    github_url: 'https://github.com/adamnaeman/nexus-hub',
    image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    featured: true,
    sort_order: 2,
    created_at: '2025-01-20T10:00:00.000Z',
  },
  {
    id: '3',
    title: 'Aura UI Studio',
    description: 'Modern design system generator and component sandbox with live CSS design tokens, dark mode themes, and fluid animations.',
    category: 'Frontend',
    tags: ['React', 'Next.js', 'CSS Architecture', 'Framer Motion'],
    demo_url: 'https://aura-ui.vercel.app',
    github_url: 'https://github.com/adamnaeman/aura-ui-studio',
    image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
    featured: true,
    sort_order: 3,
    created_at: '2025-02-01T12:00:00.000Z',
  },
  {
    id: '4',
    title: 'Pulse Realtime Collaboration',
    description: 'Document and canvas editor with multi-cursor presence, instant syncing, and version history powered by Supabase Realtime.',
    category: 'Full Stack',
    tags: ['Next.js', 'Supabase Realtime', 'PostgreSQL', 'Tailwind'],
    demo_url: 'https://pulse-collab.vercel.app',
    github_url: 'https://github.com/adamnaeman/pulse-collab',
    image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
    featured: false,
    sort_order: 4,
    created_at: '2025-02-10T14:00:00.000Z',
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Engineering',
    icon: 'Layout',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind / Modern CSS', level: 95 },
      { name: 'State Management & UI Architecture', level: 88 },
    ],
  },
  {
    title: 'Backend & Databases',
    icon: 'Database',
    skills: [
      { name: 'Supabase & PostgreSQL', level: 92 },
      { name: 'Node.js / Express', level: 88 },
      { name: 'REST & GraphQL APIs', level: 90 },
      { name: 'Authentication & Row Level Security', level: 94 },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: 'Cloud',
    skills: [
      { name: 'Vercel Deployment & Edge Functions', level: 95 },
      { name: 'Git & GitHub Actions CI/CD', level: 88 },
      { name: 'Docker & Microservices', level: 80 },
      { name: 'Performance Optimization & SEO', level: 92 },
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    period: '2024 - Present',
    role: 'Full Stack & Cloud Developer',
    company: 'Independent & High Growth Labs',
    description: 'Architecting dynamic web applications, scalable database systems with Supabase, and high-performance frontends deployed on Vercel.',
    tags: ['Next.js', 'Supabase', 'TypeScript', 'PostgreSQL', 'Vercel'],
  },
  {
    period: '2022 - 2024',
    role: 'Frontend & UI Systems Engineer',
    company: 'Digital Innovation Studios',
    description: 'Spearheaded modern component design systems, accessible UI interactions, and seamless API integrations across client portals.',
    tags: ['React', 'JavaScript', 'CSS3/Sass', 'Figma', 'REST APIs'],
  },
];

export const STATS = [
  { label: 'Years Experience', value: '3+' },
  { label: 'Completed Projects', value: '25+' },
  { label: 'Supabase Databases', value: '10+' },
  { label: 'Satisfaction Rate', value: '100%' },
];
