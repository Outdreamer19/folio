import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';

// ── Icons ─────────────────────────────────────────────────────
function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}
function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}
function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}

// ── Status badge ──────────────────────────────────────────────
function StatusBadge({ status }: { status: Project['status'] }) {
  const config = {
    live:        { label: 'Live',        dot: 'rgb(11, 222, 102)',  text: 'rgb(22, 163, 74)' },
    beta:        { label: 'Beta',        dot: 'rgb(245, 158, 11)', text: 'rgb(161, 98, 7)' },
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
      letterSpacing:   '0.02em',
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

// ── Tech badge ────────────────────────────────────────────────
function TechBadge({ name }: { name: string }) {
  return (
    <span style={{
      fontSize:        11,
      fontFamily:      "'Inter', sans-serif",
      fontWeight:      500,
      color:           'rgb(100, 100, 110)',
      backgroundColor: 'rgba(0,0,0,0.04)',
      border:          '1px solid rgba(0,0,0,0.08)',
      borderRadius:    6,
      padding:         '3px 9px',
      letterSpacing:   '0.01em',
      whiteSpace:      'nowrap',
    }}>
      {name}
    </span>
  );
}

// ── Project card ──────────────────────────────────────────────
function ProjectCard({ project, index, large = false }: {
  project: Project;
  index: number;
  large?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover="hover"
      style={{ height: '100%' }}
    >
      {/* Card */}
      <motion.div
        variants={{
          hover: { y: -4, boxShadow: '0 16px 48px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.06)' },
        }}
        transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
        style={{
          backgroundColor: '#ffffff',
          border:          '1px solid rgba(0,0,0,0.08)',
          borderRadius:    16,
          padding:         large ? '32px' : '24px',
          display:         'flex',
          flexDirection:   'column',
          gap:             large ? 20 : 16,
          height:          '100%',
          boxSizing:       'border-box',
          position:        'relative',
          overflow:        'hidden',
          boxShadow:       '0 1px 4px rgba(0,0,0,0.04)',
          transition:      'border-color 0.25s ease',
          cursor:          'default',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = `${project.color}50`;
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,0,0,0.08)';
        }}
      >
        {/* Top accent bar — appears on hover via CSS pseudo but we'll use a motion div */}
        <motion.div
          variants={{ hover: { scaleX: 1 }, initial: { scaleX: 0 } }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            position:        'absolute',
            top:             0,
            left:            0,
            right:           0,
            height:          2,
            backgroundColor: project.color,
            transformOrigin: 'left',
          }}
        />

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{
              fontFamily:    "'Inter', sans-serif",
              fontSize:      11,
              fontWeight:    500,
              color:         'rgba(0,0,0,0.3)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              {project.number}
            </span>
            <h3 style={{
              fontFamily:    "'Antonio', sans-serif",
              fontSize:      large ? 28 : 22,
              fontWeight:    700,
              color:         'rgb(48, 48, 48)',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              margin:        0,
              lineHeight:    1.1,
            }}>
              {project.title}
            </h3>
          </div>
          <StatusBadge status={project.status} />
        </div>

        {/* Category */}
        <span style={{
          fontFamily:    "'Inter', sans-serif",
          fontSize:      12,
          fontWeight:    500,
          color:         project.color,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}>
          {project.category}
        </span>

        {/* Description */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize:   large ? 15 : 13.5,
          fontWeight: 300,
          color:      'rgb(90, 90, 100)',
          lineHeight: 1.65,
          margin:     0,
          flex:       1,
        }}>
          {project.description}
        </p>

        {/* Highlights (large card only) */}
        {large && (
          <ul style={{
            display:       'flex',
            flexDirection: 'column',
            gap:           8,
            paddingLeft:   0,
            listStyle:     'none',
            margin:        0,
          }}>
            {project.highlights.slice(0, 4).map((h, i) => (
              <li key={i} style={{
                fontFamily: "'Inter', sans-serif",
                fontSize:   13,
                fontWeight: 300,
                color:      'rgb(80, 80, 90)',
                display:    'flex',
                alignItems: 'flex-start',
                gap:        8,
                lineHeight: 1.5,
              }}>
                <span style={{
                  width:           4,
                  height:          4,
                  borderRadius:    '50%',
                  backgroundColor: project.color,
                  flexShrink:      0,
                  marginTop:       6,
                }} />
                {h}
              </li>
            ))}
          </ul>
        )}

        {/* Tech badges */}
        <div style={{
          display:   'flex',
          flexWrap:  'wrap',
          gap:       6,
          marginTop: 'auto',
          paddingTop: 4,
        }}>
          {(large ? project.tech : project.tech.slice(0, 5)).map((t) => (
            <TechBadge key={t} name={t} />
          ))}
          {!large && project.tech.length > 5 && (
            <TechBadge name={`+${project.tech.length - 5}`} />
          )}
        </div>

        {/* Footer: year + links */}
        <div style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          paddingTop:     8,
          borderTop:      '1px solid rgba(0,0,0,0.06)',
        }}>
          <span style={{
            fontFamily:    "'Inter', sans-serif",
            fontSize:      12,
            fontWeight:    400,
            color:         'rgba(0,0,0,0.35)',
            letterSpacing: '0.02em',
          }}>
            {project.year}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.08, color: project.color }}
              style={{
                display:         'inline-flex',
                alignItems:      'center',
                gap:             6,
                fontSize:        12,
                fontFamily:      "'Inter', sans-serif",
                fontWeight:      500,
                color:           'rgb(48, 48, 48)',
                textDecoration:  'none',
                padding:         '6px 12px',
                borderRadius:    8,
                backgroundColor: 'rgba(0,0,0,0.03)',
                border:          '1px solid rgba(0,0,0,0.07)',
                transition:      'color 0.2s ease',
              }}
              title="View live site"
            >
              <ExternalLinkIcon />
              Live
            </motion.a>
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.08, color: project.color }}
              style={{
                display:         'inline-flex',
                alignItems:      'center',
                gap:             6,
                fontSize:        12,
                fontFamily:      "'Inter', sans-serif",
                fontWeight:      500,
                color:           'rgb(48, 48, 48)',
                textDecoration:  'none',
                padding:         '6px 12px',
                borderRadius:    8,
                backgroundColor: 'rgba(0,0,0,0.03)',
                border:          '1px solid rgba(0,0,0,0.07)',
                transition:      'color 0.2s ease',
              }}
              title="View source"
            >
              <GithubIcon />
              Code
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────
export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const [featured, ...rest] = projects;

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        width:           '100%',
        backgroundColor: '#ffffff',
        padding:         '100px 40px 120px',
        borderTop:       '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* ── Section header ── */}
        <div style={{
          display:        'flex',
          alignItems:     'flex-end',
          justifyContent: 'space-between',
          marginBottom:   64,
          flexWrap:       'wrap',
          gap:            24,
        }}>
          <motion.div
            animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            initial={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Overline */}
            <div style={{
              display:        'flex',
              alignItems:     'center',
              gap:            10,
              marginBottom:   12,
            }}>
              <div style={{
                width:           24,
                height:          1,
                backgroundColor: 'rgb(94, 103, 230)',
              }} />
              <span style={{
                fontFamily:    "'Inter', sans-serif",
                fontSize:      11,
                fontWeight:    500,
                color:         'rgb(94, 103, 230)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}>
                Selected work
              </span>
            </div>
            <h2 style={{
              fontFamily:    "'Antonio', sans-serif",
              fontSize:      'clamp(36px, 4vw, 52px)',
              fontWeight:    700,
              color:         'rgb(48, 48, 48)',
              textTransform: 'uppercase',
              lineHeight:    1.05,
              letterSpacing: '-0.01em',
              margin:        0,
            }}>
              PROJECTS
            </h2>
          </motion.div>

          {/* View all link */}
          <motion.div
            animate={headingInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            initial={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to="/projects"
              style={{ textDecoration: 'none' }}
            >
              <motion.span
                whileHover="hover"
                style={{
                  display:     'inline-flex',
                  alignItems:  'center',
                  gap:         8,
                  fontFamily:  "'Inter', sans-serif",
                  fontSize:    14,
                  fontWeight:  500,
                  color:       'rgb(48, 48, 48)',
                  cursor:      'pointer',
                }}
              >
                View all projects
                <motion.span
                  variants={{ hover: { x: 4 } }}
                  transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                  style={{ display: 'flex', alignItems: 'center', color: 'rgb(94, 103, 230)' }}
                >
                  <ArrowRightIcon />
                </motion.span>
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* ── Project grid ── */}
        {/*  Layout: featured large card on left, 2 smaller cards stacked on right */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows:    'auto',
          gap:                 20,
          alignItems:          'stretch',
        }}>
          {/* Featured — spans 1 column, full height */}
          <div style={{ gridRow: '1 / 3', display: 'flex', flexDirection: 'column' }}>
            <ProjectCard project={featured} index={0} large={true} />
          </div>

          {/* Rest — 2 smaller cards */}
          {rest.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i + 1} large={false} />
          ))}
        </div>

        {/* ── View all CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: 0.3 }}
          style={{ textAlign: 'center', marginTop: 56 }}
        >
          <Link to="/projects" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{
                backgroundColor: 'rgb(48, 48, 48)',
                borderColor:     'rgb(48, 48, 48)',
              }}
              whileTap={{ scale: 0.97 }}
              style={{
                display:         'inline-flex',
                alignItems:      'center',
                gap:             10,
                fontFamily:      "'Antonio', sans-serif",
                fontSize:        13,
                fontWeight:      700,
                textTransform:   'uppercase',
                letterSpacing:   '0.1em',
                color:           'rgb(48, 48, 48)',
                backgroundColor: 'transparent',
                border:          '1px solid rgba(0,0,0,0.18)',
                borderRadius:    999,
                padding:         '13px 32px',
                cursor:          'pointer',
                transition:      'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={e => {
                const btn = e.currentTarget;
                btn.style.color = 'white';
              }}
              onMouseLeave={e => {
                const btn = e.currentTarget;
                btn.style.color = 'rgb(48, 48, 48)';
              }}
            >
              View all projects
              <ArrowRightIcon />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
