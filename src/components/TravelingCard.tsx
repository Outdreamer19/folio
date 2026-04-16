import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

// ── Images ────────────────────────────────────────────────────
const FRONT = '/shane-bell.jpg';

const BACK = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="250" height="380" viewBox="0 0 250 380">
  <rect width="250" height="380" fill="#1a1a2e"/>
  <rect x="0" y="260" width="250" height="120" fill="#2d2d2d"/>
  <rect x="112" y="220" width="26" height="40" fill="#444"/>
  <rect x="90" y="258" width="70" height="8" rx="2" fill="#444"/>
  <rect x="40" y="120" width="170" height="110" rx="8" fill="#111"/>
  <rect x="45" y="125" width="160" height="100" rx="5" fill="#0f0f23"/>
  <rect x="50" y="130" width="70" height="40" rx="4" fill="#5e67e6"/>
  <rect x="50" y="175" width="40" height="20" rx="3" fill="#e67e5e"/>
  <rect x="95" y="175" width="25" height="20" rx="3" fill="#5ee6a0"/>
  <rect x="128" y="130" width="72" height="90" rx="4" fill="#2a2a4a"/>
  <circle cx="155" cy="165" r="22" fill="#e6c45e" opacity="0.8"/>
  <circle cx="175" cy="155" r="15" fill="#5e67e6" opacity="0.7"/>
  <rect x="185" y="200" width="18" height="30" rx="3" fill="#8B4513"/>
  <circle cx="194" cy="195" r="16" fill="#2d7a2d"/>
  <circle cx="183" cy="202" r="10" fill="#3a9a3a"/>
  <circle cx="205" cy="202" r="10" fill="#3a9a3a"/>
  <rect x="10" y="60" width="100" height="6" fill="#8B6914"/>
  <rect x="10" y="30" width="50" height="26" rx="3" fill="#c49a6c" opacity="0.7"/>
  <rect x="65" y="40" width="20" height="16" rx="2" fill="#6c8bc4" opacity="0.7"/>
  <rect x="88" y="38" width="18" height="18" rx="2" fill="#c46c6c" opacity="0.7"/>
  <rect x="20" y="240" width="30" height="20" rx="3" fill="#5e67e6" opacity="0.8"/>
  <circle cx="230" cy="253" r="10" fill="#e6c45e" opacity="0.6"/>
</svg>
`)}`;

// ── Easing helpers ────────────────────────────────────────────
function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
function lerp(p: number, p0: number, p1: number, v0: number, v1: number): number {
  if (p <= p0) return v0;
  if (p >= p1) return v1;
  return v0 + easeInOut((p - p0) / (p1 - p0)) * (v1 - v0);
}

// ── Responsive card size ──────────────────────────────────────
function getCardSize(vw: number) {
  if (vw >= 1440) return { w: 340, h: 510 };
  if (vw >= 1280) return { w: 310, h: 465 };
  if (vw >= 1024) return { w: 285, h: 430 };
  if (vw >= 768)  return { w: 268, h: 404 };
  return                 { w: 250, h: 380 };
}

