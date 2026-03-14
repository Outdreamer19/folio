import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// ── Icons ──────────────────────────────────────────────────────
function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/>
      <polyline points="12 19 5 12 12 5"/>
    </svg>
  );
}
function ExternalLinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}
function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

// ── Project data with tech categories ─────────────────────────
interface TechGroup { label: string; items: string[] }

interface ProjectDetail {
  id:           number;
  number:       string;
  title:        string;
  category:     string;
  tagline:      string;
  description:  string;
  challenge:    string;
  highlights:   string[];
  techGroups:   TechGroup[];
  year:         string;
  status:       'live' | 'beta' | 'in-progress';
  liveUrl:      string;
  githubUrl:    string;
  color:        string;
  bgGradient:   string;
}

const projects: ProjectDetail[] = [
  {
    id:          1,
    number:      '01',
    title:       'InvoiceFeed',
    category:    'SaaS · Full Stack',
    tagline:     'Invoice management, simplified.',
    description: 'A complete SaaS platform for creating, managing and processing invoices, designed, architected, and shipped independently. From authentication to payments to cloud deployment, every layer was built from scratch.',
    challenge:   'Building a production-grade SaaS solo means owning every technical decision: infrastructure, security, payment flows, and UX. The challenge was creating a platform robust enough to handle real financial data while keeping the codebase lean and maintainable.',
    highlights: [
      'Architected the full system from zero to production as sole founder',
      'Stripe integration for one-time payments and recurring subscriptions',
      'Real-time invoice creation, editing, and status tracking via Vue 3 reactivity',
      'Multi-role authentication system using Laravel Breeze',
      'CI/CD pipeline via Laravel Forge deployed on Digital Ocean with monitoring',
      'Optimised relational schema covering invoices, clients, line-items, and payments',
    ],
    techGroups: [
      { label: 'Frontend',          items: ['Vue 3', 'Inertia.js', 'TypeScript', 'Tailwind CSS'] },
      { label: 'Backend',           items: ['Laravel', 'PHP'] },
      { label: 'Database',          items: ['MySQL'] },
      { label: 'Payments',          items: ['Stripe'] },
      { label: 'DevOps',            items: ['Digital Ocean', 'Laravel Forge', 'CI/CD'] },
    ],
    year:        '2024',
    status:      'live',
    liveUrl:     'https://invoicefeed.com',
    githubUrl:   'https://github.com/Outdreamer19/invoice',
    color:       'rgb(94, 103, 230)',
    bgGradient:  'linear-gradient(135deg, rgb(94,103,230) 0%, rgb(120,130,255) 100%)',
  },
  {
    id:          2,
    number:      '02',
    title:       'Blendable AI',
    category:    'AI Platform · Full Stack',
    tagline:     'One interface. Every AI model.',
    description: 'A multi-model AI chat platform allowing users to interact with multiple AI providers, build custom personas with tailored knowledge bases, manage team workspaces, and access image generation tools. All from a single unified interface.',
    challenge:   'The key engineering challenge was designing a unified abstraction layer that could route requests to different AI models seamlessly, while maintaining per-user quota tracking, Stripe billing, and real-time streaming responses, all without blocking the UI.',
    highlights: [
      'Unified interface supporting multiple AI model providers in a single session',
      'Custom persona engine: define AI behaviour, tone, and attached knowledge bases',
      'Team and workspace management built for enterprise collaboration',
      'Image generation and AI upscaling tools integrated',
      'Prompt library with folder organisation and search',
      'Stripe billing with per-user usage tracking and quota limits',
      'Laravel Horizon for async job queuing and AI request handling',
    ],
    techGroups: [
      { label: 'Frontend',          items: ['Vue.js', 'Inertia.js', 'TypeScript', 'Tailwind CSS'] },
      { label: 'Backend',           items: ['Laravel', 'PHP', 'Laravel Horizon'] },
      { label: 'Database',          items: ['MySQL'] },
      { label: 'Payments',          items: ['Stripe'] },
      { label: 'AI Integration',    items: ['OpenAI API', 'Multi-model routing'] },
    ],
    year:        '2024',
    status:      'live',
    liveUrl:     'https://blendable.app',
    githubUrl:   'https://github.com/Outdreamer19/blendable',
    color:       'rgb(16, 185, 129)',
    bgGradient:  'linear-gradient(135deg, rgb(16,185,129) 0%, rgb(52,211,153) 100%)',
  },
  {
    id:          3,
    number:      '03',
    title:       'Hardball Smokehouse',
    category:    'Hospitality · Web App',
    tagline:     'Caribbean flavours, served online.',
    description: 'A full-featured hospitality web application for a Caribbean smokehouse restaurant. Beyond a marketing site, it includes a complete online reservation system, events and vacancies board, full admin dashboard, and newsletter marketing tools.',
    challenge:   'Hospitality clients need simplicity on the front and power on the back. The challenge was building a system non-technical staff could confidently manage day-to-day (menus, events, bookings) while delivering a polished customer-facing experience.',
    highlights: [
      'Online reservation booking system with availability management',
      'Events and vacancies board with full admin CRUD controls',
      'Dynamic admin dashboard: manage menus, bookings, events, and content',
      'Newsletter subscription with campaign analytics',
      'Light/dark theme support across the full site',
      'Contact form and customer-facing marketing pages',
    ],
    techGroups: [
      { label: 'Frontend',  items: ['JavaScript', 'Tailwind CSS', 'Blade', 'Ziggy'] },
      { label: 'Backend',   items: ['Laravel', 'PHP'] },
      { label: 'Database',  items: ['MySQL'] },
    ],
    year:        '2024',
    status:      'live',
    liveUrl:     'https://hardballsmokehouse.co.uk',
    githubUrl:   'https://github.com/Outdreamer19/hardball',
    color:       'rgb(239, 68, 68)',
    bgGradient:  'linear-gradient(135deg, rgb(239,68,68) 0%, rgb(252,120,90) 100%)',
  },
];

