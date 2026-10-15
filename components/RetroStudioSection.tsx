'use client';

import React from 'react';
import RetroStudioDiorama from './RetroStudioDiorama';

export default function RetroStudioSection() {
  return (
    <section
      id="studio"
      style={{
        padding: '70px 0 50px 0',
        position: 'relative',
        background: 'var(--bg-acid)',
        borderTop: 'var(--ink-border)',
        borderBottom: 'var(--ink-border)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '30px' }}>
          <span className="section-tag">// 2.5D INTERACTIVE AUDIO & SYNTH LAB</span>
          <h2 className="section-title">
            Retro Studio & <span className="gradient-text">Sound Stage</span>
          </h2>
          <p className="section-subtitle">
            Spin the Pacific City Pop vinyl, test the 8-key retro synthesizer with live Web Audio oscillators, and tilt the diorama in 3D space.
          </p>
        </div>

        {/* 2.5D Diorama Workstation */}
        <RetroStudioDiorama />
      </div>
    </section>
  );
}
