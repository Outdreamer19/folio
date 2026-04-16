import { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { projects } from '../data/projects';

// ── Hardcoded data per slug ───────────────────────────────────────────────────

type Stat = { value: string; label: string };

const STATS: Record<string, Stat[]> = {
  invoicefeed: [
    { value: '10K+', label: 'Invoices Created' },
    { value: '2.5K+', label: 'Users' },
    { value: '98%', label: 'Payment Rate' },
    { value: '6 wks', label: 'Build Time' },
  ],
  'blendable-ai': [
    { value: '5+', label: 'AI Models' },
    { value: 'Enterprise', label: 'Ready' },
    { value: 'Stripe', label: 'Billing Live' },
    { value: '8 wks', label: 'Build Time' },
  ],
  'hardball-smokehouse': [
    { value: '4.9★', label: 'Rating' },
    { value: '1000+', label: 'Customers' },
    { value: '50+', label: 'Menu Items' },
    { value: '4 wks', label: 'Build Time' },
  ],
  'shanebell-dev': [
    { value: '5', label: 'Projects Live' },
    { value: 'React 19', label: 'Stack' },
    { value: 'Vercel', label: 'Deployed' },
    { value: '3 wks', label: 'Build Time' },
  ],
  'pitchfast': [
    { value: '30s', label: 'Per Proposal' },
    { value: '3', label: 'Tone Modes' },
    { value: 'GPT-4o', label: 'Powered' },
    { value: '3 wks', label: 'Build Time' },
  ],
};

type Step = { title: string; description: string };

const STEPS: Record<string, Step[]> = {
  invoicefeed: [
    { title: 'Schema Design', description: 'Designed the relational data model covering invoices, clients, line-items and payment records with careful attention to edge cases.' },
    { title: 'Auth + API', description: 'Built multi-role authentication with Laravel Breeze and wired up the REST API layer for all invoice operations.' },
    { title: 'Vue Frontend', description: 'Developed the Vue 3 reactive UI with Inertia.js, giving it a real-time feel without a separate API layer.' },
    { title: 'Stripe + Deploy', description: 'Integrated Stripe for one-time and subscription payments, then set up CI/CD on Digital Ocean via Laravel Forge.' },
  ],
  'blendable-ai': [
    { title: 'AI Abstraction Layer', description: 'Built a unified interface that normalises requests and responses across different AI provider APIs.' },
    { title: 'Multi-model Routing', description: 'Implemented intelligent request routing with streaming support to keep the UI responsive across providers.' },
    { title: 'Personas + Workspace', description: 'Added the custom persona engine with knowledge base attachments, plus team workspace management.' },
    { title: 'Billing + Horizon', description: 'Wired in Stripe billing with per-user usage tracking and Laravel Horizon for queue management.' },
  ],
  'hardball-smokehouse': [
    { title: 'Requirements + Wireframes', description: 'Worked closely with the owner to map out the booking flow, admin needs and customer-facing experience.' },
    { title: 'Laravel Backend + Admin', description: 'Built the reservation system, events board and the full admin CRUD dashboard the team uses daily.' },
    { title: 'Customer Frontend', description: 'Designed and built the marketing site with light/dark theme, contact forms and newsletter integration.' },
    { title: 'Deploy + Handoff', description: 'Deployed and handed off with full documentation so non-technical staff can run it independently.' },
  ],
  'shanebell-dev': [
    { title: 'Design Direction', description: 'Settled on a dark, typographic aesthetic with cyan as the accent — prioritising readability and motion over decoration.' },
    { title: 'Component Architecture', description: 'Built the core components: TravelingCard with spring physics, custom cursor system, animated navbar overlay, and project card grid.' },
    { title: 'Animation System', description: 'Wired up Framer Motion for scroll-driven entrances, page transitions, the particle text hero and the fullscreen menu stagger.' },
    { title: 'Polish + Deploy', description: 'Iterated on performance, fixed z-index layering, added mix-blend-mode cursor visibility, then shipped via Vercel with CI/CD on GitHub.' },
  ],
  'pitchfast': [
    { title: 'Prompt Engineering Research', description: 'Researched and iterated on prompt structures to get AI output that sounds human and actually tailored.' },
    { title: 'Laravel API + OpenAI Integration', description: 'Built the backend with GPT-4o mini integration, tone modifiers and structured prompt injection.' },
    { title: 'Vue Marketing Page', description: 'Built the full marketing landing page: hero, features, how-it-works, pricing and testimonials.' },
    { title: 'PDF Export + Polish', description: 'Added PDF generation and copy-to-clipboard, then polished the glassmorphism UI with shimmer skeletons.' },
  ],
};

// ── Count-up stat item ────────────────────────────────────────────────────────

function StatItem({ stat, color, inView }: { stat: Stat; color: string; inView: boolean }) {
  const [displayed, setDisplayed] = useState(stat.value);
  const hasAnimated = useRef(false);

  const numericMatch = stat.value.match(/^(\d+\.?\d*)/);
  const numericPart = numericMatch ? parseFloat(numericMatch[1]) : null;
  const suffix = numericPart !== null ? stat.value.slice(numericMatch![0].length) : '';
  const isNumeric = numericPart !== null;

  useEffect(() => {
    if (!inView) return;
    if (!isNumeric) { setDisplayed(stat.value); return; }
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const steps = 40;
    const interval = 1200 / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const eased = 1 - Math.pow(1 - step / steps, 3);
      const current = numericPart! * eased;
      const formatted =
        numericPart! >= 100
          ? Math.round(current).toLocaleString()
          : numericPart! % 1 !== 0
          ? current.toFixed(1)
          : Math.round(current).toString();
      setDisplayed(formatted + suffix);
      if (step >= steps) { clearInterval(timer); setDisplayed(stat.value); }
    }, interval);
    return () => clearInterval(timer);
  }, [inView, isNumeric, numericPart, stat.value, suffix]);

  return (
    <div style={{ textAlign: 'center', padding: '0 24px' }}>
      <div style={{ fontFamily: "'Antonio', sans-serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color, lineHeight: 1, marginBottom: '8px' }}>
        {displayed}
      </div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
        {stat.label}
      </div>
    </div>
  );
}

// ── Word-by-word animated title ───────────────────────────────────────────────

function AnimatedTitle({ title, titleStyle }: { title: string; titleStyle: React.CSSProperties }) {
  const words = title.split(' ');
  return (
    <div style={{ ...titleStyle, display: 'flex', flexWrap: 'wrap' }}>
      {words.map((word, i) => (
        <div key={i} style={{ overflow: 'hidden', display: 'inline-block', marginRight: '0.25em' }}>
          <motion.span
            initial={{ y: 48 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.05, ease: [0.22, 1, 0.36, 1] as const }}
            style={{ display: 'inline-block' }}
          >
            {word}
          </motion.span>
        </div>
      ))}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => { if (!project) navigate('/projects'); }, [project, navigate]);

  const statsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const screenshotsRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const statsInView = useInView(statsRef, { once: true, margin: '-80px' });
  const aboutInView = useInView(aboutRef, { once: true, margin: '-80px' });
  const featuresInView = useInView(featuresRef, { once: true, margin: '-80px' });
  const screenshotsInView = useInView(screenshotsRef, { once: true, margin: '-80px' });
  const techInView = useInView(techRef, { once: true, margin: '-80px' });
  const stepsInView = useInView(stepsRef, { once: true, margin: '-80px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' });

  if (!project) return null;

  const stats = STATS[project.slug] ?? STATS['invoicefeed'];
  const steps = STEPS[project.slug] ?? STEPS['invoicefeed'];
  const ctaWords = ['See', 'It', 'Live', '→'];

  const overline = (text: string, color: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
      <div style={{ width: '32px', height: '2px', backgroundColor: color, flexShrink: 0 }} />
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color }}>
        {text}
      </span>
    </div>
  );

  const browserDots = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
      <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f57' }} />
      <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#febc2e' }} />
      <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#28c840' }} />
      <div style={{ flex: 1, height: '22px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '4px', marginLeft: '8px' }} />
    </div>
  );

  const screenshotOrGradient = (src: string, alt: string, h: string, radius: string) =>
    src ? (
      <img src={src} alt={alt} style={{ width: '100%', height: h, objectFit: 'cover', objectPosition: 'top', display: 'block', borderRadius: radius }} />
    ) : (
      <div style={{ width: '100%', height: h, background: project.bgGradient, borderRadius: radius, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: "'Antonio', sans-serif", fontSize: '64px', fontWeight: 700, color: 'rgba(255,255,255,0.2)' }}>{project.number}</span>
      </div>
    );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'rgb(8,8,14)', color: '#fff', fontFamily: "'Inter', sans-serif", overflowX: 'hidden' }}>
      <style>{`
        @keyframes pdp-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes pdp-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
        @keyframes pdp-blob1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-20px) scale(1.05)} }
        @keyframes pdp-blob2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-20px,30px) scale(1.08)} }
        .pdp-hero-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
        .pdp-stats-grid { display:grid; grid-template-columns:repeat(4,1fr); }
        .pdp-about-grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; }
        .pdp-features-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:20px; }
        .pdp-shots-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:start; }
        @media(max-width:900px){
          .pdp-hero-grid{grid-template-columns:1fr!important;}
          .pdp-stats-grid{grid-template-columns:repeat(2,1fr)!important;}
          .pdp-about-grid{grid-template-columns:1fr!important;gap:40px!important;}
          .pdp-features-grid{grid-template-columns:1fr!important;}
          .pdp-shots-grid{grid-template-columns:1fr!important;}
        }
      `}</style>

      {/* ── 1. STICKY NAV ── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ position: 'sticky', top: 0, zIndex: 200, height: '64px', backgroundColor: 'rgba(8,8,14,0.95)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(20px,5vw,48px)' }}
      >
        <motion.div whileHover="hover" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <motion.span variants={{ hover: { x: -4 } }} transition={{ duration: 0.2 }} style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)' }}>←</motion.span>
          <Link to="/projects" style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
            Back to all projects
          </Link>
        </motion.div>

        <div style={{ fontFamily: "'Antonio', sans-serif", fontSize: '15px', fontWeight: 700, letterSpacing: '0.12em', color: '#fff', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          SHANE BELL
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <motion.a href={project.liveUrl} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            style={{ padding: '7px 14px', fontSize: '12px', fontWeight: 600, fontFamily: "'Inter', sans-serif", backgroundColor: project.color, color: '#fff', borderRadius: '6px', textDecoration: 'none', display: 'inline-block' }}>
            View Live Site ↗
          </motion.a>
          <motion.a href={project.githubUrl} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            style={{ padding: '7px 14px', fontSize: '12px', fontWeight: 600, fontFamily: "'Inter', sans-serif", backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)', borderRadius: '6px', textDecoration: 'none', display: 'inline-block' }}>
            GitHub
          </motion.a>
        </div>
      </motion.nav>

      {/* ── 2. HERO ── */}
      <section style={{ minHeight: '100vh', backgroundColor: 'rgb(8,8,14)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,64px)' }}>
        <div style={{ position: 'absolute', top: '-200px', right: '-100px', width: '700px', height: '700px', background: `radial-gradient(circle,${project.color} 0%,transparent 70%)`, opacity: 0.2, filter: 'blur(120px)', animation: 'pdp-blob1 10s ease-in-out infinite', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '-150px', left: '-100px', width: '500px', height: '500px', background: `radial-gradient(circle,${project.color} 0%,transparent 70%)`, opacity: 0.12, filter: 'blur(120px)', animation: 'pdp-blob2 14s ease-in-out infinite', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none', zIndex: 1 }} />

        <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div className="pdp-hero-grid">
            {/* LEFT */}
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
                  PROJECT {project.number}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 12px', border: `1px solid ${project.color}60`, borderRadius: '20px', fontSize: '11px', fontWeight: 600, color: project.color, backgroundColor: `${project.color}15`, fontFamily: "'Inter', sans-serif", letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  {project.category}
                </span>
              </motion.div>

              <AnimatedTitle
                title={project.title.toUpperCase()}
                titleStyle={{ fontFamily: "'Antonio', sans-serif", fontSize: 'clamp(52px,7vw,88px)', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.92, marginBottom: '24px' }}
              />

              <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
                style={{ fontFamily: "'Inter', sans-serif", fontSize: '20px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', marginBottom: '16px', lineHeight: 1.5 }}>
                {project.tagline}
              </motion.p>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.75 }}
                style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.5)', marginBottom: '36px', lineHeight: 1.7, maxWidth: '480px' }}>
                {project.description}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.9 }}
                style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                <motion.a href={project.liveUrl} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  style={{ padding: '13px 28px', fontSize: '13px', fontWeight: 700, fontFamily: "'Antonio', sans-serif", textTransform: 'uppercase', letterSpacing: '0.06em', backgroundColor: project.color, color: '#fff', borderRadius: '8px', textDecoration: 'none', display: 'inline-block' }}>
                  View Live Site →
                </motion.a>
                <motion.a href={project.githubUrl} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  style={{ padding: '13px 28px', fontSize: '13px', fontWeight: 700, fontFamily: "'Antonio', sans-serif", textTransform: 'uppercase', letterSpacing: '0.06em', backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', borderRadius: '8px', textDecoration: 'none', display: 'inline-block' }}>
                  View Source
                </motion.a>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '8px 14px', border: '1px solid rgba(11,222,102,0.3)', borderRadius: '20px', backgroundColor: 'rgba(11,222,102,0.08)' }}>
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'rgb(11,222,102)', animation: 'pdp-pulse 2s ease-in-out infinite' }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: 'rgb(11,222,102)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Live</span>
                </div>
              </motion.div>
            </div>

            {/* RIGHT */}
            <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4, type: 'spring', stiffness: 80, damping: 20 }}
              style={{ position: 'relative', minHeight: '400px' }}>
              <div style={{ position: 'absolute', inset: '-20px', background: `radial-gradient(ellipse at center,${project.color}40 0%,transparent 70%)`, filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
              <div style={{ position: 'relative', zIndex: 1, transform: 'rotate(-1deg)', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '14px', padding: '14px', boxShadow: '0 32px 80px rgba(0,0,0,0.6),0 0 0 1px rgba(255,255,255,0.07)' }}>
                {browserDots()}
                {screenshotOrGradient(project.screenshots.desktop, `${project.title} desktop`, '320px', '6px')}
              </div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.75 }}
                style={{ position: 'absolute', bottom: '-20px', right: '-16px', width: '120px', height: '210px', zIndex: 3, transform: 'rotate(2deg)', backgroundColor: 'rgba(20,20,28,0.95)', borderRadius: '22px', border: '1px solid rgba(255,255,255,0.1)', padding: '8px', boxShadow: '0 24px 60px rgba(0,0,0,0.6),0 0 0 1px rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                {screenshotOrGradient(project.screenshots.mobile, `${project.title} mobile`, '100%', '16px')}
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '36px', left: 'clamp(20px,5vw,64px)', zIndex: 10 }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '18px', color: 'rgba(255,255,255,0.3)', animation: 'pdp-bounce 2.5s ease-in-out infinite' }}>↓</div>
        </div>
      </section>

      {/* ── 3. OVERVIEW STRIP ── */}
      <section ref={statsRef} style={{ backgroundColor: 'rgb(12,12,20)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: 'clamp(48px,8vw,80px) clamp(20px,5vw,64px)' }}>
        <div className="pdp-stats-grid" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={statsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', padding: 'clamp(24px,4vw,40px) 24px' }}>
              <StatItem stat={stat} color={project.color} inView={statsInView} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 4. ABOUT THE PROJECT ── */}
      <section ref={aboutRef} style={{ backgroundColor: '#ffffff', padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="pdp-about-grid">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={aboutInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, ease: 'easeOut' }}>
              {overline('THE PROJECT', project.color)}
              <h2 style={{ fontFamily: "'Antonio', sans-serif", fontSize: '40px', fontWeight: 700, color: 'rgb(10,10,16)', marginBottom: '24px', lineHeight: 1.1 }}>Overview</h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', fontWeight: 300, color: 'rgb(60,60,70)', lineHeight: 1.85, marginBottom: '32px' }}>
                {project.description}
              </p>
              <blockquote style={{ margin: 0, borderLeft: `3px solid ${project.color}`, paddingLeft: '20px' }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', fontStyle: 'italic', fontWeight: 300, color: 'rgb(80,80,90)', lineHeight: 1.7, margin: 0 }}>
                  {project.challenge}
                </p>
              </blockquote>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={aboutInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}>
              <h3 style={{ fontFamily: "'Antonio', sans-serif", fontSize: '28px', fontWeight: 700, color: 'rgb(10,10,16)', marginBottom: '16px', lineHeight: 1.2 }}>The Challenge</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: 300, color: 'rgb(70,70,80)', lineHeight: 1.8, marginBottom: '40px' }}>
                {project.challenge}
              </p>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '20px 24px', backgroundColor: 'rgb(248,248,252)', borderRadius: '12px', marginBottom: '32px' }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="10" r="5" stroke={project.color} strokeWidth="2" />
                  <path d="M6 26c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke={project.color} strokeWidth="2" strokeLinecap="round" />
                </svg>
                <div>
                  <div style={{ fontFamily: "'Antonio', sans-serif", fontSize: '16px', fontWeight: 700, color: 'rgb(10,10,16)', marginBottom: '4px' }}>Solo Engineer</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 300, color: 'rgb(90,90,100)', lineHeight: 1.5 }}>
                    Designed, architected, built, deployed and maintain this product.
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {[{ label: 'Year', value: project.year }, { label: 'Status', value: project.status }, { label: 'Type', value: project.category.split(' · ')[0] }].map((item, i) => (
                  <div key={i} style={{ padding: '8px 16px', backgroundColor: `${project.color}12`, border: `1px solid ${project.color}30`, borderRadius: '20px' }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 700, color: project.color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>{item.label}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500, color: 'rgb(40,40,50)', textTransform: 'capitalize' }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. FEATURES SECTION ── */}
      <section ref={featuresRef} style={{ backgroundColor: 'rgb(10,10,16)', padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: 'clamp(40px,6vw,64px)' }}>
            {overline('KEY FEATURES', project.color)}
            <h2 style={{ fontFamily: "'Antonio', sans-serif", fontSize: 'clamp(36px,5vw,52px)', fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1, margin: 0 }}>What I Built</h2>
          </div>
          <div className="pdp-features-grid">
            {project.highlights.map((highlight, i) => (
              <motion.div key={i}
                data-cursor="project" data-cursor-color={project.color}
                initial={{ opacity: 0, y: 32 }} animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ borderColor: `${project.color}66`, y: -4, boxShadow: `0 20px 60px ${project.color}1a` }}
                style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '28px', cursor: 'default' }}>
                <div style={{ fontFamily: "'Antonio', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ marginBottom: '14px' }}>
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <circle cx="18" cy="18" r="17" stroke={project.color} strokeWidth="1.5" fill={`${project.color}15`} />
                    <path d="M11 18l5 5 9-9" stroke={project.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: 0 }}>
                  {highlight}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. SCREENSHOTS SECTION ── */}
      <section ref={screenshotsRef} style={{ backgroundColor: '#ffffff', padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: 'clamp(40px,6vw,64px)' }}>
            {overline('IN ACTION', project.color)}
            <h2 style={{ fontFamily: "'Antonio', sans-serif", fontSize: 'clamp(36px,5vw,48px)', fontWeight: 700, color: 'rgb(10,10,16)', lineHeight: 1.1, margin: 0 }}>See It In Action</h2>
          </div>
          <div className="pdp-shots-grid">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={screenshotsInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, ease: 'easeOut' }}>
              <div style={{ backgroundColor: 'rgb(32,32,40)', borderRadius: '14px', padding: '14px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
                {browserDots()}
                {screenshotOrGradient(project.screenshots.desktop, `${project.title} desktop`, 'auto', '6px')}
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgb(140,140,155)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500, marginTop: '16px', textAlign: 'center' }}>Desktop</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={screenshotsInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '220px', backgroundColor: 'rgb(24,24,32)', borderRadius: '40px', padding: '14px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', border: '1px solid rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                  <div style={{ width: '60px', height: '6px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '3px' }} />
                </div>
                {screenshotOrGradient(project.screenshots.mobile, `${project.title} mobile`, '380px', '28px')}
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgb(140,140,155)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500, marginTop: '16px' }}>Mobile</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 7. TECH STACK SECTION ── */}
      <section ref={techRef} style={{ backgroundColor: 'rgb(10,10,16)', padding: 'clamp(60px,10vw,100px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: 'clamp(40px,6vw,60px)' }}>
            {overline('TECHNOLOGY', project.color)}
            <h2 style={{ fontFamily: "'Antonio', sans-serif", fontSize: 'clamp(32px,5vw,44px)', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.1 }}>Built With</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {project.techGroups.map((group, gi) => (
              <motion.div key={gi} initial={{ opacity: 0, x: -20 }} animate={techInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: gi * 0.1 }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 700, color: project.color, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '12px' }}>
                  {group.label}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {group.items.map((item, ii) => (
                    <div key={ii} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                      <span className="tech-icon-slot" style={{ width: '14px', height: '14px', borderRadius: '3px', backgroundColor: `${project.color}30`, flexShrink: 0, display: 'inline-block' }} />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#fff', whiteSpace: 'nowrap' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. HOW I BUILT IT ── */}
      <section ref={stepsRef} style={{ backgroundColor: '#ffffff', padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ marginBottom: 'clamp(48px,7vw,72px)' }}>
            {overline('THE PROCESS', project.color)}
            <h2 style={{ fontFamily: "'Antonio', sans-serif", fontSize: 'clamp(32px,5vw,44px)', fontWeight: 700, color: 'rgb(10,10,16)', margin: 0, lineHeight: 1.1 }}>How It Was Built</h2>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '20px', top: '20px', bottom: '20px', width: '2px', backgroundColor: `${project.color}30` }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              {steps.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -30 }} animate={stepsInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.12 }}
                  style={{ display: 'flex', gap: '28px', alignItems: 'flex-start' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#fff', border: `2px solid ${project.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1, position: 'relative' }}>
                    <span style={{ fontFamily: "'Antonio', sans-serif", fontSize: '15px', fontWeight: 700, color: project.color }}>{i + 1}</span>
                  </div>
                  <div style={{ paddingTop: '8px' }}>
                    <h3 style={{ fontFamily: "'Antonio', sans-serif", fontSize: '20px', fontWeight: 700, color: 'rgb(10,10,16)', marginBottom: '8px', lineHeight: 1.2 }}>{step.title}</h3>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 300, color: 'rgb(90,90,100)', lineHeight: 1.7, margin: 0 }}>{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. FINAL CTA ── */}
      <section ref={ctaRef} style={{ backgroundColor: 'rgb(8,8,14)', padding: 'clamp(80px,12vw,140px) clamp(20px,5vw,64px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '400px', background: `radial-gradient(ellipse,${project.color}25 0%,transparent 70%)`, filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
            {ctaWords.map((word, i) => (
              <div key={i} style={{ overflow: 'hidden', display: 'inline-block', marginRight: '0.25em' }}>
                <motion.span
                  initial={{ y: 48 }} animate={ctaInView ? { y: 0 } : { y: 48 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
                  style={{ display: 'inline-block', fontFamily: "'Antonio', sans-serif", fontSize: 'clamp(40px,6vw,60px)', fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1 }}>
                  {word}
                </motion.span>
              </div>
            ))}
          </div>
          <motion.p initial={{ opacity: 0 }} animate={ctaInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.4 }}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', fontWeight: 300, color: 'rgba(255,255,255,0.5)', marginBottom: '48px' }}>
            Deployed and running in production.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.55 }}
            style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
            <motion.a href={project.liveUrl} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              style={{ padding: '14px 32px', fontSize: '14px', fontWeight: 700, fontFamily: "'Antonio', sans-serif", textTransform: 'uppercase', letterSpacing: '0.06em', backgroundColor: project.color, color: '#fff', borderRadius: '8px', textDecoration: 'none', display: 'inline-block' }}>
              Open Live Site ↗
            </motion.a>
            <motion.a href={project.githubUrl} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              style={{ padding: '14px 32px', fontSize: '14px', fontWeight: 700, fontFamily: "'Antonio', sans-serif", textTransform: 'uppercase', letterSpacing: '0.06em', backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', borderRadius: '8px', textDecoration: 'none', display: 'inline-block' }}>
              View Source on GitHub
            </motion.a>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={ctaInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.7 }}>
            <Link to="/projects" style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 400, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
              ← Back to all projects
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
