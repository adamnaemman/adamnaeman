'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ExternalLink, Github, Sparkles, X, ChevronRight, Layers, ArrowLeft, ArrowRight, Monitor, CheckCircle2 } from 'lucide-react';

import { PROJECTS as PROJECTS_DATA } from '@/lib/data';
import type { Project } from '@/lib/types';

type ProjectDetail = Project;

// ============================================================================
// COMPUTER TEMPLATE MOCKUP COMPONENT
// ============================================================================
function ComputerMockup({
  project,
  isMini = false,
  isHero = false,
  isActive = false,
  onClick,
}: {
  project: ProjectDetail;
  isMini?: boolean;
  isHero?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}) {
  const urlSlug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <div
      onClick={onClick}
      className={`computer-mockup-wrapper ${isMini ? 'mini' : ''} ${isHero ? 'hero' : ''} ${isActive ? 'active' : ''}`}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Laptop Lid / Screen Display */}
      <div className="laptop-lid">
        
        {/* Top Bezel Webcam Dot */}
        <div className="webcam-notch">
          <span className="camera-lens" />
        </div>

        {/* Display Screen */}
        <div className="screen-frame">
          
          {/* Simulated Browser Chrome Bar */}
          <div className="browser-chrome-bar">
            <div className="window-dots">
              <span className="dot dot-close" />
              <span className="dot dot-min" />
              <span className="dot dot-max" />
            </div>

            <div className="browser-url-pill">
              <span className="lock-icon">🔒</span>
              <span className="url-text">adamnaeman.vercel.app/{urlSlug}</span>
            </div>

            <div className="live-status-pill">
              <span className="status-dot" />
              <span>{project.status.toUpperCase()}</span>
            </div>
          </div>

          {/* Screen Content Viewport */}
          <div className="screen-viewport">
            <Image
              src={project.image_url}
              alt={project.title}
              fill
              sizes={isMini ? '280px' : isHero ? '800px' : '450px'}
              style={{ objectFit: 'cover' }}
              className="screen-img"
              priority={isHero}
            />
            
            {/* Subtle Screen Glare Overlay */}
            <div className="screen-glare-reflection" />

            {/* Screen Bottom Banner Overlay */}
            <div className="screen-bottom-banner">
              <span className="screen-project-title">{project.title}</span>
              <span className="screen-project-cat">{project.category}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Laptop Hinge */}
      <div className="laptop-hinge" />

      {/* Laptop Base / Keyboard Deck */}
      <div className="laptop-base">
        <div className="thumb-notch" />
      </div>
    </div>
  );
}

export interface ActiveSkillInfo {
  id: string;
  name: string;
  badge: string;
  quote?: string;
  experienceChapter?: string;
  experienceRole?: string;
  experienceDetails?: string;
  projectId?: string;
  renderIcon?: () => React.ReactNode;
}

interface ProjectsSectionProps {
  isOverlay?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  activeSkill?: ActiveSkillInfo | null;
}

