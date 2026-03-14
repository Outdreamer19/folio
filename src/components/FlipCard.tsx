import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface FlipCardProps {
  showHiBubble?: boolean;
}

const FRONT_PLACEHOLDER = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="250" height="380" viewBox="0 0 250 380">
  <rect width="250" height="380" fill="#e8e5e0"/>
  <rect x="55" y="210" width="140" height="170" rx="10" fill="#c8b99a"/>
  <polygon points="90,210 125,240 125,310 55,310 55,210" fill="#b8a080"/>
  <polygon points="160,210 125,240 125,310 195,310 195,210" fill="#b8a080"/>
  <rect x="108" y="210" width="34" height="100" fill="#f0ebe3"/>
  <rect x="108" y="175" width="34" height="45" rx="8" fill="#d4a874"/>
  <ellipse cx="125" cy="148" rx="42" ry="48" fill="#d4a874"/>
  <ellipse cx="125" cy="112" rx="42" ry="22" fill="#3d2b1a"/>
  <rect x="83" y="112" width="84" height="30" fill="#3d2b1a"/>
  <ellipse cx="112" cy="148" rx="5" ry="6" fill="#2a1a0a"/>
  <ellipse cx="138" cy="148" rx="5" ry="6" fill="#2a1a0a"/>
  <ellipse cx="125" cy="163" rx="4" ry="5" fill="#c4946a"/>
  <path d="M113 174 Q125 182 137 174" stroke="#8a5c3a" stroke-width="2" fill="none" stroke-linecap="round"/>
</svg>
`)}`;

const BACK_PLACEHOLDER = `data:image/svg+xml,${encodeURIComponent(`
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

// The hero card: shows portrait (front face), rotateY 0→90 as hero scrolls out
// This hands off seamlessly to the services card which picks up at 90→180
export default function FlipCard({ showHiBubble = true }: FlipCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the hero section leaving the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['center center', 'end start'],
  });

  // As hero scrolls out: card rotates from 0 → 90 (edge-on, handing off to services card)
  const rawRotateY = useTransform(scrollYProgress, [0.4, 1.0], [0, 90]);
  const rawTilt = useTransform(scrollYProgress, [0, 1], [0, 4]);

  const rotateY = useSpring(rawRotateY, { bounce: 0, duration: 800 });
  const tilt = useSpring(rawTilt, { bounce: 0, duration: 800 });

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{ perspective: '1200px' }}
    >
      <motion.div
        // Entrance: card scales + fades in on load
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0, duration: 1, delay: 0.5 }}
        style={{
          rotateY,
          rotate: tilt,
          transformStyle: 'preserve-3d',
          width: 250,
          height: 380,
          position: 'relative',
          boxShadow: '0 24px 60px rgba(0,0,0,0.12)',
          borderRadius: 20,
        }}
      >
        {/* Front face — portrait */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            position: 'absolute',
            inset: 0,
            borderRadius: 20,
            overflow: 'hidden',
          }}
        >
          <img
            src={FRONT_PLACEHOLDER}
            alt="Designer portrait"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* Back face — workspace (rotateY 180° pre-rotated) */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            position: 'absolute',
            inset: 0,
            borderRadius: 20,
            overflow: 'hidden',
          }}
        >
          <img
            src={BACK_PLACEHOLDER}
            alt="Designer workspace"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      </motion.div>

      {/* "Hi" bubble */}
      {showHiBubble && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.8, delay: 1.1 }}
          style={{
            position: 'absolute',
            bottom: -10,
            left: -18,
            width: 80,
            height: 80,
            borderRadius: '99px',
            backgroundColor: 'rgb(94, 103, 230)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            boxShadow: '0 8px 24px rgba(94,103,230,0.35)',
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 32,
              fontWeight: 400,
              color: 'white',
              lineHeight: 1,
            }}
          >
            Hi
          </span>
        </motion.div>
      )}
    </div>
  );
}
