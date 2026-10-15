'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  GraduationCap, 
  Briefcase, 
  Award, 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  MapPin, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Zap,
  Terminal,
  ExternalLink
} from 'lucide-react';

interface TimelineItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  badge: string;
  description: string;
  achievements: string[];
  techStack: string[];
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  verificationBadge: string;
  description: string;
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 'timeline-1',
    period: '2024 — PRESENT',
    role: 'Lead Full Stack & Cloud Developer',
    company: 'Independent Creative Labs & Digital Ventures',
    location: 'Kuala Lumpur // Remote Worldwide',
    badge: 'ACTIVE ROLE',
    description: 'Spearheading end-to-end web architectures, high-performance edge applications, and real-time database backends engineered for massive concurrency.',
    achievements: [
      'Architected edge-first Next.js 14 applications achieving sub-second Largest Contentful Paint (LCP) globally.',
      'Engineered real-time collaboration backends with Supabase, PostgreSQL Row-Level Security, and WebSocket event channels.',
      'Designed interactive 2.5D WebGL and tactile UI systems that increased user session duration by over 65%.'
    ],
    techStack: ['Next.js 14', 'TypeScript', 'Supabase', 'PostgreSQL', 'Google Cloud Platform', 'Tailwind CSS']
  },
  {
    id: 'timeline-2',
    period: '2023 — 2024',
    role: 'Cloud Infrastructure & Backend Engineer',
    company: 'CloudScale Technologies',
    location: 'Hybrid / Remote',
    badge: 'SYSTEMS SCALE',
    description: 'Designed high-throughput REST and GraphQL APIs, streamlined microservice deployment workflows, and optimized cloud database queries.',
    achievements: [
      'Refactored relational query paths and implemented Redis caching, reducing p95 API response times by 42%.',
      'Configured containerized deployments on Google Cloud Run with automated GitHub Actions CI/CD pipelines.',
      'Maintained 99.98% production uptime SLA across critical customer-facing service endpoints.'
    ],
    techStack: ['Node.js', 'Docker', 'PostgreSQL', 'Redis', 'Google Cloud Run', 'GitHub Actions']
  },
  {
    id: 'timeline-3',
    period: '2022 — 2023',
    role: 'Frontend & UI Systems Developer',
    company: 'Digital Innovation Studios',
    location: 'Kuala Lumpur',
    badge: 'DESIGN SYSTEMS',
    description: 'Built modular component libraries, accessible web interfaces, and fluid micro-interactions for modern web platforms.',
    achievements: [
      'Engineered a centralized component design system adopted across 6 client enterprise web applications.',
      'Integrated Web Audio API and tactile sound synthesis for novel interactive product experiences.',
      'Audited and elevated WCAG 2.1 AA accessibility compliance across core client landing portals.'
    ],
    techStack: ['React', 'TypeScript', 'CSS Architecture', 'Framer Motion', 'Web Audio API']
  },
  {
    id: 'timeline-4',
    period: '2021 — 2022',
    role: 'Systems Explorer & Open Source Contributor',
    company: 'Self-Directed & Open Source',
    location: 'Autonomous',
    badge: 'FOUNDATIONS',
    description: 'Immersed in low-level systems programming, Linux terminal environments, database design theory, and experimental web graphics.',
    achievements: [
      'Built developer utility scripts in Bash and Node.js for automated local workspace orchestration.',
      'Deepened mastery of algorithms, time-complexity analysis, and distributed systems architecture.'
    ],
    techStack: ['JavaScript', 'Bash / Shell', 'Git', 'SQL Internals', 'Linux Environments']
  }
];

