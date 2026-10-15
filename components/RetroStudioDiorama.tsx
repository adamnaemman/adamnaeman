'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Music, Disc3, Radio, Tv } from 'lucide-react';

export default function RetroStudioDiorama() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volumeOn, setVolumeOn] = useState(true);
  const [activeKey, setActiveKey] = useState<number | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Piano key frequencies (C major pentatonic / synthwave chords)
  const keyNotes = [
    { name: 'C4', freq: 261.63, label: 'C' },
    { name: 'D4', freq: 293.66, label: 'D' },
    { name: 'E4', freq: 329.63, label: 'E' },
    { name: 'G4', freq: 392.00, label: 'G' },
    { name: 'A4', freq: 440.00, label: 'A' },
    { name: 'C5', freq: 523.25, label: 'C+' },
    { name: 'D5', freq: 587.33, label: 'D+' },
    { name: 'E5', freq: 659.25, label: 'E+' },
  ];

  // Initialize Web Audio Context on first user click
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Play retro synth tone using Web Audio API
  const playSynthNote = (freq: number) => {
    if (!volumeOn) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Warm 80s DX7 / Synthwave style tone (triangle + soft square harmonics)
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Volume envelope
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {
      // Audio context fallback
    }
  };

  // Lo-Fi / City Pop automated chord arpeggio when playing
  useEffect(() => {
    if (!isPlaying || !volumeOn) return;

    const chords = [
      [261.63, 329.63, 392.00], // C maj
      [220.00, 261.63, 329.63], // A min
      [174.61, 220.00, 261.63], // F maj
      [196.00, 246.94, 293.66], // G maj
    ];

    let chordIdx = 0;
    let step = 0;

    const interval = setInterval(() => {
      const currentChord = chords[chordIdx];
      const noteFreq = currentChord[step % currentChord.length];
      playSynthNote(noteFreq);

      step++;
      if (step % 4 === 0) {
        chordIdx = (chordIdx + 1) % chords.length;
      }
    }, 450);

    return () => clearInterval(interval);
  }, [isPlaying, volumeOn]);

  // 3D Mouse Parallax Tilt calculations
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateY = (x / (rect.width / 2)) * 14;
    const rotateX = -(y / (rect.height / 2)) * 12;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleKeyClick = (idx: number, freq: number) => {
    setActiveKey(idx);
    playSynthNote(freq);
    setTimeout(() => setActiveKey(null), 250);
  };

  return (
    <div
      style={{
        margin: '50px auto 30px auto',
        maxWidth: '1000px',
        position: 'relative',
        perspective: '1400px',
      }}
    >
      {/* 2.5D Diorama Frame with 3D Tilt */}
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="brutal-card"
        style={{
          background: 'linear-gradient(135deg, #fefce8 0%, #ffffff 100%)',
          padding: '36px 28px',
          borderRadius: '28px',
          overflow: 'hidden',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
          boxShadow: isHovered
            ? '14px 14px 0px var(--ink-black), 0 20px 40px rgba(0,0,0,0.15)'
            : '8px 8px 0px var(--ink-black)',
        }}
      >
        {/* Header Ribbon / Tape */}
        <div className="sticker-tape">
          2.5D INTERACTIVE AUDIO DIORAMA // CITY POP EDITION
        </div>

        {/* Top Control Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '28px',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                fontFamily: 'var(--font-bubble)',
                fontSize: '1.25rem',
                color: 'var(--ink-black)',
              }}
            >
              CITY POP <span style={{ color: 'var(--pop-pink)' }}>SYNTH DECK</span>
            </span>

            <div
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '0.65rem',
                background: isPlaying ? 'var(--bg-acid)' : '#e2e8f0',
                color: 'var(--ink-black)',
                padding: '3px 8px',
                borderRadius: '6px',
                border: '1.5px solid var(--ink-black)',
                fontWeight: 700,
              }}
            >
              {isPlaying ? '● 110 BPM LIVE' : '○ STANDBY'}
            </div>
          </div>

          {/* Interactive Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => {
                getAudioContext();
                setIsPlaying(!isPlaying);
              }}
              className="btn btn-secondary"
              style={{
                padding: '8px 18px',
                fontSize: '0.85rem',
                gap: '8px',
              }}
            >
              {isPlaying ? (
                <>
                  <Pause size={15} /> STOP VINYL
                </>
              ) : (
                <>
                  <Play size={15} /> SPIN VINYL ⚡
                </>
              )}
            </button>

            <button
              onClick={() => setVolumeOn(!volumeOn)}
              className="btn-ghost"
              style={{
                padding: '8px 12px',
                borderRadius: 'var(--radius-full)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
              }}
              title="Toggle Audio Synth"
            >
              {volumeOn ? <Volume2 size={16} color="var(--pop-pink)" /> : <VolumeX size={16} />}
              <span>{volumeOn ? 'AUDIO ON' : 'MUTED'}</span>
            </button>
          </div>
        </div>

        {/* ================================================================== */}
        {/* THE 2.5D ISOMETRIC COMPOSITION STAGE                               */}
        {/* ================================================================== */}
        <div
          className="diorama-stage"
          style={{
            position: 'relative',
            minHeight: '440px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transformStyle: 'preserve-3d',
            userSelect: 'none',
          }}
        >
          {/* LAYER 0: Memphis Pattern Surface (Table Base) */}
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              left: '5%',
              right: '5%',
              height: '140px',
              background: '#ffffff',
              border: '3px solid var(--ink-black)',
              borderRadius: '20px',
              boxShadow: '6px 6px 0px var(--ink-black)',
              backgroundImage: 'radial-gradient(#152405 10%, transparent 11%), repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(255, 31, 130, 0.08) 15px, rgba(255, 31, 130, 0.08) 30px)',
              backgroundSize: '20px 20px, 40px 40px',
              transform: 'translateZ(10px)',
            }}
          />

          {/* LAYER 1: Background 80s Anime Poster & CRT Monitor */}
          <div
            className="diorama-bg-row"
            style={{
              position: 'absolute',
              top: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '90%',
              maxWidth: '780px',
              transform: 'translateZ(20px)',
              pointerEvents: 'none',
            }}
          >
            {/* Anime Poster Card (Left) */}
            <div
              className="diorama-bg-poster"
              style={{
                width: '160px',
                height: '180px',
                background: 'linear-gradient(180deg, #1e3a8a 0%, #3b82f6 60%, #f43f5e 100%)',
                border: '3px solid var(--ink-black)',
                borderRadius: '12px',
                boxShadow: '4px 4px 0px var(--ink-black)',
                transform: 'rotate(-5deg)',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '10px',
              }}
            >
              <div style={{ fontFamily: 'var(--font-bubble)', fontSize: '1rem', color: '#fff', textShadow: '1px 1px 0px #000' }}>
                EDIFIER
              </div>
              <div style={{ textAlign: 'center', color: '#ffee00', fontFamily: 'var(--font-pixel)', fontSize: '0.65rem' }}>
                🌴 PACIFIC 1986
              </div>
              {/* Sun & Palm silhouette */}
              <div style={{ position: 'absolute', bottom: '25px', left: '20px', width: '40px', height: '40px', borderRadius: '50%', background: '#ffee00', opacity: 0.8 }} />
              <div style={{ position: 'absolute', bottom: '0', right: '0', fontSize: '32px' }}>🌴</div>
            </div>

            {/* CRT TV / Monitor Screen (Center) */}
            <div
              className="diorama-bg-crt"
              style={{
                width: '240px',
                height: '170px',
                background: '#e2e8f0',
                border: '3.5px solid var(--ink-black)',
                borderRadius: '16px',
                boxShadow: '5px 5px 0px var(--ink-black)',
                padding: '10px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* CRT Antenna */}
              <div style={{ position: 'absolute', top: '-18px', left: '45%', width: '3px', height: '18px', background: '#000', transform: 'rotate(-25deg)' }} />
              <div style={{ position: 'absolute', top: '-18px', left: '55%', width: '3px', height: '18px', background: '#000', transform: 'rotate(25deg)' }} />

              {/* Glowing CRT Screen */}
              <div
                style={{
                  background: '#090d16',
                  borderRadius: '10px',
                  border: '2px solid var(--ink-black)',
                  height: '110px',
                  padding: '8px',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                {/* CRT Scanline effect */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,255,200,0.06) 0px, rgba(0,255,200,0.06) 2px, transparent 2px, transparent 4px)',
                    pointerEvents: 'none',
                  }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.65rem', color: '#ff1f82' }}>PACIFIC TEMPO</span>
                  <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.6rem', color: '#00f0ff' }}>110 BPM</span>
                </div>

                {/* Animated Equalizer Sound Spectrum */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '5px', height: '40px' }}>
                  {[18, 32, 24, 38, 28, 42, 22, 34, 16].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        width: '7px',
                        height: isPlaying ? `${Math.min(45, (h * (i % 2 === 0 ? 1.2 : 0.8)))}px` : '6px',
                        background: i % 2 === 0 ? 'var(--pop-yellow)' : 'var(--pop-pink)',
                        border: '1px solid #000',
                        borderRadius: '2px',
                        transition: 'height 0.2s ease',
                      }}
                    />
                  ))}
                </div>

                <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.55rem', color: '#aef324', textAlign: 'center' }}>
                  {isPlaying ? '♪ SYNTHWAVE STREAMING ♪' : 'PRESS PLAY TO ACTIVATE'}
                </div>
              </div>

              {/* Monitor Knobs */}
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '2px 10px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff1f82', border: '1.5px solid #000' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#00f0ff', border: '1.5px solid #000' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffee00', border: '1.5px solid #000' }} />
              </div>
            </div>

            {/* Anime Speaker Box (Right) */}
            <div
              className="diorama-bg-speaker"
              style={{
                width: '120px',
                height: '170px',
                background: '#1a1c23',
                border: '3px solid var(--ink-black)',
                borderRadius: '12px',
                boxShadow: '4px 4px 0px var(--ink-black)',
                transform: 'rotate(4deg)',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {/* Cute Anime Eyes on Speaker */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ width: '18px', height: '22px', borderRadius: '50%', background: '#fff', border: '2px solid #000', position: 'relative' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00f0ff', position: 'absolute', top: '4px', left: '4px' }} />
                </div>
                <div style={{ width: '18px', height: '22px', borderRadius: '50%', background: '#fff', border: '2px solid #000', position: 'relative' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00f0ff', position: 'absolute', top: '4px', left: '4px' }} />
                </div>
              </div>

              {/* Speaker Cones */}
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#334155', border: '2px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#ffee00' }} />
              </div>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#475569', border: '2px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#ff1f82' }} />
              </div>
            </div>
          </div>

          {/* ================================================================ */}
          {/* LAYER 2: 2.5D ISOMETRIC TURNTABLE & KEYBOARD WORKSTATION         */}
          {/* ================================================================ */}
          <div
            className="diorama-deck"
            style={{
              position: 'relative',
              width: '94%',
              maxWidth: '820px',
              minHeight: '240px',
              marginTop: '130px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 60%, #047857 100%)',
              border: '3.5px solid var(--ink-black)',
              borderRadius: '24px',
              boxShadow: '10px 10px 0px var(--ink-black)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '24px 30px',
              transform: 'translateZ(60px)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* LEFT SIDE: Spinning Vinyl Record Player & Tonearm */}
            <div style={{ position: 'relative', width: '210px', height: '210px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              
              {/* Circular Turntable Platter Base */}
              <div
                style={{
                  width: '190px',
                  height: '190px',
                  borderRadius: '50%',
                  background: '#0a0a0d',
                  border: '3px solid var(--ink-black)',
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8), 3px 3px 0px rgba(0,0,0,0.4)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: isPlaying ? 'spinVinyl 3s linear infinite' : 'none',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                }}
                onClick={() => {
                  getAudioContext();
                  setIsPlaying(!isPlaying);
                }}
                title="Click to Scratch / Spin Vinyl"
              >
                {/* Vinyl Grooves */}
                <div style={{ width: '160px', height: '160px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)' }} />
                <div style={{ position: 'absolute', width: '130px', height: '130px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.14)' }} />
                <div style={{ position: 'absolute', width: '100px', height: '100px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)' }} />

                {/* Orange Vinyl Center Label */}
                <div
                  style={{
                    position: 'absolute',
                    width: '65px',
                    height: '65px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #ff5900 40%, #ff1f82 100%)',
                    border: '2px solid var(--ink-black)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.45rem', fontWeight: 700 }}>DEV POP</span>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffffff', border: '1.5px solid #000' }} />
                  <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem' }}>33 RPM</span>
                </div>
              </div>

              {/* Tonearm */}
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '15px',
                  width: '60px',
                  height: '110px',
                  pointerEvents: 'none',
                  transformOrigin: 'top right',
                  transform: isPlaying ? 'rotate(18deg)' : 'rotate(0deg)',
                  transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  zIndex: 10,
                }}
              >
                {/* Pivot base */}
                <div style={{ position: 'absolute', top: '0', right: '0', width: '22px', height: '22px', borderRadius: '50%', background: '#cbd5e1', border: '2px solid #000' }} />
                {/* Metal arm */}
                <div style={{ position: 'absolute', top: '10px', right: '10px', width: '4px', height: '85px', background: '#94a3b8', border: '1px solid #000', transform: 'rotate(-25deg)' }} />
                {/* Needle Cartridge */}
                <div style={{ position: 'absolute', bottom: '15px', left: '10px', width: '16px', height: '10px', background: '#ff1f82', border: '1.5px solid #000' }} />
              </div>

              {/* Pitch Slider & Power Knob */}
              <div style={{ position: 'absolute', bottom: '-5px', right: '0', display: 'flex', gap: '8px' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#ffee00', border: '2px solid #000' }} />
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#ff1f82', border: '2px solid #000' }} />
              </div>
            </div>

            {/* RIGHT SIDE: Interactive 8-Key Synthesizer Keyboard */}
            <div
              className="diorama-deck-right"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '4px 0',
                flexGrow: 1,
                marginLeft: '36px',
              }}
            >
              {/* Push Buttons & Deck Display */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                {/* 4 Colored Push Buttons */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  {['#ff1f82', '#00f0ff', '#ffee00', '#aef324'].map((col, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleKeyClick(idx, keyNotes[idx].freq * 1.5)}
                      style={{
                        width: '32px',
                        height: '24px',
                        borderRadius: '6px',
                        background: col,
                        border: '2px solid var(--ink-black)',
                        boxShadow: '2px 2px 0px var(--ink-black)',
                        cursor: 'pointer',
                        transition: 'transform 0.1s ease',
                      }}
                      title={`Pad 0${idx + 1}`}
                      onMouseDown={(e) => (e.currentTarget.style.transform = 'translate(2px, 2px)')}
                      onMouseUp={(e) => (e.currentTarget.style.transform = 'none')}
                    />
                  ))}
                </div>

                {/* Synth Screen Badge */}
                <div
                  style={{
                    background: '#090d16',
                    color: '#ffee00',
                    fontFamily: 'var(--font-pixel)',
                    fontSize: '0.65rem',
                    padding: '4px 12px',
                    borderRadius: '6px',
                    border: '2px solid var(--ink-black)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Music size={13} color="#ff1f82" />
                  <span>SYNTH PENTATONIC // CLICK KEYS</span>
                </div>
              </div>

              {/* Piano Keyboard Keys */}
              <div
                style={{
                  display: 'flex',
                  gap: '6px',
                  background: '#1a1c23',
                  padding: '12px 14px',
                  borderRadius: '16px',
                  border: '3px solid var(--ink-black)',
                  boxShadow: '4px 4px 0px var(--ink-black)',
                }}
              >
                {keyNotes.map((note, idx) => {
                  const isCurrent = activeKey === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleKeyClick(idx, note.freq)}
                      style={{
                        flex: 1,
                        height: '90px',
                        background: isCurrent ? 'var(--pop-yellow)' : '#ffffff',
                        border: '2.5px solid var(--ink-black)',
                        borderRadius: '0 0 8px 8px',
                        boxShadow: isCurrent ? '1px 1px 0px var(--ink-black)' : '3px 4px 0px var(--ink-black)',
                        transform: isCurrent ? 'translateY(3px)' : 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        paddingBottom: '8px',
                        fontFamily: 'var(--font-pixel)',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        color: 'var(--ink-black)',
                        transition: 'all 0.1s ease',
                      }}
                    >
                      <span>{note.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ================================================================ */}
          {/* LAYER 3: FLOATING 3D STUDIO HEADPHONES (Centerpiece Focus)       */}
          {/* ================================================================ */}
          <div
            className="diorama-headphones"
            style={{
              position: 'absolute',
              top: '50px',
              left: '42%',
              transform: 'translate(-50%, -20px) translateZ(100px)',
              zIndex: 30,
              pointerEvents: 'none',
              filter: 'drop-shadow(10px 14px 0px rgba(0,0,0,0.35))',
              animation: 'floatHeadphones 3.5s ease-in-out infinite alternate',
            }}
          >
            <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Headband Arc */}
              <path
                d="M40 120C40 60 70 25 110 25C150 25 180 60 180 120"
                stroke="#e2e8f0"
                strokeWidth="24"
                strokeLinecap="round"
              />
              <path
                d="M40 120C40 60 70 25 110 25C150 25 180 60 180 120"
                stroke="#08090c"
                strokeWidth="3.5"
                fill="none"
              />

              {/* Headband Cushion */}
              <path
                d="M75 35C90 28 130 28 145 35"
                stroke="#475569"
                strokeWidth="10"
                strokeLinecap="round"
              />

              {/* Left Ear Cushion (Over-ear Cup) */}
              <ellipse cx="44" cy="130" rx="24" ry="38" fill="#ffffff" stroke="#08090c" strokeWidth="3.5" />
              <ellipse cx="44" cy="130" rx="16" ry="28" fill="#e2e8f0" stroke="#08090c" strokeWidth="2" />
              <ellipse cx="44" cy="130" rx="8" ry="16" fill="#08090c" />
              <circle cx="44" cy="130" r="4" fill="#ffee00" />

              {/* Right Ear Cushion (Over-ear Cup) */}
              <ellipse cx="176" cy="130" rx="24" ry="38" fill="#ffffff" stroke="#08090c" strokeWidth="3.5" />
              <ellipse cx="176" cy="130" rx="16" ry="28" fill="#e2e8f0" stroke="#08090c" strokeWidth="2" />
              <ellipse cx="176" cy="130" rx="8" ry="16" fill="#08090c" />
              <circle cx="176" cy="130" r="4" fill="#ff1f82" />

              {/* Metallic Adjusters */}
              <rect x="36" y="88" width="16" height="24" rx="4" fill="#94a3b8" stroke="#08090c" strokeWidth="2"/>
              <rect x="168" y="88" width="16" height="24" rx="4" fill="#94a3b8" stroke="#08090c" strokeWidth="2"/>
            </svg>

            {/* Glowing Neon "Pop" Script */}
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '-30px',
                fontFamily: 'var(--font-graffiti)',
                fontSize: '2.4rem',
                color: 'var(--pop-pink)',
                textShadow: '0 0 10px #ff1f82, 3px 3px 0px #000',
                transform: 'rotate(-8deg)',
              }}
            >
              Pop!
            </div>
          </div>

          {/* Floating Music Notes Motion Graphics */}
          {isPlaying && (
            <>
              <div
                style={{
                  position: 'absolute',
                  top: '40px',
                  left: '28%',
                  fontSize: '26px',
                  color: 'var(--pop-pink)',
                  animation: 'floatUpNote 2.4s infinite ease-out',
                  pointerEvents: 'none',
                }}
              >
                ♪
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '30%',
                  fontSize: '30px',
                  color: 'var(--pop-yellow)',
                  animation: 'floatUpNote 2.8s infinite ease-out 0.8s',
                  pointerEvents: 'none',
                }}
              >
                ♫
              </div>
            </>
          )}

        </div>

        {/* Diorama Footer Info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '2px dashed var(--ink-black)',
            fontFamily: 'var(--font-pixel)',
            fontSize: '0.68rem',
            color: 'var(--text-secondary)',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <div>
            <span>[ 2.5D AUDIO WORKSTATION ]</span>
            <span style={{ margin: '0 8px' }}>•</span>
            <span>HARDWARE-ACCELERATED 3D PARALLAX</span>
          </div>

          <div style={{ color: 'var(--ink-black)', fontWeight: 700 }}>
            TIP: MOVE CURSOR TO TILT IN 3D SPACE • CLICK KEYS TO PLAY
          </div>
        </div>
      </div>

      {/* Global Diorama Keyframe Animations */}
      <style jsx>{`
        @keyframes spinVinyl {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes floatHeadphones {
          0% {
            transform: translate(-50%, -15px) translateZ(100px) rotate(-1deg);
          }
          100% {
            transform: translate(-50%, -30px) translateZ(100px) rotate(2deg);
          }
        }
        @keyframes floatUpNote {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.8) rotate(0deg);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-60px) scale(1.3) rotate(15deg);
          }
        }

        @media (max-width: 760px) {
          .diorama-bg-poster, .diorama-bg-speaker {
            display: none !important;
          }
          .diorama-bg-row {
            justify-content: center !important;
            top: 0px !important;
          }
          .diorama-stage {
            min-height: 560px !important;
          }
          .diorama-deck {
            flex-direction: column !important;
            height: auto !important;
            margin-top: 130px !important;
            padding: 20px 14px !important;
            gap: 20px !important;
            align-items: center !important;
          }
          .diorama-deck-right {
            margin-left: 0 !important;
            width: 100% !important;
          }
          .diorama-headphones {
            top: 70px !important;
            left: 50% !important;
            transform: translate(-50%, -10px) scale(0.82) translateZ(100px) !important;
          }
        }

        @media (max-width: 480px) {
          .diorama-stage {
            min-height: 580px !important;
          }
          .diorama-headphones {
            transform: translate(-50%, -10px) scale(0.72) translateZ(100px) !important;
            top: 60px !important;
          }
        }
      `}</style>
    </div>
  );
}
