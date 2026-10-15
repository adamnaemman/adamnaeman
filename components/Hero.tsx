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
        {/* Typographic Container */}
        <div
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* THE BIG BOLD BLACK WORD: adamnaeman in Poppins bold */}
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

          {/* THE SERIF SCRIPT/ITALIC OVERLAY: portfolio in Serif font */}
          <span
            className="hero-script-overlay"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotate(-6deg)',
              fontFamily: 'var(--font-serif), "Playfair Display", "Cormorant Garamond", Georgia, serif',
              fontStyle: 'italic',
              fontWeight: 600,
              fontSize: 'clamp(2.4rem, 8.5vw, 6.8rem)',
              color: '#ffffff',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 5,
              textShadow: '0 2px 14px rgba(0, 0, 0, 0.45), 0 0 4px rgba(0, 0, 0, 0.9)',
              letterSpacing: '0.02em',
              lineHeight: 1,
            }}
          >
            portfolio
          </span>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* BOTTOM SCROLL INDICATOR                                              */}
      {/* ==================================================================== */}
      <div
        onClick={() => scrollTo('about')}
        style={{
          position: 'absolute',
          bottom: '28px',
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
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-poppins), sans-serif',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: '#000000',
            letterSpacing: '0.04em',
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
            left: 8% !important;
          }
          .folder-background {
            top: 14% !important;
            right: 8% !important;
          }
          .folder-connect {
            bottom: 14% !important;
            right: 8% !important;
          }
          .folder-experience {
            bottom: 14% !important;
            left: 8% !important;
          }
        }

        /* Responsive Mobile (max-width: 640px) */
        @media (max-width: 640px) {
          .candy-hero-cover {
            background: repeating-linear-gradient(90deg, #edeef2 0px, #edeef2 42px, #ffffff 42px, #ffffff 84px) !important;
            padding-top: 90px !important;
            padding-bottom: 40px !important;
          }
          .folder-about-me {
            top: 95px !important;
            left: 16px !important;
          }
          .folder-background {
            top: 95px !important;
            right: 16px !important;
          }
          .folder-connect {
            bottom: 85px !important;
            right: 16px !important;
          }
          .folder-experience {
            bottom: 85px !important;
            left: 16px !important;
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