const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: 'cert-1',
    name: 'Google Cloud Platform — Architecture & Engineering',
    issuer: 'Google Cloud Certified Foundations',
    date: '2024',
    verificationBadge: 'VERIFIED CREDENTIAL',
    description: 'Mastery of Cloud Run serverless microservices, BigQuery analytics, IAM security protocols, and resilient infrastructure deployment.'
  },
  {
    id: 'cert-2',
    name: 'Enterprise TypeScript & Software Architecture',
    issuer: 'Advanced Systems Academy',
    date: '2023',
    verificationBadge: 'VERIFIED CREDENTIAL',
    description: 'Strict type contracts, generics meta-programming, API schema sharing, and zero-any production standards.'
  },
  {
    id: 'cert-3',
    name: 'High-Performance PostgreSQL & Database Engineering',
    issuer: 'Database Systems Group',
    date: '2023',
    verificationBadge: 'VERIFIED CREDENTIAL',
    description: 'Relational schema normalization, index strategies, transaction isolation levels, and Row-Level Security (RLS).'
  },
  {
    id: 'cert-4',
    name: 'Next.js Production Architecture & Server Components',
    issuer: 'Vercel Ecosystem Labs',
    date: '2024',
    verificationBadge: 'VERIFIED CREDENTIAL',
    description: 'React Server Components (RSC), edge middleware caching, streaming SSR, and incremental static revalidation (ISR).'
  }
];

const STATS_DATA = [
  { value: '4+', label: 'Years Engineering Systems', subtext: 'From algorithms to edge cloud' },
  { value: '30+', label: 'Production Deploys', subtext: 'Zero-regression track record' },
  { value: '99.98%', label: 'Uptime Reliability SLA', subtext: 'Engineered for resilience' },
  { value: '100%', label: 'Strict Type Safety', subtext: 'Zero-any codebase standard' },
];

