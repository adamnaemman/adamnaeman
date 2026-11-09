'use client';

import Image from 'next/image';
import type { Project } from '@/lib/types';

export interface ComputerMockupProps {
  project: Project;
  isMini?: boolean;
  isHero?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

/**
 * Laptop workstation mockup used by the projects carousel and the overlay.
 * All of its styling lives in the `:global(...)` block inside
 * components/ProjectsSection.tsx, so the markup can move without losing CSS.
 */
export default function ComputerMockup({
  project,
  isMini = false,
  isHero = false,
  isActive = false,
  onClick,
}: ComputerMockupProps) {
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
