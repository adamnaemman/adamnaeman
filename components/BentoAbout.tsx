'use client';

import React from 'react';
import { Database, Code2, Cpu, Globe, CheckCircle2, Terminal, Sparkles, Server, Zap, Flame, Trophy } from 'lucide-react';
import { SKILL_CATEGORIES, EXPERIENCES, STATS } from '@/lib/data';

export default function BentoAbout() {
  return (
    <section id="arsenal" style={{ padding: '80px 0', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">// SKILLS, STACK & CAREER TIMELINE</span>
          <h2 className="section-title">
            Inside The <span className="gradient-text">Creative Machine</span>
          </h2>
          <p className="section-subtitle">
            Bridging hyper-expressive frontends with bulletproof PostgreSQL architectures powered by Supabase and deployed at edge speed on Vercel.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid">
          
          {/* Card 1: Core Philosophy & Bio (span 7) */}
          <div className="bento-col-7">
            <div
              className="brutal-card"
              style={{
                padding: '36px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div className="sticker-tape">
                ENGINEERING PROFILE
              </div>

              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'var(--pop-yellow)',
                    color: 'var(--ink-black)',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    border: '2px solid var(--ink-black)',
                    marginBottom: '16px',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-pixel)',
                    fontWeight: 700,
                  }}
                >
                  <Code2 size={16} />
                  <span>FULL STACK CRAFTSMAN</span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-bubble)',
                    fontSize: '1.9rem',
                    marginBottom: '14px',
                    lineHeight: 1.2,
                  }}
                >
                  Building high-voltage web apps that conquer scale.
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '16px' }}>
                  I specialize in modern web architectures—focusing on end-to-end type safety, serverless edge computing, real-time Supabase database synchronization, and delightful tactile micro-interactions.
                </p>
                <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.05rem', lineHeight: 1.6 }}>
                  Whether developing full-stack platforms, real-time collaboration tools, or ultra-expressive visual portfolios, I guarantee codebases that are robust, maintainable, and built for production.
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '28px',
                  flexWrap: 'wrap',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    background: 'var(--bg-acid)',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    border: '2px solid var(--ink-black)',
                    boxShadow: '2px 2px 0px var(--ink-black)',
                  }}
                >
                  <Zap size={15} color="#08090c" /> Clean Architecture
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    background: 'var(--pop-yellow)',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    border: '2px solid var(--ink-black)',
                    boxShadow: '2px 2px 0px var(--ink-black)',
                  }}
                >
                  <Database size={15} color="#08090c" /> Realtime Databases
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    background: 'var(--pop-cyan)',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    border: '2px solid var(--ink-black)',
                    boxShadow: '2px 2px 0px var(--ink-black)',
                  }}
                >
                  <Globe size={15} color="#08090c" /> Edge-Ready Deployment
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Metrics & Trophy Stats (span 5) */}
          <div className="bento-col-5">
            <div
              className="brutal-card"
              style={{
                padding: '32px',
                height: '100%',
                background: 'var(--pop-yellow)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div className="sticker-tape sticker-tape-pink">
                PROVEN METRICS
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <Trophy size={20} color="var(--ink-black)" />
                  <h4 style={{ fontFamily: 'var(--font-bubble)', fontSize: '1.35rem' }}>IMPACT & STATS</h4>
                </div>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '24px' }}>
                  Quantified milestones across production deployments and active database architectures:
                </p>
              </div>

              {/* 4 Stat Boxes */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 120px), 1fr))', gap: 'clamp(10px, 2vw, 16px)' }}>
                {STATS.map((stat, sIdx) => (
                  <div
                    key={sIdx}
                    style={{
                      background: '#ffffff',
                      border: '2.5px solid var(--ink-black)',
                      borderRadius: 'var(--radius-md)',
                      padding: '16px',
                      boxShadow: '3px 3px 0px var(--ink-black)',
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-bubble)',
                        fontSize: '2.2rem',
                        color: sIdx % 2 === 0 ? 'var(--pop-pink)' : 'var(--pop-blue)',
                        lineHeight: 1.1,
                        marginBottom: '4px',
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-pixel)',
                        fontSize: '0.65rem',
                        color: 'var(--ink-black)',
                        fontWeight: 700,
                      }}
                    >
                      {stat.label.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Skills Matrix (span 6) */}
          <div id="background" className="bento-col-6">
            <div
              className="brutal-card"
              style={{
                padding: '32px',
                height: '100%',
              }}
            >
              <div className="sticker-tape">
                TECH ARSENAL
              </div>

              <h4 style={{ fontFamily: 'var(--font-bubble)', fontSize: '1.4rem', marginBottom: '20px' }}>
                SUPERCHARGED TECH STACK
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {SKILL_CATEGORIES.map((cat, cIdx) => (
                  <div key={cIdx}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        marginBottom: '10px',
                        color: 'var(--ink-black)',
                      }}
                    >
                      <span>{cat.title.toUpperCase()}</span>
                      <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.7rem', color: 'var(--pop-pink)' }}>
                        TIER 01
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {cat.skills.map((skill, skIdx) => (
                        <div
                          key={skIdx}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: '#f8fafc',
                            border: '2px solid var(--ink-black)',
                            borderRadius: 'var(--radius-md)',
                            padding: '6px 12px',
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            boxShadow: '2px 2px 0px var(--ink-black)',
                          }}
                        >
                          <span>{skill.name}</span>
                          <span
                            style={{
                              background: 'var(--pop-yellow)',
                              border: '1px solid #000',
                              borderRadius: '4px',
                              padding: '1px 5px',
                              fontSize: '0.7rem',
                              fontFamily: 'var(--font-pixel)',
                            }}
                          >
                            {skill.level}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 4: Career & Experience (span 6) */}
          <div id="experience" className="bento-col-6">
            <div
              className="brutal-card"
              style={{
                padding: '32px',
                height: '100%',
              }}
            >
              <div className="sticker-tape sticker-tape-pink">
                EXP ROADMAP
              </div>

              <h4 style={{ fontFamily: 'var(--font-bubble)', fontSize: '1.4rem', marginBottom: '20px' }}>
                CAREER TIMELINE
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {EXPERIENCES.map((exp, eIdx) => (
                  <div
                    key={eIdx}
                    style={{
                      borderLeft: '4px solid var(--pop-pink)',
                      paddingLeft: '16px',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        display: 'inline-block',
                        background: 'var(--pop-yellow)',
                        border: '1.5px solid var(--ink-black)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '2px 8px',
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-pixel)',
                        fontWeight: 700,
                        marginBottom: '6px',
                      }}
                    >
                      {exp.period}
                    </div>

                    <h5
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.15rem',
                        fontWeight: 800,
                        color: 'var(--ink-black)',
                        marginBottom: '2px',
                      }}
                    >
                      {exp.role}
                    </h5>

                    <div
                      style={{
                        fontSize: '0.85rem',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        color: 'var(--pop-blue)',
                        marginBottom: '8px',
                      }}
                    >
                      @ {exp.company}
                    </div>

                    <p
                      style={{
                        fontSize: '0.9rem',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5,
                        marginBottom: '10px',
                      }}
                    >
                      {exp.description}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {exp.tags.map((t, tIdx) => (
                        <span key={tIdx} className="tag-pill" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
