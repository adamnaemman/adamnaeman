'use client';

import React, { useState } from 'react';
import { ArrowDown, Sparkles, Folder, ExternalLink } from 'lucide-react';

export default function Hero() {
  const [hoveredFolder, setHoveredFolder] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="candy-hero-cover"
      style={{
        height: '100vh',
        minHeight: '640px',
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        /* Black, Pastel and White vertical stripes */
        background: 'repeating-linear-gradient(90deg, #edeef2 0px, #edeef2 75px, #ffffff 75px, #ffffff 150px)',
      }}
    >
      {/* ==================================================================== */}
      {/* DESKTOP OS INTERACTIVE FOLDERS (Black, Pastel & White Theme)         */}
      {/* ==================================================================== */}

      {/* 📁 FOLDER 1: "about me" (Top-Left) */}
      <div
        onClick={() => scrollTo('about')}
        onMouseEnter={() => setHoveredFolder('about-me')}
        onMouseLeave={() => setHoveredFolder(null)}
        className="candy-folder folder-about-me"
        style={{
          position: 'absolute',
          top: '15%',
          left: '12%',
          cursor: 'pointer',
          zIndex: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: hoveredFolder === 'about-me' ? 'translateY(-6px) scale(1.08)' : 'none',
        }}
        title="About Me — Engineering Profile"
      >
        <FolderIcon active={hoveredFolder === 'about-me'} />
        <span className="folder-label">about me</span>
      </div>

      {/* 📁 FOLDER 2: "background" (Top-Right) */}
      <div
        onClick={() => scrollTo('background')}
        onMouseEnter={() => setHoveredFolder('background')}
        onMouseLeave={() => setHoveredFolder(null)}
        className="candy-folder folder-background"
        style={{
          position: 'absolute',
          top: '15%',
          right: '12%',
          cursor: 'pointer',
          zIndex: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: hoveredFolder === 'background' ? 'translateY(-6px) scale(1.08)' : 'none',
        }}
        title="Technical Background & Arsenal"
      >
        <FolderIcon active={hoveredFolder === 'background'} />
        <span className="folder-label">background</span>
      </div>

      {/* 📁 FOLDER 3: "experience" (Bottom-Left) */}
      <div
        onClick={() => scrollTo('experience')}
        onMouseEnter={() => setHoveredFolder('experience')}
        onMouseLeave={() => setHoveredFolder(null)}
        className="candy-folder folder-experience"
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '12%',
          cursor: 'pointer',
          zIndex: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: hoveredFolder === 'experience' ? 'translateY(-6px) scale(1.08)' : 'none',
        }}
        title="Career Timeline & Experience"
      >
        <FolderIcon active={hoveredFolder === 'experience'} />
        <span className="folder-label">experience</span>
      </div>

      {/* 📁 FOLDER 4: "let's connect" (Bottom-Right) */}
      <div
        onClick={() => scrollTo('contact')}
        onMouseEnter={() => setHoveredFolder('connect')}
        onMouseLeave={() => setHoveredFolder(null)}
        className="candy-folder folder-connect"
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '12%',
          cursor: 'pointer',
          zIndex: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: hoveredFolder === 'connect' ? 'translateY(-6px) scale(1.08)' : 'none',
        }}
        title="Let's Connect — Direct Frequency"
      >
        <FolderIcon active={hoveredFolder === 'connect'} />
        <span className="folder-label">let's connect</span>
      </div>

      {/* ==================================================================== */}
      {/* CENTERPIECE TYPOGRAPHY: EXACT CENTER OF THE PAGE                     */}
      {/* ==================================================================== */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          zIndex: 20,
          userSelect: 'none',
          width: '100%',
          maxWidth: '1240px',
          padding: '0 20px',
        }}
      >
        {/* Typographic Container — wordmark, italic overlayer, positioning line */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <h1
            className="hero-bold-word"
            style={{
              fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2.5rem, 11.5vw, 9.4rem)',
              color: '#000000',
              letterSpacing: '-0.035em',
              lineHeight: 0.9,
              textTransform: 'lowercase',
              margin: 0,
              padding: '0 8px',
              textShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.3s ease',
              textAlign: 'center',
            }}
          >
            adamnaeman
          </h1>

          {/* Italic overlayer sits under the wordmark, not on top of it — the
              two used to overlap in the middle and neither was readable. */}
          <span
            className="hero-script-overlay"
            style={{
              display: 'block',
              marginTop: '-0.16em',
              fontFamily: 'var(--font-serif), Georgia, serif',
              fontStyle: 'italic',
              fontWeight: 600,
              fontSize: 'clamp(2rem, 6.2vw, 4.6rem)',
              color: '#000000',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              transform: 'rotate(-5deg)',
              letterSpacing: '0.01em',
              lineHeight: 1,
              textShadow: '0 2px 0 rgba(255, 255, 255, 0.65)',
            }}
          >
            portfolio
          </span>

          <p
            className="hero-positioning"
            style={{
              margin: '22px 0 0 0',
              maxWidth: '46ch',
              fontFamily: 'var(--font-mono), ui-monospace, monospace',
              fontSize: 'clamp(0.68rem, 1.5vw, 0.82rem)',
              fontWeight: 700,
              letterSpacing: '0.06em',
              lineHeight: 1.7,
              textTransform: 'uppercase',
              color: '#1b1b1b',
            }}
          >
            Computer science student · builds web apps, ML models and 3D
            <br />
            <span style={{ color: '#000000' }}>Open to internship</span>
          </p>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* BOTTOM SCROLL INDICATOR                                              */}
      {/* ==================================================================== */}
      <div
        onClick={() => scrollTo('about')}
        className="hero-scroll-indicator"
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          zIndex: 10,
          padding: '10px 18px',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          border: '2px solid #000000',
          boxShadow: '3px 3px 0px #000000',
          transition: 'all 0.2s ease',
          maxWidth: 'calc(100vw - 32px)',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-poppins), sans-serif',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: '#000000',
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
          }}
        >
          explore about me & creative work
        </span>
        <ArrowDown size={14} color="#000000" className="bounce-arrow" />
      </div>

      {/* ==================================================================== */}
      {/* SCOPED COMPONENT STYLES                                              */}
      {/* ==================================================================== */}
      <style jsx>{`
        .folder-label {
          font-family: var(--font-poppins), sans-serif;
          font-weight: 700;
          font-size: 0.85rem;
          color: #000000;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.9);
          letter-spacing: 0.03em;
          text-transform: lowercase;
        }

        .bounce-arrow {
          animation: bounceArrow 1.6s infinite ease-in-out;
        }

        @keyframes bounceArrow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(4px);
          }
        }

        /* Responsive Tablet (max-width: 960px) */
        @media (max-width: 960px) {
          .folder-about-me {
            top: 14% !important;
            left: 6% !important;
          }
          .folder-background {
            top: 14% !important;
            right: 6% !important;
          }
          .folder-connect {
            bottom: 14% !important;
            right: 6% !important;
          }
          .folder-experience {
            bottom: 14% !important;
            left: 6% !important;
          }
        }

        /* Responsive Mobile (max-width: 640px) */
        @media (max-width: 640px) {
          .candy-hero-cover {
            background: repeating-linear-gradient(90deg, #edeef2 0px, #edeef2 36px, #ffffff 36px, #ffffff 72px) !important;
            padding-top: 80px !important;
            padding-bottom: 30px !important;
            min-height: 100svh !important;
            height: 100svh !important;
          }
          .candy-folder {
            transform: scale(0.82);
            transform-origin: center center;
          }
          .folder-about-me {
            top: 80px !important;
            left: 12px !important;
          }
          .folder-background {
            top: 80px !important;
            right: 12px !important;
          }
          .folder-connect {
            bottom: 74px !important;
            right: 12px !important;
          }
          .folder-experience {
            bottom: 74px !important;
            left: 12px !important;
          }
          .folder-label {
            font-size: 0.76rem !important;
          }
          .hero-bold-word {
            font-size: clamp(2.2rem, 11vw, 5.2rem) !important;
          }
          .hero-script-overlay {
            font-size: clamp(2rem, 8vw, 4.2rem) !important;
          }
          .hero-scroll-indicator {
            padding: 8px 14px !important;
            bottom: 16px !important;
          }
          .hero-scroll-indicator span {
            font-size: 0.7rem !important;
          }
        }

        /* Responsive Small Mobile (max-width: 380px) */
        @media (max-width: 380px) {
          .candy-folder {
            transform: scale(0.72) !important;
          }
          .folder-about-me {
            top: 72px !important;
            left: 4px !important;
          }
          .folder-background {
            top: 72px !important;
            right: 4px !important;
          }
          .folder-connect {
            bottom: 68px !important;
            right: 4px !important;
          }
          .folder-experience {
            bottom: 68px !important;
            left: 4px !important;
          }
          .hero-bold-word {
            font-size: 2.1rem !important;
          }
          .hero-script-overlay {
            font-size: 1.85rem !important;
          }
          .hero-scroll-indicator {
            padding: 6px 12px !important;
            bottom: 12px !important;
          }
          .hero-scroll-indicator span {
            font-size: 0.64rem !important;
          }
        }
      `}</style>
    </section>
  );
}

