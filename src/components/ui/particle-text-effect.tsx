import { useEffect, useRef } from 'react';

// ── Brand colour palette ─────────────────────────────────────────────────────
interface RGB { r: number; g: number; b: number }

const BRAND_COLORS: RGB[] = [
  { r: 94,  g: 103, b: 230 },
  { r: 120, g: 130, b: 248 },
  { r: 160, g:  92, b: 235 },
  { r:  56, g: 189, b: 248 },
  { r:  52, g: 211, b: 153 },
  { r: 199, g: 110, b: 255 },
  { r: 248, g: 113, b: 113 },
];

function lerpColor(a: RGB, b: RGB, t: number): RGB {
  return {
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
  };
}

function randomExitPos(cx: number, cy: number): { x: number; y: number } {
  const angle = Math.random() * Math.PI * 2;
  const mag   = (cx + cy) * 1.2;
  return { x: cx + Math.cos(angle) * mag, y: cy + Math.sin(angle) * mag };
}

// ── Physics particle ─────────────────────────────────────────────────────────
class Particle {
  x = 0; y = 0;
  vx = 0; vy = 0;
  tx = 0; ty = 0;
  maxSpeed  = 6;
  maxForce  = 0.3;
  fromColor: RGB = { r: 0, g: 0, b: 0 };
  toColor:   RGB = { r: 0, g: 0, b: 0 };
  cw        = 0;
  blendRate = 0.015;
  dead      = false;

  move() {
    const dx   = this.tx - this.x;
    const dy   = this.ty - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const prox = dist < 80 ? dist / 80 : 1;
    const spd  = this.maxSpeed * prox;

    // Steering towards target
    const sx0 = (dx / dist) * spd - this.vx;
    const sy0 = (dy / dist) * spd - this.vy;
    const sm  = Math.sqrt(sx0 * sx0 + sy0 * sy0) || 1;
    const cap = Math.min(sm, this.maxForce) / sm;
    this.vx += sx0 * cap;
    this.vy += sy0 * cap;
    this.x  += this.vx;
    this.y  += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.cw = Math.min(this.cw + this.blendRate, 1);
    const c = lerpColor(this.fromColor, this.toColor, this.cw);
    ctx.fillStyle = `rgb(${Math.round(c.r)},${Math.round(c.g)},${Math.round(c.b)})`;
    ctx.fillRect(this.x, this.y, 2, 2);
  }
}

// ── Component props ──────────────────────────────────────────────────────────
export interface ParticleTextEffectProps {
  words?:         string[];
  internalWidth?: number;
  internalHeight?: number;
  fontSizePx?:    number;
  fontFamily?:    string;
}

const PIXEL_STEP = 5;

export function ParticleTextEffect({
  words         = ['SHANE BELL'],
  internalWidth  = 800,
  internalHeight = 155,
  fontSizePx     = 105,
  fontFamily     = "'Antonio', sans-serif",
}: ParticleTextEffectProps) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const animRef    = useRef<number>(0);
  const particles  = useRef<Particle[]>([]);
  const frameCount = useRef(0);
  const wordIdx    = useRef(0);
  const wordsRef   = useRef(words);
  wordsRef.current = words;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width  = internalWidth;
    canvas.height = internalHeight;

    // ── Render word onto an off-screen canvas, sample opaque pixels ──────────
    function showWord(word: string) {
      const off = document.createElement('canvas');
      off.width  = internalWidth;
      off.height = internalHeight;
      const oc   = off.getContext('2d')!;

      oc.fillStyle    = 'white';
      oc.font         = `bold ${fontSizePx}px ${fontFamily}`;
      oc.textAlign    = 'center';
      oc.textBaseline = 'middle';
      oc.fillText(word, internalWidth / 2, internalHeight / 2);

      const data = oc.getImageData(0, 0, internalWidth, internalHeight).data;
      const list = particles.current;
      let   pi   = 0;

      // Collect & shuffle pixel positions for organic-looking emergence
      const coords: number[] = [];
      for (let i = 0; i < data.length; i += PIXEL_STEP * 4) coords.push(i);
      for (let i = coords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [coords[i], coords[j]] = [coords[j], coords[i]];
      }

      for (const ci of coords) {
        if (data[ci + 3] < 1) continue;

        const px  = (ci / 4) % internalWidth;
        const py  = Math.floor(ci / 4 / internalWidth);
        const col = BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)];

        let p: Particle;
        if (pi < list.length) {
          p = list[pi]; p.dead = false; pi++;
        } else {
          p = new Particle();
          const rp = randomExitPos(internalWidth / 2, internalHeight / 2);
          p.x          = rp.x;
          p.y          = rp.y;
          p.maxSpeed   = Math.random() * 5 + 3;
          p.maxForce   = p.maxSpeed * 0.05;
          p.blendRate  = Math.random() * 0.025 + 0.005;
          list.push(p);
        }

        // Transition colour from current → new
        p.fromColor = lerpColor(p.fromColor, p.toColor, p.cw);
        p.toColor   = col;
        p.cw        = 0;
        p.tx        = px;
        p.ty        = py;
      }

      // Eject unused particles off-screen
      for (let i = pi; i < list.length; i++) {
        const p = list[i];
        if (!p.dead) {
          const rp = randomExitPos(internalWidth / 2, internalHeight / 2);
          p.tx        = rp.x;
          p.ty        = rp.y;
          p.fromColor = lerpColor(p.fromColor, p.toColor, p.cw);
          p.toColor   = { r: 0, g: 0, b: 0 };
          p.cw        = 0;
          p.dead      = true;
        }
      }
    }

    // ── Animation loop ────────────────────────────────────────────────────────
    function animate() {
      const ctx  = (canvas as HTMLCanvasElement).getContext('2d')!;
      const list = particles.current;

      ctx.clearRect(0, 0, internalWidth, internalHeight);

      for (let i = list.length - 1; i >= 0; i--) {
        const p = list[i];
        p.move();
        p.draw(ctx);
        if (p.dead) {
          const ox = p.x < -20 || p.x > internalWidth  + 20;
          const oy = p.y < -20 || p.y > internalHeight + 20;
          if (ox || oy) list.splice(i, 1);
        }
      }

      // Auto-cycle words (only if multiple words provided)
      frameCount.current++;
      const ws = wordsRef.current;
      if (frameCount.current % 320 === 0 && ws.length > 1) {
        wordIdx.current = (wordIdx.current + 1) % ws.length;
        showWord(ws[wordIdx.current]);
      }

      animRef.current = requestAnimationFrame(animate);
    }

    // Wait for Antonio font before sampling pixels
    document.fonts.ready.then(() => {
      showWord(wordsRef.current[0]);
      animate();
    });

    return () => { cancelAnimationFrame(animRef.current); };
  }, [internalWidth, internalHeight, fontSizePx, fontFamily]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', width: '100%', height: 'auto' }}
      aria-label={words[0]}
    />
  );
}
