import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';

// ── Icons ─────────────────────────────────────────────────────
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
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}
function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

// ── Tech badge ────────────────────────────────────────────────
function TechBadge({ name, color }: { name: string; color?: string }) {
  return (
    <span style={{
      fontSize:        12,
      fontFamily:      "'Inter', sans-serif",
      fontWeight:      500,
      color:           color ? color : 'rgb(80, 80, 90)',
      backgroundColor: color ? `${color}10` : 'rgba(0,0,0,0.04)',
      border:          `1px solid ${color ? `${color}30` : 'rgba(0,0,0,0.08)'}`,
      borderRadius:    6,
      padding:         '4px 11px',
      letterSpacing:   '0.01em',
      whiteSpace:      'nowrap',
    }}>
      {name}
    </span>
  );
}

// ── Status badge ──────────────────────────────────────────────
function StatusBadge({ status }: { status: Project['status'] }) {
  const config = {
    live:          { label: 'Live',        dot: 'rgb(11, 222, 102)',  text: 'rgb(22, 163, 74)' },
    beta:          { label: 'Beta',        dot: 'rgb(245, 158, 11)', text: 'rgb(161, 98, 7)' },
    'in-progress': { label: 'In Progress', dot: 'rgb(99, 102, 241)', text: 'rgb(67, 56, 202)' },
  }[status];
  return (
    <span style={{
      display:         'inline-flex',
      alignItems:      'center',
      gap:             5,
      fontSize:        11,
      fontFamily:      "'Inter', sans-serif",
      fontWeight:      500,
      color:           config.text,
      backgroundColor: `${config.dot}18`,
      border:          `1px solid ${config.dot}40`,
      borderRadius:    999,
      padding:         '3px 10px',
    }}>
      <span style={{
        width:           5,
        height:          5,
        borderRadius:    '50%',
        backgroundColor: config.dot,
        boxShadow:       `0 0 5px ${config.dot}`,
        flexShrink:      0,
      }} />
      {config.label}
    </span>
  );
}