{/* Aesthetic Retro MacOS / Y2K Folder Icon Component in Black, Pastel & White */}
function FolderIcon({ active }: { active: boolean }) {
  return (
    <div
      style={{
        width: '64px',
        height: '52px',
        position: 'relative',
        filter: active
          ? 'drop-shadow(0 6px 14px rgba(0, 0, 0, 0.35))'
          : 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))',
        transition: 'all 0.2s ease',
      }}
    >
      <svg width="64" height="52" viewBox="0 0 68 54" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Back Tab in Sleek Black */}
        <path
          d="M4 11C4 7.68629 6.68629 5 10 5H24C25.8 5 27.5 6 28.4 7.6L30.6 11.4C31.5 13 33.2 14 35 14H60C63.3137 14 66 16.6863 66 20V45C66 48.3137 63.3137 51 60 51H10C6.68629 51 4 48.3137 4 45V11Z"
          fill="#111111"
        />
        {/* Inside white sheet peaking */}
        <rect x="10" y="8" width="48" height="12" rx="2" fill="#f4f4f7" opacity="0.95" />
        <line x1="14" y1="12" x2="26" y2="12" stroke="#d4d4dc" strokeWidth="1.5" strokeLinecap="round" />
        {/* Front Folder Body in Pure White with Crisp Black / Pastel Border */}
        <rect
          x="4"
          y="15"
          width="60"
          height="35"
          rx="5"
          fill="#ffffff"
          stroke="#111111"
          strokeWidth="1.8"
        />
        {/* Folder Top Rim Accent in Pastel Gray */}
        <path
          d="M5 16H63C63.5523 16 64 16.4477 64 17V19H4V17C4 16.4477 4.44772 16 5 16Z"
          fill="#edeef2"
        />
      </svg>
    </div>
  );
}
