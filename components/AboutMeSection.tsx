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
              Hi, I&apos;m <span className="highlight-dark">Adam Naeman</span>, a creative full-stack engineer and cloud developer with a relentless passion for building interactive digital worlds. Ever since writing my first lines of code, I have been driven by software that doesn&apos;t just quietly function in the background, but <span className="highlight-dark">sparks genuine tactile delight</span> directly in the browser.
            </p>

            <p className="about-p">
              With a deep technical foundation in <span className="highlight-dark">Computer Science & Cloud Systems</span>, I specialize in architecting resilient end-to-end web applications using <span className="highlight-dark">Next.js, TypeScript, PostgreSQL (Supabase), and Google Cloud Platform (GCP)</span>. From configuring high-throughput serverless microservices to tuning relational databases, I build systems engineered for long-term scalability.
            </p>

            <p className="about-p">
              One thing about me is that I <span className="highlight-dark">genuinely love building things that feel alive</span> — whether it is 2.5D interactive audio workstations, procedural 3D motion graphics, or tactile brutalist web interfaces. I believe the modern web shouldn&apos;t be flat and cookie-cutter; it should feel tangible, playful, and crafted with intention.
            </p>

            <p className="about-p">
              As I continue evolving my craft, I am actively partnering with ambitious teams, crafting cutting-edge web products, and pushing creative engineering forward. When I&apos;m not at my terminal shipping commits, you&apos;ll find me exploring modular sound synthesis, experimenting with WebGL shaders, or hunting down the city&apos;s finest iced matcha brew.
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
              <span>Kuala Lumpur // Remote Worldwide</span>
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

        /* Responsive Mobile (max-width: 640px) */
        @media (max-width: 640px) {
          .about-section-container {
            padding: 70px 0 !important;
          }
          .about-headline {
            font-size: 2.5rem !important;
          }
          .about-p {
            font-size: 0.94rem !important;
            line-height: 1.65 !important;
          }
          .about-btn-primary, .about-btn-secondary {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