// ── Component ─────────────────────────────────────────────────
export default function TravelingCard() {
  const isMobile = useIsMobile();

  // Both raw pixel scrollY (for natural scroll-out) and progress (for breakpoints/flips)
  const { scrollY, scrollYProgress } = useScroll();

  // ── Responsive card dimensions ────────────────────────────
  const [card, setCard] = useState(() => getCardSize(window.innerWidth));
  useLayoutEffect(() => {
    const onResize = () => setCard(getCardSize(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // ── Measurements ─────────────────────────────────────────
  // heroExit / servicesExit as progress fractions (for X + flip)
  // alignScrollY = the exact scrollY pixel where About Me's centre aligns with viewport centre
  const breaksRef = useRef({ heroExit: 0.18, servicesExit: 0.42 });
  const rightOffsetRef  = useRef(285);
  const alignScrollYRef = useRef(9999); // scrollY px where About Me centre = viewport centre

  useLayoutEffect(() => {
    const calc = () => {
      const heroEl     = document.getElementById('hero');
      const servicesEl = document.getElementById('services');
      const aboutEl    = document.getElementById('about');
      if (!heroEl || !servicesEl || !aboutEl) return;

      const totalScroll = document.body.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;

      const heroH     = heroEl.offsetHeight;
      const servicesH = servicesEl.offsetHeight;
      const aboutH    = aboutEl.offsetHeight;

      breaksRef.current = {
        heroExit:     heroH / totalScroll,
        servicesExit: (heroH + servicesH) / totalScroll,
      };

      // The scroll position at which About Me's vertical centre
      // sits exactly at the viewport's vertical centre.
      // After this point every 1px of scroll = 1px of card upward travel.
      const aboutCentreDoc    = heroH + servicesH + aboutH / 2;
      alignScrollYRef.current = aboutCentreDoc - window.innerHeight / 2;

      rightOffsetRef.current = Math.round(Math.min(window.innerWidth * 0.205, 300));
    };

    const id = requestAnimationFrame(calc);
    window.addEventListener('resize', calc);
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', calc); };
  }, []);

  // ── Card X ────────────────────────────────────────────────
  const rawX = useTransform(scrollYProgress, (p) => {
    const { heroExit } = breaksRef.current;
    return lerp(p, heroExit * 0.60, heroExit, 0, rightOffsetRef.current);
  });

  // ── Card Y — natural scroll-out with About Me ─────────────
  // y = 0 while About Me centre hasn't reached viewport centre yet.
  // Once it does, every scroll pixel drives 1px upward — card rides
  // off the top exactly as if it were in the document flow.
  const rawY = useTransform(scrollY, (sy) => {
    const alignY = alignScrollYRef.current;
    if (sy <= alignY) return 0;
    return -(sy - alignY); // 1 : 1 pixel tracking — NO spring here
  });

  // ── Card rotateY ─────────────────────────────────────────
  // Flip 1 portrait → workspace : last 40% of hero      (0° → 180°)
  // Flip 2 workspace → portrait : within Services section (180° → 360°)
  const rawRotateY = useTransform(scrollYProgress, (p) => {
    const { heroExit, servicesExit } = breaksRef.current;

    const flip1Start = heroExit * 0.60;
    const flip1End   = heroExit;

    const flip2Start = heroExit + (servicesExit - heroExit) * 0.35;
    const flip2End   = heroExit + (servicesExit - heroExit) * 0.80;

    if (p <= flip1Start) return 0;
    if (p <= flip1End)   return lerp(p, flip1Start, flip1End, 0, 180);
    if (p <= flip2Start) return 180;
    if (p <= flip2End)   return lerp(p, flip2Start, flip2End, 180, 360);
    return 360;
  });

  const rawTilt = useTransform(scrollYProgress, [0, 0.5, 1], [0, 5, 2]);

  // Springs — rotateY and tilt only; Y must NOT be sprung (needs 1:1 tracking)
  const rotateY = useSpring(rawRotateY, { bounce: 0, duration: 500 });
  const tilt    = useSpring(rawTilt,    { bounce: 0, duration: 1000 });

  // "Hi" bubble fades out as card starts moving right
  const hiOpacity = useTransform(rawX, [0, 70], [1, 0]);

  const halfW = card.w / 2;
  const halfH = card.h / 2;

  // Hide the fixed scroll-driven card on mobile — it breaks the layout
  if (isMobile) return null;

  return (
    // Entrance: scale up only.
    // Opacity is NOT set here — card is always visible while on-screen.
    // Exit is purely positional: rawY carries it off the top of the viewport.
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', bounce: 0, duration: 1, delay: 0.5 }}
      style={{
        position:      'fixed',
        left:          '50%',
        top:           '50%',
        marginLeft:    -halfW,
        marginTop:     -halfH,
        x:             rawX,
        y:             rawY,   // ← drives natural scroll-out
        rotate:        tilt,
        zIndex:        50,
        pointerEvents: 'none',
      }}
    >
      {/* Perspective wrapper */}
      <div style={{ width: card.w, height: card.h, perspective: '1200px', position: 'relative' }}>

        <motion.div
          style={{
            rotateY,
            transformStyle: 'preserve-3d',
            width:        '100%',
            height:       '100%',
            position:     'relative',
            borderRadius: 20,
            boxShadow:    '0 24px 64px rgba(0,0,0,0.14)',
          }}
        >
          {/* ── Front face — portrait ── */}
          <div style={{
            backfaceVisibility:       'hidden',
            WebkitBackfaceVisibility: 'hidden',
            position:     'absolute',
            inset:        0,
            borderRadius: 20,
            overflow:     'hidden',
          }}>
            <img
              src={FRONT}
              alt="Shane Bell portrait"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
            />
          </div>

          {/* ── Back face — workspace (pre-rotated 180°) ── */}
          <div style={{
            backfaceVisibility:       'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform:    'rotateY(180deg)',
            position:     'absolute',
            inset:        0,
            borderRadius: 20,
            overflow:     'hidden',
          }}>
            <img
              src={BACK}
              alt="Developer workspace"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </motion.div>

        {/* ── "Hi" bubble — hero only ── */}
        <motion.div
          style={{
            opacity:         hiOpacity,
            position:        'absolute',
            bottom:          -10,
            left:            -18,
            width:           80,
            height:          80,
            borderRadius:    '99px',
            backgroundColor: 'rgb(94, 103, 230)',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            boxShadow:       '0 8px 24px rgba(94,103,230,0.35)',
            zIndex:          10,
          }}
        >
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 32, fontWeight: 400, color: 'white', lineHeight: 1 }}>
            Hi
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