// ── Status badge ───────────────────────────────────────────────
function StatusBadge({ status }: { status: ProjectDetail['status'] }) {
  const label = { live: 'Live', beta: 'Beta', 'in-progress': 'In Progress' }[status];
  return (
    <span style={{
      display:         'inline-flex',
      alignItems:      'center',
      gap:             6,
      fontSize:        12,
      fontFamily:      "'Inter', sans-serif",
      fontWeight:      500,
      color:           'rgba(255,255,255,0.9)',
      backgroundColor: 'rgba(255,255,255,0.15)',
      border:          '1px solid rgba(255,255,255,0.25)',
      borderRadius:    999,
      padding:         '4px 12px',
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%',
        backgroundColor: '#fff', boxShadow: `0 0 6px rgba(255,255,255,0.8)`,
      }} />
      {label}
    </span>
  );
}

// ── Tech group pill cluster ────────────────────────────────────
function TechGroupBlock({ group, color }: { group: TechGroup; color: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <span style={{
        fontFamily:    "'Inter', sans-serif",
        fontSize:      10,
        fontWeight:    600,
        color:         color,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        display:       'block',
        marginBottom:  6,
      }}>
        {group.label}
      </span>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {group.items.map(item => (
          <span key={item} style={{
            fontFamily:      "'Inter', sans-serif",
            fontSize:        12,
            fontWeight:      500,
            color:           color,
            backgroundColor: `${color}12`,
            border:          `1px solid ${color}30`,
            borderRadius:    8,
            padding:         '4px 10px',
            whiteSpace:      'nowrap',
          }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Single project showcase ────────────────────────────────────
function ProjectShowcase({ project, index }: { project: ProjectDetail; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      style={{
        borderRadius:  24,
        overflow:      'hidden',
        boxShadow:     '0 8px 48px rgba(0,0,0,0.10)',
        border:        '1px solid rgba(0,0,0,0.07)',
      }}
    >
      {/* ── Coloured header ── */}
      <div style={{
        background:  project.bgGradient,
        padding:     'clamp(36px, 5vw, 64px) clamp(28px, 5vw, 64px)',
        position:    'relative',
        overflow:    'hidden',
      }}>
        {/* Giant ghost number */}
        <span style={{
          position:      'absolute',
          right:         -10,
          top:           '50%',
          transform:     'translateY(-50%)',
          fontFamily:    "'Antonio', sans-serif",
          fontSize:      'clamp(120px, 18vw, 220px)',
          fontWeight:    700,
          color:         'rgba(255,255,255,0.08)',
          lineHeight:    1,
          userSelect:    'none',
          letterSpacing: '-0.04em',
          pointerEvents: 'none',
        }}>
          {project.number}
        </span>

        {/* Top row: category + status + year */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20, position: 'relative' }}>
          <span style={{
            fontFamily:      "'Inter', sans-serif",
            fontSize:        12,
            fontWeight:      500,
            color:           'rgba(255,255,255,0.75)',
            backgroundColor: 'rgba(255,255,255,0.12)',
            border:          '1px solid rgba(255,255,255,0.2)',
            borderRadius:    999,
            padding:         '4px 12px',
          }}>
            {project.category}
          </span>
          <StatusBadge status={project.status} />
          <span style={{
            fontFamily:      "'Inter', sans-serif",
            fontSize:        12,
            fontWeight:      400,
            color:           'rgba(255,255,255,0.6)',
            backgroundColor: 'rgba(255,255,255,0.08)',
            border:          '1px solid rgba(255,255,255,0.15)',
            borderRadius:    999,
            padding:         '4px 12px',
          }}>
            {project.year}
          </span>
        </div>

        {/* Title + tagline */}
        <h2 style={{
          fontFamily:    "'Antonio', sans-serif",
          fontSize:      'clamp(44px, 6vw, 80px)',
          fontWeight:    700,
          color:         '#ffffff',
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          lineHeight:    0.95,
          margin:        '0 0 12px',
          position:      'relative',
        }}>
          {project.title}
        </h2>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize:   18,
          fontWeight: 300,
          color:      'rgba(255,255,255,0.8)',
          margin:     '0 0 32px',
          position:   'relative',
          maxWidth:   560,
        }}>
          {project.tagline}
        </p>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', position: 'relative' }}>
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, backgroundColor: '#ffffff', color: project.color }}
            whileTap={{ scale: 0.97 }}
            style={{
              display:         'inline-flex',
              alignItems:      'center',
              gap:             8,
              padding:         '12px 28px',
              backgroundColor: 'rgba(255,255,255,0.18)',
              color:           '#ffffff',
              border:          '1.5px solid rgba(255,255,255,0.4)',
              borderRadius:    999,
              fontFamily:      "'Antonio', sans-serif",
              fontSize:        14,
              fontWeight:      700,
              letterSpacing:   '0.08em',
              textDecoration:  'none',
              textTransform:   'uppercase',
              transition:      'background-color 0.2s, color 0.2s',
              backdropFilter:  'blur(8px)',
            }}
          >
            <ExternalLinkIcon />
            View Live Site
          </motion.a>
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.25)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display:         'inline-flex',
              alignItems:      'center',
              gap:             8,
              padding:         '12px 28px',
              backgroundColor: 'transparent',
              color:           'rgba(255,255,255,0.8)',
              border:          '1.5px solid rgba(255,255,255,0.25)',
              borderRadius:    999,
              fontFamily:      "'Antonio', sans-serif",
              fontSize:        14,
              fontWeight:      700,
              letterSpacing:   '0.08em',
              textDecoration:  'none',
              textTransform:   'uppercase',
              transition:      'background-color 0.2s',
            }}
          >
            <GithubIcon />
            View Source
          </motion.a>
        </div>
      </div>

      {/* ── White body ── */}
      <div style={{
        backgroundColor: '#ffffff',
        padding:         'clamp(32px, 5vw, 56px) clamp(28px, 5vw, 64px)',
        display:         'grid',
        gridTemplateColumns: '1fr 1fr',
        gap:             'clamp(32px, 5vw, 64px)',
      }}>

        {/* Left: description + challenge + highlights */}
        <div>
          <h4 style={{
            fontFamily:    "'Inter', sans-serif",
            fontSize:      10,
            fontWeight:    600,
            color:         project.color,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            margin:        '0 0 10px',
          }}>
            Overview
          </h4>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize:   15,
            fontWeight: 300,
            color:      'rgb(60, 60, 75)',
            lineHeight: 1.75,
            margin:     '0 0 24px',
          }}>
            {project.description}
          </p>

          <h4 style={{
            fontFamily:    "'Inter', sans-serif",
            fontSize:      10,
            fontWeight:    600,
            color:         project.color,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            margin:        '0 0 10px',
          }}>
            The Challenge
          </h4>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize:   14,
            fontWeight: 300,
            color:      'rgb(90, 90, 105)',
            lineHeight: 1.75,
            margin:     '0 0 28px',
          }}>
            {project.challenge}
          </p>

          <h4 style={{
            fontFamily:    "'Inter', sans-serif",
            fontSize:      10,
            fontWeight:    600,
            color:         project.color,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            margin:        '0 0 14px',
          }}>
            Key Features
          </h4>
          <ul style={{ padding: 0, listStyle: 'none', margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {project.highlights.map((h, i) => (
              <li key={i} style={{
                fontFamily: "'Inter', sans-serif",
                fontSize:   13,
                fontWeight: 300,
                color:      'rgb(70, 70, 88)',
                lineHeight: 1.6,
                display:    'flex',
                alignItems: 'flex-start',
                gap:        10,
              }}>
                <span style={{
                  width:  18,
                  height: 18,
                  borderRadius:    '50%',
                  backgroundColor: `${project.color}18`,
                  border:          `1.5px solid ${project.color}40`,
                  display:         'inline-flex',
                  alignItems:      'center',
                  justifyContent:  'center',
                  flexShrink:      0,
                  marginTop:       1,
                }}>
                  <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke={project.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: tech stack by category */}
        <div>
          <h4 style={{
            fontFamily:    "'Inter', sans-serif",
            fontSize:      10,
            fontWeight:    600,
            color:         project.color,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            margin:        '0 0 20px',
          }}>
            Tech Stack
          </h4>
          {project.techGroups.map(group => (
            <TechGroupBlock key={group.label} group={group} color={project.color} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────
export default function AllProjectsPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{
      minHeight:       '100vh',
      backgroundColor: 'rgb(12, 12, 18)',
      fontFamily:      "'Inter', sans-serif",
    }}>

      {/* ── Sticky navbar ── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
        style={{
          position:        'sticky',
          top:             0,
          zIndex:          100,
          backgroundColor: 'rgba(12,12,18,0.92)',
          backdropFilter:  'blur(16px)',
          borderBottom:    '1px solid rgba(255,255,255,0.06)',
          padding:         '0 clamp(20px, 5vw, 64px)',
          height:          64,
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'space-between',
        }}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <motion.span
            whileHover="hover"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
          >
            <motion.span
              variants={{ hover: { x: -3 } }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              style={{ display: 'flex', color: 'rgb(94, 103, 230)' }}
            >
              <ArrowLeftIcon />
            </motion.span>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize:   14,
              fontWeight: 400,
              color:      'rgba(255,255,255,0.6)',
            }}>
              Back to portfolio
            </span>
          </motion.span>
        </Link>

        <span style={{
          fontFamily:    "'Antonio', sans-serif",
          fontSize:      18,
          fontWeight:    700,
          color:         '#ffffff',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}>
          Shane Bell
        </span>

        <motion.a
          href="/Shane_Bell_CV.pdf"
          download="Shane_Bell_CV.pdf"
          whileHover={{ backgroundColor: 'rgba(94,103,230,0.2)' }}
          style={{
            display:         'inline-flex',
            alignItems:      'center',
            gap:             6,
            padding:         '7px 16px',
            borderRadius:    999,
            border:          '1px solid rgba(94,103,230,0.4)',
            backgroundColor: 'rgba(94,103,230,0.1)',
            fontFamily:      "'Inter', sans-serif",
            fontSize:        13,
            fontWeight:      500,
            color:           'rgb(160, 168, 255)',
            textDecoration:  'none',
            transition:      'background-color 0.2s',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download CV
        </motion.a>
      </motion.nav>

      {/* ── Dark page header ── */}
      <div style={{
        padding:      'clamp(64px, 8vw, 120px) clamp(20px, 5vw, 64px) clamp(48px, 6vw, 80px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ maxWidth: 1100, margin: '0 auto' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 28, height: 2, backgroundColor: 'rgb(94, 103, 230)', borderRadius: 1 }} />
            <span style={{
              fontFamily:    "'Inter', sans-serif",
              fontSize:      11,
              fontWeight:    500,
              color:         'rgb(94, 103, 230)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
            }}>
              Case Studies
            </span>
          </div>

          <h1 style={{
            fontFamily:    "'Antonio', sans-serif",
            fontSize:      'clamp(56px, 9vw, 120px)',
            fontWeight:    700,
            color:         '#ffffff',
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            margin:        '0 0 20px',
            lineHeight:    0.92,
          }}>
            ALL<br />PROJECTS
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize:   17,
            fontWeight: 300,
            color:      'rgba(255,255,255,0.5)',
            maxWidth:   520,
            lineHeight: 1.7,
            margin:     '0 0 48px',
          }}>
            Every product I've designed, built, and shipped. From full SaaS platforms
            to hospitality systems. Each built solo with a focus on scalability, clean
            architecture, and real-world usability.
          </p>

          {/* Stat row */}
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            {[
              { value: '3',  label: 'Products shipped' },
              { value: '3',  label: 'Live in production' },
              { value: '20+', label: 'Technologies used' },
              { value: '6+', label: 'Years engineering' },
            ].map(({ value, label }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{
                  fontFamily:    "'Antonio', sans-serif",
                  fontSize:      42,
                  fontWeight:    700,
                  color:         'rgb(94, 103, 230)',
                  lineHeight:    1,
                  letterSpacing: '-0.02em',
                }}>
                  {value}
                </span>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize:   12,
                  fontWeight: 400,
                  color:      'rgba(255,255,255,0.35)',
                }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Project showcases ── */}
      <div style={{
        maxWidth: 1100,
        margin:   '0 auto',
        padding:  'clamp(48px, 6vw, 80px) clamp(20px, 5vw, 64px) clamp(64px, 8vw, 120px)',
        display:  'flex',
        flexDirection: 'column',
        gap:      48,
      }}>
        {projects.map((project, index) => (
          <ProjectShowcase key={project.id} project={project} index={index} />
        ))}

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            marginTop:    16,
            padding:      '56px 48px',
            borderRadius: 24,
            border:       '1px solid rgba(255,255,255,0.08)',
            background:   'linear-gradient(135deg, rgba(94,103,230,0.12) 0%, rgba(16,185,129,0.06) 100%)',
            textAlign:    'center',
          }}
        >
          <p style={{
            fontFamily:    "'Antonio', sans-serif",
            fontSize:      'clamp(28px, 4vw, 44px)',
            fontWeight:    700,
            color:         '#ffffff',
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            margin:        '0 0 12px',
          }}>
            Want to build something together?
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize:   16,
            fontWeight: 300,
            color:      'rgba(255,255,255,0.45)',
            margin:     '0 0 32px',
          }}>
            Open to remote &amp; hybrid roles · Available immediately
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.a
              href="mailto:shane@shanebell.dev"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display:         'inline-flex',
                alignItems:      'center',
                gap:             8,
                backgroundColor: 'rgb(94, 103, 230)',
                color:           'white',
                fontFamily:      "'Antonio', sans-serif",
                fontSize:        14,
                fontWeight:      700,
                textTransform:   'uppercase',
                letterSpacing:   '0.1em',
                borderRadius:    999,
                padding:         '14px 36px',
                textDecoration:  'none',
              }}
            >
              Get in touch
            </motion.a>
            <Link to="/">
              <motion.span
                whileHover={{ scale: 1.03 }}
                style={{
                  display:         'inline-flex',
                  alignItems:      'center',
                  gap:             8,
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color:           'rgba(255,255,255,0.7)',
                  fontFamily:      "'Antonio', sans-serif",
                  fontSize:        14,
                  fontWeight:      700,
                  textTransform:   'uppercase',
                  letterSpacing:   '0.1em',
                  borderRadius:    999,
                  padding:         '14px 36px',
                  border:          '1px solid rgba(255,255,255,0.12)',
                  cursor:          'pointer',
                }}
              >
                View Portfolio
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
