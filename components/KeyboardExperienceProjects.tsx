'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ExternalLink, Github, Sparkles, Volume2, VolumeX, Layers, Trophy, X, Monitor, ArrowRight } from 'lucide-react';
import { INITIAL_PROJECTS } from '@/lib/data';
import ProjectsSection from '@/components/ProjectsSection';

interface SkillKey {
  id: string;
  name: string;
  code: string; // Shortcut key to press
  badge: string;
  quote: string;
  experienceChapter: string;
  experienceRole: string;
  experienceDetails: string;
  projectId: string;
  renderIcon: () => React.ReactNode;
}

const SKILL_KEYS: SkillKey[] = [
  // ROW 1
  {
    id: 'nextjs',
    name: 'Next.js 14',
    code: 'N',
    badge: 'FULL STACK',
    quote: "Why render on the client when edge server components can stream HTML in 20ms?",
    experienceChapter: '2024 - PRESENT',
    experienceRole: 'Full Stack & Cloud Developer @ Independent Labs',
    experienceDetails: 'Architecting dynamic server-component frontends with sub-second LCP and streaming edge API routes.',
    projectId: '1',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 13.5l-4-5.5V15H5V8h1.5l4 5.5V8H12v7h-1.5zm5.5 0h-1.5V8H16v7z" />
      </svg>
    ),
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    code: 'T',
    badge: 'TYPE SAFETY',
    quote: "JavaScript with trust issues, but caught 99% of my runtime bugs before production.",
    experienceChapter: '2024 - PRESENT',
    experienceRole: 'Full Stack & Cloud Developer @ Independent Labs',
    experienceDetails: 'Strict end-to-end type contracts from database schema to UI components with zero any-casting.',
    projectId: '1',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="none" />
        <path d="M7 8h6M10 8v8" />
        <path d="M14 14.5c.5.5 1.2.8 2 .8 1.1 0 1.8-.6 1.8-1.4 0-1.8-3.6-.9-3.6-2.9 0-.8.7-1.5 1.8-1.5.8 0 1.4.3 1.9.8" />
      </svg>
    ),
  },
  {
    id: 'react',
    name: 'React 19',
    code: 'R',
    badge: 'UI ARCHITECTURE',
    quote: "Components all the way down. The heartbeat and nervous system of modern web interfaces.",
    experienceChapter: '2022 - 2024',
    experienceRole: 'Frontend & UI Systems Engineer @ Digital Innovation Studios',
    experienceDetails: 'Engineered modular design systems, accessible UI interactions, and high-frequency state synchronizers.',
    projectId: '3',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    code: 'O',
    badge: 'RUNTIME & APIS',
    quote: "JavaScript said 'sike, I'm backend now', deadass!",
    experienceChapter: '2024 - PRESENT',
    experienceRole: 'Backend & Cloud Engineer @ High Growth Labs',
    experienceDetails: 'High-throughput event-driven microservices processing edge telemetry with minimal event loop latency.',
    projectId: '2',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l8 4.6v9.2l-8 4.6-8-4.6V6.6L12 2z" />
        <path d="M12 6.5l5 2.8v5.6l-5 2.8-5-2.8V9.3l5-2.8z" />
      </svg>
    ),
  },
  {
    id: 'supabase',
    name: 'Supabase & SQL',
    code: 'S',
    badge: 'REALTIME DB',
    quote: "Postgres superpowers, instant Row Level Security, and realtime websockets without the DevOps headache.",
    experienceChapter: '2024 - PRESENT',
    experienceRole: 'Full Stack & Cloud Developer @ Independent Labs',
    experienceDetails: 'Multi-tenant database architectures with automated RLS policies and live presence channels.',
    projectId: '4',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.2 2.2a1 1 0 0 0-1.5.3L4.2 13a1 1 0 0 0 .8 1.6h5.8L9.2 21.6a1 1 0 0 0 1.6.8l7.5-10.5a1 1 0 0 0-.8-1.6h-5.8l1.5-8.1z" />
      </svg>
    ),
  },

  // ROW 2
  {
    id: 'gcp',
    name: 'Google Cloud (GCP)',
    code: 'G',
    badge: 'CLOUD & INFRA',
    quote: "Serverless containers, BigQuery pipelines, and autoscaling edge compute that let me sleep at night.",
    experienceChapter: '2024 - PRESENT',
    experienceRole: 'Cloud Solutions Engineer @ Independent Labs',
    experienceDetails: 'Deployed zero-maintenance serverless microservices with automated IAM least-privilege security.',
    projectId: '1',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
        <circle cx="12" cy="13" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'docker',
    name: 'Docker',
    code: 'D',
    badge: 'CONTAINERS',
    quote: "It works on my machine... and now it works reliably on every single container in the cluster.",
    experienceChapter: '2023 - PRESENT',
    experienceRole: 'DevOps & Systems Lead @ Independent Labs',
    experienceDetails: 'Multi-stage Docker builds optimized for minimal image footprint and fast CI/CD pipeline pushes.',
    projectId: '2',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14h16c0 3.5-3 6-8 6s-8-2.5-8-6z" />
        <path d="M2 14c0-1.5 1-2.5 2-2.5" />
        <rect x="7" y="10" width="2.5" height="2.5" />
        <rect x="10.5" y="10" width="2.5" height="2.5" />
        <rect x="14" y="10" width="2.5" height="2.5" />
        <rect x="10.5" y="7" width="2.5" height="2.5" />
      </svg>
    ),
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    code: 'W',
    badge: 'STYLING & MOTION',
    quote: "Writing custom bespoke styling faster than the speed of light without ever leaving the component markup.",
    experienceChapter: '2022 - 2024',
    experienceRole: 'Frontend & UI Systems Engineer @ Digital Innovation Studios',
    experienceDetails: 'Crafted design token architectures with responsive dark-mode palettes and fluid animations.',
    projectId: '3',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.9 3.5-1.6 1 .2 1.7 1 2.5 1.8 1.3 1.3 2.8 2.8 6 2.8 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.9-3.5 1.6-1-.2-1.7-1-2.5-1.8C16.7 7.5 15.2 6 12 6zM5 13c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.9 3.5-1.6 1 .2 1.7 1 2.5 1.8C7.3 18.5 8.8 20 12 20c2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.9-3.5 1.6-1-.2-1.7-1-2.5-1.8-1.3-1.3-2.8-2.8-6-2.8z" />
      </svg>
    ),
  },
  {
    id: 'threejs',
    name: 'Three.js & 2.5D',
    code: '3',
    badge: '3D GRAPHICS',
    quote: "Who said web pages have to be flat? Let's bend space, shaders, and tactile dioramas in the viewport.",
    experienceChapter: '2024 - PRESENT',
    experienceRole: 'Creative Technologist & Visual Web Experiments',
    experienceDetails: 'Crafting procedural 3D dioramas, interactive canvas WebGL shaders, and audio-reactive scenes.',
    projectId: '3',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 3 2 20 22 20" />
        <line x1="12" y1="3" x2="12" y2="20" />
        <line x1="2" y1="20" x2="17" y2="11.5" />
        <line x1="22" y1="20" x2="7" y2="11.5" />
      </svg>
    ),
  },
  {
    id: 'python',
    name: 'Python & AI',
    code: 'P',
    badge: 'AI & PIPELINES',
    quote: "Three lines of code to summon neural embeddings, scrape telemetry, and transform massive datasets.",
    experienceChapter: '2023 - 2024',
    experienceRole: 'Data & Automation Specialist @ Independent Labs',
    experienceDetails: 'Built automated analytics processors and LLM feature pipelines with FastAPI and Pandas.',
    projectId: '1',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2H8a4 4 0 0 0-4 4v3a2 2 0 0 0 2 2h6v2H6a4 4 0 0 0-4 4v3a2 2 0 0 0 2 2h4" />
        <path d="M12 22h4a4 4 0 0 0 4-4v-3a2 2 0 0 0-2-2h-6v-2h6a4 4 0 0 0 4-4V4a2 2 0 0 0-2-2h-4" />
        <circle cx="7" cy="6" r="1" fill="currentColor" />
        <circle cx="17" cy="18" r="1" fill="currentColor" />
      </svg>
    ),
  },

  // ROW 3
  {
    id: 'postgres',
    name: 'PostgreSQL',
    code: 'E',
    badge: 'RELATIONAL DB',
    quote: "The bedrock of relational integrity and ACID compliance. Bulletproof data resilience since 1996.",
    experienceChapter: '2024 - PRESENT',
    experienceRole: 'Full Stack & Cloud Developer @ Independent Labs',
    experienceDetails: 'Query plan optimization, custom indexing (GIN/BTREE), and foreign-key constraints at scale.',
    projectId: '1',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
        <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
      </svg>
    ),
  },
  {
    id: 'figma',
    name: 'Figma',
    code: 'F',
    badge: 'DESIGN SYSTEMS',
    quote: "Where brutalist wireframes and fluid design tokens ignite before the first div is written in code.",
    experienceChapter: '2022 - 2024',
    experienceRole: 'Frontend & UI Systems Engineer @ Digital Innovation Studios',
    experienceDetails: 'Spearheaded comprehensive UI kits with auto-layout variants, interactive prototypes, and token exports.',
    projectId: '3',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
        <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
        <path d="M12 9v6h3.5a3.5 3.5 0 1 0 0-7H12z" />
        <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v6H8.5A3.5 3.5 0 0 1 5 12.5z" />
        <path d="M8.5 16H12v2.5A3.5 3.5 0 1 1 8.5 16z" />
      </svg>
    ),
  },
  {
    id: 'git',
    name: 'Git & CI/CD',
    code: 'I',
    badge: 'VERSION CONTROL',
    quote: "git commit -m 'fixed that bug finally' // commit history never lies, automated pipelines deploy.",
    experienceChapter: '2022 - PRESENT',
    experienceRole: 'Software Engineer @ Independent Labs',
    experienceDetails: 'Automated GitHub Actions CI/CD workflows with automated linting, unit tests, and production releases.',
    projectId: '2',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="9" r="2.5" />
        <circle cx="6" cy="18" r="2.5" />
        <line x1="6" y1="8.5" x2="6" y2="15.5" />
        <path d="M6 18c4 0 7-3 7-6V9" />
        <line x1="13" y1="9" x2="15.5" y2="9" />
      </svg>
    ),
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    code: 'Q',
    badge: 'API QUERYING',
    quote: "Ask for what you want, get exactly what you need. Goodbye over-fetching and multi-roundtrip latency.",
    experienceChapter: '2023 - 2024',
    experienceRole: 'Full Stack Engineer @ Independent Labs',
    experienceDetails: 'Designed strongly-typed GraphQL schemas with custom resolvers, dataloaders, and WebSocket subscriptions.',
    projectId: '2',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 20.66 7 20.66 17 12 22 3.34 17 3.34 7" />
        <circle cx="12" cy="2" r="1.5" fill="currentColor" />
        <circle cx="20.66" cy="7" r="1.5" fill="currentColor" />
        <circle cx="20.66" cy="17" r="1.5" fill="currentColor" />
        <circle cx="12" cy="22" r="1.5" fill="currentColor" />
        <circle cx="3.34" cy="17" r="1.5" fill="currentColor" />
        <circle cx="3.34" cy="7" r="1.5" fill="currentColor" />
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="3.34" y1="7" x2="20.66" y2="17" />
        <line x1="3.34" y1="17" x2="20.66" y2="7" />
      </svg>
    ),
  },
  {
    id: 'rust',
    name: 'Rust Systems',
    code: 'U',
    badge: 'HIGH PERF',
    quote: "Fearless concurrency and blazing memory safety. Zero garbage collection stutter under peak load.",
    experienceChapter: '2024 - PRESENT',
    experienceRole: 'Systems & Cryptography Engineer @ Independent Labs',
    experienceDetails: 'Engineered high-throughput proof verification daemons and memory-efficient binary parsers.',
    projectId: '2',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="8" />
        <path d="M10 8h3a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-3v4" />
        <path d="M13 12l3 4" />
      </svg>
    ),
  },

  // ROW 4
  {
    id: 'javascript',
    name: 'JavaScript ESNext',
    code: 'J',
    badge: 'CORE ENGINE',
    quote: "The engine that powers the world. From tiny micro-animations to massive cloud runtimes.",
    experienceChapter: '2022 - PRESENT',
    experienceRole: 'Full Stack & Frontend Craftsman @ Independent Labs',
    experienceDetails: 'Deep mastery of event-loops, asynchronous microtasks, Web APIs, and functional paradigms.',
    projectId: '4',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="none" />
        <path d="M8 13.5v2.5c0 .6-.4 1-1 1H6" />
        <path d="M12.5 16.5c1.2.6 2.5.4 3-.2.6-.7.1-1.6-1.5-2.2-1.6-.6-2.1-1.5-1.5-2.2.6-.6 2-.8 3-.2" />
      </svg>
    ),
  },
  {
    id: 'html5',
    name: 'HTML5 Semantic',
    code: '5',
    badge: 'SEMANTICS',
    quote: "The structural skeleton of the web. Accessible, clean, and meaningful hierarchy.",
    experienceChapter: '2022 - PRESENT',
    experienceRole: 'Frontend Craftsman @ Digital Innovation Studios',
    experienceDetails: 'ARIA-compliant markup, semantic structure, and accessible web standards across all browsers.',
    projectId: '3',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 3l1.8 15.5L12 21l6.2-2.5L20 3H4z" />
        <path d="M8 7h8l-.5 4H8.5l.3 3 3.2.9 3.2-.9.2-2" />
      </svg>
    ),
  },
  {
    id: 'css3',
    name: 'CSS3 Architecture',
    code: 'C',
    badge: 'DESIGN ENGINE',
    quote: "Cascading style sheets tuned with fluid math, container queries, and sub-pixel perfection.",
    experienceChapter: '2022 - 2024',
    experienceRole: 'Frontend & UI Systems Engineer @ Digital Innovation Studios',
    experienceDetails: 'Complex 3D transforms, fluid typography, responsive layout engines, and hardware acceleration.',
    projectId: '3',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 3l1.8 15.5L12 21l6.2-2.5L20 3H4z" />
        <path d="M15.5 7H8.5l.4 3.5h6.6l-.6 5-2.9.8-2.9-.8-.2-2" />
      </svg>
    ),
  },
  {
    id: 'terminal',
    name: 'Bash & Terminal',
    code: 'B',
    badge: 'CLI POWER',
    quote: "Where commands fly at the speed of thought. Piping stdout into pure engineering triumph.",
    experienceChapter: '2022 - PRESENT',
    experienceRole: 'DevOps & Systems Lead @ Independent Labs',
    experienceDetails: 'Zsh shell scripting, ssh tunneling, system telemetry monitoring, and server automation.',
    projectId: '2',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
  },
  {
    id: 'cms',
    name: 'Headless CMS',
    code: 'H',
    badge: 'CONTENT OPS',
    quote: "Decoupled content APIs delivering structured JSON to edge frontends in milliseconds.",
    experienceChapter: '2023 - 2024',
    experienceRole: 'Full Stack Engineer @ Independent Labs',
    experienceDetails: 'Headless CMS schemas, real-time draft previews, and static incremental revalidation (ISR).',
    projectId: '3',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 9l2.5 7L13 9l2.5 7L18 9" />
      </svg>
    ),
  },
];

