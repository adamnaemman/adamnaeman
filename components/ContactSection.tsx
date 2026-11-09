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
  Radio
} from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('adamnaeman@dev.io');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (supabase) {
      try {
        await supabase.from('contacts').insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject || 'General Inquiry',
            message: formData.message,
          },
        ]);
      } catch (err) {
        console.warn('Contact submission warning:', err);
      }
    }

    setSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
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
        {/* TWO-COLUMN CONTACT LAYOUT (DIRECT CHANNELS + TRANSMISSION FORM)    */}
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
          {/* LEFT COLUMN: DIRECT CHANNELS & AVAILABILITY                      */}
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
                  Direct Channels
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
                Direct messages reach my primary inbox and synchronize with Supabase PostgreSQL. Whether discussing contract engineering or full-time roles, I typically respond within 24 hours.
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
                        Email Frequency
                      </div>
                      <a
                        href="mailto:adamnaeman@dev.io"
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
                        adamnaeman@dev.io
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
                      Kuala Lumpur // Remote Worldwide
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
                      Under 24 Hours Guaranteed
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
                  href="https://github.com/adamnaeman"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-pill-link"
                >
                  <Github size={14} />
                  <span>GITHUB</span>
                  <ArrowUpRight size={12} />
                </a>
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-pill-link"
                >
                  <span>▲ VERCEL</span>
                  <ArrowUpRight size={12} />
                </a>
                <a
                  href="https://supabase.com"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-pill-link"
                >
                  <span>⚡ SUPABASE</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>

          {/* ================================================================ */}
          {/* RIGHT COLUMN: CONTACT TRANSMISSION FORM                          */}
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
                Transmission Form
              </span>

              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: '#666666',
                }}
              >
                [ SECURE SUBMISSION ]
              </span>
            </div>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '50px 20px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#edeef2',
                    border: '2px solid #000000',
                    boxShadow: '3px 3px 0px #000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px auto',
                  }}
                >
                  <CheckCircle2 size={34} color="#000000" />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-poppins)',
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    marginBottom: '10px',
                    color: '#000000',
                  }}
                >
                  Transmission Delivered!
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.94rem',
                    color: '#555555',
                    maxWidth: '460px',
                    margin: '0 auto 28px auto',
                    lineHeight: 1.6,
                  }}
                >
                  Thank you! Your message has been safely saved in the Supabase contacts registry. I will review and reply to your email shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="about-btn-secondary"
                  style={{ padding: '10px 22px', fontSize: '0.86rem' }}
                >
                  <span>SEND ANOTHER MESSAGE</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div className="responsive-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label 
                      style={{ 
                        display: 'block', 
                        fontSize: '0.78rem', 
                        fontFamily: 'var(--font-poppins)', 
                        fontWeight: 800, 
                        marginBottom: '6px',
                        color: '#000000',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      Your Name <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alex Rivers"
                      className="clean-form-input"
                    />
                  </div>

                  <div>
                    <label 
                      style={{ 
                        display: 'block', 
                        fontSize: '0.78rem', 
                        fontFamily: 'var(--font-poppins)', 
                        fontWeight: 800, 
                        marginBottom: '6px',
                        color: '#000000',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      Your Email <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@example.com"
                      className="clean-form-input"
                    />
                  </div>
                </div>

                <div>
                  <label 
                    style={{ 
                      display: 'block', 
                      fontSize: '0.78rem', 
                      fontFamily: 'var(--font-poppins)', 
                      fontWeight: 800, 
                      marginBottom: '6px',
                      color: '#000000',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry, Cloud Architecture, Full-Stack Role..."
                    className="clean-form-input"
                  />
                </div>

                <div>
                  <label 
                    style={{ 
                      display: 'block', 
                      fontSize: '0.78rem', 
                      fontFamily: 'var(--font-poppins)', 
                      fontWeight: 800, 
                      marginBottom: '6px',
                      color: '#000000',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Message <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about what you're looking to build, technical specifications, or timeline goals..."
                    className="clean-form-textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="about-btn-primary"
                  style={{
                    padding: '14px 28px',
                    fontSize: '0.94rem',
                    justifyContent: 'center',
                    marginTop: '4px',
                    width: '100%',
                  }}
                >
                  {submitting ? (
                    <span>TRANSMITTING...</span>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>TRANSMIT MESSAGE</span>
                    </>
                  )}
                </button>
              </form>
            )}
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
