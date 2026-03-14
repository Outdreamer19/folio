import { motion } from 'framer-motion';
import Navbar from './Navbar';
import { ParticleTextEffect } from '@/components/ui/particle-text-effect';
import { AuroraLayer } from '@/components/ui/aurora-background';

const springIn = { type: 'spring' as const, bounce: 0, duration: 1, delay: 0.3 };

export default function HeroSection() {
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
      {/* Aurora background — subtle animated light sweep, top-right quadrant */}
      <AuroraLayer opacity={0.9} />

      {/* Floating navbar */}
      <Navbar />

      {/* ── LEFT: "SHANE BELL" particle name + "SOFTWARE" ── */}
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
          SOFTWARE
        </span>

        {/* Open-to-work pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          style={{
            marginTop:       18,
            display:         'inline-flex',
            alignItems:      'center',
            gap:             8,
            padding:         '7px 16px',
            borderRadius:    999,
            border:          '1px solid rgba(94,103,230,0.25)',
            backgroundColor: 'rgba(94,103,230,0.06)',
          }}
        >
          <span style={{
            width:           7,
            height:          7,
            borderRadius:    '50%',
            backgroundColor: 'rgb(52, 211, 153)',
            boxShadow:       '0 0 6px rgb(52,211,153)',
            flexShrink:      0,
          }} />
          <span style={{
            fontFamily:  "'Inter', sans-serif",
            fontSize:    13,
            fontWeight:  400,
            color:       'rgb(60, 60, 70)',
            whiteSpace:  'nowrap',
          }}>
            Open to remote &amp; hybrid roles · Laravel · Vue · React
          </span>
        </motion.div>
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