export default function KeyboardExperienceProjects() {
  // Default to null: No card displayed by default as requested!
  const [selectedKeyId, setSelectedKeyId] = useState<string | null>(null);
  const [pressedKeyId, setPressedKeyId] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Procedural Web Audio Mechanical Key Sound (Authentic Thock)
  const playMechanicalThock = useCallback((pitch = 1) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // 1. Transient click
      const bufferSize = Math.floor(ctx.sampleRate * 0.007);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const hpFilter = ctx.createBiquadFilter();
      hpFilter.type = 'highpass';
      hpFilter.frequency.value = 2600;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.22, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.007);

      noise.connect(hpFilter);
      hpFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start();

      // 2. Body thock
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sine';
      const startFreq = 230 * pitch;
      osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.045);

      oscGain.gain.setValueAtTime(0.35, ctx.currentTime);
      oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio autoplay policy fallback
    }
  }, [soundEnabled]);

  // Activate key & open popup card
  const triggerKey = useCallback((key: SkillKey) => {
    setSelectedKeyId(key.id);
    setPressedKeyId(key.id);
    playMechanicalThock(Math.random() * 0.2 + 0.9);

    setTimeout(() => {
      setPressedKeyId(null);
    }, 180);
  }, [playMechanicalThock]);

  // Close popup modal
  const closeModal = useCallback(() => {
    setSelectedKeyId(null);
    playMechanicalThock(0.75);
  }, [playMechanicalThock]);

  // Body scroll lock when popup is open
  useEffect(() => {
    if (selectedKeyId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedKeyId]);

  // Listen for real physical keyboard keypresses (Escape handled by ProjectsSection overlay)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      // If an overlay is open, ProjectsSection handles multi-level Escape
      if (e.key === 'Escape') {
        return;
      }

      const keyChar = e.key.toUpperCase();
      const matchedKey = SKILL_KEYS.find(k => k.code === keyChar);
      if (matchedKey) {
        triggerKey(matchedKey);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerKey]);

  const activeKey = selectedKeyId ? SKILL_KEYS.find(k => k.id === selectedKeyId) || null : null;
  const activeProject = activeKey ? INITIAL_PROJECTS.find(p => p.id === activeKey.projectId) || null : null;

  return (
    <section
      id="experience"
      className="keyboard-showcase-section"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: '#f8f8fb', // Theme Black & White / Pastel Mist
        color: '#000000',
        borderTop: '2px solid #000000',
        borderBottom: '2px solid #000000',
        padding: '90px 0 90px 0',
        scrollMarginTop: '0px',
        overflow: 'hidden',
      }}
    >
      {/* Anchors for navigation links */}
      <div id="projects" style={{ position: 'absolute', top: 0, height: 1, width: 1, pointerEvents: 'none' }} />

      {/* Subtle Dot Grid Background Pattern in Theme Color */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.05,
          pointerEvents: 'none',
        }}
      />

      <div
        className="container"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* ================================================================== */}
        {/* CLEAN MINIMALIST HEADER IN BLACK & WHITE THEME (LEFT-ALIGNED)      */}
        {/* ================================================================== */}
        <div style={{ textAlign: 'left', marginBottom: '40px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 14px',
              borderRadius: 'var(--radius-full)',
              background: '#edeef2',
              border: '1.5px solid #000000',
              marginBottom: '14px',
            }}
          >
            <Sparkles size={14} color="#000000" />
            <span
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontSize: '0.76rem',
                fontWeight: 800,
                letterSpacing: '0.06em',
                color: '#000000',
                textTransform: 'uppercase',
              }}
            >
              Interactive Skills Macropad
            </span>
          </div>

          <h2
            className="skills-headline"
            style={{
              fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2.8rem, 5.8vw, 4.6rem)',
              color: '#000000',
              letterSpacing: '-0.035em',
              lineHeight: 1.02,
              margin: '0 0 16px 0',
              textTransform: 'lowercase',
            }}
          >
            skills, experience &amp; projects
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-poppins), sans-serif',
              fontSize: '0.96rem',
              color: '#555555',
              letterSpacing: '0.01em',
              margin: '0 0 20px 0',
            }}
          >
            (hint: click any skill keycap or press a key on your keyboard to popup workstation computers)
          </p>

          {/* Action Control Buttons Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '12px', flexWrap: 'wrap' }}>
            {/* View Workstations Direct Launch Button */}
            <button
              onClick={() => {
                setSelectedKeyId('nextjs');
                playMechanicalThock(1.1);
              }}
              className="ctrl-btn-bw"
              title="Launch Workstation Computers Showcase"
            >
              <Monitor size={15} color="#000000" />
              <span>LAUNCH WORKSTATIONS ({INITIAL_PROJECTS.length})</span>
            </button>

            {/* Sound Toggle Button */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                if (!soundEnabled) playMechanicalThock(1.2);
              }}
              className="ctrl-btn-bw"
              title="Toggle Mechanical Key Sound"
            >
              {soundEnabled ? <Volume2 size={15} color="#000000" /> : <VolumeX size={15} color="#888888" />}
              <span>{soundEnabled ? 'THOCK SOUND: ON' : 'SOUND: MUTED'}</span>
            </button>
          </div>
        </div>

        {/* ================================================================== */}
        {/* CENTERED 3D MECHANICAL KEYBOARD STAGE (NO CARD BY DEFAULT)         */}
        {/* ================================================================== */}
        <div className="keyboard-center-stage">
          <div className="keyboard-3d-stage">
            <div className="mechanical-keyboard-body-bw">
              
              {/* Keyboard Status Strip */}
              <div className="keyboard-led-strip-bw">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#000000', display: 'inline-block' }} />
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#edeef2', border: '1px solid #000000', display: 'inline-block' }} />
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffffff', border: '1px solid #000000', display: 'inline-block' }} />
                </div>
                <span className="kb-model-label-bw">ADAM.MK // 20-KEY MECHANICAL ORTHO</span>
                <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#000000' }}>● ALL SKILLS LOADED</span>
              </div>

              {/* 5x4 Grid: ALL 20 Skills with Crisp Logos */}
              <div className="keycaps-grid-5col">
                {SKILL_KEYS.map((key) => {
                  const isSelected = key.id === selectedKeyId;
                  const isPressed = key.id === pressedKeyId;

                  return (
                    <div
                      key={key.id}
                      onClick={() => triggerKey(key)}
                      className={`keycap-wrapper-bw ${isSelected ? 'is-selected' : ''} ${isPressed ? 'is-pressed' : ''}`}
                      title={`${key.name} (Press '${key.code}')`}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="keycap-stem-bw" />
                      <div className="keycap-top-bw">
                        {/* Corner Physical Key Code (Subtle) */}
                        <span className="key-code-sub-bw">{key.code}</span>

                        {/* Authentic Tech SVG Logo (Centered) */}
                        <div className="key-logo-center">
                          {key.renderIcon()}
                        </div>

                        {/* Selected Active Pip */}
                        {isSelected && <span className="key-active-pip-bw" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Keyboard Bottom Accent Plate */}
              <div className="keyboard-bottom-lip-bw">
                <span>HOT-SWAPPABLE // TACTILE MECHANICAL THOCK</span>
                <span style={{ fontWeight: 800, color: '#000000' }}>CLICK ANY KEYCAP TO POPUP COMPUTERS</span>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Handoff to Let's Connect */}
        <div
          className="kb-handoff-banner"
          style={{
            marginTop: '56px',
            background: '#ffffff',
            border: '2px solid #000000',
            borderRadius: '16px',
            padding: '24px 30px',
            boxShadow: '4px 4px 0px #000000',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-poppins)',
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#666666',
                marginBottom: '2px',
              }}
            >
              Interested in collaborating or hiring?
            </div>
            <h4
              style={{
                fontFamily: 'var(--font-poppins)',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#000000',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              Let&apos;s build something exceptional together
            </h4>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="about-btn-primary kb-handoff-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              fontSize: '0.88rem',
            }}
          >
            <span>let&apos;s connect</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>

      {/* ================================================================== */}
      {/* POPUP OVERLAY: WORKSTATION COMPUTERS SHOWCASE (PAGE 2 OVERLAY)    */}
      {/* ================================================================== */}
      <ProjectsSection
        isOverlay
        isOpen={!!activeKey}
        onClose={closeModal}
        activeSkill={
          activeKey
            ? {
                id: activeKey.id,
                name: activeKey.name,
                badge: activeKey.badge,
                quote: activeKey.quote,
                experienceChapter: activeKey.experienceChapter,
                experienceRole: activeKey.experienceRole,
                experienceDetails: activeKey.experienceDetails,
                projectId: activeKey.projectId,
                renderIcon: activeKey.renderIcon,
              }
            : null
        }
      />

      {/* ================================================================== */}
      {/* SCOPED COMPONENT STYLES IN BLACK & WHITE THEME                     */}
      {/* ================================================================== */}
      <style jsx>{`
        .keyboard-center-stage {
          max-width: 620px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* POPUP MODAL STYLES */
        @keyframes popupFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes popupSlideUp {
          from {
            opacity: 0;
            transform: scale(0.92) translateY(24px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .popup-backdrop {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.72);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: popupFadeIn 0.2s ease-out;
        }

        .popup-modal-card {
          background: #ffffff;
          border: 3px solid #000000;
          border-radius: 24px;
          padding: 28px;
          box-shadow: 10px 10px 0px #000000;
          width: 100%;
          max-width: 660px;
          max-height: 88vh;
          overflow-y: auto;
          position: relative;
          animation: popupSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .popup-close-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #edeef2;
          color: #000000;
          border: 2px solid #000000;
          border-radius: 8px;
          padding: 5px 12px;
          cursor: pointer;
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.74rem;
          font-weight: 800;
          box-shadow: 2px 2px 0px #000000;
          transition: all 0.15s ease;
        }

        .popup-close-btn:hover {
          background: #000000;
          color: #ffffff;
          transform: translateY(-1px);
          box-shadow: 3px 3px 0px #000000;
        }

        .ctrl-btn-bw {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #ffffff;
          color: #000000;
          border: 2px solid #000000;
          padding: 8px 18px;
          border-radius: var(--radius-full);
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.76rem;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 3px 3px 0px #000000;
          transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .ctrl-btn-bw:hover {
          background: #edeef2;
          transform: translateY(-2px);
          box-shadow: 4px 4px 0px #000000;
        }

        .project-action-btn-bw {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 9px 18px;
          border-radius: var(--radius-full);
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.78rem;
          font-weight: 800;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .project-action-btn-bw.primary {
          background: #000000;
          color: #ffffff;
          border: 2px solid #000000;
          box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.25);
        }

        .project-action-btn-bw.primary:hover {
          background: #222222;
          transform: translateY(-1px);
          box-shadow: 4px 4px 0px #000000;
        }

        .project-action-btn-bw.secondary {
          background: #ffffff;
          color: #000000;
          border: 2px solid #000000;
          box-shadow: 2px 2px 0px #000000;
        }

        .project-action-btn-bw.secondary:hover {
          background: #edeef2;
          transform: translateY(-1px);
          box-shadow: 3px 3px 0px #000000;
        }

        /* 3D MECHANICAL KEYBOARD IN BLACK & WHITE THEME */
        .keyboard-3d-stage {
          perspective: 1200px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          padding: 20px 0;
        }

        .mechanical-keyboard-body-bw {
          position: relative;
          width: 100%;
          max-width: 580px;
          background: #edeef2; /* Pastel mist chassis */
          border-radius: 26px;
          border: 3px solid #000000;
          box-shadow: 14px 16px 0px #000000;
          padding: 24px 22px;
          transform: rotateX(38deg) rotateZ(-12deg);
          transform-style: preserve-3d;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mechanical-keyboard-body-bw:hover {
          transform: rotateX(32deg) rotateZ(-8deg) scale(1.02);
        }

        .keyboard-led-strip-bw {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
          border-bottom: 2px solid #000000;
          margin-bottom: 14px;
        }

        .kb-model-label-bw {
          font-family: var(--font-poppins), monospace;
          font-size: 0.68rem;
          font-weight: 800;
          color: #000000;
          letter-spacing: 0.08em;
        }

        .keyboard-bottom-lip-bw {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          margin-top: 14px;
          border-top: 2px solid #000000;
          font-family: var(--font-poppins), monospace;
          font-size: 0.64rem;
          font-weight: 700;
          color: #444444;
          letter-spacing: 0.05em;
        }

        /* 5-COLUMN KEYCAPS GRID (All 20 Skills) */
        .keycaps-grid-5col {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
          user-select: none;
        }

        /* 3D SCULPTED KEYCAPS IN BLACK & WHITE */
        .keycap-wrapper-bw {
          position: relative;
          aspect-ratio: 1 / 1;
          cursor: pointer;
          transform-style: preserve-3d;
          transition: transform 0.12s ease-out;
        }

        .keycap-top-bw {
          position: absolute;
          inset: 0;
          border-radius: 12px;
          background: #ffffff; /* Crisp white porcelain keycap */
          color: #000000;
          border: 2px solid #000000;
          box-shadow: 
            0 5px 0 #000000,
            0 8px 12px rgba(0, 0, 0, 0.2),
            inset 0 2px 2px rgba(255, 255, 255, 0.9),
            inset 0 -2px 3px rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 6px;
          transform: translateY(0);
          transition: transform 0.1s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.1s ease, background 0.15s ease, color 0.15s ease;
        }

        .keycap-wrapper-bw:hover .keycap-top-bw {
          transform: translateY(-2px);
          box-shadow: 
            0 7px 0 #000000,
            0 12px 16px rgba(0, 0, 0, 0.25),
            inset 0 2px 3px rgba(255, 255, 255, 1);
        }

        /* Keycap Pressed State */
        .keycap-wrapper-bw.is-pressed .keycap-top-bw,
        .keycap-wrapper-bw:active .keycap-top-bw {
          transform: translateY(5px) !important;
          box-shadow: 
            0 0 0 #000000,
            0 2px 4px rgba(0, 0, 0, 0.15),
            inset 0 1px 1px rgba(0, 0, 0, 0.1) !important;
        }

        /* Selected Active Keycap: Sleek Inverted Black Face with White Logo */
        .keycap-wrapper-bw.is-selected .keycap-top-bw {
          background: #000000;
          color: #ffffff;
          border-color: #000000;
          box-shadow: 
            0 5px 0 #000000,
            0 0 16px rgba(0, 0, 0, 0.4),
            inset 0 2px 2px rgba(255, 255, 255, 0.3);
        }

        .key-code-sub-bw {
          position: absolute;
          top: 4px;
          right: 6px;
          font-family: var(--font-poppins), monospace;
          font-size: 0.62rem;
          font-weight: 800;
          opacity: 0.45;
        }

        .key-logo-center {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          padding: 4px;
          transition: transform 0.15s ease;
        }

        .keycap-wrapper-bw:hover .key-logo-center {
          transform: scale(1.08);
        }

        .key-active-pip-bw {
          position: absolute;
          bottom: 4px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 0 5px #ffffff;
        }

        /* Responsive Tablet & Mobile */
        @media (max-width: 960px) {
          .mechanical-keyboard-body-bw {
            transform: rotateX(20deg) rotateZ(0deg) !important;
            max-width: 520px;
            box-shadow: 10px 12px 0px #000000;
          }
          .mechanical-keyboard-body-bw:hover {
            transform: rotateX(16deg) scale(1.01) !important;
          }
        }

        @media (max-width: 640px) {
          .keyboard-showcase-section {
            padding-top: 60px !important;
            padding-bottom: 60px !important;
          }
          .skills-headline {
            font-size: clamp(2.2rem, 8vw, 3rem) !important;
          }
          .mechanical-keyboard-body-bw {
            padding: 14px 10px 12px 10px !important;
            border-radius: 18px !important;
            transform: rotateX(10deg) rotateZ(0deg) !important;
            box-shadow: 6px 8px 0px #000000 !important;
            max-width: 100% !important;
          }
          .keycaps-grid-5col {
            gap: 6px !important;
          }
          .keycap-top-bw {
            border-radius: 8px !important;
            padding: 3px !important;
            box-shadow: 0 3px 0 #000000, 0 4px 6px rgba(0, 0, 0, 0.15) !important;
          }
          .key-code-sub-bw {
            font-size: 0.52rem !important;
            top: 2px !important;
            right: 4px !important;
          }
          .kb-model-label-bw {
            font-size: 0.58rem !important;
          }
          .keyboard-bottom-lip-bw {
            flex-direction: column !important;
            gap: 4px !important;
            text-align: center !important;
            font-size: 0.56rem !important;
          }
          .ctrl-btn-bw {
            font-size: 0.72rem !important;
            padding: 7px 14px !important;
            flex: 1 1 auto;
            justify-content: center;
          }
          .kb-handoff-banner {
            padding: 20px 16px !important;
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .kb-handoff-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }

        /* Responsive Small Mobile (max-width: 380px) */
        @media (max-width: 380px) {
          .mechanical-keyboard-body-bw {
            transform: none !important;
            padding: 10px 6px !important;
            box-shadow: 4px 5px 0px #000000 !important;
            border-width: 2px !important;
          }
          .keycaps-grid-5col {
            gap: 4px !important;
          }
          .keycap-top-bw {
            border-radius: 6px !important;
          }
          .key-code-sub-bw {
            display: none !important;
          }
          .key-logo-center {
            padding: 1px !important;
          }
        }
      `}</style>
    </section>
  );
}
