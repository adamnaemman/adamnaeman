'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, Heart, Flame, Rocket, Sparkles, Check, RefreshCw, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GuestbookEntry } from '@/lib/types';
import { INITIAL_GUESTBOOK } from '@/lib/data';
import { supabase } from '@/lib/supabaseClient';

export default function GuestbookSection() {
  const [entries, setEntries] = useState<GuestbookEntry[]>(INITIAL_GUESTBOOK);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [avatarSeed, setAvatarSeed] = useState('Adam');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [mounted, setMounted] = useState(false);

  // Safe client date formatter to avoid SSR hydration mismatches
  const formatDate = (dateString: string) => {
    if (!mounted) {
      return 'Recently';
    }
    try {
      return new Date(dateString).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  // Load live entries from Supabase
  const fetchEntries = async () => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false });

      if (data && data.length > 0) {
        setEntries(data);
      }
    } catch (err) {
      console.warn('Guestbook fetch fallback:', err);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchEntries();
  }, []);

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ff1f82', '#ffee00', '#00f0ff', '#1b45ff', '#aef324'],
      });
    } catch (e) {
      // safe fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitting(true);
    setErrorMsg('');

    const newAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(avatarSeed || name)}`;

    const newEntry: GuestbookEntry = {
      id: 'temp-' + Date.now(),
      name: name.trim(),
      message: message.trim(),
      avatar_url: newAvatar,
      reactions: { heart: 1, fire: 0, rocket: 0 },
      created_at: new Date().toISOString(),
    };

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('guestbook')
          .insert([
            {
              name: newEntry.name,
              message: newEntry.message,
              avatar_url: newEntry.avatar_url,
              reactions: newEntry.reactions,
            },
          ])
          .select();

        if (error) {
          console.warn('Database insert warning, appending locally:', error.message);
          setEntries([newEntry, ...entries]);
        } else if (data && data[0]) {
          setEntries([data[0], ...entries]);
        }
      } catch (err: any) {
        setEntries([newEntry, ...entries]);
      }
    } else {
      // Local state fallback
      setEntries([newEntry, ...entries]);
    }

    setSubmitting(false);
    setSuccess(true);
    setName('');
    setMessage('');
    triggerCelebration();

    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  const handleReaction = async (id: string, type: 'heart' | 'fire' | 'rocket') => {
    setEntries((prev) =>
      prev.map((entry) => {
        if (entry.id === id) {
          const currentCount = entry.reactions?.[type] || 0;
          return {
            ...entry,
            reactions: {
              ...entry.reactions,
              [type]: currentCount + 1,
            },
          };
        }
        return entry;
      })
    );
  };

  const randomizeAvatar = () => {
    const randomSeeds = ['Felix', 'Luna', 'Alex', 'Milo', 'Kira', 'Nova', 'Zack', 'Leo', 'Maya'];
    const random = randomSeeds[Math.floor(Math.random() * randomSeeds.length)] + Math.floor(Math.random() * 100);
    setAvatarSeed(random);
  };

  return (
    <section id="guestbook" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">// COMMUNITY GRAFFITI & SIGNATURE BOARD</span>
          <h2 className="section-title">
            Tag The <span className="gradient-text">Graffiti Wall</span>
          </h2>
          <p className="section-subtitle">
            Leave a friendly message, stamp your tag, or drop feedback. All signatures synchronize in real-time with our Supabase PostgreSQL database.
          </p>
        </div>

        <div className="bento-grid">
          
          {/* Left Column: Signature Form (span 5) */}
          <div className="bento-col-5">
            <div
              className="brutal-card guestbook-form-card"
              style={{
                padding: '32px',
                position: 'sticky',
                top: '100px',
                background: '#ffffff',
              }}
            >
              <div className="sticker-tape">
                DROP YOUR SIGNATURE
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Zap size={22} color="var(--pop-pink)" />
                  <h3 style={{ fontFamily: 'var(--font-bubble)', fontSize: '1.35rem', color: 'var(--ink-black)' }}>
                    Leave Your Mark
                  </h3>
                </div>

                {/* Avatar preview + randomize */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(avatarSeed)}`}
                    alt="Avatar preview"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'var(--pop-yellow)',
                      border: '2px solid var(--ink-black)',
                    }}
                  />
                  <button
                    type="button"
                    onClick={randomizeAvatar}
                    title="Randomize Avatar"
                    className="btn-ghost"
                    style={{ padding: '6px', borderRadius: '50%', width: '32px', height: '32px' }}
                  >
                    <RefreshCw size={14} />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      color: 'var(--ink-black)',
                      marginBottom: '6px',
                    }}
                  >
                    YOUR NAME OR HANDLE
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (e.target.value.trim()) setAvatarSeed(e.target.value.trim());
                    }}
                    placeholder="e.g. PixelSurfer or Elena"
                    className="form-input"
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      color: 'var(--ink-black)',
                      marginBottom: '6px',
                    }}
                  >
                    YOUR MESSAGE
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Drop a quote, say hi, or share what you think of the art!"
                    className="form-textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
                >
                  {submitting ? (
                    'TAGGING SUPABASE...'
                  ) : success ? (
                    <>
                      <Check size={20} /> TAG RECORDED!
                    </>
                  ) : (
                    <>
                      <Send size={18} /> SIGN THE WALL ⚡
                    </>
                  )}
                </button>

                {success && (
                  <div
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--pop-yellow)',
                      border: '2px solid var(--ink-black)',
                      boxShadow: '3px 3px 0px var(--ink-black)',
                      color: 'var(--ink-black)',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.9rem',
                      textAlign: 'center',
                      fontWeight: 800,
                    }}
                  >
                    🎉 BOOM! Your tag is live on the graffiti board.
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Right Column: Feed of Messages (span 7) */}
          <div className="bento-col-7">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {entries.map((entry, idx) => (
                <div
                  key={entry.id}
                  className="brutal-card"
                  style={{
                    padding: '22px 26px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    transform: idx % 2 === 0 ? 'rotate(-0.4deg)' : 'rotate(0.4deg)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <img
                        src={entry.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(entry.name)}`}
                        alt={entry.name}
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '50%',
                          background: 'var(--pop-yellow)',
                          border: '2.5px solid var(--ink-black)',
                          boxShadow: '2px 2px 0px var(--ink-black)',
                        }}
                      />
                      <div>
                        <div
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 800,
                            fontSize: '1.05rem',
                            color: 'var(--ink-black)',
                          }}
                        >
                          {entry.name}
                        </div>
                        <div
                          suppressHydrationWarning
                          style={{
                            fontSize: '0.75rem',
                            color: 'var(--text-muted)',
                            fontFamily: 'var(--font-pixel)',
                          }}
                        >
                          {formatDate(entry.created_at)}
                        </div>
                      </div>
                    </div>

                    <span
                      style={{
                        fontSize: '0.65rem',
                        padding: '3px 10px',
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--bg-acid)',
                        color: 'var(--ink-black)',
                        border: '2px solid var(--ink-black)',
                        boxShadow: '2px 2px 0px var(--ink-black)',
                        fontFamily: 'var(--font-pixel)',
                        fontWeight: 700,
                      }}
                    >
                      VERIFIED
                    </span>
                  </div>

                  {/* Message Content */}
                  <p
                    style={{
                      color: 'var(--ink-black)',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '1rem',
                      lineHeight: 1.6,
                    }}
                  >
                    {entry.message}
                  </p>

                  {/* Reaction Buttons */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      paddingTop: '10px',
                      borderTop: '2px dashed var(--ink-black)',
                    }}
                  >
                    <button
                      onClick={() => handleReaction(entry.id, 'heart')}
                      className="btn-ghost"
                      style={{
                        padding: '5px 12px',
                        fontSize: '0.85rem',
                        gap: '6px',
                        borderRadius: 'var(--radius-full)',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                      }}
                    >
                      <Heart size={15} color="#ff1f82" fill="#ff1f82" />
                      <span>{entry.reactions?.heart || 0}</span>
                    </button>

                    <button
                      onClick={() => handleReaction(entry.id, 'fire')}
                      className="btn-ghost"
                      style={{
                        padding: '5px 12px',
                        fontSize: '0.85rem',
                        gap: '6px',
                        borderRadius: 'var(--radius-full)',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                      }}
                    >
                      <Flame size={15} color="#ff5900" fill="#ff5900" />
                      <span>{entry.reactions?.fire || 0}</span>
                    </button>

                    <button
                      onClick={() => handleReaction(entry.id, 'rocket')}
                      className="btn-ghost"
                      style={{
                        padding: '5px 12px',
                        fontSize: '0.85rem',
                        gap: '6px',
                        borderRadius: 'var(--radius-full)',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                      }}
                    >
                      <Rocket size={15} color="#1b45ff" fill="#1b45ff" />
                      <span>{entry.reactions?.rocket || 0}</span>
                    </button>
                  </div>
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
