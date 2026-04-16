import { motion } from 'framer-motion';
import Navbar from './Navbar';
import { ParticleTextEffect } from '@/components/ui/particle-text-effect';
import { AuroraLayer } from '@/components/ui/aurora-background';
import { useIsMobile } from '../hooks/useIsMobile';

const springIn = { type: 'spring' as const, bounce: 0, duration: 1, delay: 0.3 };

export default function HeroSection() {
  const isMobile = useIsMobile();

  return (
    <section
      id="hero"
      style={{
        position:        'relative',
        width:           '100%',
        minHeight:       isMobile ? '100svh' : '100vh',
        height:          isMobile ? 'auto' : '100vh',
        backgroundColor: '#ffffff',
        overflow:        'hidden',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
      }}
    >
      <AuroraLayer opacity={0.9} />
      <Navbar />

      {/* Dot-grid background */}
      <div style={{
        position:        'absolute',
        inset:           0,
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(94,103,230,0.06) 1px, transparent 0)',
        backgroundSize:  '40px 40px',
        pointerEvents:   'none',
        zIndex:          1,
      }} />

      {isMobile ? (
        /* ── MOBILE: stacked flex layout ── */
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', bounce: 0, duration: 1, delay: 0.2 }}
          style={{
            position:      'relative',
            zIndex:        20,
            display:       'flex',
            flexDirection: 'column',
            alignItems:    'flex-start',
            padding:       '110px 24px 60px',
            width:         '100%',
            boxSizing:     'border-box',
            gap:           0,
          }}
        >
          {/* SHANE BELL particle text */}
          <div style={{ width: '100%', maxWidth: 340, marginBottom: 2 }}>
            <ParticleTextEffect
              words={['SHANE BELL']}
              internalWidth={420}
              internalHeight={90}
              fontSizePx={66}
              fontFamily="'Antonio', sans-serif"
            />
          </div>

          {/* SOFTWARE ENGINEER stacked */}
          <span style={{
            fontFamily:    "'Antonio', sans-serif",
            fontSize:      'clamp(52px, 14vw, 72px)',
            fontWeight:    700,
            color:         'rgb(48, 48, 48)',
            textTransform: 'uppercase',
            lineHeight:    0.9,
            letterSpacing: '-0.02em',
            display:       'block',
          }}>
            SOFTWARE
          </span>
          <span style={{
            fontFamily:    "'Antonio', sans-serif",
            fontSize:      'clamp(52px, 14vw, 72px)',
            fontWeight:    700,
            color:         'rgb(48, 48, 48)',
            textTransform: 'uppercase',
            lineHeight:    0.9,
            letterSpacing: '-0.02em',
            display:       'block',
            marginBottom:  20,
          }}>
            ENGINEER
          </span>

          {/* Subtitle */}
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize:   15,
            fontWeight: 300,
            color:      'rgb(48, 48, 48)',
            lineHeight: 1.5,
            marginBottom: 20,
            maxWidth:   320,
          }}>
            UK-based software engineer building scalable full-stack web applications
          </span>

          {/* Open-to-work pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            style={{
              display:         'inline-flex',
              alignItems:      'center',
              gap:             8,
              padding:         '7px 14px',
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
              fontFamily: "'Inter', sans-serif",
              fontSize:   12,
              fontWeight: 400,
              color:      'rgb(60, 60, 70)',
            }}>
              Open to remote &amp; hybrid · Laravel · Vue · React
            </span>
          </motion.div>
        </motion.div>
      ) : (
        /* ── DESKTOP: original absolute layout ── */
        <>
          {/* LEFT: "SHANE BELL" particle name + "SOFTWARE" */}
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

          {/* RIGHT: "ENGINEER" + subtitle */}
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
        </>
      )}
    </section>
  );
}
