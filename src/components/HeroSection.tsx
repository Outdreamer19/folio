import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import { ParticleTextEffect } from '@/components/ui/particle-text-effect';

const springIn = { type: 'spring' as const, bounce: 0, duration: 1, delay: 0.3 };

export default function HeroSection() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <section
      id="hero"
      style={{
        position:        'relative',
        width:           '100%',
        height:          '100vh',
        minHeight:       700,
        backgroundColor: '#ffffff',
        overflow:        'hidden',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
      }}
    >
      {/* Floating navbar */}
      <Navbar />

      {/* ── LEFT: "SHANE BELL" particle name + "DIGITAL" ── */}
      <motion.div
        initial={{ x: -150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={springIn}
        style={{
          position:      'absolute',
          left:          'clamp(24px, 5vw, 80px)',
          top:           '50%',
          transform:     'translateY(-50%)',
          zIndex:        20,
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'flex-start',
          gap:           0,
        }}
      >
        {/* Physics particle text — brand colours converge on load */}
        <div style={{ width: 'clamp(280px, 34vw, 510px)', marginBottom: 4 }}>
          <ParticleTextEffect
            words={['SHANE BELL']}
            internalWidth={600}
            internalHeight={130}
            fontSizePx={94}
            fontFamily="'Antonio', sans-serif"
          />
        </div>

        <span style={{
          fontFamily:    "'Antonio', sans-serif",
          fontSize:      'clamp(72px, 9.5vw, 118px)',
          fontWeight:    700,
          color:         'rgb(48, 48, 48)',
          textTransform: 'uppercase',
          lineHeight:    0.9,
          letterSpacing: '-0.02em',
        }}>
          DIGITAL
        </span>
      </motion.div>

      {/* ── CENTER: dark mode toggle ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        style={{
          position:      'absolute',
          bottom:        60,
          left:          '50%',
          transform:     'translateX(-50%)',
          zIndex:        20,
          display:       'flex',
          alignItems:    'center',
          gap:           10,
        }}
      >
        {/* Sun */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="rgb(48,48,48)" strokeWidth="2">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1"  x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1"  y1="12" x2="3"  y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36"/>
          <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
        </svg>

        {/* Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle dark mode"
          style={{
            position:        'relative',
            display:         'inline-flex',
            alignItems:      'center',
            width:           52,
            height:          28,
            backgroundColor: darkMode ? 'rgb(94, 103, 230)' : '#e2e2e2',
            borderRadius:    999,
            padding:         3,
            border:          'none',
            cursor:          'pointer',
            transition:      'background-color 0.25s ease',
          }}
        >
          <motion.div
            animate={{ x: darkMode ? 24 : 0 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            style={{
              width:           22,
              height:          22,
              backgroundColor: 'white',
              borderRadius:    '50%',
              boxShadow:       '0 1px 4px rgba(0,0,0,0.18)',
            }}
          />
        </button>

        {/* Moon */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="rgb(48,48,48)" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </motion.div>

      {/* ── RIGHT: "ENGINEER" + subtitle ── */}
      <motion.div
        initial={{ x: 150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={springIn}
        style={{
          position:      'absolute',
          right:         'clamp(24px, 5vw, 80px)',
          bottom:        80,
          zIndex:        20,
          textAlign:     'right',
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'flex-end',
          gap:           8,
        }}
      >
        <span style={{
          fontFamily:    "'Antonio', sans-serif",
          fontSize:      'clamp(72px, 9.5vw, 118px)',
          fontWeight:    700,
          color:         'rgb(48, 48, 48)',
          textTransform: 'uppercase',
          lineHeight:    0.9,
          letterSpacing: '-0.02em',
        }}>
          ENGINEER
        </span>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize:   16,
          fontWeight: 300,
          color:      'rgb(48, 48, 48)',
          maxWidth:   300,
          lineHeight: 1.5,
        }}>
          UK-based software engineer building scalable full-stack web applications
        </span>
      </motion.div>

      {/* Dot-grid background texture */}
      <div style={{
        position:        'absolute',
        inset:           0,
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(94,103,230,0.06) 1px, transparent 0)',
        backgroundSize:  '40px 40px',
        pointerEvents:   'none',
        zIndex:          1,
      }} />
    </section>
  );
}
