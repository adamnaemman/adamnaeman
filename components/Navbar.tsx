'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, Zap } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        pointerEvents: 'none',
      }}
    >
      {/* ==================================================================== */}
      {/* TOP LEFT: LOGO IN THE SQUARE                                         */}
      {/* ==================================================================== */}
      <a
        href="#hero"
        style={{
          pointerEvents: 'auto',
          width: '46px',
          height: '46px',
          borderRadius: '10px',
          background: '#ffffff',
          border: '2px solid #000000',
          boxShadow: '3px 3px 0px #000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          color: '#000000',
          fontFamily: 'var(--font-poppins), sans-serif',
          fontWeight: 900,
          fontSize: '1.35rem',
          transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translate(-2px, -2px)';
          e.currentTarget.style.boxShadow = '5px 5px 0px #000000';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.boxShadow = '3px 3px 0px #000000';
        }}
        title="Adam Naeman — Home"
      >
        A
      </a>

      {/* ==================================================================== */}
      {/* TOP RIGHT: HAMBURGER BUTTON IN THE SQUARE                            */}
      {/* ==================================================================== */}
      {/* ==================================================================== */}
      {/* DESKTOP NAV — hidden below 1024px, where the hamburger takes over     */}
      {/* ==================================================================== */}
      <nav className="navbar-desktop-nav" aria-label="Section navigation">
        {[
          { href: '#about', label: 'About' },
          { href: '#background', label: 'Background' },
          { href: '#projects', label: 'Work' },
          { href: '#contact', label: 'Contact' },
        ].map((item) => (
          <a key={item.href} href={item.href} className="navbar-desktop-link">
            {item.label}
          </a>
        ))}
      </nav>

      <div className="navbar-hamburger" style={{ position: 'relative', pointerEvents: 'auto' }}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '10px',
            background: menuOpen ? '#000000' : '#ffffff',
            border: '2px solid #000000',
            boxShadow: '3px 3px 0px #000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: menuOpen ? '#ffffff' : '#000000',
            transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-2px, -2px)';
            e.currentTarget.style.boxShadow = '5px 5px 0px #000000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '3px 3px 0px #000000';
          }}
          aria-label="Toggle menu"
          title="Toggle Navigation Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Dropdown Menu anchored right below the hamburger square */}
        {menuOpen && (
          <div
            style={{
              position: 'absolute',
              top: '56px',
              right: 0,
              minWidth: '220px',
              background: '#ffffff',
              border: '2.5px solid #000000',
              borderRadius: '14px',
              boxShadow: '6px 6px 0px #000000',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              zIndex: 100,
              animation: 'menuDrop 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '0.62rem',
                color: '#666666',
                paddingBottom: '8px',
                borderBottom: '1.5px dashed #000000',
                marginBottom: '4px',
                letterSpacing: '0.04em',
              }}
            >
              [ NAVIGATION MENU ]
            </div>

            <a
              href="#about"
              onClick={() => setMenuOpen(false)}
              className="menu-link-item"
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontWeight: 700,
                fontSize: '0.92rem',
                color: '#000000',
                textDecoration: 'none',
                padding: '8px 12px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.15s ease',
              }}
            >
              <span>ABOUT</span>
              <ArrowUpRight size={14} />
            </a>

            <a
              href="#background"
              onClick={() => setMenuOpen(false)}
              className="menu-link-item"
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontWeight: 700,
                fontSize: '0.92rem',
                color: '#000000',
                textDecoration: 'none',
                padding: '8px 12px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.15s ease',
              }}
            >
              <span>BACKGROUND</span>
              <ArrowUpRight size={14} />
            </a>

            <a
              href="#projects"
              onClick={() => setMenuOpen(false)}
              className="menu-link-item"
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontWeight: 700,
                fontSize: '0.92rem',
                color: '#000000',
                textDecoration: 'none',
                padding: '8px 12px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.15s ease',
              }}
            >
              <span>PROJECTS</span>
              <ArrowUpRight size={14} />
            </a>

            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontWeight: 800,
                fontSize: '0.92rem',
                color: '#ffffff',
                background: '#000000',
                textDecoration: 'none',
                padding: '10px 14px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '6px',
                border: '2px solid #000000',
                boxShadow: '2px 2px 0px #000000',
                transition: 'all 0.15s ease',
              }}
            >
              LET&apos;S CONNECT
            </a>
          </div>
        )}
      </div>

      <style jsx>{`
        .menu-link-item:hover {
          background: #edeef2;
          transform: translateX(3px);
        }

        @keyframes menuDrop {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .navbar-desktop-nav {
          display: flex;
          align-items: center;
          gap: 8px;
          pointer-events: auto;
          margin-top: 2px;
        }

        .navbar-desktop-link {
          font-family: var(--font-poppins), sans-serif;
          font-weight: 700;
          font-size: 0.78rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #000000;
          text-decoration: none;
          background: #ffffff;
          border: 2px solid #000000;
          border-radius: 8px;
          padding: 10px 16px;
          box-shadow: 2px 2px 0px #000000;
          transition: all 0.15s ease;
        }

        .navbar-desktop-link:hover {
          background: #aef324;
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0px #000000;
        }

        /* hamburger only where the nav does not fit */
        @media (min-width: 1024px) {
          .navbar-hamburger {
            display: none;
          }
        }

        @media (max-width: 1023px) {
          .navbar-desktop-nav {
            display: none;
          }
        }

        @media (max-width: 640px) {
          header {
            padding: 14px 16px !important;
          }
        }
      `}</style>
    </header>
  );
}
