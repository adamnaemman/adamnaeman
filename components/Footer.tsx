'use client';

import React from 'react';
import { ArrowUp, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '2px solid #000000',
        background: '#ffffff',
        padding: '50px 0 40px 0',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div 
        className="container"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        <div
          className="footer-top-row"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: '32px',
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontWeight: 900,
                fontSize: '1.45rem',
                color: '#000000',
                letterSpacing: '-0.03em',
                marginBottom: '4px',
              }}
            >
              ADAM NAEMAN
            </div>
            <p
              style={{
                color: '#555555',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '0.88rem',
              }}
            >
              Full Stack Craftsman & Cloud Solutions Architect.
            </p>
          </div>

          {/* Platform Badges */}
          <div className="footer-badges-cluster" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <a
              href="https://github.com/adamnaemman"
              target="_blank"
              rel="noreferrer"
              className="footer-badge-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                background: '#edeef2',
                border: '1.5px solid #000000',
                color: '#000000',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              <Github size={13} color="#000000" />
              <span>GITHUB</span>
            </a>

            <a
              href="https://www.linkedin.com/in/adam-naeman/"
              target="_blank"
              rel="noreferrer"
              className="footer-badge-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                background: '#edeef2',
                border: '1.5px solid #000000',
                color: '#000000',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              <Linkedin size={13} color="#000000" />
              <span>LINKEDIN</span>
            </a>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                background: '#edeef2',
                border: '1.5px solid #000000',
                color: '#000000',
                fontWeight: 700,
              }}
            >
              <span>▲ VERCEL EDGE</span>
            </div>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="about-btn-secondary footer-top-btn"
              style={{ 
                padding: '8px 16px', 
                fontSize: '0.78rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>BACK TO TOP</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        <div
          className="footer-bottom-row"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1.5px dashed #000000',
            paddingTop: '24px',
            color: '#666666',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '0.82rem',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div suppressHydrationWarning>
            &copy; {new Date().getFullYear()} Adam Naeman. All rights reserved.
          </div>
          <div>
            Crafted with Next.js 14, TypeScript &amp; Tactile Brutalism.
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #ffffff;
          color: #000000;
          padding: 8px 16px;
          border-radius: var(--radius-full);
          border: 1.5px solid #000000;
          font-family: var(--font-poppins), sans-serif;
          font-weight: 700;
          font-size: 0.78rem;
          cursor: pointer;
          box-shadow: 2px 2px 0px #000000;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .about-btn-secondary:hover {
          background: #edeef2;
          transform: translateY(-2px);
          box-shadow: 3px 3px 0px #000000;
        }

        .footer-badge-link {
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .footer-badge-link:hover {
          background: #ffffff !important;
          transform: translateY(-2px);
          box-shadow: 2px 2px 0px #000000;
        }

        @media (max-width: 640px) {
          .footer-top-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 18px !important;
          }
          .footer-badges-cluster {
            width: 100% !important;
          }
          .footer-top-btn {
            width: 100% !important;
            justify-content: center !important;
            margin-top: 6px !important;
          }
          .footer-bottom-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </footer>
  );
}
