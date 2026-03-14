import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Role {
  title:    string;
  company:  string;
  location: string;
  period:   string;
  note?:    string;
  bullets:  string[];
  color:    string;
}

interface Degree {
  qualification: string;
  institution:   string;
  period:        string;
}

const roles: Role[] = [
  {
    title:    'Software Engineer / Programmer Analyst',
    company:  'National Water Commission',
    location: 'Kingston, Jamaica',
    period:   'July 2018 – April 2024',
    note:     'Relocated to UK',
    color:    'rgb(94, 103, 230)',
    bullets: [
      'Developed full-stack applications with JavaScript, Vue.js, TailwindCSS, and PHP — delivering scalable, responsive solutions for internal and public-facing platforms.',
      'Built data-driven systems using SQL with optimised queries ensuring efficient data flow between front-end and back-end.',
      'Collaborated with cross-functional teams including product, UX/UI designers, and non-technical stakeholders to architect and deliver robust solutions.',
      'Maintained legacy systems while migrating key applications to modern technologies, improving performance and scalability.',
      'Led the redesign of the company website using HTML5, CSS3, and JavaScript.',
      'Developed robust applications using Laravel, Vue, React, and MySQL — consistently focusing on performance, security, and maintainability.',
    ],
  },
];

const education: Degree[] = [
  {
    qualification: 'BSc in Computer Science',
    institution:   'University of Technology, Jamaica',
    period:        '2012 – 2016',
  },
  {
    qualification: 'Associate in Management Information Systems',
    institution:   'Montego Bay Community College, Jamaica',
    period:        '2009 – 2011',
  },
];

// ── Role card ──────────────────────────────────────────────────
function RoleCard({ role, index }: { role: Role; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      style={{
        backgroundColor: '#ffffff',
        borderRadius:    20,
        border:          '1px solid rgba(0,0,0,0.07)',
        overflow:        'hidden',
        boxShadow:       '0 2px 12px rgba(0,0,0,0.04)',
      }}
    >
      {/* Coloured top bar */}
      <div style={{ height: 4, backgroundColor: role.color }} />

      <div style={{ padding: 'clamp(28px, 4vw, 48px)' }}>
        {/* Header row */}
        <div style={{
          display:        'flex',
          flexWrap:       'wrap',
          gap:            16,
          alignItems:     'flex-start',
          justifyContent: 'space-between',
          marginBottom:   24,
        }}>
          <div>
            <h3 style={{
              fontFamily:    "'Antonio', sans-serif",
              fontSize:      'clamp(20px, 2.5vw, 28px)',
              fontWeight:    700,
              color:         'rgb(30, 30, 40)',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              margin:        '0 0 4px',
            }}>
              {role.title}
            </h3>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize:   15,
              fontWeight: 500,
              color:      role.color,
              margin:     '0 0 4px',
            }}>
              {role.company}
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize:   13,
              fontWeight: 300,
              color:      'rgb(120, 120, 130)',
              margin:     0,
            }}>
              {role.location}
            </p>
          </div>

          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <span style={{
              display:         'inline-block',
              fontFamily:      "'Inter', sans-serif",
              fontSize:        13,
              fontWeight:      500,
              color:           'rgb(60, 60, 70)',
              backgroundColor: 'rgba(0,0,0,0.04)',
              border:          '1px solid rgba(0,0,0,0.08)',
              borderRadius:    999,
              padding:         '5px 14px',
              marginBottom:    role.note ? 8 : 0,
            }}>
              {role.period}
            </span>
            {role.note && (
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize:   11,
                fontWeight: 400,
                color:      'rgb(52, 211, 153)',
                margin:     '4px 0 0',
                textAlign:  'right',
              }}>
                {role.note}
              </p>
            )}
          </div>
        </div>

        {/* Bullets */}
        <ul style={{ padding: 0, listStyle: 'none', margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {role.bullets.map((b, i) => (
            <li key={i} style={{
              fontFamily: "'Inter', sans-serif",
              fontSize:   14,
              fontWeight: 300,
              color:      'rgb(70, 70, 85)',
              lineHeight: 1.65,
              display:    'flex',
              alignItems: 'flex-start',
              gap:        12,
            }}>
              <span style={{
                width:           6,
                height:          6,
                borderRadius:    '50%',
                backgroundColor: role.color,
                flexShrink:      0,
                marginTop:       7,
              }} />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ── Main section ───────────────────────────────────────────────
export default function ExperienceSection() {
  const headRef    = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-60px' });

  return (
    <section
      id="experience"
      style={{
        width:           '100%',
        backgroundColor: '#f8f8f8',
        padding:         'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 96px)',
        boxSizing:       'border-box',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Section header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 56 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 24, height: 2, backgroundColor: 'rgb(94, 103, 230)', borderRadius: 1 }} />
            <span style={{
              fontFamily:    "'Inter', sans-serif",
              fontSize:      11,
              fontWeight:    500,
              color:         'rgb(94, 103, 230)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              Work History
            </span>
          </div>
          <h2 style={{
            fontFamily:    "'Antonio', sans-serif",
            fontSize:      'clamp(38px, 5vw, 60px)',
            fontWeight:    700,
            color:         'rgb(30, 30, 40)',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            margin:        '0 0 16px',
            lineHeight:    1.0,
          }}>
            EXPERIENCE
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize:   16,
            fontWeight: 300,
            color:      'rgb(100, 100, 110)',
            maxWidth:   540,
            lineHeight: 1.65,
            margin:     0,
          }}>
            6+ years of professional software engineering — from enterprise government systems
            to independently shipped SaaS products.
          </p>
        </motion.div>

        {/* Role cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 56 }}>
          {roles.map((role, i) => (
            <RoleCard key={role.company} role={role} index={i} />
          ))}
        </div>

        {/* Education strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display:      'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap:          16,
          }}
        >
          {education.map((deg) => (
            <div
              key={deg.qualification}
              style={{
                backgroundColor: '#ffffff',
                borderRadius:    16,
                border:          '1px solid rgba(0,0,0,0.07)',
                padding:         '24px 28px',
                display:         'flex',
                flexDirection:   'column',
                gap:             4,
              }}
            >
              <span style={{
                fontFamily:    "'Inter', sans-serif",
                fontSize:      10,
                fontWeight:    600,
                color:         'rgb(94, 103, 230)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom:  4,
              }}>
                Education
              </span>
              <span style={{
                fontFamily: "'Antonio', sans-serif",
                fontSize:   18,
                fontWeight: 700,
                color:      'rgb(30, 30, 40)',
              }}>
                {deg.qualification}
              </span>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize:   13,
                fontWeight: 400,
                color:      'rgb(100, 100, 110)',
              }}>
                {deg.institution}
              </span>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize:   12,
                fontWeight: 300,
                color:      'rgb(150, 150, 160)',
              }}>
                {deg.period}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