export default function BackgroundSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'career' | 'education' | 'philosophy'>('all');

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="background"
      className="background-section-container"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: '#ffffff',
        borderTop: '2px solid #000000',
        borderBottom: '2px solid #000000',
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
        <div style={{ textAlign: 'left', marginBottom: '36px' }}>
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
              Career & Academic Journey
            </span>
          </div>

          {/* Headline in bold lowercase Poppins */}
          <h2
            className="background-headline"
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
            background & journey
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-display), sans-serif',
              fontSize: '1.05rem',
              color: '#444444',
              maxWidth: '820px',
              lineHeight: 1.6,
              margin: '0 0 28px 0',
            }}
          >
            A chronological timeline of engineering milestones, formal academic grounding in computer science, and the foundational principles that shape how I build resilient cloud platforms and tactile digital software.
          </p>

          {/* Interactive Filter Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <button
              onClick={() => setActiveTab('all')}
              className={`bg-filter-pill ${activeTab === 'all' ? 'active' : ''}`}
            >
              [ ALL OVERVIEW ]
            </button>
            <button
              onClick={() => setActiveTab('career')}
              className={`bg-filter-pill ${activeTab === 'career' ? 'active' : ''}`}
            >
              <Briefcase size={13} />
              <span>CAREER TIMELINE</span>
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`bg-filter-pill ${activeTab === 'education' ? 'active' : ''}`}
            >
              <GraduationCap size={14} />
              <span>ACADEMIC & CERTS</span>
            </button>
            <button
              onClick={() => setActiveTab('philosophy')}
              className={`bg-filter-pill ${activeTab === 'philosophy' ? 'active' : ''}`}
            >
              <Cpu size={13} />
              <span>ENGINEERING PILLARS</span>
            </button>
          </div>
        </div>

        {/* ================================================================== */}
        {/* KEY METRICS STAT BAR                                               */}
        {/* ================================================================== */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '16px',
            marginBottom: '46px',
          }}
        >
          {STATS_DATA.map((stat, i) => (
            <div
              key={i}
              className="bg-stat-card"
              style={{
                background: '#f8f8fb',
                border: '2px solid #000000',
                borderRadius: '12px',
                padding: '20px 22px',
                boxShadow: '3px 3px 0px #000000',
                transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: 'clamp(2rem, 3.2vw, 2.6rem)',
                  fontWeight: 900,
                  color: '#000000',
                  lineHeight: 1,
                  marginBottom: '6px',
                  letterSpacing: '-0.03em',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  color: '#000000',
                  marginBottom: '3px',
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display), sans-serif',
                  fontSize: '0.78rem',
                  color: '#666666',
                  fontWeight: 500,
                }}
              >
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>

        {/* ================================================================== */}
        {/* MAIN BACKGROUND SECTIONS: TIMELINE & ACADEMIC GRID                 */}
        {/* ================================================================== */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: activeTab === 'all' ? '1.45fr 1fr' : '1fr',
            gap: '32px',
            alignItems: 'start',
          }}
          className="bg-main-grid"
        >
          {/* ================================================================ */}
          {/* COLUMN 1: CAREER TIMELINE & PROFESSIONAL ROLES                   */}
          {/* ================================================================ */}
          {(activeTab === 'all' || activeTab === 'career') && (
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '20px',
                  paddingBottom: '10px',
                  borderBottom: '2px solid #000000',
                }}
              >
                <Briefcase size={20} color="#000000" />
                <h3
                  style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: '#000000',
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    margin: 0,
                  }}
                >
                  Professional Experience Timeline
                </h3>
              </div>

              {/* Timeline Cards Stack */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                {TIMELINE_DATA.map((item, index) => (
                  <div
                    key={item.id}
                    className="timeline-card"
                    style={{
                      background: '#ffffff',
                      border: '2px solid #000000',
                      borderRadius: '14px',
                      padding: '24px',
                      boxShadow: '4px 4px 0px #000000',
                      position: 'relative',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {/* Header meta */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                        marginBottom: '12px',
                      }}
                    >
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.76rem',
                          fontWeight: 700,
                          color: '#000000',
                          background: '#edeef2',
                          padding: '3px 10px',
                          borderRadius: '6px',
                          border: '1.2px solid #000000',
                        }}
                      >
                        <Calendar size={12} />
                        <span>{item.period}</span>
                      </div>

                      <div
                        style={{
                          fontFamily: 'var(--font-poppins), sans-serif',
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          letterSpacing: '0.04em',
                          color: index === 0 ? '#000000' : '#444444',
                          background: index === 0 ? '#b6ff1a' : '#f5f5f8',
                          padding: '3px 10px',
                          borderRadius: 'var(--radius-full)',
                          border: '1.2px solid #000000',
                        }}
                      >
                        {item.badge}
                      </div>
                    </div>

                    {/* Role & Company */}
                    <h4
                      style={{
                        fontFamily: 'var(--font-poppins), sans-serif',
                        fontSize: '1.2rem',
                        fontWeight: 800,
                        color: '#000000',
                        marginBottom: '4px',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {item.role}
                    </h4>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: '#444444',
                        marginBottom: '14px',
                      }}
                    >
                      <span>{item.company}</span>
                      <span style={{ color: '#888888' }}>•</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '0.8rem', color: '#666666' }}>
                        <MapPin size={12} />
                        {item.location}
                      </span>
                    </div>

                    {/* Description */}
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.94rem',
                        lineHeight: 1.6,
                        color: '#222222',
                        marginBottom: '14px',
                      }}
                    >
                      {item.description}
                    </p>

                    {/* Key Deliverables */}
                    <div style={{ marginBottom: '16px' }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-poppins)',
                          fontSize: '0.74rem',
                          fontWeight: 800,
                          color: '#000000',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          marginBottom: '8px',
                        }}
                      >
                        Key Highlights & Engineering Deliverables:
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {item.achievements.map((ach, achIndex) => (
                          <div
                            key={achIndex}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '8px',
                              fontSize: '0.86rem',
                              fontFamily: 'var(--font-display)',
                              lineHeight: 1.5,
                              color: '#333333',
                            }}
                          >
                            <CheckCircle2 size={15} color="#000000" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech stack tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {item.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            background: '#f8f8fb',
                            color: '#000000',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            border: '1px solid #000000',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* COLUMN 2: ACADEMIC FOUNDATION, CERTS & PHILOSOPHY                */}
          {/* ================================================================ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Academic Pedigree Card */}
            {(activeTab === 'all' || activeTab === 'education') && (
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '20px',
                    paddingBottom: '10px',
                    borderBottom: '2px solid #000000',
                  }}
                >
                  <GraduationCap size={20} color="#000000" />
                  <h3
                    style={{
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: '#000000',
                      letterSpacing: '-0.02em',
                      textTransform: 'uppercase',
                      margin: 0,
                    }}
                  >
                    Academic Foundation
                  </h3>
                </div>

                <div
                  className="academic-card"
                  style={{
                    background: '#edeef2',
                    border: '2px solid #000000',
                    borderRadius: '14px',
                    padding: '26px',
                    boxShadow: '4px 4px 0px #000000',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-full)',
                      background: '#ffffff',
                      border: '1.2px solid #000000',
                      fontFamily: 'var(--font-poppins)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      marginBottom: '12px',
                    }}
                  >
                    <Award size={13} color="#000000" />
                    <span>FIRST CLASS HONORS // DEAN&apos;S LIST</span>
                  </div>

                  <h4
                    style={{
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: '#000000',
                      marginBottom: '4px',
                      lineHeight: 1.25,
                    }}
                  >
                    B.S. in Computer Science & Cloud Systems
                  </h4>

                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      color: '#444444',
                      marginBottom: '16px',
                    }}
                  >
                    Faculty of Computing & Informatics
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      color: '#333333',
                      marginBottom: '18px',
                    }}
                  >
                    Rigorous formal coursework in software theory, low-level system design, algorithm analysis, and distributed network engineering. Graduated top-tier with research focus in high-throughput cloud web runtimes.
                  </p>

                  <div
                    style={{
                      fontFamily: 'var(--font-poppins)',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '8px',
                      color: '#000000',
                    }}
                  >
                    Key Coursework & Competencies:
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {[
                      'Distributed Systems Architecture',
                      'Relational Database Internals',
                      'Data Structures & Algorithms',
                      'Operating Systems & Networking',
                      'Microservices & Cloud Infrastructure',
                      'Software Security & Cryptography'
                    ].map((course, cIdx) => (
                      <span
                        key={cIdx}
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          background: '#ffffff',
                          color: '#000000',
                          padding: '4px 9px',
                          borderRadius: '6px',
                          border: '1px solid #000000',
                        }}
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Certifications & Industry Accreditations */}
            {(activeTab === 'all' || activeTab === 'education') && (
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '20px',
                    paddingBottom: '10px',
                    borderBottom: '2px solid #000000',
                  }}
                >
                  <ShieldCheck size={20} color="#000000" />
                  <h3
                    style={{
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: '#000000',
                      letterSpacing: '-0.02em',
                      textTransform: 'uppercase',
                      margin: 0,
                    }}
                  >
                    Industry Certifications & Credentials
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {CERTIFICATIONS_DATA.map((cert) => (
                    <div
                      key={cert.id}
                      className="cert-card"
                      style={{
                        background: '#ffffff',
                        border: '2px solid #000000',
                        borderRadius: '12px',
                        padding: '18px 20px',
                        boxShadow: '3px 3px 0px #000000',
                        transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '8px',
                          marginBottom: '6px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            background: '#edeef2',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            border: '1px solid #000000',
                            letterSpacing: '0.04em',
                          }}
                        >
                          {cert.verificationBadge}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            color: '#666666',
                          }}
                        >
                          {cert.date}
                        </span>
                      </div>

                      <h5
                        style={{
                          fontFamily: 'var(--font-poppins)',
                          fontSize: '0.98rem',
                          fontWeight: 800,
                          color: '#000000',
                          marginBottom: '3px',
                          lineHeight: 1.3,
                        }}
                      >
                        {cert.name}
                      </h5>

                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          color: '#555555',
                          marginBottom: '8px',
                        }}
                      >
                        {cert.issuer}
                      </div>

                      <p
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.84rem',
                          lineHeight: 1.5,
                          color: '#333333',
                          margin: 0,
                        }}
                      >
                        {cert.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Engineering Pillars & Craft Philosophy */}
            {(activeTab === 'all' || activeTab === 'philosophy') && (
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '20px',
                    paddingBottom: '10px',
                    borderBottom: '2px solid #000000',
                  }}
                >
                  <Cpu size={20} color="#000000" />
                  <h3
                    style={{
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: '#000000',
                      letterSpacing: '-0.02em',
                      textTransform: 'uppercase',
                      margin: 0,
                    }}
                  >
                    Engineering Principles
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div
                    style={{
                      background: '#f8f8fb',
                      border: '2px solid #000000',
                      borderRadius: '12px',
                      padding: '18px 20px',
                      boxShadow: '3px 3px 0px #000000',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <Zap size={16} color="#000000" />
                      <strong style={{ fontFamily: 'var(--font-poppins)', fontSize: '0.94rem' }}>
                        01. Edge-First Latency & Resilience
                      </strong>
                    </div>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.86rem', color: '#444444', lineHeight: 1.55, margin: 0 }}>
                      Code must run as close to the user as physical reality allows. Prioritize server components streaming HTML in milliseconds and edge API proxies that eliminate transatlantic round-trips.
                    </p>
                  </div>

                  <div
                    style={{
                      background: '#f8f8fb',
                      border: '2px solid #000000',
                      borderRadius: '12px',
                      padding: '18px 20px',
                      boxShadow: '3px 3px 0px #000000',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <Sparkles size={16} color="#000000" />
                      <strong style={{ fontFamily: 'var(--font-poppins)', fontSize: '0.94rem' }}>
                        02. Tactile, Expressive Delight
                      </strong>
                    </div>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.86rem', color: '#444444', lineHeight: 1.55, margin: 0 }}>
                      Web software should never feel sterile. By infusing mechanical keycap thocks, 2.5D physical depth, and playful brutalist styling, digital tools become joyful to interact with.
                    </p>
                  </div>

                  <div
                    style={{
                      background: '#f8f8fb',
                      border: '2px solid #000000',
                      borderRadius: '12px',
                      padding: '18px 20px',
                      boxShadow: '3px 3px 0px #000000',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <Layers size={16} color="#000000" />
                      <strong style={{ fontFamily: 'var(--font-poppins)', fontSize: '0.94rem' }}>
                        03. Strict End-to-End Type Contracts
                      </strong>
                    </div>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.86rem', color: '#444444', lineHeight: 1.55, margin: 0 }}>
                      From database schemas and Row-Level Security policies to edge API payloads and UI component states, strict typing eliminates entire classes of runtime errors before they hit production.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ================================================================== */}
        {/* BOTTOM SECTION HANDOFF BANNER -> SCROLLS TO SKILLS & EXPERIENCE    */}
        {/* ================================================================== */}
        <div
          style={{
            marginTop: '56px',
            background: '#edeef2',
            border: '2px solid #000000',
            borderRadius: '16px',
            padding: '28px 32px',
            boxShadow: '5px 5px 0px #000000',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-poppins)',
                fontSize: '0.74rem',
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#000000',
                marginBottom: '4px',
              }}
            >
              Ready to explore technical skills & projects?
            </div>
            <h4
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(1.2rem, 2.2vw, 1.55rem)',
                color: '#000000',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              Test the interactive skill macropad & workstation computers
            </h4>
          </div>

          <button
            onClick={() => scrollTo('experience')}
            className="about-btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 28px',
              fontSize: '0.92rem',
            }}
          >
            <span>launch skills & projects</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Styled Scoped CSS */}
      <style jsx>{`
        .bg-filter-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: var(--radius-full);
          background: #ffffff;
          border: 1.5px solid #000000;
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.74rem;
          font-weight: 800;
          color: #000000;
          cursor: pointer;
          transition: all 0.16s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bg-filter-pill:hover {
          background: #edeef2;
          transform: translateY(-2px);
          box-shadow: 2px 2px 0px #000000;
        }

        .bg-filter-pill.active {
          background: #000000;
          color: #ffffff;
          box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.3);
        }

        .bg-stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 5px 5px 0px #000000;
        }

        .timeline-card:hover {
          transform: translateY(-3px);
          box-shadow: 6px 6px 0px #000000;
        }

        .academic-card {
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .academic-card:hover {
          transform: translateY(-3px);
          box-shadow: 6px 6px 0px #000000;
        }

        .cert-card:hover {
          transform: translateY(-2px);
          box-shadow: 5px 5px 0px #000000;
          background: #f8f8fb;
        }

        /* Responsive Tablet & Mobile */
        @media (max-width: 960px) {
          .bg-main-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 640px) {
          .background-section-container {
            padding: 70px 0 !important;
          }
          .background-headline {
            font-size: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
