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
  {
    id: 'nextjs',
    name: 'Next.js 14',
    code: 'N',
    badge: 'THIS SITE',
    quote: "The portfolio is one Next.js app that compiles to plain HTML — no server sitting behind it.",
    experienceChapter: 'NOW',
    experienceRole: 'This portfolio — Next.js 14 App Router',
    experienceDetails: 'Static prerender, TypeScript strict, zero API routes: 131 kB first load, deployed from GitHub to Vercel.',
    projectId: 'portfolio',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20V4l12 16h4V4" />
      </svg>
    ),
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    code: 'T',
    badge: 'TYPE SAFETY',
    quote: "Types keep the projects, timeline and stats in one file instead of three copies drifting apart.",
    experienceChapter: 'NOW',
    experienceRole: 'This portfolio — strict TypeScript',
    experienceDetails: 'One typed source of truth feeds the project cards, the timeline and the keyboard cards; tsc --noEmit is a build gate.',
    projectId: 'portfolio',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h9M8.5 6v13" />
        <path d="M20 8.5c-.9-.8-2-1.2-3.1-1.2-1.7 0-2.9.9-2.9 2.2 0 1.4 1.3 1.9 2.9 2.4 1.7.5 3 1.1 3 2.6 0 1.5-1.4 2.5-3.2 2.5-1.3 0-2.5-.4-3.4-1.2" />
      </svg>
    ),
  },
  {
    id: 'react',
    name: 'React 19',
    code: 'R',
    badge: 'UI',
    quote: "React 19 with Vite for the paddy disease app — image in, prediction and explanation out.",
    experienceChapter: 'COURSEWORK',
    experienceRole: 'Paddy disease app — React 19 + Vite',
    experienceDetails: 'Upload a leaf photo, get the class prediction, with Firebase for storage and Gemini writing the explanation.',
    projectId: 'paddy',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    id: 'python',
    name: 'Python',
    code: 'P',
    badge: 'SCRIPTING & ML',
    quote: "Python is where the 3D modelling, the ML training and the small automation scripts all live.",
    experienceChapter: 'ONGOING',
    experienceRole: 'BagSense — Blender scripting; ML coursework',
    experienceDetails: 'Headless Blender scripts for the bag geometry, data preparation for the classifiers, and the command-line tools around both.',
    projectId: 'bagsense',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c-3.5 0-3.5 1.6-3.5 3v2h7v1H6.5C4.6 9 3 10.2 3 13.5S4.6 18 6.5 18H8v-2.2c0-2 1.6-3.3 3.5-3.3h4c1.7 0 3-1.3 3-3V6c0-1.4-1.3-3-3-3h-3.5z" />
        <circle cx="9.5" cy="5.5" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    code: 'Y',
    badge: 'DEEP LEARNING',
    quote: "Two encoders, one gated fusion block — the DGCA reimplementation is plain PyTorch, no wrappers.",
    experienceChapter: 'COURSEWORK',
    experienceRole: 'DGCA meme sentiment — PyTorch',
    experienceDetails: 'BERT and ResNet50 encoders feed dimension-wise gated cross-attention; Grad-CAM and gating plots for inspection.',
    projectId: 'dgca',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 12a8 8 0 1 1-3.2-6.4" />
        <path d="M16.8 5.6 20 2.8V7" />
        <circle cx="12" cy="12" r="2.4" />
      </svg>
    ),
  },
  {
    id: 'blender',
    name: 'Blender',
    code: 'B',
    badge: '3D MODELLING',
    quote: "One dimension dictionary, whole bag rebuilt — that is the point of modelling it parametrically.",
    experienceChapter: 'ONGOING',
    experienceRole: 'BagSense — parametric Blender model',
    experienceDetails: 'Headless bpy build: panels, roll-top, straps and buckles all derived from width, depth, height and strap values, then rendered per view.',
    projectId: 'bagsense',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7L12 2.5z" />
        <path d="M12 21.5V12M3.5 7 12 12l8.5-5" />
      </svg>
    ),
  },
  {
    id: 'godot',
    name: 'Godot 4.6',
    code: 'G',
    badge: 'GAME ENGINE',
    quote: "A Blender town imported as one glTF scene, then walked around in Godot.",
    experienceChapter: 'PROTOTYPE',
    experienceRole: 'Cozy Garden Town — Godot 4.6.2',
    experienceDetails: 'Town mesh with 1,142 objects, top-down player controller, three or four NPCs, no combat — deliberately small scope.',
    projectId: 'garden',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 15.5c1-2 2.2-3 4-3s3 1 4 3" />
        <circle cx="9" cy="9.5" r="1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="9.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: 'gdscript',
    name: 'GDScript',
    code: 'D',
    badge: 'GAME LOGIC',
    quote: "Scripts are kept testable: a headless scene proves movement before anything is called done.",
    experienceChapter: 'PROTOTYPE',
    experienceRole: 'Cozy Garden Town — GDScript',
    experienceDetails: 'Player movement, camera and interaction; a headless self-test scene checks behaviour without opening the editor.',
    projectId: 'garden',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5l8 4 8-4v14l-8-4-8 4z" />
        <path d="M12 9v10" />
      </svg>
    ),
  },
  {
    id: 'esp32',
    name: 'ESP32 & C++',
    code: 'E',
    badge: 'EMBEDDED',
    quote: "Five sensors in, two speed values out — the PID loop runs every cycle on the board.",
    experienceChapter: 'HARDWARE',
    experienceRole: 'TimeRush — ESP32 line follower',
    experienceDetails: 'Five IR sensors produce a line error, Kp 14 / Kd 10 turn it into left/right ESC output, clamped to the ESC neutral point.',
    projectId: 'timerush',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="7" width="10" height="10" rx="1.5" />
        <path d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3" />
      </svg>
    ),
  },
  {
    id: 'firebase',
    name: 'Firebase',
    code: 'F',
    badge: 'APP SERVICES',
    quote: "Storage and plumbing for the paddy app, kept behind the front end so the UI stays simple.",
    experienceChapter: 'COURSEWORK',
    experienceRole: 'Paddy disease app — Firebase',
    experienceDetails: 'Handles the app-side storage the React front end needs so the classifier stays a pure function of the uploaded image.',
    projectId: 'paddy',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c3 4.2 5 6.9 5 9.6A5 5 0 0 1 7 12.6C7 9.9 9 7.2 12 3z" />
        <path d="M12 21c-2.4-1.9-3.6-3.7-3.6-5.4" />
      </svg>
    ),
  },
  {
    id: 'gemini',
    name: 'Gemini API',
    code: 'A',
    badge: 'EXPLANATION LAYER',
    quote: "The model says which disease; Gemini says what that means in a sentence a farmer can read.",
    experienceChapter: 'COURSEWORK',
    experienceRole: 'Paddy disease app — Gemini API',
    experienceDetails: 'Wraps the classifier output in a plain-language explanation using @google/generative-ai from the front end.',
    projectId: 'paddy',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l2.2 5.6L20 11l-5.8 2.4L12 19l-2.2-5.6L4 11l5.8-2.4z" />
      </svg>
    ),
  },
  {
    id: 'vite',
    name: 'Vite',
    code: 'V',
    badge: 'BUILD TOOLING',
    quote: "Fast rebuilds, plain ES modules, a bundle small enough that the whole app is a static file.",
    experienceChapter: 'COURSEWORK',
    experienceRole: 'Paddy disease app — Vite',
    experienceDetails: 'Dev server and production bundle for the React 19 app; output is a static dist folder, no server process.',
    projectId: 'paddy',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 4.5 13.5H10l-1 8.5L20 10h-5.5L13 2z" />
      </svg>
    ),
  },
  {
    id: 'css',
    name: 'CSS Architecture',
    code: 'C',
    badge: 'STYLING',
    quote: "Design tokens in globals.css, layout per section — no UI framework anywhere in this build.",
    experienceChapter: 'NOW',
    experienceRole: 'This portfolio — plain CSS',
    experienceDetails: 'Colour, type and spacing tokens declared once, then used inline; every section keeps its own responsive rules instead of a utility soup.',
    projectId: 'portfolio',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5h16l-1.6 14H5.6L4 5z" />
        <path d="M8 9h8M8.5 13h7" />
      </svg>
    ),
  },
  {
    id: 'html',
    name: 'Semantic HTML',
    code: 'H',
    badge: 'STRUCTURE',
    quote: "One h1, real sections with ids, labelled controls — the page does not rely on div soup to navigate.",
    experienceChapter: 'NOW',
    experienceRole: 'This portfolio — structure & accessibility',
    experienceDetails: 'Sections carry ids for in-page navigation, buttons and links carry labels, and the document has a single owning heading.',
    projectId: 'portfolio',
    renderIcon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5h16l-1.6 14H5.6L4 5z" />
        <path d="M9 9.5v7M15 9.5v7M9 12.8h6" />
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
                <span className="kb-model-label-bw">ADAM.MK // 14-KEY MECHANICAL ORTHO</span>
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