// ============================================================================
// MAIN PROJECTS SECTION WITH HORIZONTAL & VERTICAL DUAL MODES
// Supports standalone section mode or popup overlay mode launched from Keyboard
// ============================================================================
export default function ProjectsSection({
  isOverlay = false,
  isOpen = true,
  onClose,
  activeSkill,
}: ProjectsSectionProps = {}) {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (scrollTrackRef.current) {
      const offset = direction === 'left' ? -540 : 540;
      scrollTrackRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const activeProject = activeProjectId
    ? PROJECTS_DATA.find((p) => p.id === activeProjectId) || PROJECTS_DATA[0]
    : null;

  // Body scroll lock when overlay is open
  useEffect(() => {
    if (isOverlay && isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOverlay, isOpen]);

  // When opened from a skill key, automatically scroll to matching project
  useEffect(() => {
    if (activeSkill?.projectId && scrollTrackRef.current) {
      const idx = PROJECTS_DATA.findIndex(p => p.id === activeSkill.projectId);
      if (idx !== -1) {
        scrollTrackRef.current.scrollTo({ left: idx * 490, behavior: 'smooth' });
      }
    }
  }, [activeSkill]);

  // Escape key handler: Level 2 (inspect) -> Level 1 (horizontal list) -> Level 0 (keyboard base)
  useEffect(() => {
    if (isOverlay && !isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeProjectId) {
          setActiveProjectId(null);
        } else if (isOverlay && onClose) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProjectId, isOverlay, isOpen, onClose]);

  if (isOverlay && !isOpen) return null;

  const sectionContent = (
    <div
      className={isOverlay ? "computers-overlay-inner-box" : "container"}
      style={isOverlay ? { width: '100%' } : {
        maxWidth: '1360px',
        margin: '0 auto',
        padding: '0 24px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* If Overlay Mode: Top Navigation Bar with Skill Details & Close Button */}
      {isOverlay && (
        <div className="overlay-top-nav-bar">
          {activeSkill ? (
            <div className="overlay-skill-active-pill">
              <div className="skill-pill-icon">
                {activeSkill.renderIcon ? activeSkill.renderIcon() : <Sparkles size={16} />}
              </div>
              <div className="skill-pill-meta">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="skill-pill-name">{activeSkill.name}</span>
                  <span className="skill-pill-badge">{activeSkill.badge}</span>
                </div>
                {activeSkill.quote && (
                  <span className="skill-pill-quote">&ldquo;{activeSkill.quote}&rdquo;</span>
                )}
              </div>
            </div>
          ) : (
            <div className="overlay-status-pill">
              <Monitor size={15} color="#000000" />
              <span>WORKSTATION COMPUTERS SHOWCASE</span>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {activeProjectId && (
              <button
                type="button"
                onClick={() => setActiveProjectId(null)}
                className="overlay-back-nav-btn"
                title="Return to horizontal computers"
              >
                <ArrowLeft size={14} />
                <span>ALL COMPUTERS</span>
              </button>
            )}

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="overlay-close-main-btn"
                title="Return to keyboard base (Esc)"
                aria-label="Close computers overlay"
              >
                <X size={16} strokeWidth={2.6} />
                <span>CLOSE TO KEYBOARD</span>
                <kbd className="esc-key-chip">ESC</kbd>
              </button>
            )}
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* SECTION HEADER                                                     */}
      {/* ================================================================== */}
      <div style={{ textAlign: 'center', marginBottom: isOverlay ? '30px' : '45px' }}>
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
            Interactive Computer Device Showcase
          </span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-poppins), "Poppins", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(2.8rem, 5.8vw, 4.6rem)',
            color: '#000000',
            letterSpacing: '-0.035em',
            lineHeight: 1.02,
            margin: '0 0 14px 0',
            textTransform: 'lowercase',
          }}
        >
          featured projects &amp; systems
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-poppins), sans-serif',
            fontSize: '1rem',
            color: '#555555',
            letterSpacing: '0.02em',
            margin: '0 0 20px 0',
          }}
        >
          {activeProject
            ? 'Inspecting selected project in high-fidelity overlay. Click any computer on the left to switch.'
            : '(hint: scroll horizontally to explore workstations — click any computer to inspect architecture)'}
        </p>

        {/* Return to Horizontal View Button if Active & not in Overlay */}
        {activeProject && !isOverlay && (
          <button
            onClick={() => setActiveProjectId(null)}
            className="view-toggle-btn"
            title="Return to horizontal computers list (Esc)"
          >
            <ArrowLeft size={15} />
            <span>RETURN TO HORIZONTAL OVERVIEW</span>
            <kbd style={{ background: '#000000', color: '#ffffff', padding: '1px 6px', borderRadius: '4px', fontSize: '0.65rem' }}>ESC</kbd>
          </button>
        )}
      </div>

      {/* ================================================================== */}
      {/* DUAL MODE CONTAINER: HORIZONTAL (DEFAULT) OR VERTICAL + OVERLAY    */}
      {/* ================================================================== */}
      {!activeProject ? (
        
        /* ================================================================ */
        /* 1. HORIZONTAL LIST BY DEFAULT                                    */
        /* ================================================================ */
        <div className="horizontal-computers-section">
          {/* Scroll Navigation Header Bar */}
          <div className="scroll-controls-bar">
            <div className="scroll-hint-pill">
              <span className="scroll-indicator-dot" />
              <span>HORIZONTAL WORKSTATIONS — SCROLL TO BROWSE ({PROJECTS_DATA.length} COMPUTERS)</span>
            </div>
            <div className="scroll-buttons-cluster">
              <button
                type="button"
                onClick={() => scrollByAmount('left')}
                className="scroll-btn"
                aria-label="Scroll left"
                title="Scroll left"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => scrollByAmount('right')}
                className="scroll-btn"
                aria-label="Scroll right"
                title="Scroll right"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Horizontal Scroll Track: Standalone Computer Templates (NO Cards) */}
          <div
            ref={scrollTrackRef}
            className="horizontal-computers-scroll-track"
          >
            {PROJECTS_DATA.map((project, index) => {
              const isMatchingSkill = activeSkill?.projectId === project.id || (activeSkill && project.tags.some(t => t.toLowerCase().includes(activeSkill.name.toLowerCase().split(' ')[0])));
              return (
                <div
                  key={project.id}
                  className={`standalone-computer-item ${isMatchingSkill ? 'matches-active-skill' : ''}`}
                  onClick={() => setActiveProjectId(project.id)}
                  title={`Click to inspect ${project.title}`}
                >
                  {isMatchingSkill && activeSkill && (
                    <div className="matching-skill-floating-pill">
                      <Sparkles size={11} />
                      <span>POWERED BY {activeSkill.name.toUpperCase()}</span>
                    </div>
                  )}

                  <ComputerMockup
                    project={project}
                    onClick={() => setActiveProjectId(project.id)}
                  />

                  {/* Clean text caption under the computer mockup (NO CARD) */}
                  <div className="computer-caption-label">
                    <span className="computer-num-badge">0{index + 1}</span>
                    <span>{project.title}</span>
                    <span style={{ color: '#888888', margin: '0 4px' }}>•</span>
                    <span className="computer-inspect-tag">Click to inspect</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      ) : (

          /* ================================================================ */
          /* 2. ACTIVE STATE: VERTICAL LIST ON LEFT + PROJECT CARD OVERLAY     */
          /* ================================================================ */
          <div className="vertical-overlay-stage">
            
            {/* LEFT COLUMN: VERTICAL LIST OF COMPUTERS */}
            <div className="vertical-computers-sidebar">
              <div className="sidebar-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Monitor size={15} color="#000000" />
                  <span style={{ fontFamily: 'var(--font-poppins), sans-serif', fontWeight: 800, fontSize: '0.8rem', color: '#000000' }}>
                    ALL COMPUTERS ({PROJECTS_DATA.length})
                  </span>
                </div>
                <button
                  onClick={() => setActiveProjectId(null)}
                  className="close-sidebar-btn"
                  title="Close to horizontal view"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Vertical Stack of Mini Computers */}
              <div className="vertical-computers-scroll">
                {PROJECTS_DATA.map((project) => {
                  const isSelected = project.id === activeProject.id;
                  return (
                    <div
                      key={project.id}
                      onClick={() => setActiveProjectId(project.id)}
                      className={`vertical-computer-item ${isSelected ? 'is-selected' : ''}`}
                    >
                      {/* Mini Mockup */}
                      <div style={{ width: '100%', marginBottom: '10px' }}>
                        <ComputerMockup project={project} isMini isActive={isSelected} />
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                        <span className="item-title">{project.title}</span>
                        {isSelected && (
                          <span className="item-active-badge">● VIEWING</span>
                        )}
                      </div>

                      <span className="item-category">{project.category}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT AREA: OVERLAY PROJECT CARD */}
            <div className="overlay-project-card-container">
              <div className="overlay-project-card">
                
                {/* Card Top Control Header */}
                <div className="overlay-card-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#000000', display: 'inline-block' }} />
                      <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#edeef2', border: '1.5px solid #000000', display: 'inline-block' }} />
                      <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ffffff', border: '1.5px solid #000000', display: 'inline-block' }} />
                    </div>

                    <span className="overlay-category-badge">{activeProject.category}</span>
                  </div>

                  <button
                    onClick={() => setActiveProjectId(null)}
                    className="overlay-close-btn"
                    title="Close card and return to horizontal view (Esc)"
                  >
                    <span>CLOSE</span>
                    <X size={15} />
                  </button>
                </div>

                {/* Hero Computer Mockup */}
                <div className="overlay-mockup-wrapper">
                  <ComputerMockup project={activeProject} isHero />
                </div>

                {/* Project Details Content */}
                <div className="overlay-content-body">
                  
                  {/* Title & Tagline */}
                  <h3 className="overlay-project-title">{activeProject.title}</h3>
                  <p className="overlay-project-tagline">{activeProject.tagline}</p>
                  
                  <p className="overlay-project-desc">{activeProject.description}</p>

                  {/* Architecture & Engineering Highlights */}
                  <div className="overlay-section-box">
                    <div className="box-title">
                      <Layers size={15} color="#000000" />
                      <span>ENGINEERING &amp; ARCHITECTURE HIGHLIGHTS:</span>
                    </div>

                    <div className="architecture-list">
                      {activeProject.architecture.map((item, idx) => (
                        <div key={idx} className="arch-item">
                          <CheckCircle2 size={16} color="#000000" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metrics Row */}
                  <div className="metrics-grid">
                    {activeProject.metrics.map((m, idx) => (
                      <div key={idx} className="metric-box">
                        <span className="metric-val">{m.value}</span>
                        <span className="metric-lbl">{m.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div style={{ marginBottom: '24px' }}>
                    <span style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '0.74rem', fontWeight: 800, color: '#555555', display: 'block', marginBottom: '8px' }}>
                      TECHNOLOGIES &amp; CLOUD TOOLS:
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {activeProject.tags.map((t) => (
                        <span key={t} className="tag-pill-large">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link Buttons */}
                  <div className="overlay-actions-row">
                    {activeProject.demo_url && (
                      <a
                        href={activeProject.demo_url}
                        target="_blank"
                        rel="noreferrer"
                        className="project-action-btn primary"
                      >
                        <span>LAUNCH LIVE DEMO</span>
                        <ExternalLink size={15} />
                      </a>
                    )}

                    {activeProject.github_url && (
                      <a
                        href={activeProject.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="project-action-btn secondary"
                      >
                        <span>GITHUB REPOSITORY</span>
                        <Github size={15} />
                      </a>
                    )}

                    <button
                      onClick={() => setActiveProjectId(null)}
                      className="project-action-btn tertiary"
                    >
                      <span>BACK TO OVERVIEW</span>
                    </button>
                  </div>

                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    );

    return (
      <>
        {isOverlay ? (
          <div
            className="computers-popup-overlay-backdrop"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                if (activeProjectId) {
                  setActiveProjectId(null);
                } else {
                  onClose?.();
                }
              }
            }}
          >
            <div className="computers-popup-dialog">
              {sectionContent}
            </div>
          </div>
        ) : (
          <section
            id="projects"
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '100vh',
              background: '#ffffff',
              color: '#000000',
              borderTop: '2px solid #000000',
              padding: '90px 0 110px 0',
              scrollMarginTop: '0px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                opacity: 0.05,
                pointerEvents: 'none',
              }}
            />
            {sectionContent}
          </section>
        )}

        {/* ================================================================== */}
        {/* SCOPED & GLOBAL COMPONENT STYLES                                   */}
        {/* ================================================================== */}
        <style jsx>{`
        /* ================================================================ */
        /* COMPUTER MOCKUP WORKSTATION COMPONENT (STANDALONE LAPTOP)       */
        /* ================================================================ */
        :global(.computer-mockup-wrapper) {
          position: relative;
          width: 100%;
          user-select: none;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), filter 0.2s ease;
        }

        :global(.computer-mockup-wrapper[role="button"]) {
          cursor: pointer;
        }

        :global(.computer-mockup-wrapper:hover) {
          transform: translateY(-6px);
        }

        :global(.computer-mockup-wrapper.active .laptop-lid) {
          border-color: #000000;
          box-shadow: 0 0 0 2px #000000, 6px 6px 0px #000000;
        }

        /* LAPTOP LID */
        :global(.laptop-lid) {
          position: relative;
          width: 100%;
          box-sizing: border-box;
          background: #0f1015; /* Sleek Dark Aluminum bezel */
          border: 2.5px solid #000000;
          border-radius: 14px;
          padding: 9px 9px 12px 9px;
          box-shadow: 6px 6px 0px #000000;
          transition: all 0.2s ease;
        }

        :global(.computer-mockup-wrapper.mini .laptop-lid) {
          border-radius: 10px;
          padding: 6px 6px 8px 6px;
          box-shadow: 4px 4px 0px #000000;
        }

        :global(.computer-mockup-wrapper.hero .laptop-lid) {
          border-radius: 18px;
          padding: 12px 12px 16px 12px;
          box-shadow: 8px 10px 0px #000000;
        }

        :global(.webcam-notch) {
          display: flex;
          justify-content: center;
          align-items: center;
          padding-bottom: 6px;
        }

        :global(.computer-mockup-wrapper.mini .webcam-notch) {
          padding-bottom: 4px;
        }

        :global(.camera-lens) {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #2b2d35;
          box-shadow: inset 0 0 2px #00f0ff;
        }

        :global(.computer-mockup-wrapper.mini .camera-lens) {
          width: 3px;
          height: 3px;
        }

        /* DISPLAY SCREEN */
        :global(.screen-frame) {
          position: relative;
          width: 100%;
          background: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          border: 1.5px solid #000000;
        }

        :global(.computer-mockup-wrapper.mini .screen-frame) {
          border-radius: 5px;
        }

        /* BROWSER CHROME BAR */
        :global(.browser-chrome-bar) {
          height: 24px;
          background: #edeef2;
          border-bottom: 1.5px solid #000000;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 8px;
          box-sizing: border-box;
        }

        :global(.computer-mockup-wrapper.mini .browser-chrome-bar) {
          height: 18px;
          padding: 0 6px;
        }

        :global(.computer-mockup-wrapper.hero .browser-chrome-bar) {
          height: 28px;
          padding: 0 10px;
        }

        :global(.window-dots) {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        :global(.computer-mockup-wrapper.mini .window-dots) {
          gap: 3px;
        }

        :global(.dot) {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1px solid #000000;
        }

        :global(.computer-mockup-wrapper.mini .dot) {
          width: 5px;
          height: 5px;
        }

        :global(.dot-close) { background: #000000; }
        :global(.dot-min) { background: #edeef2; }
        :global(.dot-max) { background: #ffffff; }

        :global(.browser-url-pill) {
          display: flex;
          align-items: center;
          gap: 4px;
          background: #ffffff;
          border: 1px solid #000000;
          border-radius: 4px;
          padding: 2px 10px;
          font-family: var(--font-poppins), monospace;
          font-size: 0.64rem;
          font-weight: 700;
          color: #333333;
          max-width: 60%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        :global(.computer-mockup-wrapper.mini .browser-url-pill) {
          padding: 1px 6px;
          font-size: 0.55rem;
        }

        :global(.computer-mockup-wrapper.hero .browser-url-pill) {
          font-size: 0.72rem;
        }

        :global(.lock-icon) {
          font-size: 0.65rem;
        }

        :global(.computer-mockup-wrapper.mini .lock-icon) {
          font-size: 0.5rem;
        }

        :global(.live-status-pill) {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.58rem;
          font-weight: 800;
          color: #000000;
        }

        :global(.computer-mockup-wrapper.mini .live-status-pill) {
          display: none;
        }

        :global(.status-dot) {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #000000;
          animation: pulseDot 1.8s infinite;
        }

        /* SCREEN VIEWPORT */
        :global(.screen-viewport) {
          position: relative;
          width: 100%;
          height: clamp(250px, 28vw, 320px);
          overflow: hidden;
          background: #000000;
        }

        :global(.computer-mockup-wrapper.mini .screen-viewport) {
          height: 125px;
        }

        :global(.computer-mockup-wrapper.hero .screen-viewport) {
          height: 420px;
        }

        :global(.screen-img) {
          transition: transform 0.35s ease;
        }

        :global(.computer-mockup-wrapper:hover .screen-img) {
          transform: scale(1.04);
        }

        :global(.screen-glare-reflection) {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 55%);
          pointer-events: none;
        }

        :global(.screen-overlay-badges) {
          position: absolute;
          bottom: 10px;
          left: 12px;
          right: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          pointer-events: none;
        }

        :global(.computer-mockup-wrapper.mini .screen-overlay-badges) {
          bottom: 6px;
          left: 6px;
          right: 6px;
        }

        :global(.badge-project-title) {
          background: rgba(0, 0, 0, 0.85);
          color: #ffffff;
          padding: 3px 8px;
          border-radius: 4px;
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.72rem;
          font-weight: 800;
          backdrop-filter: blur(4px);
        }

        :global(.computer-mockup-wrapper.mini .badge-project-title) {
          font-size: 0.58rem;
          padding: 2px 5px;
        }

        :global(.badge-project-category) {
          background: #ffffff;
          color: #000000;
          border: 1px solid #000000;
          padding: 2px 7px;
          border-radius: 4px;
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.65rem;
          font-weight: 800;
        }

        :global(.computer-mockup-wrapper.mini .badge-project-category) {
          display: none;
        }

        /* LAPTOP BASE CHASSIS */
        :global(.laptop-base) {
          position: relative;
          width: 106%;
          margin-left: -3%;
          height: 14px;
          background: linear-gradient(to bottom, #dcdde3 0%, #bbbcc4 60%, #909199 100%);
          border: 2.5px solid #000000;
          border-top: none;
          border-radius: 0 0 14px 14px;
          box-shadow: 6px 7px 0px #000000;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          box-sizing: border-box;
        }

        :global(.computer-mockup-wrapper.mini .laptop-base) {
          height: 9px;
          border-radius: 0 0 9px 9px;
          border-width: 1.8px;
          box-shadow: 3px 4px 0px #000000;
        }

        :global(.computer-mockup-wrapper.hero .laptop-base) {
          height: 18px;
          border-radius: 0 0 18px 18px;
          box-shadow: 8px 10px 0px #000000;
        }

        :global(.thumb-notch) {
          width: 44px;
          height: 4px;
          background: #6e7078;
          border: 1px solid #000000;
          border-top: none;
          border-radius: 0 0 4px 4px;
        }

        :global(.computer-mockup-wrapper.mini .thumb-notch) {
          width: 24px;
          height: 3px;
        }

        :global(.computer-mockup-wrapper.hero .thumb-notch) {
          width: 50px;
          height: 4px;
        }

        /* VIEW TOGGLE BUTTON */
        :global(.view-toggle-btn) {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          color: #000000;
          border: 2px solid #000000;
          padding: 8px 18px;
          border-radius: var(--radius-full);
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.78rem;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 3px 3px 0px #000000;
          transition: all 0.15s ease;
        }

        :global(.view-toggle-btn:hover) {
          background: #edeef2;
          transform: translateY(-2px);
          box-shadow: 4px 4px 0px #000000;
        }

        /* 1. HORIZONTAL COMPUTERS SCROLL TRACK (DEFAULT - NO CARDS) */
        :global(.horizontal-computers-section) {
          position: relative;
          width: 100%;
          animation: fadeIn 0.3s ease-out;
        }

        :global(.scroll-controls-bar) {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          margin-bottom: 24px;
          padding: 0 4px;
        }

        :global(.scroll-hint-pill) {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #edeef2;
          border: 1.5px solid #000000;
          padding: 6px 14px;
          border-radius: var(--radius-full);
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.72rem;
          font-weight: 800;
          color: #000000;
          letter-spacing: 0.04em;
        }

        :global(.scroll-indicator-dot) {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #000000;
          animation: pulseDot 1.8s infinite;
        }

        :global(.scroll-buttons-cluster) {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        :global(.scroll-btn) {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #000000;
          box-shadow: 3px 3px 0px #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #000000;
          transition: all 0.15s ease;
        }

        :global(.scroll-btn:hover) {
          background: #000000;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 4px 4px 0px #000000;
        }

        :global(.scroll-btn:active) {
          transform: translateY(1px);
          box-shadow: 1px 1px 0px #000000;
        }

        :global(.horizontal-computers-scroll-track) {
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: nowrap !important;
          gap: 48px;
          overflow-x: auto !important;
          overflow-y: hidden !important;
          padding: 24px 12px 48px 12px;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: #000000 #edeef2;
        }

        :global(.horizontal-computers-scroll-track::-webkit-scrollbar) {
          height: 8px;
        }

        :global(.horizontal-computers-scroll-track::-webkit-scrollbar-track) {
          background: #edeef2;
          border-radius: 999px;
          border: 1.5px solid #000000;
        }

        :global(.horizontal-computers-scroll-track::-webkit-scrollbar-thumb) {
          background: #000000;
          border-radius: 999px;
        }

        :global(.standalone-computer-item) {
          flex: 0 0 clamp(440px, 46vw, 560px) !important;
          width: clamp(440px, 46vw, 560px) !important;
          max-width: 560px !important;
          scroll-snap-align: center;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), filter 0.2s ease;
        }

        :global(.standalone-computer-item:hover) {
          transform: translateY(-10px) scale(1.02);
        }

        :global(.standalone-computer-item:active) {
          transform: translateY(-4px) scale(1.01);
        }

        :global(.computer-caption-label) {
          margin-top: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-poppins), sans-serif;
          font-weight: 800;
          font-size: 0.88rem;
          color: #000000;
          letter-spacing: -0.01em;
          transition: transform 0.2s ease;
        }

        :global(.standalone-computer-item:hover .computer-caption-label) {
          transform: translateY(2px);
        }

        :global(.computer-num-badge) {
          background: #000000;
          color: #ffffff;
          font-size: 0.68rem;
          font-weight: 900;
          padding: 2px 7px;
          border-radius: 4px;
        }

        :global(.computer-inspect-tag) {
          font-size: 0.68rem;
          font-weight: 700;
          color: #666666;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        /* 2. VERTICAL + OVERLAY STAGE */
        :global(.vertical-overlay-stage) {
          display: grid !important;
          grid-template-columns: 280px 1fr !important;
          gap: 28px;
          align-items: flex-start;
          animation: fadeIn 0.25s ease-out;
        }

        /* VERTICAL COMPUTERS SIDEBAR (LEFT) */
        :global(.vertical-computers-sidebar) {
          background: #edeef2;
          border: 2.5px solid #000000;
          border-radius: 20px;
          padding: 16px;
          box-shadow: 6px 6px 0px #000000;
          position: sticky;
          top: 30px;
          max-height: calc(100vh - 80px);
          overflow-y: auto;
        }

        :global(.sidebar-header) {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          padding-bottom: 12px;
          border-bottom: 2px solid #000000;
          margin-bottom: 14px;
        }

        :global(.close-sidebar-btn) {
          background: #ffffff;
          border: 1.5px solid #000000;
          border-radius: 6px;
          padding: 3px 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        :global(.close-sidebar-btn:hover) {
          background: #000000;
          color: #ffffff;
        }

        :global(.vertical-computers-scroll) {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        :global(.vertical-computer-item) {
          background: #ffffff;
          border: 2px solid #000000;
          border-radius: 14px;
          padding: 12px;
          cursor: pointer;
          transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 2px 2px 0px #000000;
        }

        :global(.vertical-computer-item:hover) {
          transform: translateX(4px);
          box-shadow: 4px 4px 0px #000000;
        }

        :global(.vertical-computer-item.is-selected) {
          border-color: #000000;
          background: #ffffff;
          box-shadow: 5px 5px 0px #000000;
          transform: translateX(6px);
        }

        :global(.item-title) {
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.84rem;
          font-weight: 800;
          color: #000000;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        :global(.item-active-badge) {
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.62rem;
          font-weight: 900;
          color: #ffffff;
          background: #000000;
          padding: 2px 6px;
          border-radius: 4px;
          flex-shrink: 0;
        }

        :global(.item-category) {
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.68rem;
          color: #666666;
          font-weight: 600;
          display: block;
          margin-top: 2px;
        }

        /* OVERLAY PROJECT CARD (RIGHT) */
        :global(.overlay-project-card-container) {
          width: 100%;
        }

        :global(.overlay-project-card) {
          background: #ffffff;
          border: 3px solid #000000;
          border-radius: 24px;
          padding: 30px;
          box-shadow: 10px 10px 0px #000000;
          animation: popUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        :global(.overlay-card-header) {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          padding-bottom: 16px;
          border-bottom: 2px solid #000000;
          margin-bottom: 24px;
        }

        :global(.overlay-category-badge) {
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.74rem;
          font-weight: 800;
          background: #edeef2;
          color: #000000;
          border: 1.5px solid #000000;
          padding: 4px 12px;
          border-radius: var(--radius-full);
          letter-spacing: 0.05em;
        }

        :global(.overlay-close-btn) {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #edeef2;
          color: #000000;
          border: 2px solid #000000;
          border-radius: 8px;
          padding: 5px 12px;
          cursor: pointer;
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.74rem;
          font-weight: 800;
          box-shadow: 2px 2px 0px #000000;
          transition: all 0.15s ease;
        }

        :global(.overlay-close-btn:hover) {
          background: #000000;
          color: #ffffff;
          transform: translateY(-1px);
          box-shadow: 3px 3px 0px #000000;
        }

        :global(.overlay-mockup-wrapper) {
          max-width: 760px;
          margin: 0 auto 30px auto;
        }

        :global(.overlay-content-body) {
          display: flex;
          flex-direction: column;
        }

        :global(.overlay-project-title) {
          font-family: var(--font-poppins), sans-serif;
          font-weight: 900;
          font-size: clamp(2rem, 3.8vw, 2.9rem);
          color: #000000;
          letter-spacing: -0.03em;
          line-height: 1.05;
          margin: 0 0 8px 0;
        }

        :global(.overlay-project-tagline) {
          font-family: var(--font-poppins), sans-serif;
          font-size: 1.05rem;
          font-weight: 600;
          color: #444444;
          margin: 0 0 16px 0;
        }

        :global(.overlay-project-desc) {
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.95rem;
          color: #333333;
          line-height: 1.65;
          margin: 0 0 24px 0;
        }

        :global(.overlay-section-box) {
          background: #edeef2;
          border: 2px solid #000000;
          border-radius: 14px;
          padding: 18px;
          box-shadow: 3px 3px 0px #000000;
          margin-bottom: 24px;
        }

        :global(.box-title) {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.76rem;
          font-weight: 800;
          color: #000000;
          letter-spacing: 0.06em;
          margin-bottom: 12px;
        }

        :global(.architecture-list) {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        :global(.arch-item) {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.86rem;
          color: #222222;
          line-height: 1.5;
        }

        :global(.metrics-grid) {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 12px;
          margin-bottom: 24px;
        }

        :global(.metric-box) {
          background: #ffffff;
          border: 2px solid #000000;
          box-shadow: 3px 3px 0px #000000;
          border-radius: 12px;
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
        }

        :global(.metric-val) {
          font-family: var(--font-poppins), sans-serif;
          font-size: 1.35rem;
          font-weight: 900;
          color: #000000;
          line-height: 1.1;
        }

        :global(.metric-lbl) {
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          color: #666666;
          text-transform: uppercase;
          margin-top: 4px;
        }

        :global(.tag-pill-large) {
          background: #ffffff;
          color: #000000;
          border: 1.5px solid #000000;
          padding: 4px 12px;
          border-radius: var(--radius-full);
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.74rem;
          font-weight: 700;
          box-shadow: 2px 2px 0px #000000;
        }

        :global(.overlay-actions-row) {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          padding-top: 10px;
        }

        :global(.project-action-btn) {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          border-radius: var(--radius-full);
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.8rem;
          font-weight: 800;
          cursor: pointer;
          letter-spacing: 0.04em;
          text-decoration: none;
          transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
        }

        :global(.project-action-btn.primary) {
          background: #000000;
          color: #ffffff;
          border: 2px solid #000000;
          box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.25);
        }

        :global(.project-action-btn.primary:hover) {
          background: #222222;
          transform: translateY(-2px);
          box-shadow: 5px 5px 0px #000000;
        }

        :global(.project-action-btn.secondary) {
          background: #ffffff;
          color: #000000;
          border: 2px solid #000000;
          box-shadow: 3px 3px 0px #000000;
        }

        :global(.project-action-btn.secondary:hover) {
          background: #edeef2;
          transform: translateY(-2px);
          box-shadow: 4px 4px 0px #000000;
        }

        :global(.project-action-btn.tertiary) {
          background: #edeef2;
          color: #555555;
          border: 1.5px solid #888888;
        }

        :global(.project-action-btn.tertiary:hover) {
          background: #e2e4ea;
          color: #000000;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes popUp {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(16px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* ================================================================ */
        /* POPUP OVERLAY MODAL STYLES (WHEN LAUNCHED FROM KEYBOARD)        */
        /* ================================================================ */
        :global(.computers-popup-overlay-backdrop) {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: rgba(0, 0, 0, 0.82);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          overflow-y: auto;
          animation: overlayFadeIn 0.22s ease-out;
        }

        :global(.computers-popup-dialog) {
          position: relative;
          width: 100%;
          max-width: 1420px;
          max-height: 94vh;
          overflow-y: auto;
          overflow-x: hidden;
          background: #ffffff;
          border: 3px solid #000000;
          border-radius: 28px;
          box-shadow: 12px 14px 0px #000000;
          padding: 28px 24px 45px 24px;
          animation: dialogPopUp 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }

        :global(.overlay-top-nav-bar) {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          padding-bottom: 20px;
          margin-bottom: 24px;
          border-bottom: 2px solid #000000;
          flex-wrap: wrap;
          gap: 14px;
        }

        :global(.overlay-skill-active-pill) {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #edeef2;
          border: 1.5px solid #000000;
          border-radius: 14px;
          padding: 8px 16px;
          box-shadow: 2px 2px 0px #000000;
        }

        :global(.skill-pill-icon) {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #000000;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        :global(.skill-pill-name) {
          font-family: var(--font-poppins), sans-serif;
          font-weight: 900;
          font-size: 0.95rem;
          color: #000000;
        }

        :global(.skill-pill-badge) {
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.65rem;
          font-weight: 800;
          background: #ffffff;
          border: 1px solid #000000;
          padding: 2px 8px;
          border-radius: var(--radius-full);
          letter-spacing: 0.05em;
        }

        :global(.skill-pill-quote) {
          display: block;
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.74rem;
          font-style: italic;
          color: #555555;
          margin-top: 2px;
          max-width: 520px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        :global(.overlay-status-pill) {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #edeef2;
          border: 1.5px solid #000000;
          padding: 6px 14px;
          border-radius: var(--radius-full);
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.76rem;
          font-weight: 800;
        }

        :global(.overlay-back-nav-btn) {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #ffffff;
          color: #000000;
          border: 2px solid #000000;
          border-radius: 8px;
          padding: 7px 14px;
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.74rem;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 2px 2px 0px #000000;
          transition: all 0.15s ease;
        }

        :global(.overlay-back-nav-btn:hover) {
          background: #edeef2;
          transform: translateY(-2px);
          box-shadow: 3px 3px 0px #000000;
        }

        :global(.overlay-close-main-btn) {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #000000;
          color: #ffffff;
          border: 2px solid #000000;
          border-radius: 8px;
          padding: 7px 16px;
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.78rem;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 3px 3px 0px #000000;
          transition: all 0.15s ease;
        }

        :global(.overlay-close-main-btn:hover) {
          background: #222222;
          transform: translateY(-2px);
          box-shadow: 4px 4px 0px #000000;
        }

        :global(.esc-key-chip) {
          background: #ffffff;
          color: #000000;
          padding: 1px 6px;
          border-radius: 4px;
          font-size: 0.65rem;
          font-weight: 900;
        }

        :global(.matching-skill-floating-pill) {
          position: absolute;
          top: -12px;
          z-index: 20;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #000000;
          color: #ffffff;
          border: 1.5px solid #ffffff;
          padding: 3px 10px;
          border-radius: var(--radius-full);
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.64rem;
          font-weight: 900;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
          animation: bounceFloat 2s infinite ease-in-out;
        }

        :global(.standalone-computer-item.matches-active-skill) {
          transform: translateY(-4px);
        }

        @keyframes bounceFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes dialogPopUp {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* RESPONSIVE DESIGN */
        @media (max-width: 960px) {
          :global(.vertical-overlay-stage) {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          :global(.vertical-computers-sidebar) {
            position: static !important;
            max-height: none !important;
          }
          :global(.vertical-computers-scroll) {
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
            gap: 10px !important;
          }
        }

        @media (max-width: 640px) {
          :global(.computers-popup-dialog) {
            padding: 16px 8px 24px 8px !important;
            border-radius: 16px !important;
            box-shadow: 4px 4px 0px #000000 !important;
            width: 96vw !important;
            max-height: 94vh !important;
          }
          :global(.standalone-computer-item) {
            flex: 0 0 86vw !important;
            width: 86vw !important;
            max-width: 86vw !important;
          }
          :global(.horizontal-computers-scroll-track) {
            gap: 20px !important;
            padding: 12px 4px 24px 4px !important;
          }
          :global(.overlay-project-card) {
            padding: 18px 14px !important;
            border-radius: 18px !important;
            box-shadow: 5px 5px 0px #000000 !important;
          }
          :global(.overlay-actions-row) {
            flex-direction: column !important;
          }
          :global(.project-action-btn) {
            width: 100% !important;
            justify-content: center !important;
          }
          :global(.vertical-computers-scroll) {
            grid-template-columns: 1fr !important;
          }
          :global(.scroll-guide-bar) {
            flex-direction: column !important;
            gap: 10px !important;
            align-items: flex-start !important;
          }
        }

        @media (max-width: 380px) {
          :global(.standalone-computer-item) {
            flex: 0 0 88vw !important;
            width: 88vw !important;
          }
          :global(.overlay-project-card) {
            padding: 14px 10px !important;
          }
        }
      `}</style>
    </>
  );
}