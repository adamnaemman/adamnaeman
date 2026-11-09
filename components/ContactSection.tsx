'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  MapPin, 
  Sparkles, 
  Github, 
  ArrowUpRight, 
  Copy, 
  Check, 
  Clock, 
  Radio,
  Linkedin
} from 'lucide-react';

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('0damkim254@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section 
      id="contact" 
      className="contact-section-container"
      style={{ 
        position: 'relative',
        width: '100%',
        minHeight: '80vh',
        background: '#f8f8fb',
        borderTop: '2px solid #000000',
        padding: '90px 0 100px 0',
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
        {/* SECTION HEADER — FOLLOWS ABOUT ME & SKILLS EXACT TYPOGRAPHY        */}
        {/* ================================================================== */}
        <div style={{ textAlign: 'left', marginBottom: '40px' }}>
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
              Get In Touch & Collaborate
            </span>
          </div>

          {/* Headline in bold lowercase Poppins */}
          <h2
            className="contact-headline"
            style={{
              fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2.8rem, 5.8vw, 4.6rem)',
              color: '#000000',
              letterSpacing: '-0.035em',
              lineHeight: 1.02,
              margin: '0 0 18px 0',
              textTransform: 'lowercase',
            }}
          >
            let&apos;s connect
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-display), sans-serif',
              fontSize: '1.05rem',
              color: '#444444',
              maxWidth: '800px',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Have a project in mind, an architectural challenge to tackle, or looking to partner on full-stack web applications? My inbox is always open.
          </p>
        </div>

        {/* ================================================================== */}
        {/* TWO-COLUMN CONTACT LAYOUT (DETAILS + CONVERSATION LINKS)         */}
        {/* ================================================================== */}
        <div 
          className="contact-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.35fr',
            gap: '32px',
            alignItems: 'start',
          }}
        >
          {/* ================================================================ */}
          {/* LEFT COLUMN: CONTACT DETAILS & AVAILABILITY                      */}
          {/* ================================================================ */}
          <div
            style={{
              background: '#ffffff',
              border: '2px solid #000000',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '4px 4px 0px #000000',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <div>
              {/* Card Subheading */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  marginBottom: '20px',
                  paddingBottom: '12px',
                  borderBottom: '2px solid #000000',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-poppins)',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: '#000000',
                  }}
                >
                  Contact Details
                </span>

                {/* Live Availability Badge */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    background: '#edeef2',
                    border: '1px solid #000000',
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-poppins)',
                    fontWeight: 700,
                  }}
                >
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: '#10b981',
                      boxShadow: '0 0 6px #10b981',
                      display: 'inline-block',
                    }}
                  />
                  <span>OPEN FOR WORK</span>
                </div>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-poppins)',
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: '#000000',
                  letterSpacing: '-0.02em',
                  marginBottom: '12px',
                }}
              >
                Reach Out Directly
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.92rem',
                  color: '#555555',
                  lineHeight: 1.6,
                  marginBottom: '28px',
                }}
              >
                Direct messages land in my inbox at 0damkim254@gmail.com — open to internships, collaborations and freelance builds. I usually reply within 24 hours.
              </p>

              {/* Contact Information Blocks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                {/* Email Box */}
                <div
                  className="contact-email-box"
                  style={{
                    background: '#f8f8fb',
                    border: '1.5px solid #000000',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: '1 1 auto' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '8px',
                        background: '#edeef2',
                        border: '1.5px solid #000000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Mail size={18} color="#000000" />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          color: '#666666',
                          textTransform: 'uppercase',
                        }}
                      >
                        Email
                      </div>
                      <a
                        href="mailto:0damkim254@gmail.com"
                        style={{
                          fontFamily: 'var(--font-poppins)',
                          fontSize: '0.92rem',
                          fontWeight: 700,
                          color: '#000000',
                          textDecoration: 'none',
                          display: 'block',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        0damkim254@gmail.com
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="contact-copy-btn"
                    title="Copy Email Address"
                    style={{
                      padding: '8px 12px',
                      borderRadius: '6px',
                      background: copiedEmail ? '#000000' : '#ffffff',
                      color: copiedEmail ? '#ffffff' : '#000000',
                      border: '1.5px solid #000000',
                      fontFamily: 'var(--font-poppins)',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      transition: 'all 0.15s ease',
                      flexShrink: 0,
                    }}
                  >
                    {copiedEmail ? (
                      <>
                        <Check size={13} />
                        <span>COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Location Box */}
                <div
                  style={{
                    background: '#f8f8fb',
                    border: '1.5px solid #000000',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '8px',
                      background: '#edeef2',
                      border: '1.5px solid #000000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={18} color="#000000" />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        color: '#666666',
                        textTransform: 'uppercase',
                      }}
                    >
                      Location Base
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-poppins)',
                        fontSize: '0.92rem',
                        fontWeight: 700,
                        color: '#000000',
                      }}
                    >
                      Malaysia // Remote friendly
                    </div>
                  </div>
                </div>

                {/* SLA Box */}
                <div
                  style={{
                    background: '#f8f8fb',
                    border: '1.5px solid #000000',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '8px',
                      background: '#edeef2',
                      border: '1.5px solid #000000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Clock size={18} color="#000000" />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        color: '#666666',
                        textTransform: 'uppercase',
                      }}
                    >
                      Response Turnaround
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-poppins)',
                        fontSize: '0.92rem',
                        fontWeight: 700,
                        color: '#000000',
                      }}
                    >
                      Usually within 24 hours
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social / Ecosystem Profiles */}
            <div style={{ paddingTop: '20px', borderTop: '1.5px dashed #000000' }}>
              <div
                style={{
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  color: '#666666',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}
              >
                Verified Ecosystem Links:
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <a
                  href="https://github.com/adamnaemman"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-pill-link"
                >
                  <Github size={14} />
                  <span>GITHUB</span>
                  <ArrowUpRight size={12} />
                </a>
                <a
                  href="https://www.linkedin.com/in/adam-naeman/"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-pill-link"
                >
                  <Linkedin size={14} />
                  <span>LINKEDIN</span>
                  <ArrowUpRight size={12} />
                </a>
                <a
                  href="https://adamnaeman.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-pill-link"
                >
                  <span>▲ VERCEL</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>

          {/* ================================================================ */}
          {/* RIGHT COLUMN: DIRECT CONTACT LINKS                              */}
          {/* ================================================================ */}
          <div
            style={{
              background: '#ffffff',
              border: '2px solid #000000',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '4px 4px 0px #000000',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                marginBottom: '20px',
                paddingBottom: '12px',
                borderBottom: '2px solid #000000',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-poppins)',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#000000',
                }}
              >
                Start a Conversation
              </span>

              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: '#666666',
                }}
              >
                [ NO FORM NEEDED ]
              </span>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.98rem',
                lineHeight: 1.7,
                color: '#444444',
                marginBottom: '22px',
              }}
            >
              No form, no queue. Pick a channel and the message lands straight where I actually read it.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href="https://www.linkedin.com/in/adam-naeman/"
                target="_blank"
                rel="noreferrer"
                className="about-btn-primary"
                style={{
                  padding: '14px 24px',
                  fontSize: '0.9rem',
                  justifyContent: 'center',
                  textDecoration: 'none',
                }}
              >
                <Linkedin size={16} />
                <span>CONNECT ON LINKEDIN</span>
              </a>

              <a
                href="https://github.com/adamnaemman"
                target="_blank"
                rel="noreferrer"
                className="about-btn-secondary"
                style={{
                  padding: '14px 24px',
                  fontSize: '0.9rem',
                  justifyContent: 'center',
                  textDecoration: 'none',
                }}
              >
                <Github size={16} />
                <span>SEE CODE ON GITHUB</span>
              </a>
            </div>

            <div
              style={{
                marginTop: '22px',
                paddingTop: '16px',
                borderTop: '1.5px dashed #000000',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: '#666666',
                lineHeight: 1.6,
              }}
            >
              [ OPEN TO INTERNSHIP &amp; COLLABORATION ]
            </div>
          </div>
        </div>
      </div>

      {/* Scoped CSS Styles */}
      <style jsx>{`
        .clean-form-input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 8px;
          border: 1.8px solid #000000;
          background: #f8f8fb;
          font-family: var(--font-display), sans-serif;
          font-size: 0.92rem;
          color: #000000;
          outline: none;
          transition: all 0.16s ease;
        }

        .clean-form-input:focus {
          background: #ffffff;
          box-shadow: 2px 2px 0px #000000;
        }

        .clean-form-textarea {
          width: 100%;
          padding: 12px 14px;
          border-radius: 8px;
          border: 1.8px solid #000000;
          background: #f8f8fb;
          font-family: var(--font-display), sans-serif;
          font-size: 0.92rem;
          color: #000000;
          outline: none;
          resize: vertical;
          transition: all 0.16s ease;
        }

        .clean-form-textarea:focus {
          background: #ffffff;
          box-shadow: 2px 2px 0px #000000;
        }

        .contact-pill-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: var(--radius-full);
          background: #f8f8fb;
          border: 1.2px solid #000000;
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.74rem;
          font-weight: 700;
          color: #000000;
          text-decoration: none;
          transition: all 0.15s ease;
        }

        .contact-pill-link:hover {
          background: #edeef2;
          transform: translateY(-2px);
          box-shadow: 2px 2px 0px #000000;
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
        @media (max-width: 960px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }

        @media (max-width: 640px) {
          .contact-section-container {
            padding: 60px 0 !important;
          }
          .contact-headline {
            font-size: clamp(2.2rem, 8vw, 3rem) !important;
          }
          .responsive-form-grid {
            grid-template-columns: 1fr !important;
          }
          .contact-grid > div {
            padding: 22px 16px !important;
          }
        }

        @media (max-width: 380px) {
          .contact-section-container {
            padding: 50px 0 !important;
          }
          .contact-headline {
            font-size: 2rem !important;
          }
          .contact-email-box {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 10px !important;
          }
          .contact-copy-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
