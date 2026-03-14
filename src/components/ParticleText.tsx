import { useEffect, useRef } from 'react';

// ── Particle colour palette ────────────────────────────────────
// Brand indigo + complementary accent pops
const COLORS = [
  'rgb(94,  103, 230)',  // brand indigo
  'rgb(120, 130, 248)',  // soft indigo
  'rgb(160,  92, 235)',  // violet
  'rgb( 56, 189, 248)',  // sky blue
  'rgb( 52, 211, 153)',  // emerald
  'rgb(199, 110, 255)',  // lavender
  'rgb(248, 113, 113)',  // coral accent
];

interface Particle {
  x: number;
  y: number;
  tx: number;  // target x (CSS px)
  ty: number;  // target y (CSS px)
  color: string;
  size: number;
  ease: number;
}

interface ParticleTextProps {
  text: string;
  fontSize?: number;       // CSS px size of text
  letterSpacing?: number;  // extra letter spacing in px
  cssWidth: number;        // canvas CSS width in px
  cssHeight: number;       // canvas CSS height in px
  delay?: number;          // ms before animation fires
  sampleGap?: number;      // sampling resolution (lower = more particles)
}

export default function ParticleText({
  text,
  fontSize = 32,
  letterSpacing = 0.5,
  cssWidth,
  cssHeight,
  delay = 500,
  sampleGap = 1,
}: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let rafId = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const run = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas backing store at DPR for crisp rendering
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      canvas.width  = cssWidth  * dpr;
      canvas.height = cssHeight * dpr;
      ctx.scale(dpr, dpr);

      // ── Off-screen canvas at 4× for dense pixel sampling ──────
      const SCALE = 4;
      const offW = cssWidth  * SCALE;
      const offH = cssHeight * SCALE;
      const off  = document.createElement('canvas');
      off.width  = offW;
      off.height = offH;
      const oc   = off.getContext('2d')!;

      oc.fillStyle = '#ffffff';
      oc.font      = `700 ${fontSize * SCALE}px "Antonio", sans-serif`;
      // letterSpacing is a canvas 2D API (Chrome 99+, Firefox 104+, Safari 17+)
      (oc as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
        `${letterSpacing * SCALE}px`;
      oc.textAlign    = 'center';
      oc.textBaseline = 'middle';
      oc.fillText(text, offW / 2, offH / 2);

      // ── Sample pixels → build particle list ───────────────────
      const imgData  = oc.getImageData(0, 0, offW, offH);
      const gap      = SCALE * sampleGap; // sample every `gap` off-screen pixels
      const particles: Particle[] = [];

      for (let y = 0; y < offH; y += gap) {
        for (let x = 0; x < offW; x += gap) {
          const i = (y * offW + x) * 4;
          if (imgData.data[i + 3] > 110) {
            // Convert from off-screen space → CSS space
            const tx = x / SCALE;
            const ty = y / SCALE;

            particles.push({
              // Start: scattered randomly around the canvas
              x: Math.random() * cssWidth  * 2.2 - cssWidth  * 0.6,
              y: cssHeight / 2 + (Math.random() - 0.5) * cssHeight * 14,
              tx,
              ty,
              color: COLORS[Math.floor(Math.random() * COLORS.length)],
              size: 1.0 + Math.random() * 1.3,
              ease: 0.048 + Math.random() * 0.032, // slightly random convergence speed
            });
          }
        }
      }

      // ── Animation loop ─────────────────────────────────────────
      const animate = () => {
        ctx.clearRect(0, 0, cssWidth, cssHeight);
        let settled = 0;

        for (const p of particles) {
          p.x += (p.tx - p.x) * p.ease;
          p.y += (p.ty - p.y) * p.ease;

          if (Math.abs(p.tx - p.x) < 0.5 && Math.abs(p.ty - p.y) < 0.5) {
            // Snap to target when close enough
            p.x = p.tx;
            p.y = p.ty;
            settled++;
          }

          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        if (settled < particles.length) {
          rafId = requestAnimationFrame(animate);
        }
        // Once fully settled, the canvas shows the static colored-dot text
      };

      timeoutId = setTimeout(() => {
        rafId = requestAnimationFrame(animate);
      }, delay);
    };

    // Wait for Antonio font to be loaded before sampling
    document.fonts.ready.then(run);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [text, fontSize, letterSpacing, cssWidth, cssHeight, delay, sampleGap]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width:   cssWidth,
        height:  cssHeight,
        display: 'block',
      }}
      aria-label={text}
    />
  );
}
