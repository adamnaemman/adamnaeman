'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ExternalLink, Github, Sparkles, X, ChevronRight, Layers, ArrowLeft, ArrowRight, Monitor, CheckCircle2 } from 'lucide-react';

import { PROJECTS as PROJECTS_DATA } from '@/lib/data';
import type { Project } from '@/lib/types';

type ProjectDetail = Project;

import ComputerMockup from '@/components/projects/ComputerMockup';


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
        
    </>
  );
}