// ── Full project row / card ───────────────────────────────────
function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        whileHover={{ borderColor: `${project.color}50` }}
        style={{
          backgroundColor: '#ffffff',
          border:          '1px solid rgba(0,0,0,0.08)',
          borderRadius:    20,
          padding:         '36px 40px',
          display:         'grid',
          gridTemplateColumns: '1fr 1.4fr 1fr',
          gap:             40,
          alignItems:      'start',
          position:        'relative',
          overflow:        'hidden',
          transition:      'border-color 0.25s ease, box-shadow 0.25s ease',
          boxShadow:       '0 1px 4px rgba(0,0,0,0.04)',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.09)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
        }}
      >
        {/* Left accent bar */}
        <div style={{
          position:        'absolute',
          top:             0,
          left:            0,
          width:           3,
          bottom:          0,
          backgroundColor: project.color,
          borderRadius:    '20px 0 0 20px',
        }} />

        {/* Column 1 — identity */}
        <div style={{ paddingLeft: 8 }}>
          <div style={{
            fontFamily:    "'Inter', sans-serif",
            fontSize:      11,
            fontWeight:    500,
            color:         'rgba(0,0,0,0.28)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom:  8,
          }}>
            {project.number} · {project.year}
          </div>
          <h2 style={{
            fontFamily:    "'Antonio', sans-serif",
            fontSize:      28,
            fontWeight:    700,
            color:         'rgb(48, 48, 48)',
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            margin:        '0 0 6px',
          }}>
            {project.title}
          </h2>
          <div style={{
            fontFamily:    "'Inter', sans-serif",
            fontSize:      12,
            fontWeight:    500,
            color:         project.color,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom:  12,
          }}>
            {project.category}
          </div>
          <StatusBadge status={project.status} />
        </div>

        {/* Column 2 — description + highlights */}
        <div>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize:   14,
            fontWeight: 300,
            color:      'rgb(80, 80, 95)',
            lineHeight: 1.7,
            margin:     '0 0 16px',
          }}>
            {project.description}
          </p>
          <ul style={{ padding: 0, listStyle: 'none', margin: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
            {project.highlights.map((h, i) => (
              <li key={i} style={{
                fontFamily: "'Inter', sans-serif",
                fontSize:   13,
                fontWeight: 300,
                color:      'rgb(100, 100, 110)',
                display:    'flex',
                alignItems: 'flex-start',
                gap:        8,
              }}>
                <span style={{
                  width:           4,
                  height:          4,
                  borderRadius:    '50%',
                  backgroundColor: project.color,
                  flexShrink:      0,
                  marginTop:       5,
                }} />
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — tech + links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'flex-end' }}>
            {project.tech.map((t) => (
              <TechBadge key={t} name={t} color={project.color} />
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                gap:             7,
                padding:         '10px 20px',
                backgroundColor: project.color,
                color:           'white',
                borderRadius:    10,
                fontSize:        13,
                fontFamily:      "'Inter', sans-serif",
                fontWeight:      500,
                textDecoration:  'none',
                letterSpacing:   '0.01em',
              }}
            >
              <ExternalLinkIcon />
              View live site
            </motion.a>
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(0,0,0,0.06)' }}
              whileTap={{ scale: 0.98 }}
              style={{
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                gap:             7,
                padding:         '10px 20px',
                backgroundColor: 'rgba(0,0,0,0.03)',
                color:           'rgb(48, 48, 48)',
                border:          '1px solid rgba(0,0,0,0.09)',
                borderRadius:    10,
                fontSize:        13,
                fontFamily:      "'Inter', sans-serif",
                fontWeight:      500,
                textDecoration:  'none',
                letterSpacing:   '0.01em',
              }}
            >
              <GithubIcon />
              View source
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────
export default function AllProjectsPage() {
  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{
      minHeight:       '100vh',
      backgroundColor: '#f9f9fb',
      fontFamily:      "'Inter', sans-serif",
    }}>
      {/* ── Top navbar strip ── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position:        'sticky',
          top:             0,
          zIndex:          100,
          backgroundColor: 'rgba(249,249,251,0.9)',
          backdropFilter:  'blur(12px)',
          borderBottom:    '1px solid rgba(0,0,0,0.07)',
          padding:         '0 40px',
          height:          60,
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'space-between',
        }}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <motion.span
            whileHover="hover"
            style={{
              display:    'inline-flex',
              alignItems: 'center',
              gap:        8,
              color:      'rgb(48, 48, 48)',
              cursor:     'pointer',
            }}
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
              fontWeight: 500,
              color:      'rgb(48, 48, 48)',
            }}>
              Back to portfolio
            </span>
          </motion.span>
        </Link>

        <span style={{
          fontFamily:    "'Antonio', sans-serif",
          fontSize:      18,
          fontWeight:    700,
          color:         'rgb(48, 48, 48)',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}>
          Shane Bell
        </span>

        <div style={{ width: 120 }} /> {/* spacer to centre title */}
      </motion.nav>

      {/* ── Page content ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 40px 100px' }}>

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          style={{ marginBottom: 56 }}
        >
          <div style={{
            display:     'flex',
            alignItems:  'center',
            gap:         10,
            marginBottom: 12,
          }}>
            <div style={{ width: 24, height: 1, backgroundColor: 'rgb(94, 103, 230)' }} />
            <span style={{
              fontFamily:    "'Inter', sans-serif",
              fontSize:      11,
              fontWeight:    500,
              color:         'rgb(94, 103, 230)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              All work
            </span>
          </div>
          <h1 style={{
            fontFamily:    "'Antonio', sans-serif",
            fontSize:      'clamp(40px, 5vw, 60px)',
            fontWeight:    700,
            color:         'rgb(48, 48, 48)',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            margin:        '0 0 16px',
            lineHeight:    1.0,
          }}>
            ALL PROJECTS
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize:   16,
            fontWeight: 300,
            color:      'rgb(100, 100, 110)',
            maxWidth:   560,
            lineHeight: 1.65,
            margin:     0,
          }}>
            Every project I've built and shipped — from full SaaS platforms to hospitality web
            apps. Each one built with a focus on performance, scalability, and clean code.
          </p>

          {/* Stat row */}
          <div style={{
            display:    'flex',
            alignItems: 'center',
            gap:        32,
            marginTop:  32,
            paddingTop: 28,
            borderTop:  '1px solid rgba(0,0,0,0.08)',
          }}>
            {[
              { value: projects.length, label: 'Projects' },
              { value: projects.filter(p => p.status === 'live').length, label: 'Live' },
              { value: new Set(projects.flatMap(p => p.tech)).size, label: 'Technologies used' },
            ].map(({ value, label }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{
                  fontFamily:    "'Antonio', sans-serif",
                  fontSize:      34,
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
                  color:      'rgba(0,0,0,0.4)',
                }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Projects list ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {projects.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* ── Footer CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            marginTop:    64,
            paddingTop:   48,
            borderTop:    '1px solid rgba(0,0,0,0.07)',
            textAlign:    'center',
          }}
        >
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize:   16,
            fontWeight: 300,
            color:      'rgb(100, 100, 110)',
            marginBottom: 24,
          }}>
            Want to work together on something?
          </p>
          <motion.a
            href="mailto:shane1obdurate@gmail.com"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display:         'inline-flex',
              alignItems:      'center',
              gap:             8,
              backgroundColor: 'rgb(94, 103, 230)',
              color:           'white',
              fontFamily:      "'Antonio', sans-serif",
              fontSize:        13,
              fontWeight:      700,
              textTransform:   'uppercase',
              letterSpacing:   '0.1em',
              borderRadius:    999,
              padding:         '13px 32px',
              textDecoration:  'none',
            }}
          >
            Get in touch
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
