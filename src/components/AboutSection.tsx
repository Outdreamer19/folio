import { motion } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';

// ── Social icons ──────────────────────────────────────────────
function XIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}
function GithubIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}
function DribbbleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10"/>
      <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
    </svg>
  );
}

// ── Stat item with count-up ───────────────────────────────────
function StatItem({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
  const { count, ref } = useCountUp(value, 2200);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span
        ref={ref as React.RefObject<HTMLSpanElement>}
        style={{
          fontFamily:    "'Antonio', sans-serif",
          fontSize:      60,
          fontWeight:    700,
          color:         'rgb(94, 103, 230)',
          lineHeight:    1,
          letterSpacing: '-0.02em',
        }}
      >
        {count}{suffix}
      </span>
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize:   14,
        fontWeight: 400,
        color:      'rgb(48, 48, 48)',
        lineHeight: 1.4,
        maxWidth:   130,
      }}>
        {label}
      </span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────
export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        width:           '100%',
        backgroundColor: '#f8f8f8',
        padding:         '100px 40px',
      }}
    >
      <div style={{
        maxWidth:            1200,
        margin:              '0 auto',
        display:             'grid',
        gridTemplateColumns: '1fr 1fr',
        gap:                 80,
        alignItems:          'center',
      }}>
        {/* LEFT — text content */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{ display: 'flex', flexDirection: 'column', gap: 32 }}
        >
          <h2 style={{
            fontFamily:    "'Antonio', sans-serif",
            fontSize:      'clamp(36px, 4vw, 48px)',
            fontWeight:    700,
            color:         'rgb(48, 48, 48)',
            textTransform: 'uppercase',
            lineHeight:    1.05,
            letterSpacing: '-0.01em',
            margin:        0,
          }}>
            ABOUT ME
          </h2>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize:   16,
            fontWeight: 300,
            color:      'rgb(48, 48, 48)',
            lineHeight: 1.65,
            margin:     0,
            maxWidth:   480,
          }}>
            Hi, I'm Shane — a software engineer with 6+ years of experience building scalable
            web applications. I founded and independently shipped InvoiceFeed, a full SaaS
            platform. Comfortable across the full stack, I work with PHP, Laravel, Vue.js,
            TypeScript, and TailwindCSS.
          </p>

          {/* Stats */}
          <div style={{
            display:             'grid',
            gridTemplateColumns: '1fr 1fr',
            gap:                 28,
            paddingTop:          8,
          }}>
            <StatItem value={6}  label="Years of Experience" suffix="+" />
            <StatItem value={3}  label="Shipped Products" />
            <StatItem value={10} label="Technologies Mastered" suffix="+" />
          </div>

          {/* Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 300, color: 'rgb(48,48,48)' }}>
              📞 +44 7565 727032
            </span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 300, color: 'rgb(48,48,48)' }}>
              ✉️ shane1obdurate@gmail.com
            </span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 300, color: 'rgb(48,48,48)' }}>
              📍 Luton, UK · Right to Work
            </span>
          </div>

          {/* Social icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {[
              { Icon: XIcon,        label: 'X (Twitter)', href: '#' },
              { Icon: LinkedInIcon, label: 'LinkedIn',    href: 'https://www.linkedin.com/in/shane-bell-740b8569' },
              { Icon: GithubIcon,   label: 'GitHub',      href: 'https://github.com/Outdreamer19' },
              { Icon: DribbbleIcon, label: 'Dribbble',    href: '#' },
            ].map(({ Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ opacity: 0.55, scale: 1.1 }}
                style={{
                  color:          'rgb(48, 48, 48)',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                }}
              >
                <Icon />
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <div>
            <motion.a
              href="https://github.com/Outdreamer19"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ backgroundColor: 'rgb(74, 83, 210)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display:         'inline-block',
                backgroundColor: 'rgb(94, 103, 230)',
                color:           'white',
                fontFamily:      "'Antonio', sans-serif",
                fontSize:        14,
                fontWeight:      700,
                textTransform:   'uppercase',
                letterSpacing:   '0.1em',
                borderRadius:    99,
                padding:         '12px 32px',
                textDecoration:  'none',
                cursor:          'pointer',
                transition:      'background-color 0.2s ease',
              }}
            >
              MY GITHUB
            </motion.a>
          </div>
        </motion.div>

        {/* RIGHT — empty spacer; TravelingCard overlays here */}
        <div style={{ minHeight: 380 }} />
      </div>
    </section>
  );
}
