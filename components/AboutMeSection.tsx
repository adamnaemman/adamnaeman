'use client';

import React from 'react';
import { ArrowRight, Sparkles, Terminal, MapPin, Coffee } from 'lucide-react';

export default function AboutMeSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="about"
      className="about-section-container"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '80vh',
        background: '#f8f8fb',
        borderTop: '2px solid #000000',
        borderBottom: '2px solid #000000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '90px 0 90px 0',
        scrollMarginTop: '0px',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Dot Grid Background Pattern in Theme Color */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.04,
          pointerEvents: 'none',
        }}
      />

      {/* ==================================================================== */}
      {/* MAIN EDITORIAL CONTENT                                               */}
      {/* ==================================================================== */}
      <div
        className="container"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          width: '100%',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: '920px' }}>
          
          {/* Pill Kicker */}
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
              Profile & Story
            </span>
          </div>

          {/* Main Headline: "about me" in bold lowercase Poppins */}
          <h2
            className="about-headline"
            style={{
              fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2.8rem, 5.8vw, 4.6rem)',
              color: '#000000',
              letterSpacing: '-0.035em',
              lineHeight: 1.02,
              margin: '0 0 26px 0',
              textTransform: 'lowercase',
            }}
          >
            about me
          </h2>

          {/* Editorial Paragraphs with Highlighted Typography */}
          <div className="about-paragraphs">
            <p className="about-p">
              Hi, I&apos;m <span className="highlight-dark">Adam Naeman</span> — a final-year computer science student who builds web apps, trains models and models things in 3D. The thread running through all of it is making software feel physical: the skill selector on this page is a mechanical keyboard that <span className="highlight-dark">synthesises its own key sounds</span> in the browser instead of shipping audio files.
            </p>

            <p className="about-p">
              What I actually work with: <span className="highlight-dark">Next.js and TypeScript</span> on the front end, <span className="highlight-dark">Python and PyTorch</span> for machine learning, and <span className="highlight-dark">Blender</span> for parametric 3D. Recent builds are a paddy leaf disease classifier behind a React app, a PyTorch reimplementation of a 2025 multimodal sentiment paper, and my final-year project — a parametrically modelled smart bag.
            </p>

            <p className="about-p">
              I care about proof more than adjectives. Every project on this page has source behind it, and when something is still in progress I say so. Placeholder case studies and borrowed metrics are worse than an empty section — so there are none.
            </p>

            <p className="about-p">
              I&apos;m looking for an internship where I can ship real software and learn from people who have been doing it longer. Away from the terminal: small Godot prototypes, and far too much iced matcha.
            </p>
          </div>

          {/* Status Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              margin: '28px 0 32px 0',
            }}
          >
            <div className="status-badge">
              <MapPin size={14} color="#000000" />
              <span>Malaysia // Remote friendly</span>
            </div>
            <div className="status-badge">
              <Terminal size={14} color="#000000" />
              <span>Full Stack & Cloud Developer</span>
            </div>
            <div className="status-badge">
              <Coffee size={14} color="#000000" />
              <span>100% Creative Fuel</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
            <button
              onClick={() => scrollTo('contact')}
              className="about-btn-primary"
            >
              <span>let&apos;s connect</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => scrollTo('background')}
              className="about-btn-secondary"
            >
              <span>explore background & arsenal</span>
            </button>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* SCOPED COMPONENT STYLES                                              */}
      {/* ==================================================================== */}
      <style jsx>{`
        .about-paragraphs {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .about-p {
          font-family: var(--font-poppins), 'Poppins', sans-serif;
          font-size: 1.02rem;
          line-height: 1.75;
          color: #333333;
          margin: 0;
        }

        .highlight-dark {
          font-weight: 800;
          color: #000000;
          background: #edeef2;
          padding: 1px 6px;
          border-radius: 4px;
          border: 1px solid #000000;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.76rem;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: var(--radius-full);
          background: #ffffff;
          border: 1.5px solid #000000;
          color: #000000;
          box-shadow: 2px 2px 0px #000000;
          transition: all 0.2s ease;
        }

        .status-badge:hover {
          background: #edeef2;
          transform: translateY(-2px);
          box-shadow: 3px 3px 0px #000000;
        }

        .about-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #000000;
          color: #ffffff;
          padding: 12px 24px;
          border-radius: var(--radius-full);
          border: 2px solid #000000;
          font-family: var(--font-poppins), sans-serif;
          font-weight: 700;
          font-size: 0.88rem;
          cursor: pointer;
          box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.25);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .about-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 5px 5px 0px #000000;
          background: #1a1a1a;
        }

        .about-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          color: #000000;
          padding: 12px 20px;
          border-radius: var(--radius-full);
          border: 2px solid #000000;
          font-family: var(--font-poppins), sans-serif;
          font-weight: 700;
          font-size: 0.88rem;
          cursor: pointer;
          box-shadow: 3px 3px 0px #000000;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .about-btn-secondary:hover {
          background: #edeef2;
          transform: translateY(-2px);
          box-shadow: 4px 4px 0px #000000;
        }

        /* Responsive Tablet & Mobile */
        @media (max-width: 768px) {
          .about-section-container {
            padding: 70px 0 !important;
          }
          .about-p {
            font-size: 0.96rem !important;
            line-height: 1.68 !important;
          }
        }

        /* Responsive Mobile (max-width: 640px) */
        @media (max-width: 640px) {
          .about-section-container {
            padding: 60px 0 !important;
          }
          .about-headline {
            font-size: clamp(2.2rem, 8vw, 3rem) !important;
          }
          .about-p {
            font-size: 0.92rem !important;
            line-height: 1.65 !important;
          }
          .about-btn-primary, .about-btn-secondary {
            width: 100%;
            justify-content: center;
          }
          .status-badge {
            font-size: 0.72rem !important;
            padding: 5px 10px !important;
          }
        }

        /* Responsive Small Mobile (max-width: 380px) */
        @media (max-width: 380px) {
          .about-section-container {
            padding: 50px 0 !important;
          }
          .about-headline {
            font-size: 2rem !important;
          }
          .about-p {
            font-size: 0.88rem !important;
          }
          .status-badge {
            width: 100%;
            justify-content: flex-start;
          }
        }
      `}</style>
    </section>
  );
}
